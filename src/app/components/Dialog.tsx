import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useActionState, type Dispatch, type FC, type SetStateAction } from "react";
import type { DialogModel } from "../models/Dialog.model";

type Props = {
    dialog: DialogModel,
    setDialog: Dispatch<SetStateAction<DialogModel>>
}

const Dailog: FC<Props> = ({ dialog, setDialog }) => {
    const handleClose = (_?: any, reason?: any) => {
        if (reason == 'escapeKeyDown') {
            return;
        }

        setDialog({ ...dialog, isOpen: false });
    };

    const [_, formAction, isPending] = useActionState(
        async (_: any, formData: FormData) => {
            dialog?.handleSubmit(formData);
        },
        undefined
    );

    return (
        <>
            <Dialog
                open={dialog?.isOpen}
                onClose={handleClose}
            >
                <DialogTitle>{dialog?.title}</DialogTitle>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    action={formAction}
                >
                    <DialogContent sx={{ paddingBottom: 0 }}>
                        <DialogContentText>
                            {dialog?.subTitle}
                        </DialogContentText>
                        {dialog?.modalBody}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="success"
                            loading={isPending}
                            loadingPosition="start"
                            startIcon={dialog?.submitIconComponent}
                            variant="contained"
                        >
                            {dialog?.submitBtnText}
                        </Button>
                        <Button
                            color="primary"
                            startIcon={dialog?.cancelIconComponent}
                            onClick={handleClose}
                            variant="contained"
                        >
                            {dialog?.closeBtnText}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default Dailog;