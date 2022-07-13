import './App.css';
import DataTable from './components/EspandingTable/ExpandingTable.Component';
import { LoginPage } from './components/LoginPage/LoginPage.Component';

function App() {
    return (
        <div style={{ padding: '25px' }}>
            <LoginPage>
                <DataTable />
            </LoginPage>
        </div>
    );
}

export default App;
