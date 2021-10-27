import React,{useState,useEffect} from "react";
import h from "./helper"
const regex_examples = 
 [
    {regex:"",                                          title:"Clear",  replace:""},
    {regex:"/\\n/g",                                    title:"/n"},
    {regex:"/([\\n|\\s]{2,100})/g",                     title:"multiple newlines"},
    {regex:"/\\r\\n/g",                                 title:"r/n"},
    {regex:"/\\t/g",                                    title:"Tabs -> CSV ','",replace:'","'},
    {regex:"/\\n/g",                                    title:" ENDING Fix CSV endings ",replace:'\n"'},
    {regex:"/\\n[^0-9]/g",                              title:"remove newlines that dont start with a number"},
    {regex:"/\\n[^a-zA-Z]/g",                           title:"remove newlines that dont start with a letter"},
    {regex:"/[0-9]{1,4}[/-][0-9]{1,2}[/-][0-9]{1,4}/g", title:"remove date 11/20/2022 or 11-20-2022"}
 ]
const RegexReplace =({editor})=>{

    const [regexpattern, setSetRegexPattern] = useState("")
    const [replacement, setReplacement] = useState("")
    const string_to_regexp = ()=>{
        // remove weird "/ /g" at begiinerin and end of string
        let regex_from_string = h.string_to_regexp(regexpattern)

        let temp_pattern = new RandExp(regexpattern).gen()
        setPatternOutput(temp_pattern)
    }
    
return(
    <>
        <label htmlFor="regex-delimiter-search">Find</label>
        <textarea 
            defaultValue={regexpattern}
            onInput={(e)=> setSetRegexPattern(e.target.value)}

            id="regex-delimiter-search" cols="20" rows="2" placeholder="/Regex goes here/g"></textarea>
        <label htmlFor="regex-delimiter-replace">Replace with</label>
        <textarea
            defaultValue={replacement} 
            onInput={(e)=> setReplacement(e.target.value)}

            id="regex-delimiter-replace" cols="20" rows="2" placeholder="replacement text goes here"></textarea>
        <ul>{
            regex_examples.map((example,i) => {
                return <li key={i}><button key={i} onClick={() => { 
                    setReplacement("")
                    setSetRegexPattern(example.regex) 
                    if(example?.replace){
                        setReplacement(example.replace)
                    }
                }}>{example.title}</button></li>
            })
        }</ul>
        <hr />
        <div>
            <button onClick={()=>{
                let editor_text  = editor.getValue()
                 
                let search_regex = h.string_to_regexp(regexpattern) 
                 editor_text = editor_text.replaceAll(search_regex, replacement)

                
                h.updateEditor(editor,editor_text)
            }}>Replace</button>
        </div>
    </>
)
}

export default RegexReplace