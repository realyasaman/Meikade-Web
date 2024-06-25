import { LibraryBooks } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { title } from 'process';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type poem = {
    title: string,
    subtitle: string,
    id: number|null,
};

export const Book = () => {
    const navigate = useNavigate();
    const params = useParams();
    const bookId: number = parseInt(params.book_id!);

    const [poemlist, setpoemlist] = React.useState<Array<poem>>([]);

    const [subtitleLine, setSubtitleLine] = React.useState<string>('');

    const fetchCatFact = () => {
      try {
        const params = {
          params: {
            book_id: bookId,
            parent_id: 0,
          },
        };
        axios.get("https://api.meikade.com/api/main/categories/simple", params).then((res) => {
            const list = new Array<poem>();
            for (var i=0; i<res.data.result.length; i++) {
                const p = res.data.result[i];
                const link: string = p.link; // "page:/poet?id=7&catId=119"
                const idx = link.indexOf('catId=');
                var newId: number|null;
                if (idx >= 0) {
                    newId = parseInt(link.slice(idx+6));
                } else {
                    newId = null;
                }

                const item: poem = {
                    title: p.title,
                    subtitle: p.subtitle,
                    id: newId,
                };
                list.push(item);
            }
            
            setpoemlist(list);
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
                    poemlist.map((p: poem) => (
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
                                setSubtitleLine(p.subtitle);
                            }}
                            onClick={() => {
                                if (p.id != null)
                                navigate('/book/' + bookId.toString() + '/poem/' + p.id.toString());
                            }}
                        >
                            <LibraryBooks sx={{ fontSize: '16px' }} />
                            <Typography sx={{ fontFamily: 'Vazirmatn FD NL', width: '100%', fontSize: '14px' }}>{p.title}</Typography>
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
                {subtitleLine}
            </Box>
        </Box>
    </Box>;
};
