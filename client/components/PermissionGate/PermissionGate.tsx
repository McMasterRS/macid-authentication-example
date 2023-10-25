import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import {AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "@/app/config/authConfig";
import {InteractionStatus} from "@azure/msal-browser";

interface PermissionGateProps {
    children:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactPortal
}

export default function PermissionGate({children}: PermissionGateProps) {
    const isAuthenticated = useIsAuthenticated();
    const { instance, inProgress } = useMsal();

    return (
        <>
            <AuthenticatedTemplate>
                <>{children}</>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Modal
                    open
                    onClose={() => {
                        if (inProgress === InteractionStatus.None && !isAuthenticated) {
                            instance.loginRedirect(loginRequest);
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            border: '2px solid #000',
                            bgcolor: 'white',
                            color: 'black',
                            borderRadius: '16px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        {`Please login before viewing this page.`}
                    </Box>
                </Modal>
            </UnauthenticatedTemplate>
        </>
    )
}
