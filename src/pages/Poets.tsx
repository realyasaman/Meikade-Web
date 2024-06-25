import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ArrowForwardIos, Person } from '@mui/icons-material';
import { AppBar, Box, IconButton, Slider, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { PoetListItem } from './PoetListItem';

type poet = {
    id: number,
    name: string,
    description: string,
};

export const Poets = () => {
    const navigate = useNavigate();

    const [poetsList, setPoetsList] = React.useState<Array<poet>>([]);

    const [descriptionLine, setDescriptionLine] = React.useState<string>('');

    const fetchCatFact = () => {
      try {
        axios.get("https://api.meikade.com/api/main/poets/simple").then((res) => {
            const list = new Array<poet>();
            for (var i=0; i<res.data.result.length; i++) {
                const p = res.data.result[i];
                const item: poet = {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                };
                list.push(item);
            }
            setPoetsList(list);
        });
      } catch(e) {
        console.debug(e)
      }
    }

    React.useEffect(() => {
        fetchCatFact();
    }, [])
    
    return <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            {
                poetsList.map((p: poet) => (
                    <PoetListItem
                        id={p.id}
                        title={p.name}
                        description={p.description}
                    />
                ))
            }
        </Box>
    </Box>;
};
