import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../services/handleSuccess'; // Ensure correct path

const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged Out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return handleLogout;
};

export default useLogout;
