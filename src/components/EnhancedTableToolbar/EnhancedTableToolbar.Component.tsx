import {
    Toolbar,
    alpha,
    Button,
    CircularProgress,
    Typography,
    TextField,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import { Video } from '../../interfaces/Video.Interface';
import { MyDocument } from '../MyDocument/MyDocument.Component';
import { SelectNorma } from '../SelectNorma/SelectNorma.Component';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

interface EnhancedTableToolbarProps {
    numSelected: number;
    videos: Video[];
    selected: readonly number[];
    fetchData: (
        text: string,
        norma: string,
        dateFrom: string | null,
        dateTo: string | null
    ) => void;
    isLoading: boolean;
    allSelected: boolean;
}

export const CssTextField = withStyles({
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
        marginRight: '10px',
    },
})(TextField);

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    // const normas = ['VHS', 'UM', 'DVD', 'BETA', 'PULGADA', 'PC'];
    const { numSelected, videos, selected, fetchData, isLoading, allSelected } =
        props;
    const [norma, setNorma] = React.useState<string>('BETA');
    const [dateFrom, setDateFrom] = React.useState<string | null>(null);
    const [dateTo, setDateTo] = React.useState<string | null>(null);
    const [selectedVideos, setSelectedVideos] = React.useState<Video[]>([]);
    const [searchingText, setSearchingText] = React.useState<string>('');
    const [documentGenerated, setDocumentGenerated] =
        React.useState<boolean>(false);

    React.useEffect(() => {
        setSelectedVideos(videos.filter((v) => selected.includes(v.id)));
    }, [selected]);

    const handleSearch = (target: any) => {
        setSearchingText(target.value);
    };

    const handleDocumentGenerated = () => {
        setDocumentGenerated(documentGenerated ? false : true);
    };

    const handleDownloaded = () => {
        setTimeout(handleDocumentGenerated, 500);
    };

    const handleDateFrom = (dateFrom: string | null) => {
        let newDate = moment(dateFrom?.toString()).format('YYYYMMDD');
        setDateFrom(dateFrom);
    };

    const handleDateTo = (dateTo: string | null) => {
        let newDate = moment(dateTo?.toString()).format('YYYYMMDD');
        setDateTo(dateTo);
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
                    fetchData(
                        searchingText,
                        norma,
                        dateFrom !== null
                            ? moment(dateFrom?.toString()).format('yyyyMMDD')
                            : null,
                        dateTo !== null
                            ? moment(dateTo?.toString()).format('yyyyMMDD')
                            : null
                    );
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
            {numSelected > 0 || allSelected ? (
                <Typography
                    sx={{ flex: '1 1 100%', marginLeft: '20px' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {allSelected ? videos.length : numSelected} seleccionados
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                ></Typography>
            )}

            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                style={{ marginRight: 16 }}
            >
                <DatePicker
                    label='Desde'
                    value={dateFrom}
                    onChange={(newValue) => {
                        handleDateFrom(newValue);
                    }}
                    inputFormat='dd/MM/yyyy'
                    renderInput={(params) => (
                        <CssTextField
                            margin='normal'
                            inputProps={{
                                style: { color: '#232323' },
                            }}
                            sx={{
                                width: 800,
                                maxWidth: '100%',
                            }}
                            {...params}
                            defaultValue={null}
                        />
                    )}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label='Hasta'
                    value={dateTo}
                    onChange={(newValue) => {
                        handleDateTo(newValue);
                    }}
                    inputFormat='dd/MM/yyyy'
                    renderInput={(params) => (
                        <CssTextField
                            margin='normal'
                            inputProps={{
                                style: { color: '#232323' },
                            }}
                            sx={{
                                width: 800,
                                maxWidth: '100%',
                            }}
                            {...params}
                            defaultValue={null}
                        />
                    )}
                />
            </LocalizationProvider>

            <SelectNorma setNormaParent={setNorma} />

            {numSelected > 0 || allSelected ? (
                !documentGenerated ? (
                    <Button
                        style={{
                            backgroundColor: '#232323',
                            margin: '15px',
                            width: '500px',
                            padding: '-30px',
                        }}
                        variant='contained'
                        onClick={handleDocumentGenerated}
                    >
                        Generar PDF
                    </Button>
                ) : (
                    <PDFDownloadLink
                        document={
                            <MyDocument
                                videos={allSelected ? videos : selectedVideos}
                            />
                        }
                        style={{ textDecoration: 'none' }}
                        className='btn btn-primary'
                    >
                        {({ loading }) =>
                            loading ? (
                                <CircularProgress color='inherit' />
                            ) : (
                                <Button
                                    style={{
                                        backgroundColor: '#232323',
                                        margin: '15px',
                                        width: '200px',
                                        padding: '-30px',
                                    }}
                                    variant='contained'
                                    onClick={handleDownloaded}
                                >
                                    Descargar
                                </Button>
                            )
                        }
                    </PDFDownloadLink>
                )
            ) : (
                <></>
            )}
        </Toolbar>
    );
};
