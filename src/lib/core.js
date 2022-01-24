//this file is the interface for the plugin core.
// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)
// helpers
function Enum() {
    for (var i in arguments) {
        this[arguments[i]] = i;
    }
}

import MonacoApi from "./editors/MonacoApi.js";

//error types
var Status = new Enum("Success","Failed","PlugginNotSet","Loaded","Unknown","WrongInputType","InternalError","WentTooFarInArray")

export default Processor = {
    name: "Processor",
    version: "0.0.1",
    description: "Text Processor",
    pluggins: [{
        name: "SwapColumns",
        resultType: "array",
        path: "./plugins/",
        libs: ["SwapColumns.js"],
        processor: null,
        processors: [],
        load: (options)=>{
            // load must be called before execute
            import __ from `${this.path}${this.libs[0]}`
            this.processor = __
            this.processors.push(this.processor)
            this.processor.init(options)
            return [this.processor,Status.Loaded]
        },
        execute: (input, options) => {
            if (this.processor === null) {
                return [null,Status.PlugginNotSet]
            }
            return [this.processor.execute(input, options),Status.Success]
        },

    }],
    editor: null,
    settings: {},
    __text__: "",//private please dont use
    updateText: function (text,column=0,row=0) {
        this.__text__ = text

        this.__text__ = state.text
    },
    setText: function (text) {
        this.__text__ = text
    },
    editorEvent: function (event) {
        this.editor.set
    inialize: (editor, settings, pluggins) => {
        this.pluggins = pluggins
        this.settings = settings
        this.editor = editor
    },
    loadPluggins: (pluggins,optionsArray=[]) => {
        this.pluggins.map((pluggin) => {
            pluggin.load(optionsArray)
        })
    },
    addPluggin: (pluggin,chainStep) => {
        let chainStep  = chainStep  || pluggins.length;
        this.pluggins.splice(chainStep,0,pluggin)
    },
    replacePluggin: (pluggin,chainStep) => {
        this.pluggins.splice(chainStep,1,pluggin)
    },
    start: (customPluggins) => {
        this.pluggins ||= customPluggins
        this.pluggins.forEach(pl => {
            pl.start(this)
        })
    }
}