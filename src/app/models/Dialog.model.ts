import type { ReactNode } from "react";

export interface DialogModel {
    title?: string;
    subTitle?: string;
    submitBtnText?: string;
    closeBtnText?: string;
    isOpen: boolean;
    modalBody?: ReactNode;
    submitIconComponent?: ReactNode;
    cancelIconComponent?: ReactNode;
    handleSubmit: (data: FormData) => void;
}