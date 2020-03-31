# cangjie-tool
A CangJie tool to handle cangjie code to / from traditional chinese 

## Characteristics

Support wildcard charactors:  
-	`*` : 0 or any lenght of code
-	`?` : 1 any code

## Install

```sh
$ npm install cangjie-tool
```

## How to use

```js
const cangjie = require('cangjie-tool');

cangjie.toWords('oiar');
>>> { exact: true, words: [ '倉' ] }

cangjie.toCode('頡');
>>> { key: 'grmbc', cangjie: '土口一月金' }
```

## API

### cangjie.toWords(code [, simplify = false [, exact = true]])

Find traditional chinese words by cangjie code

Parameters:

-	code - (string) cangjie code in english
-	simplify - (boolean) cangjie simplify mode (速成) (default: true)
-	exact - (boolean) find only exact match to code (default: true)

Return:

-	exact - (boolean) result has exact match word
-	words - (array[string]) result words

### cangjie.toCode(word)

Find traditional chinese words by cangjie code

Parameters:

-	code - (string) traditional chinese word

Return:

return `undefined` if fail to find the cangjie code.

-	key - (string) cangjie code in english charactors
-	cangjie - (string) cangjie code