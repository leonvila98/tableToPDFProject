import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectNormaProps {
    setNormaParent: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectNorma = (props: SelectNormaProps) => {
    const [norma, setNorma] = React.useState('BETA');
    const { setNormaParent } = props;
    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === 'TODAS') {
            setNorma('TODAS');
            setNormaParent('');
        } else {
            setNorma(event.target.value as string);
            setNormaParent(event.target.value as string);
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth margin='normal'>
                <InputLabel
                    id='demo-simple-select-label'
                    sx={{
                        '&.Mui-focused': {
                            color: '#232323',
                        },
                    }}
                    // .Mui-focused .MuiOutlinedInput-notchedOutline
                >
                    Norma
                </InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={norma}
                    label='Norma'
                    onChange={handleChange}
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#232323',
                        },
                    }}
                >
                    <MenuItem value={'TODAS'}>TODAS</MenuItem>
                    <MenuItem value={'BETA'}>BETA</MenuItem>
                    <MenuItem value={'DVD'}>DVD</MenuItem>
                    <MenuItem value={'PULGADA'}>PULGADA</MenuItem>
                    <MenuItem value={'PC'}>PC</MenuItem>
                    <MenuItem value={'UM'}>UM</MenuItem>
                    <MenuItem value={'VHS'}>VHS</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
