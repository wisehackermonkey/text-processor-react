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

import Parser from "../src/lib/parser"
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
    { name: "↩️", label: 'NEWLINE' },
]

const MAPPING =
{
    LETTERS: "A-Z",
    NUMBERS: "1234",
    WHITESPACE: "WHITESPACE",
    SYMBOLS: "(){},?#...",
    NEWLINE: "↩️"
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

const PatternSelector = ({ editor }) => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [regexpattern, setSetRegexPattern] = useState("")
    const [patternExtract, SetPatternExtract] = useState("")
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

        let tokens = {
            WHITESPACE: `([\\t ]+)`,
            NUMBERS: `([0-9]+)`,
            LETTERS: `([a-zA-Z]+)`,
            SYMBOLS: `([^ \\t\\r\\-a-zA-Z0-9]+)`,
            NEWLINE: `([\n]+)`
        }
        let parsed = chipData.map(x => x.label)
        let string_regex = parsed.reduce((accumulator, value, index, array) => {
            return accumulator + tokens[value]
        }, "")
        setSetRegexPattern(`/${string_regex}/g`)

    }, [chipData])

    useEffect(() => {
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



    return (
        <Stack spacing={3}>

            <h1>Easy Build Regex Pattern</h1>
            <TextField
                id="outlined-multiline-static"
                variant="standard"
                placeholder="letters12345#@$$%"
                multiline
                value={patternExtract}
                onInput={(e) => SetPatternExtract(e.target.value)}

                rows={4}
            />
            <Button variant="contained" onClick={() => {
                let selectedText = h.getSelectedText(editor)
                print(selectedText)
                SetPatternExtract(selectedText)
            }
            }>Paste Editor Selection</Button>
            <TextField
                id="outlined-multiline-static"
                variant="standard"
                placeholder="Example"
                multiline
                value={regexpattern}
                rows={4}
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



export default PatternSelector