
@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives

@{%
	// Moo lexer documention is here:
	// https://github.com/no-context/moo

	const moo = require("moo")
	const lexer = moo.compile({
	  whitespace: { match: /[\s\t\n]+/, lineBreaks: true },
	  number: /[0-9]+/,
 	  word: /[a-zA-Z]+/,
	  symbols: /[^a-zA-Z0-9\s\t\n\r]+/
	});


const un_nest = (d) =>{
 
	return d.flat(10)
}

%}
 
# Pass your lexer with @lexer:
@lexer lexer


main ->  ( terminals ):* {% d=> un_nest(d[0]) %}

terminals -> NUMBERS | LETTERS | SYMBOLS | WHITESPACE {% d=> d[0] %}
 
LETTERS -> %word   {%([first])=>( {"type": first.type,"text":first.text, token: 'LETTERS'}) %}
SYMBOLS -> %symbols  {%([first])=>( {"type": first.type,"text":first.text, token: 'SYMBOLS'}) %}
NUMBERS -> %number  {%([first])=>( {"type": first.type,"text":first.text, token: 'NUMBERS'}) %}
WHITESPACE -> %whitespace {%([first])=>( {"type": first.type,"text":first.text, token: 'WHITESPACE'}) %}
