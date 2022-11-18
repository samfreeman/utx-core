# UTX Core 

## Creating the project
To create the utx-core project from scratch, follow these steps.
```cmd
rem -- Create Typescript Project
md utx-core && cd utx-core
code . -r

rem -- Create Project Folders
md build
md src
md tools
md tools\coverage-results
md tools\logs

rem -- Create .gitignore
echo node_modules>.gitignore
echo build>>.gitignore
echo tools/coverage-results>>.gitignore
echo tools/logs>>.gitignore

rem -- Install Typescript
yarn add -D typescript
npx tsc --init
```

```json
// tsconfig.json
// ---
{
  "compilerOptions": {
    "incremental": true,
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "build",
    "noEmitOnError": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "build",
    "tests",
    "tools"
  ]
}
```

```cmd
rem -- Add ESLint
yarn add -D eslint
yarn eslint --init
```

> - √ How would you like to use ESLint? · style
> - √ What type of modules does your project use? · esm
> - √ Which framework does your project use? · none
> - √ Does your project use TypeScript? · Yes
> - √ Where does your code run? · node
> - √ How would you like to define a style for your project? · prompt
> - √ What format do you want your config file to be in? · JSON
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
// ---
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
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

```cmd
rem -- Create .eslintignore
echo node_modules>.eslintignore
echo build>>.eslintignore
echo tools>>.eslintignore
echo tests>>.eslintignore
```

```cmd
rem -- Install Jest
yarn add -D jest
yarn add -D ts-node ts-jest @types/jest
yarn jest --init
```
> - √ Would you like to use Jest when running "test" script in "package.json"? ... yes
> - √ Would you like to use Typescript for the configuration file? ... yes
> - √ Choose the test environment that will be used for testing » node
> - √ Do you want Jest to add coverage reports? ... yes
> - √ Which provider should be used to instrument code for coverage? » v8
> - √ Automatically clear mock calls, instances, contexts and results before every test? ... yes

```ts
// jest.config.ts
// ---
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/index.ts',
        '!src/extensions.ts'
    ],
    coverageDirectory: 'tools/coverage-results',
    coverageProvider: 'v8',
    preset: 'ts-jest',
    roots: ['src', 'tests'],
    testEnvironment: 'jest-environment-node',
    testMatch: ['**/tests/**/*.test.ts'],
    verbose: true
}
```

```cmd
rem -- Test Jest/TS Installation
yarn test
```

### Add Some Code

```ts
// src/string/lookFor.ts
// ---
export type LookForResult = [number, number]

export const NotFound: LookForResult = [-1, 0]


export const lookFor = (
    value: string,
    what: string | RegExp,
    start?: number
): LookForResult => {
    if (typeof what == 'string' && what == '')
        return NotFound

    start = start ?? 0
    if (start >= value.length)
        return NotFound
    
    if (start <= -value.length)
        start = 0
    else if (start < 0)
        start = value.length + start

    if (typeof what == 'string') {
        const index = value.indexOf(what, start)
        return index < 0 ? NotFound : [index, what.length]
    }

    if (start != 0)
        value = value.slice(start)
    const match = value.match(what)
    return !match
        ? NotFound
        : [start + (match.index ?? 0), match[0].length]
}


export default lookFor
```

### Add A Test
```ts
// tests/string/lookFor.test.ts
// ---
import { lookFor, NotFound } from '../../src/string/lookFor'


describe('string', () => {
    test('lookFor', () => {
        expect(lookFor('', '')).toEqual(NotFound)
        expect(lookFor('JoeBob', 'a')).toEqual(NotFound)
        expect(lookFor('JoeBob', 'o')).toEqual([1, 1])
        expect(lookFor('JoeBob', 'e')).toEqual([2, 1])
        expect(lookFor('JoeBob', 'E')).toEqual(NotFound)
        expect(lookFor('JoeBob', /ebo/i)).toEqual([2, 3])
        expect(lookFor('JoeBob', /ebo/)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', -7)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -6)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -5)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -4)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -3)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -2)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', -1)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 0)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 1)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 2)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 3)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 4)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 5)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 6)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 7)).toEqual(NotFound)

        expect(lookFor((() => { }).toString(), '(')).toEqual([0, 1])
    })
})
```

