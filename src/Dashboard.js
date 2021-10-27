import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';
import { useEffect, useState, useReducer } from "react";
import MonacoEditor from "react-monaco-editor";
import PatternGen from './PatternGen';
import RegexReplace from "./RegexReplace"
import Main from "./Main"
import Title from './Title';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Oran C
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const mdTheme = createTheme();


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

let onChange = (newValue, e) => {
  console.log('onChange', newValue, e);
}

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  let [theme,setTheme] = useState(false)
  let [editor,setEditor] = useState(null)

  let monacoEditorLoaded = (__editor__, monaco)=>{
    console.log("__Editor__ loaded")
    __editor__.focus();
    setEditor(__editor__)
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Text Processor v1 (Alpha) by [Oran C 2021]
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12} lg={12}>
                <Paper sx={{
                  p: 2,
                  height: 500,
                  display: 'flex', flexDirection: 'column'
                }}>
                  <React.Fragment>
                    <Title>Editor</Title>
                    <MonacoEditor
                      height="400"
                      width="1000"
                      language="javascript"
                      value={example_text}
                      options={options}
                      onChange={onChange}
                      editorDidMount={monacoEditorLoaded}
                      theme={theme ?"vs-light":"vs-dark"}
                    />
                  </React.Fragment>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 800,
                  }}
                >
                   <div>
                    <RegexReplace editor={editor}/>
                    <hr />  
                    <PatternGen  editor={editor}/>
                    </div>
                </Paper>
              </Grid>

            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
