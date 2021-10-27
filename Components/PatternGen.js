import React, { useState } from "react";
import RandExp from "randexp"
import h from "./helper"

const patternExamples = [
    { title: "None", example: "" },
    { title: "Numbers Int 6820278", example: "/([0-9]{1,7})/g" },
    { title: "Numbers Float 2244235192957.124291", example: "/[-+]?[0-9]{0,16}(\\.[0-9]{1,6})?/g" },
    { title: 'Phone Number "230-896-1111"', example: "/([0-9]){3}-([0-9]){3}-([0-9]){4}/g" },
    { title: 'Letters "kMRJkgosocialdIEMY"', example: "/([a-zA-Z]){4}([a-z]){10}([A-Z]){4}/g" },
    { title: "Numbers&Letters AJppm8031N", example: "/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$" },
    { title: 'Date "2046/11/07"', example: "/(19|20)\\d\\d([/])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])/g" },
    { title: 'Email "ve5@swirxng1.xx"', example: "/[a-z0-9._+-]{1,20}@[a-z0-9]{3,15}\\.[a-z]{2,4}/g" },
    { title: 'IP Address "192.168.1.254"', example: "/[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}/g" },

    // {title:"", example:""},
]


const PatternGen = ({editor}) => {
    const [patterinput, setPatternInput] = useState("")
    const [patterOutput, setPatternOutput] = useState("")
    const geneartePattern = ()=>{
        let regex_from_string = h.string_to_regexp(patterinput)
        let temp_pattern = new RandExp(regex_from_string).gen()
        setPatternOutput(temp_pattern)
    }
    
    return (
        <div>

            <label htmlFor="pattern-input">Pattern</label>
            <textarea
                id="pattern-input"
                cols="30" rows="5"

                defaultValue={patterinput}
                onInput={(e)=> setPatternInput(e.target.value)}
                placeholder="/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/"></textarea>
            <label htmlFor="pattern-output">Pattern Output</label>
            <textarea
                id="pattern-output"
                cols="30" rows="5"
                placeholder="FSXDx8017T"
                
                defaultValue={patterOutput}
                onInput={(e)=> setPatternOutput(e.target.value)}
                 ></textarea>
            <ul>
                {patternExamples.map((example,i) => {
                    return <li key={i}><button key={i} onClick={() => { setPatternInput(example.example) ; geneartePattern() }}>{example.title}</button></li>
                })
                }
            </ul>
            <hr />
            <div>
                <button onClick={geneartePattern}>Generate</button>
                <hr />
                <button onClick={()=>{}}>Paste To Section</button>
            </div>
        </div>
    )
}

export default PatternGen