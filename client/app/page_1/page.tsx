'use client';

import Typography from '@mui/material/Typography'
import {useEffect} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import styles from '../styles/page.module.css'
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Button from "@mui/material/Button";
import {Stack} from "@mui/system";
import React from "react";
import secureLocalStorage from "react-secure-storage";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

export interface SnackbarMessage {
    message: string;
    key: number;
}

export default function Page_1() {
    useEffect(() => {
        document.title = 'Page 1'
    }, [])

    const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(
        undefined,
    );

    React.useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const [secureVar, setSecureVar] = React.useState('');
    const [insecureVar, setInsecureVar] = React.useState('');


    const handleStore = () => {
        let message = "Data stored in local storage!"
        secureLocalStorage.setItem('secure_var', secureVar);
        localStorage.setItem('insecure_var', insecureVar);
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    }

    const handleRetrieve = () => {
        let secure_var = secureLocalStorage.getItem("secure_var") ?? '';
        let insecure_var = localStorage.getItem("insecure_var") ?? '';
        let message = secure_var || insecure_var ? `Secure Variable: ${secure_var} - Insecure Variable: ${insecure_var}` : 'No data found in local storage!';
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    }

    const handleDelete = () => {
        let message = "Secure variable not found in local storage!";
        if (secureLocalStorage.getItem("secure_var")) {
            message = "Secure variable deleted from local storage!";
            secureLocalStorage.removeItem("secure_var");
        }
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    }

    const handleClear = () => {
        secureLocalStorage.clear();
        let message = "Cleared all data from local storage!";
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    }

    return (
        <>
            <main className={styles.container}>
                <Container>
                    <PermissionGate>
                        <>
                            <Snackbar
                                sx={{paddingTop: 10}}
                                open={open}
                                autoHideDuration={2000}
                                onClose={handleClose}
                                TransitionProps={{ onExited: handleExited }}
                                message={messageInfo ? messageInfo.message : undefined}
                                action={action}
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            />
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center">
                                <Typography variant="h1">Page 1</Typography>
                            </Box>
                            <Stack justifyContent="center" marginTop={5}direction="row" spacing={3}>
                                <TextField id="secure_var" label="Secure Variable" variant="outlined" onChange={(
                                    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                                ) => {
                                    setSecureVar(
                                        event.target
                                            .value as string
                                    )
                                }}/>
                                <TextField id="insecure_var" label="Insecure Variable" variant="outlined" onChange={(
                                    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                                ) => {
                                    setInsecureVar(
                                        event.target
                                            .value as string
                                    )
                                }}/>
                            </Stack>
                            <Stack justifyContent="center" marginTop={5} direction="row" spacing={2}>
                                <Button variant="contained" onClick={handleStore}> Store Data </Button>
                                <Button variant="contained" onClick={handleRetrieve}> Retrieve Data </Button>
                                <Button variant="contained" onClick={handleDelete}> Delete Secure Varibale </Button>
                                <Button variant="contained" onClick={handleClear}> Clear Data </Button>
                            </Stack>
                        </>
                    </PermissionGate>
                </Container>
            </main>
        </>
    )
}
