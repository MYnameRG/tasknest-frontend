import type { AlertColor, AlertPropsColorOverrides } from "@mui/material";

export interface NotificationModel {
    type: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
    message?: string;
    isOpen?: boolean;
}