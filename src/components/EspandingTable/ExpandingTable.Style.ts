import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    extraInfoContainer: {
        margiLeft: '1000px',
        width: '100%',
        // width: '1000px',
    },
    inputRoot: {
        '&$disabled': {
            color: 'black',
        },
    },
    textField: {
        '& input': {
            color: '#000000',
        },
        '& input:disabled': {
            color: '#CCCCCC',
        },
    },
    boldTypography: {
        fontWeight: '700',
        color: '#EDEDED',
    },
    cellsBoldTypography: {
        fontWeight: '700',
    },
    headContainer: {
        backgroundColor: '#232323',
    },
    row: {},
});

export default useStyles;
