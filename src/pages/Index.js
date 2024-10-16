import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home');
    }, [navigate]);

    return null;
}