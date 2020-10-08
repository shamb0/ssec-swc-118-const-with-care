# ssec-swc-118-const-with-care | Solidity | Security | SWC-118 | Constructors with Care

**Description**

Constructors are special functions that are called only once during the contract creation. They often perform critical, privileged actions such as setting the owner of the contract. Before Solidity version 0.4.22, the only way of defining a constructor was to create a function with the same name as the contract class containing it. A function meant to become a constructor becomes a normal, callable function if its name doesn't exactly match the contract name. This behavior sometimes leads to security issues, in particular when smart contract code is re-used with a different name but the name of the constructor function is not changed accordingly.

---

## Reference

* [HackPedia: 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples | by vasa | HackerNoon.com | Medium](https://medium.com/hackernoon/hackpedia-16-solidity-hacks-vulnerabilities-their-fixes-and-real-world-examples-f3210eba5148)

* [SWC-118 · Overview](https://swcregistry.io/docs/SWC-118)

---

## Example-1 :: OwnerWallet

**Howto Install & build**

```shell
git clone https://github.com/shamb0/ssec-swc-118-const-with-care.git
cd ssec-swc-118-const-with-care
yarn install
yarn build
```

### OwnerWallet ( Vulnarable One )

```shell
main$ env DEBUG='info*,error*,debug*' yarn run test ./test/OwnerWallet.spec.ts
yarn run v1.22.4
$ yarn run test:contracts ./test/OwnerWallet.spec.ts
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces ./test/OwnerWallet.spec.ts
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  OwnerWallet Unint Pointer Test
  info:Phisable-Test Admin :: 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff +0ms
  info:Phisable-Test Usr1 :: 0x63FC2aD3d021a4D7e64323529a55a9442C444dA0 +0ms
  info:Phisable-Test Usr2 :: 0xD1D84F0e28D6fedF03c73151f98dF95139700aa7 +0ms
  info:Phisable-Test Usr3 :: 0xd59ca627Af68D29C547B91066297a7c469a7bF72 +0ms
  debug:Phisable-Test Network Gas price @ 8000000000 +0ms
  debug:Phisable-Test S1-Ent wallet bal :: 10.0 +5ms
  debug:Phisable-Test OwnerWallet @ 0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA +59ms
  debug:Phisable-Test OwnerWallet balance :: 1.5 +3ms
  debug:Phisable-Test S1-Ext wallet bal :: 8.498785776 +2ms
  debug:Phisable-Test S2-Ent :: 8.498785776 +3ms
  debug:Phisable-Test S2-Ent usr1 bal :: 10.0 +3ms
  debug:Phisable-Test S2-Ext usr1 bal :: 11.499423832 +100ms
  debug:Phisable-Test S2-Ext :: 8.498785776 +3ms
    ✓ tst-item-001-run-attack (109ms)
  debug:Phisable-Test OwnerWallet balance :: 0.0 +3ms
  debug:Phisable-Test S3-Ext wallet bal :: 8.498785776 +2ms
  debug:Phisable-Test OwnerWallet balance :: 0.0 +3ms
  debug:Phisable-Test S4-Ext wallet bal :: 8.498785776 +4ms


  1 passing (331ms)

Done in 7.00s.

```
