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

interface EnhancedTableToolbarProps {
    numSelected: number;
    videos: Video[];
    selected: readonly number[];
    fetchData: (text: string) => void;
    isLoading: boolean;
    allSelected: boolean;
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

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, videos, selected, fetchData, isLoading, allSelected } =
        props;
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

            {numSelected > 0 || allSelected ? (
                !documentGenerated ? (
                    <Button
                        style={{
                            backgroundColor: '#232323',
                            margin: '15px',
                            width: '220px',
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
                        {({ blob, url, loading, error }) =>
                            loading ? (
                                <CircularProgress color='inherit' />
                            ) : (
                                <Button
                                    style={{
                                        backgroundColor: '#232323',
                                        margin: '15px',
                                        width: '220px',
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
