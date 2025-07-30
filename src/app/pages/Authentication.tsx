import { Box, Button, Container, Link, TextField } from "@mui/material";
import { Link as RouteLink } from "react-router";
import { useState } from "react";

const Authentication = () => {
    const [isLoggedIn, setLoggedIn] = useState<boolean | null>(false);

    const handleIsLoggedIn = (event: any) => {
        event.preventDefault();
        setLoggedIn(!isLoggedIn);
    }

    return (
        <>
            <Container>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        width: 800,
                        height: '70vh',
                        borderRadius: 1,
                        bgcolor: 'mintcream',
                        padding: 10,
                        '& .MuiTextField-root': {
                            marginY: 5
                        },
                        '& button': { marginX: 1 }
                    }}>

                    <h3 style={{ color: 'black' }}>{isLoggedIn ? 'Login Page' : "Signup Page"}</h3>

                    <div className="form-fields">
                        {
                            !isLoggedIn && <div className="name-field">
                                <TextField
                                    required
                                    id="name"
                                    label="Name"
                                    variant="standard"
                                    fullWidth
                                />
                            </div>
                        }

                        <div className="email-field">
                            <TextField
                                required
                                id="email"
                                label="Email"
                                variant="standard"
                                fullWidth
                            />
                        </div>

                        <div className="password-field">
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="standard"
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className="form-buttons">
                        {
                            (!isLoggedIn &&
                                <Button variant="outlined" size="medium">
                                    <RouteLink style={{ backgroundColor: 'transparent', textDecoration: 'none' }} to="/en/main/dashboard">Register</RouteLink>
                                </Button>)
                            ||
                            (<Button variant="outlined" size="medium">
                                <RouteLink style={{ backgroundColor: 'transparent', textDecoration: 'none' }} to="/en/main/dashboard">SignIn</RouteLink>
                            </Button>)
                        }
                    </div>

                    <br />

                    <div className="form-link">
                        <Link
                            component="button"
                            variant="body1"
                            onClick={(event) => handleIsLoggedIn(event)}>
                            {!isLoggedIn ? 'Account already exist ?' : 'Create an account ?'}
                        </Link>
                    </div>
                </Box>
            </Container>
        </>
    );
};

export default Authentication;