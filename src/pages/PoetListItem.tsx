import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ArrowForwardIos, Person } from '@mui/icons-material';
import { AppBar, Box, IconButton, Slider, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

type PoetListItemProps = {
    id: number,
    title: string,
    description: string,
};

export const PoetListItem = (props: PoetListItemProps) => {
    const navigate = useNavigate();
    
    return <Button 
        disableElevation
        style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: '#333',
            textAlign: 'start',
            gap: '10px',
            padding: '10px 20px',
        }}
        onClick={() => {
            navigate('/poet/' + props.id.toString());
        }}
    >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    textAlign: 'start',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <img src={'http://meikade.com/offlines/thumbs/' + props.id.toString() + '.png'} width='32px' style={{borderRadius: '20px'}}/>
                <Typography sx={{ fontFamily: 'Vazirmatn FD NL', width: '100%', fontSize: '16px' }}>{props.title}</Typography>
            </Box>
            <Typography 
                sx={{ 
                    fontFamily: 'Vazirmatn FD NL', 
                    width: '100%', 
                    fontSize: '14px', 
                    opacity: 0.6,
                    textAlign: 'justify'
                }}
            >
                {props.description.slice(0,300) + '...'}
            </Typography>
    </Button>;
};
