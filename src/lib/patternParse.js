const moo = require('moo')

// https://stackoverflow.com/a/27845224/16309718
String.prototype.count=function(c) { 
    var result = 0, i = 0;
    for(i;i<this.length;i++)if(this[i]==c)result++;
    return result;
  };

// grammer
let lexer = moo.compile({
    // CONTROL: /[ \t]+/,
    CONTROL: { match: /[ \t\n\r]+/, lineBreaks: true },
    // comment: /\/\/.*?$/,
    numbers: /0|[1-9][0-9]*/,
    letters: /[a-zA-Z]+/,
    // punctuation: /[\.,'";&:!?]+/,
    symbols: /[\.,'";&:!?`~@#$%^*|\}\]\(\)]+/,
    // string: /"(?:\\["\\]|[^\n"\\])*"/,
    // lparen: '(',
    // rparen: ')',
    keyword: [`'while'`, 'if', 'else', 'moo', 'cows'],
    // newline: { match: /\n/, lineBreaks: false },
})
 

const patternParse =(input,include_range=false)=>{
    lexer.reset(input)
    return Array.from(lexer)
    .map((value,index)=>{
        // im formating the output to match a monaco editor range format
        // https://microsoft.github.io/monaco-editor/api/classes/monaco.range.html
        result = 
         {
            token: value.type.toUpperCase()
        }
        if(include_range){
            result["range"]={
                startLineNumber:value.line,
                // this is adds that number to the current line number to get the range from line to line
                endLineNumber: value.line+value.lineBreaks,

                startColumn: value.col,
                endColumn:  ( value.text.length - value.text.lastIndexOf("\n"))
                // value.lineBreaks === 0 ? value.text.length: value.text.length - value.text.lastIndexOf("\n") 
            }}
        return result
    })   
}

console.log(patternParse("aaaa1111"))
console.log(patternParse("while4"))

input_example = "\n3333bbbbb"
// patternParse(input_example)[2]
console.log(patternParse(input_example,include_range=true))

module.exports = patternParse