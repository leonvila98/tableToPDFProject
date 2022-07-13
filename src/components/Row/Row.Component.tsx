import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    Collapse,
    Grid,
    Typography,
} from '@mui/material';
import React from 'react';
import useStyles from '../EspandingTable/ExpandingTable.Style';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';

export function Row(props: {
    row: {
        id: string | number;
        codigo: string | number;
        nota: string | number;
        descripcion: string | number;
        fecha: string | number | Date;
        duracion: string | number;
        observacion: string | number;
        norma: string | number;
        normadescripcion: string | number;
        clase: string | number;
        clasedescripcion: string | number;
        personaje1: string | number;
        personaje2: string | number;
        personaje3: string | number;
        personaje4: string | number;
        estado: string | number;
        sector: string | number;
        inicial: string | number;
    };
    handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
    isItemSelected: boolean;
    labelId: string;
}) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow
                hover
                role='checkbox'
                aria-checked={props.isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={props.isItemSelected}
                className={classes.row}
            >
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        checked={props.isItemSelected}
                        onClick={(event) =>
                            props.handleClick(
                                event,
                                parseInt(row.id.toString())
                            )
                        }
                        inputProps={{
                            'aria-labelledby': props.labelId,
                        }}
                        sx={{
                            color: '#232323',
                            '&.Mui-checked': {
                                color: '#232323',
                            },
                        }}
                    />
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell align='left'>{row.codigo}</TableCell>
                <TableCell align='left'>{row.nota}</TableCell>
                <TableCell align='left'>{row.descripcion}</TableCell>
                <TableCell align='left'>{row.observacion}</TableCell>
                <TableCell align='left'>{row.clasedescripcion}</TableCell>
                <TableCell align='left'>{row.personaje1}</TableCell>
                <TableCell align='left'>
                    {moment(row.fecha).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='left'>{row.duracion}</TableCell>
                <TableCell align='left'>{row.estado}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={10}
                >
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Grid container spacing={1}>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={1}>
                                <Typography
                                    variant='subtitle2'
                                    className={classes.cellsBoldTypography}
                                >
                                    Norma Descripcion
                                </Typography>
                                <Typography
                                    variant='body2'
                                    gutterBottom
                                    component='div'
                                >
                                    {row.normadescripcion}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography
                                    variant='subtitle2'
                                    className={classes.cellsBoldTypography}
                                >
                                    Personaje 2
                                </Typography>
                                <Typography
                                    variant='body2'
                                    gutterBottom
                                    component='div'
                                >
                                    {row.personaje2}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography
                                    variant='subtitle2'
                                    className={classes.cellsBoldTypography}
                                >
                                    Personaje 3
                                </Typography>
                                <Typography
                                    variant='body2'
                                    gutterBottom
                                    component='div'
                                >
                                    {row.personaje3}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography
                                    variant='subtitle2'
                                    className={classes.cellsBoldTypography}
                                >
                                    Personaje 4
                                </Typography>
                                <Typography
                                    variant='body2'
                                    gutterBottom
                                    component='div'
                                >
                                    {row.personaje4}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
