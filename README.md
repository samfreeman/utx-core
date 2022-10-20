# UTX Core 

## Creating the project
To create the utx-core project from scratch, follow these steps.
```cmd
git clone https://github.com/samfreeman/utx-core
cd utx-core
code . -r

yarn init
yarn add -D typescript
```

### Modify package.json

```json
// package.json (final form)
---
{
  "name": "utx-core",
  "version": "1.0.0",
  "description": "Core utilities and extensions for String and Function",
  "main": "build/index.js",
  "repository": "https://github.com/samfreeman/utx-core.git",
  "author": "Sam Freeman <sam.freeman.55@gmail.com>",
  "license": "MIT",
  "private": false,
  "keywords": [ "String", "Function", "extensions" ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/samfreeman/utx-core.git"
  },
  "scripts": {
    "test": "jest --config jestconfig.json",
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint --ext .js,.ts",
    "prepare": "yarn build",
    "prepublishOnly": "yarn test && yarn lint",
    "preversion": "yarn lint",
    "version": "yarn format && git add -A src",
    "postversion": "git push && git push --tags"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.40.1",
    "@typescript-eslint/parser": "^5.40.1",
    "eslint": "^8.25.0",
    "typescript": "^4.8.4"
  }
}
```

### Create tsconfig.json

```json
// tsconfig.json
---
{
    "compilerOptions": {
        "target": "ES5",
        "module": "commonjs",
        "declaration": true,  // Need this to create .d.ts files
        "outDir": "build",
        "strict": true,
        "noImplicitAny": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/__tests__/*"
    ]
}
```

### Create .gitignore

```json
// .gitignore
---
node_modules
/build
```

### Create src folder

```cmd
md src
```

> All `.tsc` source files will go in the `src` folder.

### Install [ESLint](https://eslint.org/)

```cmd
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
### Initialize ESLint

```cmd
npx eslint --init
```

> - √ How would you like to use ESLint? · style
> - √ What type of modules does your project use? · esm
> - √ Which framework does your project use? · none
> - √ Does your project use TypeScript? · Yes
> - √ Where does your code run? · node
> - √ How would you like to define a style for your project? · prompt
> - √ What style of indentation do you use? · tab
> - √ What quotes do you use for strings? · single
> - √ What line endings do you use? · windows
> - √ Do you require semicolons? · No
> - The config that you've selected requires the following dependencies:
> @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
> - √ Would you like to install them now? · No / Yes
> - √ Which package manager do you want to use? · yarn

```json
// .eslintrc.json
---
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "env": {
        "browser": true,
        "es2021": true
    },
    "overrides": [
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/consistent-type-definitions": [
            "error",
            "interface"
        ]
    }
}
```

### Create .eslintignore
```json
// .eslintignore
---
node_modules
build
src/**/*.tests.js
src/**/*.test.jsx
src/**/*.test.ts
src/**/*.test.tsx
```

### Install [TS Jest](https://github.com/kulshekhar/ts-jest)

```cmd
yarn add -D jest ts-jest @types/jest
```
### Create jestconfig.json

```json
// jestconfig.json
---
{
    "transform": {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
}
```