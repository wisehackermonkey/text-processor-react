import React,{useEffect,useState,useReducer} from "react";
import MonacoEditor from "react-monaco-editor";
import PatternGen from './PatternGen';
import RegexReplace from "./RegexReplace"
const example_text = `

Minimal set for phonemic tone in Mandarin Chinese
Tone number	1	2	3	4	5
Hanzi	媽	麻	馬	罵	嗎
Pinyin	mā	má	mǎ	mà	ma
IPA	[má]	[mǎ]	[mà][a]	[mâ]	[ma]
Gloss	mother	hemp	horse	scold	question particle
`
const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: false,
  };

  let onChange= (newValue, e) =>{
    console.log('onChange', newValue, e);
  }
   

  const App = () => {
    let [theme,setTheme] = useState(false)
    let [editor,setEditor] = useState(null)

    let monacoEditorLoaded = (__editor__, monaco)=>{
      console.log("__Editor__ loaded")
      __editor__.focus();
      setEditor(__editor__)
    }
    return (
    <div>
      <h2>Monaco Editor Sample (controlled mode)</h2>
      <div>
        <button onClick={()=>{
          setTheme(!theme)
        }}>Theme Dark/Light</button>
      </div>
      <MonacoEditor
            height="400"
            width="800"
            language="javascript"
            value={example_text}
            options={options}
            onChange={onChange}
            editorDidMount={monacoEditorLoaded}
            theme={theme ?"vs-light":"vs-dark"}
          />
        <div>
        <RegexReplace editor={editor}/>
        <hr />  
        <PatternGen  editor={editor}/>
        </div>
    </div>
    )
  }

  export default App;