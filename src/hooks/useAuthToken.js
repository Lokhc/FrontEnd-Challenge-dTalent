import { useState } from "react";

export default function useAuthToken() {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const saveToken = (newToken) => {
        setToken(null);
        localStorage.setItem('token', newToken);
    }

    const deleteToken = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    return { token, saveToken, deleteToken }
}