## How to Configure Text Editors and IDEs for React.js [![img](https://img.shields.io/badge/discussion-join-green.svg?style=flat-square)](https://github.com/kriasoft/react-starter-kit/issues/117)

> Tips and tricks on how to configure your favorite text editor or IDE to work
> with React.js/ES6+/JSX.

### WebStorm

Create a new project based on **React Starter Kit template**

![react-project-template-in-webstorm](https://dl.dropboxusercontent.com/u/16006521/react-starter-kit/webstorm-new-project.png)

Make sure that **JSX** support is enabled in your project. This is set by default, if you create a new project based on React.js template.

![jsx-support-in-webstorm](https://dl.dropboxusercontent.com/u/16006521/react-starter-kit/webstorm-jsx.png)

Configure JavaScript libraries for **auto-complete**

![javascript-libraries-in-webstorm](https://dl.dropboxusercontent.com/u/16006521/react-starter-kit/webstorm-libraries.png)

Enable **ESLint** support

![eslint-support-in-webstorm](https://dl.dropboxusercontent.com/u/16006521/react-starter-kit/webstorm-eslint.png)

Enable **CSSComb** by installing CSSReorder plug-in

![csscomb-in-webstorm](https://dl.dropboxusercontent.com/u/16006521/react-starter-kit/webstorm-csscomb.png)

### Atom

Install atom packages

* [linter](https://atom.io/packages/linter)
* [linter-eslint](https://atom.io/packages/linter-eslint)
* [react](https://atom.io/packages/react)

```shell
apm install linter linter-eslint react
```

Install local npm packages

* [eslint](https://www.npmjs.com/package/eslint)
* [babel-eslint](https://www.npmjs.com/package/babel-eslint)
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

```shell
npm install --save-dev eslint babel-eslint eslint-plugin-react
```

*You may need to restart atom for changes to take effect*

### SublimeText

Install SublimeText packages  
Easiest with [Package Control](https://packagecontrol.io/) and then "Package Control: Install Package" (Ctrl+Shift+P)  

* [Babel](https://packagecontrol.io/packages/Babel)
* [Sublime-linter](http://www.sublimelinter.com/en/latest/)
* [SublimeLinter-contrib-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)

You can also use [SublimeLinter-contrib-eslint_d](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint_d) for faster linting.

Set Babel as default syntax for a particular extension:

* Open a file with that extension,
* Select `View` from the menu,
* Then `Syntax` `->` `Open all with current extension as...` `->` `Babel` `->` `JavaScript (Babel)`.
* Repeat this for each extension (e.g.: .js and .jsx).

Install local npm packages
```
npm install eslint@latest
npm install babel-eslint@latest
npm install eslint-plugin-react
```
