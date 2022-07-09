import {
    TableRow,
    TableCell,
    Checkbox,
    TableSortLabel,
    Box,
    Typography,
} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { Video } from '../../interfaces/Video.Interface';
import useStyles from '../EspandingTable/ExpandingTable.Style';
import { visuallyHidden } from '@mui/utils';
import React from 'react';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Video;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'empty',
        numeric: false,
        disablePadding: true,
        label: '',
    },
    {
        id: 'codigo',
        numeric: false,
        disablePadding: true,
        label: 'Codigo',
    },
    {
        id: 'nota',
        numeric: true,
        disablePadding: false,
        label: 'Nota',
    },
    {
        id: 'descripcion',
        numeric: false,
        disablePadding: false,
        label: 'Descripcion',
    },
    {
        id: 'observacion',
        numeric: false,
        disablePadding: false,
        label: 'Observacion',
    },
    {
        id: 'clasedescripcion',
        numeric: false,
        disablePadding: false,
        label: 'Clase',
    },
    {
        id: 'personaje1',
        numeric: false,
        disablePadding: false,
        label: 'Personaje1',
    },
    {
        id: 'fecha',
        numeric: false,
        disablePadding: false,
        label: 'Fecha',
    },
    {
        id: 'duracion',
        numeric: false,
        disablePadding: false,
        label: 'Duracion',
    },
    {
        id: 'estado',
        numeric: false,
        disablePadding: false,
        label: 'En archivo',
    },
];

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Video
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    allSelected: boolean;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        allSelected,
    } = props;
    const createSortHandler =
        (property: keyof Video) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow className={classes.headContainer}>
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={
                            rowCount > 0 && numSelected === rowCount
                                ? true
                                : allSelected
                                ? true
                                : false
                        }
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                        sx={{
                            color: '#EDEDED',
                            '&.Mui-checked': {
                                color: '#EDEDED',
                            },
                            '&.MuiCheckbox-indeterminate': {
                                color: '#EDEDED',
                            },
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <Box fontWeight='fontWeightBig'>
                                <Typography className={classes.boldTypography}>
                                    {headCell.label}
                                </Typography>
                            </Box>
                            {orderBy === headCell.id ? (
                                <Box
                                    component='span'
                                    sx={visuallyHidden}
                                    fontWeight='fontWeightBold'
                                >
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
