import * as React from 'react';
import Box from '@mui/material/Box';
import { supabase } from '../../SupabaseClient';
import { Button } from '@mui/material';
import { CssTextField } from '../EnhancedTableToolbar/EnhancedTableToolbar.Component';
// import React, { ReactNode } from "react";

interface Props {
    children?: React.ReactNode;
    // any props that come into the component
}

export const LoginPage = ({ children, ...props }: Props) => {
    const [isAuth, setIsAuth] = React.useState<boolean>(false);
    const [psw, setPsw] = React.useState<string>('');

    const getAuth = async () => {
        await supabase
            .rpc('auth', {
                keyword: psw,
            })
            .then(({ data, error }: any) => {
                console.log('|error', error);
                setIsAuth(data);
            });
    };

    const handlePsw = (target: any) => {
        setPsw(target.value);
    };

    return !isAuth ? (
        <Box
            sx={{
                width: '300px',
                height: '150px',
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '4px',
            }}
        >
            <CssTextField
                id='password'
                key='password'
                label='Contraseña'
                name='password'
                type='password'
                margin='normal'
                inputProps={{
                    style: { color: '#232323' },
                }}
                sx={{
                    width: 200,
                    maxWidth: '100%',
                    left: '50%',
                    top: '24%',
                    transform: 'translate(-50%, -50%)',
                }}
                onChange={(e) => {
                    handlePsw(e.target);
                }}
                value={psw}
            />
            <Button
                style={{
                    backgroundColor: '#232323',
                    // margin: '15px',
                }}
                variant='contained'
                onClick={() => {
                    getAuth();
                }}
                sx={{
                    width: 20,
                    maxWidth: '100%',
                    position: 'absolute',
                    left: '27%',
                    top: '75%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Login
            </Button>
        </Box>
    ) : (
        <>{children}</>
    );
};
