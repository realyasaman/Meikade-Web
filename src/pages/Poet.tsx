import { ArrowForwardIos, LibraryBooks } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { title } from 'process';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

type book = { // Change it to book and change all parameters
    title: string,
    subtitle: string,
    id: number|null,
};

export const Poet = () => {
    const navigate = useNavigate();
    const params = useParams();
    const poetId: number = parseInt(params.poet_id!);

    const [booklist, setbooklist] = React.useState<Array<book>>([]);

    const [subtitleLine, setsubtitleLine] = React.useState<string>('');

    const fetchCatFact = () => {
      try {
        const params = {
          params: {
            poet_id: poetId,
            parent_id: 0,
          },
        };
        axios.get("https://api.meikade.com/api/main/categories/simple", params).then((res) => {
            const list = new Array<book>();
            for (var i=0; i<res.data.result.length; i++) {
                const b = res.data.result[i];
                const link: string = b.link; // "page:/poet?id=7&catId=119"
                const idx = link.indexOf('catId=');
                var newId: number|null;
                if (idx >= 0) {
                    newId = parseInt(link.slice(idx+6));
                } else {
                    newId = null;
                }

                const item: book = {
                    title: b.title,
                    subtitle: b.subtitle,
                    id: newId,
                };
                list.push(item);
            }
            
            setbooklist(list);
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
                    booklist.map((bk: book) => (
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
                                setsubtitleLine(bk.subtitle);
                            }}
                            onClick={() => {
                                if (bk.id != null) {
                                    const poemsCount: number = parseInt(bk.subtitle.slice(0, bk.subtitle.length-6));
                                    if (poemsCount == 0)
                                        navigate('/poet/' + poetId.toString() + '/book/' + bk.id.toString());
                                    else
                                        navigate('/poet/' + poetId.toString() + '/book/' + bk.id.toString() + '/poems');
                                }
                            }}
                        >
                            <LibraryBooks sx={{ fontSize: '16px' }} />
                            <Typography sx={{ fontFamily: 'Vazirmatn FD NL', width: '100%', fontSize: '14px' }}>{bk.title}</Typography>
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