### Test TS Jest Installation
```cmd
yarn jest
```

```txt
$ jest
 PASS  tests/string/lookFor.test.ts                                                                                                                                                     
  string
    √ lookFor (3 ms)                                                                                                     
------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                                                                                                         
------------|---------|----------|---------|---------|-------------------
All files   |     100 |    90.47 |     100 |     100 | 
 lookFor.ts |     100 |    90.47 |     100 |     100 | 30,34
------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.668 s, estimated 3 s
Ran all test suites.
Done in 3.71s.

```

### Fix Test to Cover Line 31
```ts
// src/__tests__/string/lookFor.test.ts
// ---
import { lookFor, NotFound } from '../../string/lookFor'


describe('string', () => {
    test('lookFor', () => {
        //...

        expect(lookFor('JoeBob', /ebo/i, 1)).toEqual([2, 3])
    })
})
```

### Fix Code to Cover Line 35
```ts
// src/string/lookFor.ts
// ---
export type LookForResult = [number, number]

export const NotFound: LookForResult = [-1, 0]


export const lookFor = (
    value: string,
    what: string | RegExp,
    start?: number
): LookForResult => {

    //...

    return match == null || match.index == null
        ? NotFound
        : [start + match.index, match[0].length]
}


export default lookFor
```
```txt
 PASS  src/__tests__/string/lookFor.test.ts
    string
        √ lookFor (9 ms)

------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------|---------|----------|---------|---------|-------------------
All files   |     100 |      100 |     100 |     100 |                   
 lookFor.ts |     100 |      100 |     100 |     100 | 
------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.796 s, estimated 2 s
Ran all test suites.
```

## Setup GitHub

### Create GitHub Workflows

```cmd
md .github
md .github\\workflows
echo.>.github/workflows/coverage.yml
```

```yml
// .github/workflows/nodejs-ci.yml
// ---
name: Node.js CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: windows-latest
    strategy:
      matrix:
        node-version: [14.x, 15.x, 16.x]
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install Dependences
        run: yarn --frozen-lockfile

      - name: Build
        run: yarn build

      - name: Run Tests
        run: yarn test
```

```yml
// .github/workflows/publish-to-npm.yml
// ---
name: Publish to NPMJS
on:
  release:
    types: [created]
jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      # Setup .npmrc file to publish to npm
      - uses: actions/setup-node@v3
        with:
          node-version: '16.x'
          registry-url: 'https://registry.npmjs.org/'
      - run: yarn --frozen-lockfile
      - run: yarn publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Modify package.json

```json
// package.json
// ---
{
  "name": "utx-core",
  "version": "1.0.0",
  "description": "Core utilities and extensions for String and Function",
  "author": {
    "name": "Sam Freeman",
    "email": "sam.freeman.55@gmail.com"
  },
  "license": "MIT",
  "keywords": [ "String", "Function", "extensions" ],
  "repository": {
    "type": "git",
    "url": "https://github.com/samfreeman/utx-core.git"
  },
  "main": "build/index.js",
  "types": "build/index.d.ts",
  "private": false,
  "scripts": {
    "dev": "tsc --watch",
    "lint": "eslint --ext .ts",
    "clean": "rimraf build",
    "build": "tsc",
    "rebuild": "yarn clean && yarn build",
    "test": "jest --verbose --no-color 2>tools/logs/tests.log",
    "coverage": "\"tools/coverage-results/lcov-report/index.html\"",
    "cover": "yarn test && yarn coverage",
    "prepare": "yarn build",
    "prepublishOnly": "yarn test && yarn lint",
    "preversion": "yarn lint",
    "version": "yarn lint && git add -A src && git add -A test",
    "postversion": "git push && git push --tags"
  },
  "devDependencies": {
    "@types/jest": "^29.2.0",
    "@typescript-eslint/eslint-plugin": "^5.40.1",
    "@typescript-eslint/parser": "^5.40.1",
    "eslint": "^8.25.0",
    "jest": "^29.2.1",
    "ts-jest": "^29.0.3",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.4"
  }
}
```
