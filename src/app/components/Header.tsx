import { useState, type MouseEvent } from 'react';
import { Adb as AdbIcon } from "@mui/icons-material";
import {
    AppBar, Box,
    Container, Menu,
    MenuItem, Tooltip,
    Button, Avatar,
    Typography, IconButton,
    Toolbar
} from '@mui/material';
import { NavLink } from 'react-router';

const pages = [
    {
        id: 'dashboard',
        value: 'Dashboard'
    }, {
        id: 'manage-task',
        value: 'Manage Task'
    }, {
        id: 'pricing',
        value: 'Pricing'
    }, {
        id: 'blog',
        value: 'Blog'
    }
];

const settings = ['Profile', 'Account', 'Subscription', 'Logout'];

const Header = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl" style={{ width: "100%", maxWidth: 'none' }}>
                    <Toolbar disableGutters>
                        {/* Desktop */}
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TASKNEST
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                pages.map((page) => (
                                    <NavLink
                                        key={page?.id}
                                        style={{ textDecoration: "none" }}
                                        to={`/en/main/${page?.id}`}
                                        className={({ isActive }) =>
                                            isActive ? "active-link" : ""
                                        }
                                    >
                                        <Button
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        > {page?.value} </Button>
                                    </NavLink>
                                ))
                            }
                        </Box>

                        {/* Settings */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{ mt: '45px' }}
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
                                {
                                    settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Header;