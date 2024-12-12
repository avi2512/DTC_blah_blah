import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AppRoutes from './routes';
import TestConnection from './components/TestConnection';

function App() {
    return (
        <Provider store={store}>
            <NotificationProvider>
                <AuthProvider>
                    <AppRoutes />
                    <TestConnection />
                </AuthProvider>
            </NotificationProvider>
        </Provider>
    );
}

export default App;