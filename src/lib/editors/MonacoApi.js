var Status = new Enum("Success", "Failed", "EditorNotSet", "PlugginNotSet", "Loaded", "Unknown", "WrongInputType", "InternalError", "WentTooFarInArray")

export default MonacoApi = {
    name: "MonacoApi",
    version: "0.0.1",
    description: "MonacoApi",
    pluggins: [],
    editor: null,
    init: (editor, settings, pluggins) => {
        // call this first
        this.pluggins = pluggins
        this.settings = settings
        this.editor = editor
    },
    getText: (row, column, rowStart = 0, columEnd = 0, selected = false, multiSelection = false) => {
        if (this.editor === null) {
            return [null, Status.EditorNotSet]
        }
        if (selected) {
            return editor.getModel().getValueInRange(editor.getSelection())
        }
    },
    getText: (selection = { rowStart=0, columEnd=0 }) => {

    },
    setText: (text, selectionReplace = false) => {
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