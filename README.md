# cangjie-tool
A CangJie tool to handle cangjie code to / from traditional chinese 

## Characteristics

Support wildcard characters:  
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

### cangjie.toWords(code [, simplify = false [, exact = false]])

Find traditional chinese words by cangjie code

Parameters:

-	code - (string) cangjie code in english
-	simplify - (boolean) cangjie simplify mode (速成) (default: false)
-	exact - (boolean) find only exact match to code (default: false)

Return:

-	exact - (boolean) result has exact match word
-	words - (array[string]) result words

### cangjie.toCode(word)

Find cangjie code by traditional chinese word

Parameters:

-	code - (string) traditional chinese word

Return:

return `undefined` if fail to find the cangjie code.

-	key - (string) cangjie code in english characters
-	cangjie - (string) cangjie code