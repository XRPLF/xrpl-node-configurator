# XRPL Node Configurator

Configuration tool that will produce a zip file with the following:

- `config/rippled.cfg` file ready to be used with your `rippled` daemon.
- `config/validators.txt` with information about Validators to be used.
- `instructions.txt` with instructions on how to use the contents of the zip file.
- `cfg.json` with the JSON configuration.

*WIP:* [Specs Document](https://docs.google.com/document/d/1OuXHtHLongNB7Xb2SrWLwqARWJdg_0x6LxGWH1pfwUQ/edit)

## Build Setup

``` bash
# clone repo
git clone https://github.com/elmurci/xrpl-node-configurator.git

# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```

## Tests

### Unit Tests

```bash
yarn test:unit
```

### e2e Tests

```bash
yarn test:e2e
```

### All Tests

```bash
yarn test:all
```

## Deploying to Github Pages

After building, this command will push the files inside the `dist` folder to Github so the content is displayed in Github Pages:

```bash
yarn deploy:ghp
```

Repo: [https://github.com/elmurci/xrpl-node-configurator](https://github.com/elmurci/xrpl-node-configurator)
GH Page: [elmurci.github.io/xrpl-node-configurator](http://elmurci.github.io/xrpl-node-configurator)
