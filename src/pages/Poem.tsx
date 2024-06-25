import axios from 'axios';
import { title } from 'process';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Poet } from './Poet';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

type category = {
    id: number,
    title: string,
};

type poem = {
    id: number,
    poem_id: number,
    category_id: number,
    title: string,
    phrase: string,
};

type poet = {
    id: number,
    username: string,
    name: string,
    description: string,
};
type verse = {
    vorder: number,
    position: number,
    text: string,
};

export const Poem = () => {
    const navigate = useNavigate();
    const params = useParams();
    const poemId: number = parseInt(params.poem_id!);

    const [categoryList, setCategoryList] = React.useState<Array<category>>([]);
    const [titleLine, setTitleLine] = React.useState<string>('');

    const [poemItem, setPoemItem] = React.useState<poem|null>(null);

    const [poetItem, setPoetItem] = React.useState<poet|null>(null);

    const [verseList, setVerseList] = React.useState<Array<verse>>([]);
    const [textLine, setTextLine] = React.useState<string>('')

    const fetchCatFact = () => {
      try {
        const params = {
            params: {
              poem_id: poemId,
            },
        };
        axios.get("https://api.meikade.com/api/main/poem", params).then((res) => {
            const list_cat = new Array<category>();
            for (var i=0; i<res.data.result.categories.length; i++) {
                const c = res.data.result.categories[i];
                const item: category = {
                    id: c.id,
                    title: c.title,
                };
                list_cat.push(item);
            }

            setCategoryList(list_cat);

            const list_v = new Array<verse>();
            for (var i=0; i<res.data.result.verses.length; i++) {
                const v = res.data.result.verses[i];
                const item: verse = {
                    vorder: v.vorder,
                    position: v.position,
                    text: v.text,
                };
                list_v.push(item);
            }

            setVerseList(list_v);

            const item_poem: poem = {
                id: res.data.result.poem.id,
                poem_id: res.data.result.poem.poem_id,
                category_id: res.data.result.poem.category_id,
                title: res.data.result.poem.title,
                phrase: res.data.result.poem.phrase,
            }

            setPoemItem(item_poem);

            const item_poet: poet = {
                id: res.data.result.poet.id,
                username: res.data.result.poet.username,
                name: res.data.result.poet.name,
                description: res.data.result.poet.description,
            }

            setPoetItem(item_poet);
        
        });
      } catch(e) {
        console.debug(e)
      }
    }

    React.useEffect(() => {
        fetchCatFact();
    }, [])
    
    return <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <AppBar sx={{position: 'fixed'}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => navigate(-1)}
                >
                    <ArrowForwardIos />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Vazirmatn FD NL' }}>
                    می‌کده
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => navigate('/')}
                >
                    <HomeIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Box
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                marginTop: '60px',
            }}
        >
        
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
                    verseList.map((v: verse) => (
                        <Box
                            style={{
                                width: '400px',
                                height: '50px',
                                background: '#f0f0f0',
                                borderRadius: '15px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                        {v.text}
                        </Box>
                    ))
                }
            </Box>
            <Box
                style={{
                    padding: '50px',
                    textAlign: 'justify',
                    direction: 'rtl',
                    fontSize: '18px',
                    position: 'static'
                }}
            >
                {textLine}
            </Box>
        </Box>
    </Box>;
};
