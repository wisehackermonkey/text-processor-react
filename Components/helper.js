module.exports = {
     
    string_to_regexp :(input)=>{
      //   Converting user input string to regular expression
      //   source https://stackoverflow.com/a/874742/16309718
      var flags = input.replace(/.*\/([gimy]*)$/, '$1');
        var pattern = input.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
        var regex = new RegExp(pattern, flags);
        return regex
    },
     pasteRegexPattern:(editor,text)=>{
      var selection = editor.getSelection();
      var id = { major: 1, minor: 1 };             
      var op = {identifier: id, range: selection, text: text, forceMoveMarkers: true};
      editor.executeEdits("my-source", [op]);
    },
     
    selectionReplace:(editor,text)=>{
      var selection = editor.getSelection()
      var id = { major: 1, minor: 1 };             
      var op = {identifier: id, range: selection, text: text, forceMoveMarkers: true};
      editor.executeEdits("my-source", [op]);
    },
    multiSelectionReplace:(editor,text)=>{
      var selections = editor.getSelections()
      var id = { major: 1, minor: 1 };             
      var ops = selections.map(x=>{ return {identifier: id, range: x, text: text, forceMoveMarkers: true} })
      editor.executeEdits("my-source", ops);
    },
    multiSelectionReplaceFn:(editor,fn)=>{
      //   example
      // h.multiSelectionReplaceFn(editor, ()=>new RandExp(/([a-b]){5}/g ).gen())
  
      var selections = editor.getSelections()
      var id = { major: 1, minor: 1 };             
      var ops = selections.map(x=>{ return {identifier: id, range: x, text: fn(), forceMoveMarkers: true} })
      editor.executeEdits("my-source", ops);
    }
  }