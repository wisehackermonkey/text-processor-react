const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)

export default SwapColumns = {
    name: "SwapColumns",
    version: "0.0.1",
    description: "Swap Columns",
    pluggins: [],
    init: (options) => {
        this.options = options
        this.result = []
        this.resultType = "array"
        this.status = "loaded"
    },
    swapColumns: (input,options) => {
        let result = []
        let columns = input.split("\n")
        let columnCount = columns[0].split("\t").length
        for (let i = 0; i < columnCount; i++) {
            let column = []
            for (let j = 0; j < columns.length; j++) {
                let row = columns[j].split("\t")
                column.push(row[i])
            }
            result.push(column.join("\t"))
        }
        return result.join("\n")
    },
    execute: (input, options) => {
        return pipe(input, [this.swapColumns,options])
    }
}