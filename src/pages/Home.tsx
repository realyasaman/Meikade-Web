import { ArrowForwardIos, Image, InputOutlined, KeyboardVoice, LibraryBooks, TextFields } from '@mui/icons-material';
import { AppBar, Box, Button, ButtonGroup, IconButton, InputAdornment, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { title } from 'process';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, width } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { transform } from 'typescript';
import { Poets } from './Poets';


export const Home = () => {
    const navigate = useNavigate();

    return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <AppBar sx={{position: 'fixed'}}>
            <Toolbar sx={{gap: '10px'}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <PersonIcon />
                </IconButton>
                <Button variant="contained" disableElevation
                    onClick={() => navigate('/poets')}
                >
                    Poets
                </Button>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Vazirmatn FD NL' }}>
                    می‌کده
                </Typography>
                <Button variant="contained" disableElevation>
                    About
                </Button>
            </Toolbar>
        </AppBar>
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                marginTop: '50vh',
                width: '80%',
                alignItems: 'center',
                transform: 'translate(0,-50%)'
            }}
        >
            <img src="poetry.png" width='128px' />
            <TextField
                id="outlined-basic"
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <KeyboardVoice />
                    </InputAdornment>
                    ),
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                    style: { 
                        borderRadius: 20, 
                        textAlign: 'left',
                    }
                }}
                variant="outlined"
                style={{
                    width: '100%',
                }}
            />

            <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                <Button sx={{width: '180px'}}>Poet Search</Button>
                <Button sx={{width: '180px'}}>I'm Feeling Lucky</Button>
            </Box>
        </Box>
        <Box>
            <Poets />
        </Box>
    </Box>;
};
