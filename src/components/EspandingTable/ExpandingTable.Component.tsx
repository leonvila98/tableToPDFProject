import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { supabase } from '../../SupabaseClient';
import { Video } from '../../interfaces/Video.Interface';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Button,
    CircularProgress,
    Collapse,
    createTheme,
    Grid,
    TextField,
} from '@mui/material';
import useStyles from './ExpandingTable.Style';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { withStyles } from '@mui/styles';
import { MyDocument } from '../MyDocument/MyDocument.Component';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { blue } from '@mui/material/colors';
import { LoadingButton } from '@mui/lab';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
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
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                        sx={{
                            color: '#EDEDED',
                            '&.Mui-checked': {
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

interface EnhancedTableToolbarProps {
    numSelected: number;
    videos: Video[];
    selected: readonly number[];
    fetchData: (text: string) => void;
    isLoading: boolean;
}

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#232323',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#232323',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#232323',
            },
            '&:hover fieldset': {
                borderColor: '#232323',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#232323',
            },
        },
    },
})(TextField);

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#232323',
        },
    },
});

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, videos, selected, fetchData, isLoading } = props;
    const [selectedVideos, setSelectedVideos] = React.useState<Video[]>([]);
    const [searchingText, setSearchingText] = React.useState<string>('');

    React.useEffect(() => {
        setSelectedVideos(videos.filter((v) => selected.includes(v.id)));
    }, [selected]);

    const handleSearch = (target: any) => {
        setSearchingText(target.value);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            <CssTextField
                id='buscar'
                key='buscar'
                label='Buscar'
                name='buscar'
                type='text'
                margin='normal'
                inputProps={{
                    style: { color: '#232323' },
                }}
                sx={{
                    width: 800,
                    maxWidth: '100%',
                }}
                onChange={(e) => {
                    handleSearch(e.target);
                }}
                value={searchingText}
            />
            <Button
                style={
                    isLoading
                        ? { margin: '15px' }
                        : {
                              backgroundColor: '#232323',
                              margin: '15px',
                          }
                }
                variant='contained'
                onClick={() => {
                    fetchData(searchingText);
                }}
                disabled={isLoading}
            >
                Buscar
            </Button>
            {isLoading && (
                <div>
                    <CircularProgress color='inherit' />
                </div>
            )}
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%', marginLeft: '20px' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {numSelected} seleccionados
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                ></Typography>
            )}

            {numSelected > 0 ? (
                <>
                    <PDFDownloadLink
                        document={<MyDocument videos={selectedVideos} />}
                    >
                        <Tooltip title='Convertir a PDF'>
                            <IconButton>
                                <PictureAsPdfIcon />
                            </IconButton>
                        </Tooltip>
                    </PDFDownloadLink>
                </>
            ) : (
                <></>
            )}
        </Toolbar>
    );
};

function Row(props: {
    row: {
        id: string | number;
        codigo: string | number;
        nota: string | number;
        descripcion: string | number;
        fecha: string | number;
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
                <TableCell align='left'>{row.fecha}</TableCell>
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

export default function EnhancedTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Video>('codigo');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const [videos, setVideos] = React.useState<any[]>([]);

    const fetchVideos = async (search: string) => {
        setLoading(true);
        await supabase
            .rpc('search_posts', {
                keyword: search,
            })
            .then(({ data }: any) => {
                setVideos(data);
                setLoading(false);
            });
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Video
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = videos.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - videos.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    videos={videos}
                    selected={selected}
                    fetchData={fetchVideos}
                    isLoading={isLoading}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={videos.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(videos, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(
                                        parseInt(row.id.toString())
                                    );
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <Row
                                            row={row}
                                            handleClick={handleClick}
                                            isItemSelected={isItemSelected}
                                            labelId={labelId}
                                        />
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={videos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label='Dense padding'
            />
        </Box>
    );
}
