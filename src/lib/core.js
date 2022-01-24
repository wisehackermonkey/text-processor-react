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

// import MonacoApi from "./editors/MonacoApi.js";

//error types
var Status = new Enum("Success", "Failed", "FeatureNotCreatedYet", "EditorTextIsSameAsUpdateText", "NoDefaultTextSet", "ErrorMissingTextToReplace", "EditorNotSet", "PlugginNotSet", "Loaded", "Unknown", "WrongInputType", "InternalError", "WentTooFarInArray")

export default Processor = {
    name: "Processor",
    version: "0.0.1",
    description: "Text Processor",
    editor: null,
    settings: {},
    __text__: "",//private please dont use
    EditorApi: null,
    pluggins: [{
        name: "SwapColumns",
        resultType: "array",
        path: "./plugins/",
        libs: ["SwapColumns.js"],
        processor: null,
        processors: [],
        load: (options) => {
            // load must be called before execute
            import __ from `${this.path}${this.libs[0]}`
            this.processor = __
            this.processors.push(this.processor)
            this.processor.init(options)

            return [this.processor, Status.Loaded]
        },
        execute: (input, options) => {
            if (this.processor === null) {
                return [null, Status.PlugginNotSet]
            }
            return [this.processor.execute(input, options), Status.Success]
        },

    }],
    initalize: (defaultText, editor, EditorApi, settings = {}, pluggins = [], editorPluggins = []) => {
        //example:
        // Processor.initalize("", MonacoApi, {}, [], [])
        // 
        this.pluggins.push(...pluggins)
        this.settings = settings
        this.editor = editor
        this.EditorApi = EditorApi

        //settup
        this.EditorApi.init(editor, settings, editorPluggins)
        this.EditorApi.default(defaultText || null) //if nothing is passed, it will default to nothing changing
    },
    getText: (row = null, column = null, rowEnd = 80, columEnd = 1, selected = false, selectedMulti = false) => {
        return ""
    },
    updateText:  (text, column = 0, row = 0)=> {
        return [null, Status.FeatureNotCreatedYet]

        if (this.__text__ === text) {
            return [this.__text__, Status.EditorTextIsSameAsUpdateText]
        }
        this.__text__ = text
        return [this.EditorApi.setText(text), Status.Success]
    },
    syncronize: (text = null, column = 0, row = 0) =>{
        return [this.__text__, Status.FeatureNotCreatedYet]
        if (text) {
            return [this.__text__, Status.FeatureNotCreatedYet]
 
        }
        let result, status = this.EditorApi.getText()
        this.__text__ = result
        return [result, status]
    },
    setText: (text)=> {
        this.__text__ = text
    },
    editorEvent: (event)=> {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        // this.editor.set
    },
    loadPluggins: (pluggins, optionsArray = []) => {
        this.pluggins.map((pluggin) => {
            pluggin.load(optionsArray)
        })
    },
    addPluggin: (pluggin, chainStep) => {
        let chainStep = chainStep || pluggins.length;
        this.pluggins.splice(chainStep, 0, pluggin)
    },
    replacePluggin: (pluggin, chainStep) => {
        this.pluggins.splice(chainStep, 1, pluggin)
    },
    start: (customPluggins) => {
        this.pluggins ||= customPluggins
        this.pluggins.forEach(pl => {
            pl.start(this)
        })
    }
}