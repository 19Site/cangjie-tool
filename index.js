'use strict';

// import cangjie database
const cdb = require('cangjie-db');

// define module
(() => {

	/**
	 * get regex
	 */
	const getRegex = (code, simpify, exact) => {

		var hasWildcard = /^.*[\*\?].*$/.test(code);

		if (hasWildcard) {

			simpify = false;
		}

		// replace special character
		code = code.split(/\*/).join('.{0,5}').split(/\?/).join('.{1}');

		var regexExact = '^' + code + '$';

		var regex = undefined;

		if (exact) {

			regex = regexExact;
		} else if (code.length === 1 || !simpify) {

			regex = '^' + code + (hasWildcard ? '' : '.*') + '$';
		} else {

			regex = '^' + code.substring(0, 1) + '.*' + code.substring(code.length - 1, code.length) + '$';
		}

		return {

			regexExact: new RegExp(regexExact),

			regex: new RegExp(regex)
		};
	};

	/**
	 * cangjie to word
	 */
	const toWords = (code, simpify = false, exact = false) => {

		if (typeof code !== 'string' || !/^[a-z\*\?]{1,5}$/.test(code)) {

			return [];
		}

		if (simpify && code.length > 2) {

			return [];
		}

		var {

			regexExact,

			regex

		} = getRegex(code, simpify, exact);

		var foundExact = false;

		var foundWords = cdb

			.filter(r => {

				foundExact || (regexExact.test(r.k) && (foundExact = true));

				return regex.test(r.k);
			})

			.map(r => r.w);

		return {

			exact: foundExact,

			words: [].concat(...foundWords)
		};
	};

	/**
	 * word to code
	 */
	const toCode = word => {

		if (typeof word !== 'string') {

			return undefined;
		}

		var results = cdb.filter(r => r.w.indexOf(word) !== -1);

		if (results.length === 0) {

			return undefined;
		}

		return {

			key: results[0].k,

			cangjie: results[0].k.split('').map(i => toWords(i, true).words[0]).join('')
		};
	};

	// cangjie object
	var cangjie = {

		toWords,

		toCode
	};

	// export methods
	if (typeof module === 'object') {

		module.exports = cangjie;
	}

	// browser
	else if (typeof window === 'object') {

		window.cangjie = cangjie;
	}
})();