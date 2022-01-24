var Status = new Enum("Success", "Failed","FeatureNotCreatedYet","NoDefaultTextSet", "ErrorMissingTextToReplace", "EditorNotSet", "PlugginNotSet", "Loaded", "Unknown", "WrongInputType", "InternalError", "WentTooFarInArray")
import MonacoEditor from "react-monaco-editor";

/*

const ed = new MonacoApi()
ed.init(editor,{},[])
ed.default(`line 1,
line 2,
line 3,
line 4`)

ed.getText()
ed.getText(3,3)
ed.getText(selection=true) //TODO unemplemented
ed.getText(selectedMulti=true) //TODO unemplemented
ed.setText("works")

ed.setText("works",3,3)
ed.setText("works",row=3,column=3)
*/
export default MonacoApi = {
    name: "MonacoApi",
    version: "0.0.1",
    description: "MonacoApi",
    pluggins: [],
    editor: null,//instance of the editor
    Editor: null,//library of the editor
    init: (editor, settings, pluggins) => {
        // call this first
        this.pluggins.push(...pluggins)
        this.settings = settings
        this.editor = editor
        //TODO untested
        this.Editor = MonacoEditor
    },
    default: (text) => {
        //TODO untested
        if(text === undefined || text === null) {
            return [null,Status.NoDefaultTextSet]
        }
        return [this.editor.setModel(this.Editor.editor.createModel(text, 'text/plain')),Status.Success]
    },
    // note: row and column start at 1 instead of 0
    getText: (row, column, rowEnd = 80, columEnd = 1, selected = false, selectedMulti = false) => {
        // TODO untstested
        // TODO untstested
        if (row === null && column === null && rowEnd === null && columEnd === null && selected === false && selectedMulti === false) {
            return [editor.getModel().getValue(), Status.Success]
        }

        //TODO untested
        if (row && column && rowEnd !== 0 && columEnd !== 0) {
            return this.editor.getModel().getValueInRange({
                startLineNumber: row,
                startColumn: column,
                endLineNumber: rowEnd,
                endColumn: columEnd
            })
        }
        return [null, Status.FeatureNotCreatedYet]
        // TODO untstested
        if (this.editor === null) {
            return [null, Status.EditorNotSet]
        }
        // TODO untstested
        if (selectedMulti && selected === false && rowEnd === 0 && columEnd === 0) {
            return [null, Status.WrongInputType]
        }
        // TODO untstested
        if (selected && row === null && column === null) {
            return editor.getModel().getValueInRange(editor.getSelection())
        }
        // TODO untstested
        if (row === null && column === null) {
            return editor.getModel().getValue()
        }


    },
    getText: (selectRange = { rowEnd = 80, columEnd = 1}) => {
        return [null, Status.FeatureNotCreatedYet]
    },
    setText: (text, selectedReplace = false, selectedMulti = false) => {
        if (!text) {
            return [null, Status.ErrorMissingTextToReplace]
        }
        if (this.editor === null) {
            return [null, Status.EditorNotSet]
        }
        if(text && selectedReplace === false && selectedMulti === false){
            this.editor.setValue(text)
            return [text, Status.Success]
        }

        if (selectedReplace && selectedMulti) {
            return [null, Status.WrongInputType]
        }
        if (selectedReplace) {
            return [null, Status.FeatureNotCreatedYet]

            // this.editor.setModel(new this.Editor.Model(text, this.editor.getModel().getModeId()))
        }
        if (selectedMulti) {
            return [null, Status.FeatureNotCreatedYet]
            // this.editor.setModel(new this.Editor.Model(text, this.editor.getModel().getModeId()))
        }
        if (!selectedReplace && !selectedMulti) {
            return [null, Status.FeatureNotCreatedYet]

            this.editor.setModel(new this.Editor.Model(text, this.editor.getModel().getModeId()))
        }
    
    },
    onUpdate: (callback) => {
    },
    //monaco spacific functions
    getSelectedText: (editor) => {
        return editor.getModel().getValueInRange(editor.getSelection())
    },
    string_to_regexp: (input) => {
        //   Converting user input string to regular expression
        //   source https://stackoverflow.com/a/874742/16309718
        var flags = input.replace(/.*\/([gimy]*)$/, '$1');
        var pattern = input.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        var regex = new RegExp(pattern, flags);
        return regex
    },
    pasteRegexPattern: (editor, text) => {
        var selection = editor.getSelection();
        var id = { major: 1, minor: 1 };
        var op = { identifier: id, range: selection, text: text, forceMoveMarkers: true };
        editor.executeEdits("my-source", [op]);
    },

    selectionReplace: (editor, text) => {
        var selection = editor.getSelection()
        var id = { major: 1, minor: 1 };
        var op = { identifier: id, range: selection, text: text, forceMoveMarkers: true };
        editor.executeEdits("my-source", [op]);
    },
    getMultiSelectionText: (editor) => {
        // TODO untstested
        var selections = editor.getSelections()
        var text = []
        selections.map((selection) => {
            text.push(editor.getModel().getValueInRange(selection))
        })
        return text

    },
    multiSelectionReplace: (editor, text) => {
        var selections = editor.getSelections()
        var id = { major: 1, minor: 1 };
        var ops = selections.map(x => { return { identifier: id, range: x, text: text, forceMoveMarkers: true } })
        editor.executeEdits("my-source", ops);
    },
    multiSelectionReplaceFn: (editor, fn) => {
        //   example
        // h.multiSelectionReplaceFn(editor, ()=>new RandExp(/([a-b]){5}/g ).gen())

        var selections = editor.getSelections()
        var id = { major: 1, minor: 1 };
        var ops = selections.map(x => { return { identifier: id, range: x, text: fn(), forceMoveMarkers: true } })
        editor.executeEdits("my-source", ops);
    },
    // wrapper around function that allows for control z for the editor
    updateEditor: (editor, value) => {
        const fullRange = editor.getModel().getFullModelRange();
        if (value !== editor.getValue()) {
            editor.getModel().pushEditOperations(
                [],
                [
                    {
                        range: fullRange,
                        text: value,
                    }
                ]
            );
        }
        // editor.executeEdits(null, [{
        //   text: text,
        //   range: fullRange
        // }]);
    }
}