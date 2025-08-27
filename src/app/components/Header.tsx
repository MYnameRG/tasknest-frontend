import { NavLink, useNavigate, useOutletContext } from 'react-router';
import { useState, type Dispatch, type FC, type MouseEvent, type SetStateAction } from 'react';
import styles from "./css/Header.module.css";
import { Adb as AdbIcon } from "@mui/icons-material";
import {
    AppBar, Box,
    Container, Menu,
    MenuItem, Tooltip,
    Button, Avatar,
    Typography, IconButton,
    Toolbar,
    Switch
} from '@mui/material';
import type { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_USER } from '../redux/slices/user.slice';
import type { NotificationModel } from '../interfaces/Notification.model';

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

const settings = [
    {
        id: 'profile',
        value: 'Profile'
    },
    {
        id: 'account',
        value: 'Account'
    },
    {
        id: 'subscription',
        value: 'Subscription'
    },
    {
        id: 'logout',
        value: 'Logout'
    }
];

type Context = {
    setNotification: Dispatch<SetStateAction<NotificationModel>>
};

const Header: FC<any> = ({ useAIMode, setUseAIMode }) => {
    const navigate = useNavigate();
    const dispatchAction = useDispatch<AppDispatch>();

    const { setNotification } = useOutletContext<Context>();
    const { currentUser } = useSelector((state: any) => state?.user);

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            dispatchAction(LOGOUT_USER(null));
            navigate("/en/authentication");
        }
        catch (error) {
            return setNotification({ type: 'error', message: "Something went wrong", isOpen: true });
        }
    }

    const handleSwitchChange = (event: any) => {
        setUseAIMode(event?.target?.checked);
    }

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

                        <Box sx={{ flexGrow: 0, display: 'flex', width: '15%' }}>
                            {/* AI Mode */}
                            <Box sx={{ flexGrow: 1, margin: '0% 5%' }}>
                                <Switch id='ai-mode' sx={{ top: "2%" }} onChange={handleSwitchChange} checked={useAIMode} color="warning" />
                                <label htmlFor='ai-mode' className={styles.glowingText} style={{
                                    fontSize: '1rem',
                                    fontWeight: 'bolder',
                                    position: 'relative',
                                    top: '5%',
                                    background: 'linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(248, 0, 0, 1))',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    cursor: "pointer",
                                    userSelect: "none"
                                }}>
                                    Use AI Mode
                                </label>
                            </Box>

                            {/* Settings */}
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={currentUser?.name} src="/static/images/avatar/2.jpg" />
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
                                        settings.map((setting, index) => (
                                            <MenuItem key={index} onClick={handleCloseUserMenu}>
                                                {
                                                    setting?.id == 'logout' &&
                                                    <Typography sx={{ textAlign: 'center' }} onClick={() => handleLogout()}>{setting?.value}</Typography>
                                                }
                                                {
                                                    setting?.id != 'logout' &&
                                                    <Typography sx={{ textAlign: 'center' }}>{setting?.value}</Typography>
                                                }
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        </>
    );
}

export default Header;