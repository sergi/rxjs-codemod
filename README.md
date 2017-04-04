## rxjs-codemod

This repository contains codemod scripts to transform older RxJS code to RxJS5-compatible code.

### Usage

The transformation scripts are to be used with
[JSCodeshift](https://github.com/facebook/jscodeshift):

```
npm install jscodeshift -g
```

For example, in order to transform RxJS4 methods to RxJS5 ones we would do:

```
$ jscodeshift -t methods.js src/
```

Where `src/` is the folder where your source files are located. Please refer to
jscodeshift documentation for more processing options.
