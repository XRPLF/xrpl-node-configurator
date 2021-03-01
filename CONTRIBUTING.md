# Contributing

Thanks for considering a contribution to [xrpl-node-configurator](https://github.com/XRPLF/xrpl-node-configurator)!

We're thrilled you're interested and your help is greatly appreciated. Contributing is a great way to learn about the [XRP Ledger](https://xrpl.org). We are happy to review your pull requests. To make the process as smooth as possible, please read this document and follow the stated guidelines.

## About This Project

This project is built with [Vue.Js](https://vuejs.org/) and [Tailwindcss](https://tailwindcss.com), so you will need some knowledge on those frameworks.

## Requirements for a Successful Pull Request

Before being considered for review or merging, each pull request must:

- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Pass continuous e2e and unit tests.
- Update documentation for any new features.
- Be [marked as drafts](https://github.blog/2019-02-14-introducing-draft-pull-requests/) until they are ready for review.
- Adhere to the [code of conduct](CODE_OF_CONDUCT.md) for this repository.

## Building

The first thing you will have to do is to install all dependencies:

``` bash
# clone repo
git clone https://github.com/XRPLF/xrpl-node-configurator.git

# install dependencies
yarn install
```

If you want to test your changes locally you can execute:

``` bash
# serve with hot reload at localhost:8080
yarn dev
```

If you want to generate a build in the `dist` folder, just execute:

``` bash
# build for production with minification
yarn build
```

Tests:

``` bash
# Unit tests
yarn test:unit

# End to end tests
yarn test:e2e

# Execute all (unit and e2e) tests
yarn test:all
```
