import React,{useEffect,useState,useReducer} from "react";
import MonacoEditor from "react-monaco-editor";
import PatternGen from './PatternGen';

const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: false,
  };
  const App = () => {
    let [theme,setTheme] = useState(false)
  
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
            value="whatt"
            options={options}
            // onChange={this.onChange}
            // editorDidMount={this.editorDidMount}
            theme={theme ?"vs-light":"vs-dark"}
          />
        <div>
        <PatternGen  />
        </div>
    </div>
    )
  }

  export default App;