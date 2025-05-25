import { toast } from 'react-toastify';

export const handleSuccess = (message) => {
    toast.success(message);
};

export default handleSuccess;