import React from "react"
import { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import patternParse from "./lib/patternParse";
import { Button } from "@mui/material";
import { Label } from "@mui/icons-material";

import Parser from "./lib/parser"
import h from "./helper"


// pipe(input object, <function or >,[<fn>, <option data>])
// this returns result of all functions running in a pipe
const pipe = (firstValue, ...fns) => [...fns].reduce((v, fn) => { if (Array.isArray(fn)) { if (fn.length >= 2) { return fn[0](v, fn[1]) } } return fn(v) }, firstValue)
const print = (x) => { console.log(x); return x }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


let key_start = 5
const names = [
    { name: "A-Z", label: 'LETTERS' },
    { name: "1234", label: 'NUMBERS' },
    { name: "WHITESPACE", label: 'WHITESPACE' },
    { name: "(){},?#...", label: 'SYMBOLS' },
]

const MAPPING =
{
    LETTERS: "A",
    NUMBERS: "1",
    WHITESPACE: " ",
    SYMBOLS: "§"
}



function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const PatternSelectorSlim = ({ editor }) => {
     const [personName, setPersonName] = React.useState([]);
    const [regexpattern, setSetRegexPattern] = useState("")
    const [patternExtract, SetPatternExtract] = useState("")
    const [editorText, SetEditorText] = useState("")
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        key_start += 1
        setChipData(chipData.concat({ key: key_start, label: value }))
    };
    const Control = { key: 0, label: 'CONTROL' }
    const Symbol = { key: 1, label: 'SYMBOLS' }
    const Letter = { key: 2, label: 'LETTERS' }
    const Number = { key: 3, label: 'NUMBERS' }

    const [chipData, setChipData] = React.useState([
        // Control,
        // Symbol,
        // Letter,
        // Number
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    useEffect(() => {
        console.log(5)

        let tokens = {
            WHITESPACE: `([\\t\\n\\r\\s]+)`,
            NUMBERS: `([0-9]+)`,
            LETTERS: `([a-zA-Z]+)`,
            SYMBOLS: `([^\\s\\t\\r\\-a-zA-Z0-9]+)`
        }
        let parsed = chipData.map(x => x.label)
        let string_regex = parsed.reduce((accumulator, value, index, array) => {
            return accumulator + tokens[value]
        }, "")
        setSetRegexPattern(`^${string_regex}$`)

    }, [chipData])

    useEffect(() => {
        console.log(4)

        let editor_text = patternExtract//editor.getValue()
        console.log(editor_text)
        pipe(Parser.extract(editor_text), print, (x) => {

            let res = []
            res = x.map((d) => {
                return { key: key_start + Math.random(), label: d.token }
            });

            setChipData(res);
        });
    }, [patternExtract])
    // useEffect(() => {
    //     console.log(2)

    //     try {
    //         // let contents =   editor.getModel().getValueInRange(editor.getModel().getFullModelRange())
    //         let contents = editor.getModel().getValue();
    //         let regex = new RegExp(regexpattern, "g")
    //         console.log(regex)
    //         console.log(regexpattern)
    //         console.log("here")
    //         let results = contents.split("\n").map((line) => {
    //             console.log(line)
    //             console.log(line.match(regex)?.length > 0)
    //             // if(line.matchAll(regex) > 0){
    //             //     //account for multiple matches in a line
    //             //     console.log(line)
    //             // // continue
    //             // // return null
    //             // // }
    //             // // return line
    //             // }else{
    //             //     console.log(`>${line}`)
    //             // }

    //         })
    //         console.log(results)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [setSetRegexPattern,SetPatternExtract,editor])

    return (
        <Stack spacing={3}>

            <TextField
                id="outlined-multiline-static"
                variant="standard"
                placeholder="letters12345#@$$%"
                multiline
                value={patternExtract}
                onInput={(e) => SetPatternExtract(e.target.value)}

                rows={1}
            />
            <Stack direction="row" spacing={3}>

                <Button variant="contained" onClick={() => {
                    let selected_text = h.getSelectedText(editor)
                    console.log(selected_text)
                    SetPatternExtract(selected_text)
                    console.log(1)
                }
                }>Get Current Selection</Button>
                <Button variant="contained" onClick={() => {
                          // let contents =   editor.getModel().getValueInRange(editor.getModel().getFullModelRange())
            let contents = editor.getModel().getValue();
            let regex = new RegExp(regexpattern, "gm")
            console.log(regex)
            console.log(regexpattern)
            console.log("here")
            let results = contents.split("\r\n").map((line) => {
                // console.log(line.match(regex)?.length > 0,line)
                
                if(line.match(regex)?.length > 0){
                    //account for multiple matches in a line
                    console.log(line)
                // continue
                // return null
                // }
                // return line
                return -1
                }else{
                    console.log(`>${line}`)
                    return line
                }

            })
            console.log(results)
                }
                }>filter</Button>
                <Button variant="contained" onClick={() => {
                    navigator.clipboard.writeText(regexpattern);

                    /* Alert the copied text */
                    // alert("Copied the text: " + regexpattern);
                }}>Copy to Clipboard</Button>

            </Stack>
            <TextField
                id="outlined-multiline-static"
                variant="standard"
                placeholder="Example"
                multiline
                value={regexpattern}
                rows={1}
            />

            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 1,
                    m: 0,
                }}
                component="ul"
            >
                {chipData.map((data) => {
                    let icon;

                    if (data.label === 'React') {
                        icon = <TagFacesIcon />;
                    }

                    return (
                        <ListItem key={data.key}>
                            <Chip
                                icon={icon}
                                label={MAPPING[data.label]}
                                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            />
                        </ListItem>
                    );
                })}
            </Paper>

            <Stack direction="row" sx={{
                justifyContent: 'center',
            }} spacing={3}>
                {names.map((value, key) => {
                    return <Button variant="contained" key={key} onClick={() => {
                        key_start += 1;
                        console.log(value)
                        setChipData(chipData.concat({ key: key_start, label: value.label }))

                    }} >{value.name}</Button>
                })}
            </Stack>
            <Button variant="contained" onClick={() => {
                setChipData([])
            }} >Clear</Button>

        </Stack>
    );
}



export default PatternSelectorSlim