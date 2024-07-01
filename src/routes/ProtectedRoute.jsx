import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    console.log('fewfwefewfwfw', isAuthenticated);
    return isAuthenticated ? <Component {...rest } /> : <Navigate to="/iniciar-sesion" />;
}

export default ProtectedRoute