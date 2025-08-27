import { Box, Button, Container, Link, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate, useOutletContext } from "react-router";
import type { NotificationModel } from "../interfaces/Notification.model";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER, REGISTER_USER } from "../redux/slices/user.slice";
import type { AppDispatch } from "../redux/store";

type Context = {
    registerUser: Function;
    loginUser: Function;
    isUserError: boolean;
    isUserLoading: boolean;
    setNotification: Dispatch<SetStateAction<NotificationModel>>
};

const Authentication = () => {
    const navigate = useNavigate();
    const dispatchAction = useDispatch<AppDispatch>();

    const { setNotification } = useOutletContext<Context>();
    const { isPending } = useSelector((state: any) => state?.user);

    const [isLoggedIn, setLoggedIn] = useState<boolean | null>(false);

    const handleIsLoggedIn = (event: any) => {
        event.preventDefault();
        setLoggedIn(!isLoggedIn);
    }

    const handleOnSumit = async (event: any) => {
        event.preventDefault();
        let response = null;

        try {
            const formData = new FormData(event.currentTarget);
            if (isLoggedIn) {
                response = await dispatchAction(LOGIN_USER({
                    email: formData.get('email') as string,
                    password: formData.get('password') as string
                })).unwrap();

                navigate("/en/main/dashboard");
            } else {
                response = await dispatchAction(REGISTER_USER({
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    password: formData.get('password') as string
                })).unwrap();
            }

            return setNotification({ type: 'success', message: response?.message, isOpen: true });
        } catch (error: any) {
            return setNotification({ type: 'error', message: error?.message, isOpen: true });
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
                                    loading={isPending}
                                    loadingPosition="start">
                                    Register
                                </Button>) ||
                            (<Button
                                type="submit"
                                variant="outlined"
                                size="medium"
                                loading={isPending}
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