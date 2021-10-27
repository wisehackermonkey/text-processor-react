import React, { useState } from "react";
import RandExp from "randexp"
import h from "./helper"

const patternExamples = [
    { title: "None", example: "" },
    { title: "Numbers Int 6820278", example: "/([0-9]{1,7})/g" },
    { title: "Numbers Float 2244235192957.124291", example: "/[-+]?[0-9]{0,16}(\\.[0-9]{1,6})?/" },
    { title: 'Phone Number "230-896-1111"', example: "/([0-9]){3}-([0-9]){3}-([0-9]){4}/" },
    { title: 'Letters "kMRJkgosocialdIEMY"', example: "/([a-zA-Z]){4}([a-z]){10}([A-Z]){4}/" },
    { title: "Numbers&Letters AJppm8031N", example: "/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$" },
    { title: 'Date "2046/11/07"', example: "/(19|20)\\d\\d([/])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])/" },
    { title: 'Email "ve5@swirxng1.xx"', example: "/[a-z0-9._+-]{1,20}@[a-z0-9]{3,15}\\.[a-z]{2,4}/" },
    { title: 'IP Address "192.168.1.254"', example: "/[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}/" },

    // {title:"", example:""},
]


const PatternGen = ({editor}) => {
    const [patterinput, setPatternInput] = useState("")
    const [patterOutput, setPatternOutput] = useState("")
    const geneartePattern = ()=>{
        let temp_pattern = new RandExp(patterinput).gen()
        // remove weird "/ /" at begiinerin and end of string
        temp_pattern = temp_pattern.slice(1).slice(null,-1)
        setPatternOutput(temp_pattern)
    }
    
    return (
        <div>

            <label htmlFor="pattern-input">Pattern</label>
            <textarea
                 id="pattern-input"
                value={patterinput}
                cols="30" rows="5"
                onChange={()=>{}}
                placeholder="/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/"></textarea>
            <label htmlFor="pattern-output">Pattern Output</label>
            <textarea
                id="pattern-output"
                value={patterOutput}
                cols="5" rows="2"
                placeholder="FSXDx8017T"
                onChange={()=>{}}
                ></textarea>
            <ul>
                {patternExamples.map((example,i) => {
                    return <li key={i}><button key={i} onClick={() => { setPatternInput(example.example) }}>{example.title}</button></li>
                })
                }
            </ul>
            <ul>
                <li><button onClick={geneartePattern}>Generate</button></li>
                <li><button onClick={()=>{}}>Paste To Section</button></li>
            </ul>
        </div>
    )
}

export default PatternGen