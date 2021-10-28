import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import RandExp from "randexp"
import h from "./helper"
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

const patternExamples = {
    clear: "",
    int: "/([0-9]{1,7})/g",
    float: "/[-+]?[0-9]{0,16}(\\.[0-9]{1,6})?/g",
    phonenumber: "/([0-9]){3}-([0-9]){3}-([0-9]){4}/g",
    letters: "/([a-zA-Z]){4}([a-z]){10}([A-Z]){4}/g",
    letters_numbers: "/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/g",
    date: "/(19|20)\\d\\d([/])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])/g",
    email: "/[a-z0-9._+-]{1,20}@[a-z0-9]{3,15}\\.[a-z]{2,4}/g",
    ipaddress: "/[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}/g",
}


const PatternGen = ({ editor }) => {
    const [patterinput, setPatternInput] = useState("")
    const [patterOutput, setPatternOutput] = useState("")
    const geneartePattern = () => {
        let regex_from_string = h.string_to_regexp(patterinput)
        let temp_pattern = new RandExp(regex_from_string).gen()
        setPatternOutput(temp_pattern)
        return temp_pattern
    }
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        if (newAlignment) {
            let pattern_temp = patternExamples[newAlignment]
            setPatternInput("")
            setPatternOutput("")
            setPatternInput(pattern_temp)

            console.log(newAlignment)
            setAlignment(newAlignment);
        }
    };
    return (
        <div>

            <Stack spacing={2} direction="column">

                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={geneartePattern}>Generate</Button>
                    <Button variant="contained" onClick={(e) => {
                        h.pasteRegexPattern(editor, geneartePattern())
                    }}>Paste To Editor Selection</Button>
                </Stack>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="clear" aria-label="left aligned">Clear</ToggleButton>
                    <ToggleButton value="int"> <MoneyIcon /></ToggleButton>
                    <ToggleButton value="float" ><MoneyIcon />.00 </ToggleButton>
                    <ToggleButton value="phonenumber"><PhoneIcon /> </ToggleButton>
                    <ToggleButton value="letters"><FontDownloadIcon /></ToggleButton>
                    <ToggleButton value="letters_numbers"><MoneyIcon />&<FontDownloadIcon /></ToggleButton>
                    <ToggleButton value="date"><DateRangeIcon /></ToggleButton>
                    <ToggleButton value="email"><AlternateEmailOutlinedIcon /></ToggleButton>
                    <ToggleButton value="ipaddress"><DnsOutlinedIcon /></ToggleButton>

                </ToggleButtonGroup>
                <Stack direction="row" spacing={2}>
                    <TextField
                        id="outlined-multiline-static"
                        // label="Pattern"
                        variant="standard"
                        placeholder="EX: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/"
                        multiline
                        value={patterinput}
                        minRows={4}
                        onInput={(e) => setPatternInput(e.target.value)}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        // label="Pattern Output"
                        placeholder="EX: FSXDx8017T"
                        variant="standard"
                        multiline
                        minRows={4}
                        value={patterOutput}
                        onInput={(e) => setPatternOutput(e.target.value)}
                    />

                </Stack>
            </Stack>

            {/* <label htmlFor="pattern-input">Pattern</label>
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
                <button onClick={()=>{
                    
                    h.pasteRegexPattern(editor,geneartePattern())
                }}>Paste To Section</button>
            </div> */}
        </div>
    )
}

export default PatternGen