import { Box, Button, Container, Link, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useAuthService } from "../hooks/useAuthService";
import { useNavigate, useOutletContext } from "react-router";
import type { NotificationModel } from "../interfaces/Notification.model";

type Context = {
    setNotification: Dispatch<SetStateAction<NotificationModel>>
};

const Authentication = () => {
    const navigate = useNavigate();
    const { setNotification } = useOutletContext<Context>();
    const { isLoading, isError, registerUser, loginUser } = useAuthService();
    const [isLoggedIn, setLoggedIn] = useState<boolean | null>(false);

    const handleIsLoggedIn = (event: any) => {
        event.preventDefault();
        setLoggedIn(!isLoggedIn);
    }

    const handleOnSumit = async (event: any) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            if (isLoggedIn) {
                await loginUser({
                    email: formData.get('email') as string,
                    password: formData.get('password') as string
                });

                setNotification({ type: 'success', message: 'LoggedIn Sucessfully !!', isOpen: true });
            } else {
                await registerUser({
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    password: formData.get('password') as string
                });

                setNotification({ type: 'success', message: 'Registered Sucessfully !!', isOpen: true });
            }

            if (!isError) {
                navigate("/en/main/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Container>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleOnSumit}
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
                                    name="name"
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
                                name="email"
                                label="Email"
                                variant="standard"
                                fullWidth
                            />
                        </div>

                        <div className="password-field">
                            <TextField
                                id="password"
                                name="password"
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
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    size="medium"
                                    loading={isLoading}
                                    loadingPosition="start">
                                    Register
                                </Button>) ||
                            (<Button
                                type="submit"
                                variant="outlined"
                                size="medium"
                                loading={isLoading}
                                loadingPosition="start">
                                SignIn
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