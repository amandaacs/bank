import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useState } from 'react'


const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'https://bank-project-mnto.onrender.com';

    console.log('API URL:', apiUrl);
    const loginUser = async (values) => {
        
        try {
            setError(null);
            setLoading(true);
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200){
                message.success(data.message);
                login(data.token, data.user); 
            } else if (res.status === 404){
                setError(data.message);
            } else {
                message.error('Erro no Login');
            }
        } catch (error) {
           message.error(error); 
        } finally {
            setLoading(false);
        }
    };

  return{ loading, error, loginUser };
}

export default useLogin
