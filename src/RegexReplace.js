import React, { useState, useEffect } from "react";
import RandExp from "randexp"
import h from "./helper"


import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';




// https://mui.com/components/material-icons/
import MoneyIcon from '@mui/icons-material/Money';
import PhoneIcon from '@mui/icons-material/Phone';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
const regex_examples =
{    
        clear:          { regex: "",   replace: "" },
        newline:        { regex: "/\\n/g",replace: ""},
        multi_newline:  { regex: "/([\\n|\\s]{2,100})/g", replace: ""},
        newline_return: { regex: "/\\r\\n/g", replace: "" },
        tabs:           { regex: "/\\t/g",  replace: '","' },
        ending:         { regex: "/\\n/g",  replace: '\n"' },
        number_begin:   { regex: "/\\n[^0-9]/g", replace: ""},
        letter_begin:   { regex: "/\\n[^a-zA-Z]/g", replace: ""},
        date:           { regex: "/[0-9]{1,4}[/-][0-9]{1,2}[/-][0-9]{1,4}/g", replace: ""}
}

    
const RegexReplace = ({ editor }) => {

    const [regexpattern, setSetRegexPattern] = useState("")
    const [replacement, setReplacement] = useState("")
    const [alignment, setAlignment] = React.useState('web');

    const string_to_regexp = () => {
        // remove weird "/ /g" at begiinerin and end of string
        let regex_from_string = h.string_to_regexp(regexpattern)

        let temp_pattern = new RandExp(regexpattern).gen()
        setPatternOutput(temp_pattern)
    }

    const handleChange = (event, name_selected_btn) => {
        let regex_example = regex_examples[name_selected_btn]

        setSetRegexPattern(regex_example.regex)
        setReplacement(regex_example.replace)
        setAlignment(name_selected_btn);
    };

    const textReplace =()=>{
        let editor_text  = editor.getValue()
         
        let search_regex = h.string_to_regexp(regexpattern) 
        editor_text = editor_text.replaceAll(search_regex, replacement) 
        h.updateEditor(editor,editor_text)
    }
    return (
        <>
            <Stack spacing={2} direction="column">

                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={textReplace}>Replace</Button>
                </Stack>

                <Stack spacing={2} direction="row">
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="clear" aria-label="left aligned">Clear</ToggleButton>
                    <ToggleButton value="newline"> <KeyboardReturnIcon /></ToggleButton>
                    <ToggleButton value="multi_newline" ><KeyboardReturnIcon /><KeyboardReturnIcon /> </ToggleButton>
                    <ToggleButton value="newline_return"><KeyboardReturnIcon />+\r </ToggleButton>
                    <ToggleButton value="tabs"><KeyboardTabIcon /></ToggleButton>
                    <ToggleButton value="ending"><AlignHorizontalRightIcon />{"->"}<ListAltIcon /></ToggleButton>
                    <ToggleButton value="number_begin"><DoNotDisturbIcon /> <MoneyIcon/></ToggleButton>
                    <ToggleButton value="letter_begin"><DoNotDisturbIcon /> <FontDownloadIcon/></ToggleButton>
                    <ToggleButton value="date"><DateRangeIcon /></ToggleButton>

                </ToggleButtonGroup>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <TextField
                        id="outlined-multiline-static"
                        variant="standard"
                        placeholder="Find"
                        multiline
                        value={regexpattern}
                        rows={4}
                        onInput={(e) => setSetRegexPattern(e.target.value)}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Replace"
                        variant="standard"
                        multiline
                        rows={4}
                        value={replacement}
                        onInput={(e) => setReplacement(e.target.value)}
                    />

                </Stack>
            </Stack>


            {/* <label htmlFor="regex-delimiter-search">Find</label>
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
        </div> */}
        </>
    )
}

export default RegexReplace