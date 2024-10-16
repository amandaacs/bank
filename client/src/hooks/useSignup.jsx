import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useState } from 'react'


const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'https://bank-project-mnto.onrender.com';

    const registerUser = async (values) => {
        if(values.password !== values.passwordConfirm){
            return setError("passwords don't match")
        }
        try {
            setError(null);
            setLoading(true);
            const res = await fetch(`${apiUrl}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 201){
                message.success(data.message);
                login(data.token, data.user); 
            } else if (res.status === 400){
                setError(data.message);
            } else {
                message.error('registration failed');
            }
        } catch (error) {
           message.error(error); 
        } finally {
            setLoading(false);
        }
    };

  return{ loading, error, registerUser };
}

export default useSignup
