## [2.0.2](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@2.0.1...@jsamr/counter-style@2.0.2) (2022-01-28)

## [2.0.1](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@2.0.0...@jsamr/counter-style@2.0.1) (2021-06-04)

# [2.0.0](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@1.1.1...@jsamr/counter-style@2.0.0) (2021-04-14)


### Code Refactoring

* **counter-style:** remove second "maxLenComputer" arg of raw ([335d523](https://github.com/jsamr/react-native-li/commit/335d52311384c325302fc0008840a4f59cd921ca))


### Features

* **counter-style:** pass default computer to withMaxLenComputer callback ([dd9f032](https://github.com/jsamr/react-native-li/commit/dd9f0321e344603db59363da782ef55cd3617a4d))


### Performance Improvements

* **counter-style:** optimize fixed maxCounterLen computer ([318cb6d](https://github.com/jsamr/react-native-li/commit/318cb6d716a32988932b7d500f7f9be6e37ea697))
* **counter-style:** optimize symbolic maxLenComputer ([2b2b980](https://github.com/jsamr/react-native-li/commit/2b2b9800779266aa8caaf0f7b8d0be0783e7ab7f))
* **counter-style:** optimized cyclic maxLenComputer ([4e2c7ae](https://github.com/jsamr/react-native-li/commit/4e2c7aeb15f5b2f43f602a23c144223283e2d4b4))


### BREAKING CHANGES

* **counter-style:** CounterStyle.raw does not accept a second argument
anymore. Replace with a chained "withMaxLengthComputer".

## [1.1.1](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@1.1.0...@jsamr/counter-style@1.1.1) (2021-04-14)


### Bug Fixes

* **counter-style:** additive systems with only one symbol mapped to 0 ([5c23c27](https://github.com/jsamr/react-native-li/commit/5c23c273e5e9580610501ab63faf2f1ba94c32d4))

# [1.1.0](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@1.0.4...@jsamr/counter-style@1.1.0) (2021-04-14)


### Features

* **counter-style:** stricter additive range extrapolation ([fa72954](https://github.com/jsamr/react-native-li/commit/fa7295483aac1e447feab0232cecafc95c076b75))

## [1.0.4](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@1.0.3...@jsamr/counter-style@1.0.4) (2021-04-13)


### Bug Fixes

* **counter-style:** handle decreasing ranges properly ([2315975](https://github.com/jsamr/react-native-li/commit/2315975034ab369e80f449907b983c1a4ac3e86b))

## [1.0.3](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@1.0.2...@jsamr/counter-style@1.0.3) (2021-04-13)

## [1.0.2](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@1.0.1...@jsamr/counter-style@1.0.2) (2021-04-13)


### Bug Fixes

* **counter-style:** remove support for functional formatters in types ([d445553](https://github.com/jsamr/react-native-li/commit/d4455532cac89bac6dca6b5bbb20d0add0be1a44))

## [1.0.1](https://github.com/jsamr/react-native-li/compare/@jsamr/counter-style@1.0.0...@jsamr/counter-style@1.0.1) (2021-04-13)


### Bug Fixes

* wrong homepage link ([901b80f](https://github.com/jsamr/react-native-li/commit/901b80fdc01c34a659b0cc890cbe017590078b04))

# 1.0.0 (2021-04-13)


### Features

* **counter-style:** be strict with UTF-16 support ([91a4e18](https://github.com/jsamr/react-native-li/commit/91a4e1804d78b14b35dfef8a8ee46b69f6fb8700))
* **counter-style:** export all presets in barrel module ([fe43005](https://github.com/jsamr/react-native-li/commit/fe43005020349caf4e80dc422464cae4b6c161a3))
* **counter-style:** separation between marker string and counter repr. ([e294944](https://github.com/jsamr/react-native-li/commit/e294944e6539213d027c1c71dfdf414795d0472d))
* **counter-style:** support RTL rendering ([31151ce](https://github.com/jsamr/react-native-li/commit/31151ce961bbbf3de7a4fa609ca075b2b832cbd9))
* add counter-style package ([f9171e3](https://github.com/jsamr/react-native-li/commit/f9171e376020abcea07c82d651a3376a58ea64bf))

