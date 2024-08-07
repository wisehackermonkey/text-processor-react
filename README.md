<p align="center"> 

<h1 align="center">text-processor-react</h1>

[![Publish to github pages](https://github.com/wisehackermonkey/text-processor-react/actions/workflows/webpack.yml/badge.svg)](https://github.com/wisehackermonkey/text-processor-react/actions/workflows/webpack.yml)

<hr>
 <div align="center">
 <image height="500" src="assets/2021-10-28-11-45-30.png">
 </div>

 <hr>

# Live Website
### [Click here ](https://wisehackermonkey.github.io/text-processor-react/)
 <hr>

## How to Install & Develope Locally

To build the examples locally, run:

```bash
yarn

yarn start
```
### NOTE: as of 2024 node doenst support some things im using tofix that run
### if you get code: 'ERR_OSSL_EVP_UNSUPPORTED' error
`export NODE_OPTIONS=--openssl-legacy-provider`

### Then open `http://localhost:3000` in a browser


----------

# how to debug regex generator grammer parser
```
yarn global add  nearley
nearleyc grammer.ne -o src/lib/grammer.js
nearley-railroad grammer.ne -o grammar.html
python -m http.server 80
```

# NOTE ALL CYPRESS TESTS ARE CURRENTLY BORKED! broken :/ as of 20240718
## Locally run integration tests with crypress
```bash
yarn start
```
### in a new tab run
```bash
yarn
yarn run cypress:open
```

### Run integration tests with crypress 
```bash
yarn
yarn run cy:ci
```


### open grammar.html in your browser to view railroad diagram of grammer
### http://localhost:80/grammar.html

### Github actions how to setup DASHBOARDRECORDKEY
### [cypress setup api key](https://docs.cypress.io/guides/dashboard/projects#Set-up-a-project-to-record)
 <image height="500" src="assets/2021-10-29-17-59-05.png">

 # [Actions secrets](https://github.com/wisehackermonkey/text-processor-react/settings/secrets/actions)
# [Actions secrets](https://github.com/<USErNAME/<REPONAME>/settings/secrets/actions)
  <image height="200" src="assets/2021-10-29-17-59-40.png">

# https://dashboard.cypress.io/projects/

 <image height="300" src="assets/2021-10-29-18-00-50.png">

# TODO add
- ~~better css~~ DONE
- ~~add localstorage~~ DONE
- add save file button
  - add  open file
- add pastebin save with api key
- add cool colored text visualizer for the regex
- chatgpt plugin with buttons for helper
# links
[GitHub - react-monaco-editor/react-monaco-editor: Monaco Editor for React.](https://github.com/react-monaco-editor/react-monaco-editor)
[Monaco Editor Playground](https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-editor-basic-options)
# License

MIT, see the [LICENSE](/LICENSE.md) file for detail.
