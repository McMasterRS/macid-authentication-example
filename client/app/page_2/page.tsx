'use client'

import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { Box, Container, Typography } from "@mui/material";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import styles from "../styles/page.module.css";
import * as crypto from 'crypto';

export interface SnackbarMessage {
    message: string;
    key: number;
}

export default function Page_2() {
    const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
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

    const handleEncrypt = (): void => {
        // Get values from text fields
        const decryptedValue = (document.getElementById("decrypted_text") as HTMLInputElement)?.value || '';
        const secretKey = (document.getElementById("secret_key") as HTMLInputElement)?.value || '';

        // Check if the secret key meets the minimum length
        if (secretKey.length < 32) {
            alert('Please enter a secret key with at least 32 characters.');
            return;
        }

        try {
            // Encrypt data
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(String(secretKey), 'utf-8'), iv);
            let encrypted = cipher.update(decryptedValue, 'utf-8', 'hex');
            encrypted += cipher.final('hex');
            const encryptedValue = iv.toString('hex') + encrypted;

            // Set the encrypted value in the text field
            const encryptedTextField = document.getElementById("encrypted_result") as HTMLInputElement;
            if (encryptedTextField) {
                encryptedTextField.value = encryptedValue;
            }

            // Show success message
            const message: SnackbarMessage = { message: 'Encryption successful', key: Date.now() };
            setSnackPack((prev) => [...prev, message]);
        } catch (error) {
            console.error('Error encrypting text:', error);
        }
    };

    const handleDecrypt = (): void => {
        // Get values from text fields
        const encryptedValue = (document.getElementById("encrypted_text") as HTMLInputElement)?.value || '';
        const secretKey = (document.getElementById("secret_key") as HTMLInputElement)?.value || '';

        // Check if the secret key meets the minimum length
        if (secretKey.length < 32) {
            alert('Please enter a secret key with at least 32 characters.');
            return;
        }

        try {
            const iv = Buffer.from(encryptedValue.slice(0, 32), 'hex');
            const encryptedText = encryptedValue.slice(32);

            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(String(secretKey), 'utf-8'), iv);

            let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');

            // Set the decrypted value in the text field
            const decryptedTextField = document.getElementById("decrypted_result") as HTMLInputElement;
            if (decryptedTextField) {
                decryptedTextField.value = decrypted;
            }

            // Show success message
            const message: SnackbarMessage = { message: 'Decryption successful', key: Date.now() };
            setSnackPack((prev) => [...prev, message]);
        } catch (error) {
            console.error('Error decrypting text:', error);
        }
    }

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


    return (
        <main className={styles.page}>
            <PermissionGate>
                <Container>
                    <Snackbar
                        sx={{ paddingTop: 10 }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        TransitionProps={{ onExited: handleExited }}
                        message={messageInfo ? messageInfo.message : undefined}
                        action={action}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography variant="h1">Page 2</Typography>
                    </Box>

                    <Stack justifyContent="center" marginTop={5} direction="row" spacing={2}>
                        <TextField id="secret_key" label="Secret Key" variant="outlined" />
                    </Stack>
                    
                    <Stack justifyContent="center" marginTop={5} direction="row" spacing={2}>
                        <TextField id="decrypted_text" label="Decrypted Text" variant="outlined" />
                        <Button variant="contained" onClick={handleEncrypt}> Encrypt Data </Button>
                        <TextField id="encrypted_result" label="" variant="outlined" InputProps={{ readOnly: true }} />
                    </Stack>

                    <Stack justifyContent="center" marginTop={5} direction="row" spacing={2}>
                        <TextField id="encrypted_text" label="Encrypted Text" variant="outlined" />
                        <Button variant="contained" onClick={handleDecrypt}> Decrypt Data </Button>
                        <TextField id="decrypted_result" label="" variant="outlined" InputProps={{ readOnly: true }} />
                    </Stack>
                </Container>
            </PermissionGate>
        </main>
    )
}
