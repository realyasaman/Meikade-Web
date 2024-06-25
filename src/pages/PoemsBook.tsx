import { ArrowForwardIos, LibraryBooks } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { title } from 'process';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type single_poem = {
    poem_id: number,
    poet_id: number,
    cat_id: number,
    title: string,
    phrase_text: string,
};

export const PoemsBook = () => {
    const navigate = useNavigate();
    const params = useParams();
    const poetId: number = parseInt(params.poet_id!);
    const poemsBookId: number = parseInt(params.poems_book_id!);

    const [single_poemlist, setSingle_poemlist] = React.useState<Array<single_poem>>([]);

    const [phrase, setPhrase] = React.useState<string>('');

    const fetchCatFact = () => {
      try {
        const params = {
            params: {
              poet_id: poetId,
              category_id: poemsBookId,
            },
        };
        axios.get("https://api.meikade.com/api/main/poems", params).then((res) => {
            const list = new Array<single_poem>();
            for (var i=0; i<res.data.result.length; i++) {
                const unit = res.data.result[i];
                const item: single_poem = {
                    poem_id: unit.id,
                    poet_id: unit.poet_id,
                    cat_id: unit.category_id,
                    title: unit.title,
                    phrase_text: unit.phrase
                };
                list.push(item);
            }
            
            setSingle_poemlist(list);
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
                    <HomeIcon />
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
                    single_poemlist.map((sp: single_poem) => (
                        <Button
                            variant="contained"
                                disableElevation
                                style={{
                                    width: '200px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'row',
                            }}
                            onMouseEnter={() => {
                                setPhrase(sp.phrase_text);
                            }}
                            onClick={() => {
                                navigate('/poem/' + sp.poem_id.toString());
                            }}
                        >
                            <LibraryBooks sx={{ fontSize: '16px' }} />
                            <Typography sx={{ fontFamily: 'Vazirmatn FD NL', width: '100%', fontSize: '14px' }}>{sp.title}</Typography>
                        </Button>
                    ))
                }
            </Box>
            <Box
                style={{
                    padding: '50px',
                    textAlign: 'justify',
                    direction: 'rtl',
                    fontSize: '18px',
                    background: '#f0f0f0',
                    right: '240px',
                    left: '20px',
                    top: '80px',
                    bottom: '20px',
                    position: 'fixed',
                    borderRadius: '20px',
                    overflow: 'scroll',
                }}
            >
                {phrase}
            </Box>
        </Box>
    </Box>;
};
