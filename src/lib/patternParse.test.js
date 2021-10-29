const patternParse = require("./patternParse")

test("'aaaaa44444' to be <letter><number>", () => {
    input_example = "aaaaa44444"
    output_expected = [
        { token: "LETTERS" },
        { token: "NUMBERS" }
    ]
    expect(patternParse(input_example)).toStrictEqual(output_expected)

})

test("'4.2' to be <num><punctuation><num>", () => {

    input_example = "4.5"
    output_expected = [
        { token: "NUMBERS" },
        { token: "SYMBOLS" },
        { token: "NUMBERS" }
    ]
    expect(patternParse(input_example)).toStrictEqual(output_expected)
})

test(`"hello","world"-><Symbol><letter><Symbol><letter><Symbol>`, () => {
    input_example = `"hello","world"`
    output_expected = [
        { token: "SYMBOLS" },
        { token: "LETTERS" },
        { token: "SYMBOLS" },
        { token: "LETTERS" },
        { token: "SYMBOLS" },
    ]
    expect(patternParse(input_example)).toStrictEqual(output_expected)
})

test("range output should be col 5, line 2 ", () => {
    input_example = "\n1b"
    output_expected = { token: "LETTERS", range: { startLineNumber: 2, endLineNumber: 2,  startColumn: 2, endColumn:3 } }
    expect(patternParse(input_example,include_range=true)[2]).toStrictEqual(output_expected)
    
})


test("multiline token should start line number and end number should have be +1 differnce", () => {
    input_example = 
    `1\t
    \t1`
    // #cnc#
    output_expected = { token: "CONTROL", range: { startLineNumber: 1, endLineNumber: 2,  startColumn: 2, endColumn:1  } }
    // console.log(patternParse(input_example,include_range=true))

    expect(patternParse(input_example,include_range=true)[1]).toStrictEqual(output_expected)

})