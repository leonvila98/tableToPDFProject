import { Divider } from '@mui/material';
import {
    Page,
    Text,
    Document,
    StyleSheet,
    Font,
    View,
    Image,
} from '@react-pdf/renderer';
import { Video } from '../../interfaces/Video.Interface';

interface MyDocumentProps {
    videos: Video[];
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
// Create styles
const styles = StyleSheet.create({
    reportTitle: {
        color: '#3778C2',
        letterSpacing: 2,
        fontSize: 10,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    text: {
        // color: '#3778C2',
        // letterSpacing: 2,
        fontSize: 12,
        textAlign: 'left',
    },
    hrSolid: {
        // borderTop: '3px solid #bbb',
        border: '3px solid #bbb',
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    container: {
        width: 500,
        height: 260,
        // marginHorizontal: 100,
    },
});

// Create Document Component
export const MyDocument: React.FC<MyDocumentProps> = ({ videos }) => {
    return (
        <Document>
            <Page style={{ padding: 30 }} wrap>
                {videos.map((v, idx) => {
                    return <TwoColumnLayout video={v} />;
                })}
            </Page>
        </Document>
    );
};

interface ColumnLayoutProps {
    video: Video;
}

const TwoColumnLayout: React.FC<ColumnLayoutProps> = ({ video }) => (
    <View style={styles.container}>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
            }}
        >
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>codigo</Text>
                <Text style={styles.text}>{video.codigo}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>nota</Text>
                <Text style={styles.text}>{video.nota}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>clase</Text>
                <Text style={styles.text}>{video.clasedescripcion}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>norma</Text>
                <Text style={styles.text}>{video.normadescripcion}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>fecha</Text>
                <Text style={styles.text}>{video.fecha}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>duracion</Text>
                <Text style={styles.text}>{video.duracion}</Text>
            </View>
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
            }}
        >
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>descripcion</Text>
                <Text style={styles.text}>{video.descripcion}</Text>
            </View>
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
            }}
        >
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>personajes</Text>
                <Text style={styles.text}>{video.personaje1}</Text>
                <Text style={styles.text}>{video.personaje2}</Text>
                <Text style={styles.text}>{video.personaje3}</Text>
                <Text style={styles.text}>{video.personaje4}</Text>
            </View>
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
            }}
        >
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>observaciones</Text>
                <Text style={styles.text}>{video.observacion}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.reportTitle}>en archivo</Text>
                <Text style={styles.text}>{video.estado}</Text>
            </View>
        </View>
        <Text>
            -------------------------------------------------------------------------------------
        </Text>
    </View>
);
