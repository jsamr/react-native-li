## [2.3.1](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@2.3.0...@jsamr/react-native-li@2.3.1) (2022-01-28)

# [2.3.0](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@2.2.1...@jsamr/react-native-li@2.3.0) (2021-08-29)


### Features

* new `clipMarkerText` prop to prevent text wrapping ([1fa1a22](https://github.com/jsamr/react-native-li/commit/1fa1a2245e6fa6e3849a08741fe8c47894e1e526))

## [2.2.1](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@2.2.0...@jsamr/react-native-li@2.2.1) (2021-06-04)


### Bug Fixes

* **react-native-li:** align text marker at the end of the marker box ([4973fe4](https://github.com/jsamr/react-native-li/commit/4973fe49cf2645c174bc7b18bd9d4034f963f039))

# [2.2.0](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@2.1.0...@jsamr/react-native-li@2.2.0) (2021-06-04)


### Features

* **react-native-li:** new `dynamicMarkerBoxWidth` prop ([6b6453c](https://github.com/jsamr/react-native-li/commit/6b6453c24de86b6fcbb921f0d66f1d1e28946c21))

# [2.1.0](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@2.0.0...@jsamr/react-native-li@2.1.0) (2021-05-01)


### Features

* **react-native-li:** new `Container` prop ([82648c0](https://github.com/jsamr/react-native-li/commit/82648c0ddef33a47bb19922cab41d8c9c735a8cc))

# [2.0.0](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@2.0.0-alpha.0...@jsamr/react-native-li@2.0.0) (2021-04-15)


### Features

* **react-native-li:** add `rtlMarkerReversed` prop to `MarkerBox` ([ee5d729](https://github.com/jsamr/react-native-li/commit/ee5d729ee658f8f78e7402c2fb5d17570946747b))
* **react-native-li:** add `markerTextStyle` and `markerBoxStyle` props ([ff57162](https://github.com/jsamr/react-native-li/commit/ff571629be1b671dfe4cf5c80395410382aa6a77))
* **react-native-li:** enrich API of `renderMarker` and `MarkerBox` ([8a2d851](https://github.com/jsamr/react-native-li/commit/8a2d851ba14223a94349ab6942da1fe6998441ed))

### BREAKING CHANGES

* **react-native-li:** `renderMarker` and `MarkerBox` props have changed.
Instead of letting the `MarkedListItem` generate the marker string, the
`counterRenderer` and `counterIndex` are passed down to `renderMarker`.
* **react-native-li:** `markerStyle` has been dropped. Use `markerBoxStyle` to
style the marker container, and `markerTextStyle` to style the marker
string.

# [1.1.0](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@1.0.5...@jsamr/react-native-li@1.1.0) (2021-04-15)


### Bug Fixes

* **react-native-li:** restrict versions of @jsamr/counter-style ([89cf7dc](https://github.com/jsamr/react-native-li/commit/89cf7dc3ab484f978e15465926cbfe74bfa0a8ca))


### Features

* **react-native-li:** support @jsamr/counter-style v2 ([c122627](https://github.com/jsamr/react-native-li/commit/c1226274719ac052ba392dd83506c04c2eaf5b11))

## [1.0.5](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@1.0.4...@jsamr/react-native-li@1.0.5) (2021-04-14)


### Bug Fixes

* **react-native-li:** lock @jsamr/counter-style peer dependency to v1.x ([6296bba](https://github.com/jsamr/react-native-li/commit/6296bbafe726fde10010c663c408a1e7c6f0c174))

## [1.0.4](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@1.0.3...@jsamr/react-native-li@1.0.4) (2021-04-13)


### Bug Fixes

* **react-native-li:** account for startIndex when cp maxNumOfCodepoints ([397e76f](https://github.com/jsamr/react-native-li/commit/397e76fce203412924c85272ffd3659c931f711c))

## [1.0.3](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@1.0.2...@jsamr/react-native-li@1.0.3) (2021-04-13)

## [1.0.2](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@1.0.1...@jsamr/react-native-li@1.0.2) (2021-04-13)

## [1.0.1](https://github.com/jsamr/react-native-li/compare/@jsamr/react-native-li@1.0.0...@jsamr/react-native-li@1.0.1) (2021-04-13)


### Bug Fixes

* wrong homepage link ([901b80f](https://github.com/jsamr/react-native-li/commit/901b80fdc01c34a659b0cc890cbe017590078b04))

# 1.0.0 (2021-04-13)


### Features

* **react-native-li:** render marked lists ([bcc1689](https://github.com/jsamr/react-native-li/commit/bcc1689821d1be6f7c516b561ceafeed88006031))

