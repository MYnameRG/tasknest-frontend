import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState, type FC, type FormEvent } from "react";

const Dailog: FC<any> = ({ title, subTitle }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent sx={{ paddingBottom: 0 }}>
                        <DialogContentText>
                            {subTitle}
                        </DialogContentText>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Subscribe</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default Dailog;