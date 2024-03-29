import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useSelector} from "react-redux";
import {AppStoreType} from "./store";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {thunkAuth} from "../auth/auth-reducer";
import {useDispatchApp, useSelectorApp} from "../../customHooks/CustomHooks";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import {Path} from "../Routes";
import {Settings} from "../Settings";


const pages = ['packsList'];

export const ResponsiveAppBar = () => {

    const isAuthorized = useSelector((state: AppStoreType) => state.auth.authData.isAuthorized)
    const avatar = useSelectorApp(state => state.auth.authData.avatar)
    const dispatch = useDispatchApp()
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElsetName, setAnchorElsetName] = React.useState<null | HTMLElement>(null);

    const handleOpenSetNameMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElsetName(event.currentTarget)
    }

    const handleCloseSetMenu = () => {
        setAnchorElsetName(null)
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutButton = () => {
        dispatch(thunkAuth.logout())
    }
    const isSetNameMenuOpen = Boolean(anchorElsetName)
    const setNameMenuId = 'setNameMenuId'

    const renderSetName = (
        <Menu open={isSetNameMenuOpen}
              anchorEl={anchorElsetName}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
              }}
              id={setNameMenuId}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              onClose={handleCloseSetMenu}
        >
            <MenuItem>
                <Settings/>
            </MenuItem>

        </Menu>
    )

    return (
        <AppBar position="static">
            <Container maxWidth="xl">

                <Toolbar disableGutters>
                    <AllInclusiveIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Cards
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography onClick={() => {
                                        navigate(Path.packsList)
                                    }} textAlign="center"
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            > <Link style={{textDecoration: 'none', color: 'white'}} to={`/${page}`}>
                                {page}
                            </Link>
                            </Button>
                        ))}
                    </Box>

                    {isAuthorized
                        ? <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src={!!avatar ? avatar : "/static/images/avatar/2.jpg"}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link style={{textDecoration: 'none', color: 'black'}}
                                          to={Path.profile}><Typography paddingLeft={3}
                                                                        textAlign="center">Profile</Typography></Link>
                                </MenuItem>
                                <MenuItem>
                                    <IconButton
                                        size="large"
                                        aria-controls={setNameMenuId}
                                        aria-haspopup="true"
                                        onClick={handleOpenSetNameMenu}
                                        color="inherit"
                                    >
                                        <Typography textAlign="center">
                                            Set profile
                                        </Typography>
                                    </IconButton>
                                </MenuItem>

                            </Menu>
                            <Button
                                sx={{my: 2, color: 'white'}}
                                onClick={handleLogoutButton}
                            >Log out</Button>
                        </Box>
                        : <Typography textAlign="center"><Link style={{textDecoration: 'none', color: 'white'}}
                                                               to="/login">Sign in</Link>
                            <Link style={{textDecoration: 'none', color: 'white', paddingLeft: '15px'}}
                                  to="/registration">Sign Up</Link>
                        </Typography>
                    }
                </Toolbar>
                {renderSetName}
            </Container>

        </AppBar>
    );
};

