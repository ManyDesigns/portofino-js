# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security


## [1.3.1] - 2021-03-04

### Fixed
* Crud Action search request options is now a param

## [1.3.0] - 2021-03-03

### Added
* Login action state observer


## [1.2.7] - 2021-03-02

### Added
* Axios request params for crud action rest methods

### Changed
* NooNoo prevent duplicated slash inside base url


## [1.2.4] - 2021-03-01

### Added
* Session management in the LoginAction
* Exported types and action classes from the main entrypoint
* enable auth from the Portofino.connect config 

### Changed
* Login action are extended as a normal action


## [1.2.3] - 2020-12-11

### Fixed
* Passing undeclared poperties in creation and update


## [1.2.1] - 2020-11-16

### Added
* Test suite
* Automated github release
* Crud actions scoped attribute list

### Fixed
* Falsy entity properties are now sent to portofino
* Epoch date 0 is now converted to a valid date