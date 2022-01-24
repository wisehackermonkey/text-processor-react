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
var Status = new Enum("Success", "Failed","PlugginFailedToLoadFileNotFound", "FeatureNotCreatedYet", "EditorTextIsSameAsUpdateText", "NoDefaultTextSet", "ErrorMissingTextToReplace", "EditorNotSet", "PlugginNotSet", "Loaded", "Unknown", "WrongInputType", "InternalError", "WentTooFarInArray")

import MonacoApi from "./editors/MonacoApi.js";
// import TextPipeline from "./src/core.js";
// let TextPipeline = new TextPipeline()
// TextPipeline.init(MonacoApi,{},[])
// TextPipeline.default(`line 1, line 2, line 3, line 4`)
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
        resultType: "array",
        path: "./plugins/",
        libs: ["SwapColumns.js"],
        processor: null,
        processors: [],
        load: function(options) {
            // load must be called before execute
            //example `./plugins/SwapColumns.js`
            import(`${this.path}${this.libs[0]}`).then(
                (plugin) => {
                    //  Do something with the module
                
           
            this.processor = plugin
            this.processors.push(plugin)
            this.processor.init(options)

            return [this.processor, Status.Loaded]
        }
            ).catch(
                (error) => {
                    return [this.processor, Status.PlugginFailedToLoadFileNotFound]

                    // handle the case where module didn't load or something went wrong
                }
            );
        },
        execute: function (input, options) {
            if (this.processor === null) {
                return [null, Status.PlugginNotSet]
            }
            return [this.processor.execute(input, options), Status.Success]
        },

    }],
    init: function( editor, EditorApi, settings = {}, pluggins = [], editorPluggins = []) {
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
        this.EditorApi.init(editor, settings, editorPluggins)
      
        //load pluggins
        this.pluggins.map(pl => {
            pl.load({})
        })
    },
    defaultText: (text) => {
        this.__text__ = text
        this.EditorApi.default(text || null)
    },
    getText: (row = null, column = null, rowEnd = 80, columEnd = 1, selected = false, selectedMulti = false) => {
        this.__text__ = this.EditorApi.getText(row, column, rowEnd, columEnd, selected, selectedMulti)
        return this.__text__
    },
    
    setText: function(text){
        this.EditorApi.setText(text)
        this.__text__ = text
    },
    updateText:  function(text, column = 0, row = 0){
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
    editorEvent: function(event){
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        // this.editor.set
    },
    loadPluggins: (pluggins, optionsArray = []) => {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        this.pluggins.map((pluggin) => {
            pluggin.load(optionsArray)
        })
    },
    addPluggin: (pluggin, chainStep) => {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        var chainStep = chainStep || pluggins.length;
        this.pluggins.splice(chainStep, 0, pluggin)
    },
    replacePluggin: (pluggin, chainStep) => {
        //TODO not implemented
        return [null, Status.FeatureNotCreatedYet]

        this.pluggins.splice(chainStep, 1, pluggin)
    },
    execute: () => {
        //the map pulls out the execute function from the pluggins
        //pipe is a fancy way to call nested functions
        return pipe(this.__text__, this.pluggins.map(pl => { pl.execute}))
    }
}

export default Core;