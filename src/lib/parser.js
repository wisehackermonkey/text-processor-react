const nearley = require("nearley");
const grammar = require("./grammer");



export default {
    extract: (input) => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

        // try {
            parser.feed(input)
            return parser.results[0] 
        // } catch (err) {
        //     console.log("Error at character " + parseError.offset); // "Error at character 9"
        // }
    }
};