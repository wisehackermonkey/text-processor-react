//this file is the interface for the plugin core.
// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
// const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { return fn(v) }, firstValue)

// helpers
function Enum() {
    for (var i in arguments) {
        this[arguments[i]] = i;
    }
}

// import MonacoApi from "./editors/MonacoApi.js";

//error types
var Status = new Enum("Success", "Failed", "PlugginFailedToLoadFileNotFound", "FeatureNotCreatedYet", "EditorTextIsSameAsUpdateText", "NoDefaultTextSet", "ErrorMissingTextToReplace", "EditorNotSet", "PlugginNotSet", "Loaded", "Unknown", "WrongInputType", "InternalError", "WentTooFarInArray")
// import Pluggin from "../../pluggins/SwapColumns.js"

import MonacoApi from "./editors/MonacoApi.js";
// import TextPipeline from "./src/core.js";
// let TextPipeline = new TextPipeline()
// TextPipeline.init(MonacoApi,{},[])
// TextPipeline.defaultText(`line 1, line 2, line 3, line 4`)
// TextPipeline.execute()
// console.log(TextPipeline.getText())

const Core = {
    name: "TextPipeline",
    version: "0.0.1",
    description: "Text TextPipeline",
    editor: null,
    settings: {},
    __text__: "",//private please dont use
    EditorApi: null,
    pluggins: [{
         name: "SwapColumns",
    version: "0.0.1",
    description: "Swap Columns",
    pluggins: [],
    init: function(options) {
        this.options = options
        this.result = []
        this.resultType = "array"
        this.status = "loaded"
        console.log(`${this.name} ${this.version} loaded`)
    },
    
    execute:function (input, options) {
        function swapColumns(input,options) {
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
        }
        return pipe(input,   swapColumns )
    }
        
    }],
    init: function (editor, EditorApi, settings = {}, pluggins = [], editorPluggins = []) {
        //example:
        // Processor.initalize("", MonacoApi, {}, [], [])
        // 
        // this.pluggins.push(...pluggins)
        // this.settings = settings
        console.log("init")
        console.log(this)
        this.editor = editor
        this.EditorApi = MonacoApi

        //settup
        this.EditorApi.init(editor,MonacoApi, settings, editorPluggins)

        //load pluggins
        this.pluggins.map(function(pl)  {
            pl.init({})
        })
    },
    execute: function () {
        //the map pulls out the execute function from the pluggins
        //pipe is a fancy way to call nested functions
        console.log("execute")
        // let __pluggins =this.pluggins.map(pl => { pl.execute })
         let __pluggins = this.pluggins.map(pl => [pl.execute])
         
        let result = pipe(this.__text__, this.pluggins[0].execute)
        return result
    },
    defaultText: function (text) {
        this.__text__ = text
        this.EditorApi.default(text || null)
    },
    getText: function (row = null, column = null, rowEnd = 80, columEnd = 1, selected = false, selectedMulti = false) {
        this.__text__ = this.EditorApi.getText(row, column, rowEnd, columEnd, selected, selectedMulti)
        return this.__text__
    },

    setText: function (text) {
        this.EditorApi.setText(text)
        this.__text__ = text
    },
    updateText: function (text, column = 0, row = 0) {
        return [null, Status.FeatureNotCreatedYet]

        if (this.__text__ === text) {
            return [this.__text__, Status.EditorTextIsSameAsUpdateText]
        }
        this.__text__ = text
        return [this.EditorApi.setText(text), Status.Success]
    },
    syncronize: function (text = null, column = 0, row = 0) {
        return [this.__text__, Status.FeatureNotCreatedYet]
        if (text) {
            return [this.__text__, Status.FeatureNotCreatedYet]

        }
        let result, status = this.EditorApi.getText()
        this.__text__ = result
        return [result, status]
    },
    editorEvent: function (event) {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        // this.editor.set
    },
    loadPluggins: function (pluggins, optionsArray = []) {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        this.pluggins.map((pluggin) => {
            pluggin.load(optionsArray)
        })
    },
    addPluggin: function (pluggin, chainStep) {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        var chainStep = chainStep || pluggins.length;
        this.pluggins.splice(chainStep, 0, pluggin)
    },
    replacePluggin: function (pluggin, chainStep) {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        this.pluggins.splice(chainStep, 1, pluggin)
    },
  
}

export default Core;