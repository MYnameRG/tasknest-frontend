import { Grid } from "@mui/material";
import type { FC } from "react";

export const ModalBox: FC<any> = ({ children }) => {
    return (
        <>
            <Grid container columns={12}>
                {children}
            </Grid>
        </>
    );
};

export const ModalHeader: FC<any> = ({ title, closeIcon }) => {
    return (
        <>
            <Grid container rowSpacing={1} spacing={2} columns={12}>
                {/* Title Name */}
                <Grid className="title" size={6}>
                    {title}
                </Grid>

                {/* Close */}
                <Grid className="close-icon" size={6}>
                    {closeIcon}
                </Grid>
            </Grid>
        </>
    );
};

export const ModalBody: FC<any> = ({ data }) => {
    return (
        <>
            <Grid container spacing={2} columns={12}>
                {/* Body */}
                <Grid className="body" size={12}>
                    {data}
                </Grid>
            </Grid>
        </>
    );
};

export const ModalFooter: FC<any> = ({ leftData, rightData }) => {
    return (
        <>
            <Grid container rowSpacing={1} spacing={2} columns={12}>
                {/* LeftBody */}
                <Grid className="leftData" size={6}>
                    {leftData}
                </Grid>

                {/* RightBody */}
                <Grid className="rightData" size={6}>
                    {rightData}
                </Grid>
            </Grid>
        </>
    );
};