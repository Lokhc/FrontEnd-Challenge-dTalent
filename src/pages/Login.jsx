import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/api";
import Spinner from "../components/Spinner";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await handleLogin(username, password);
            if (response.ok) {
                const { token } = response.body;
                localStorage.setItem('token', token);
                navigate('/dashboard');
                setError(false);
            } else {
                console.log('ndoikoi');
            }
        } catch (error) {
            console.error('Error al iniciar sesión - Login:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const usernameInputOnChange = (event) => {
        setUsername(event.target.value);
    }

    const passwordInputOnChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <section id="login-section">
            <div>
                <img src="/dTalentLogo.png" alt="logo" />

                <form onSubmit={handleSubmit}>
                    <fieldset style={{ borderColor: error ? 'indianred' : '' }}>
                        <legend style={{ color: error ? 'indianred' : '' }} >Nombre de usuario</legend>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={usernameInputOnChange}
                            id="username"
                            placeholder="usuario"
                            aria-label="Nombre de usuario"
                            required
                        />
                    </fieldset>
                    <span style={{ display: error ? 'block' : 'none' }}>el usuario o la contraseña son incorrectas</span>
                    <br />
                    <fieldset style={{ borderColor: error ? 'indianred' : '' }}>
                        <legend style={{ color: error ? 'indianred' : '' }} >Contraseña</legend>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={passwordInputOnChange}
                            id="password"
                            placeholder="contraseña"
                            aria-label="Contraseña"
                            required
                        />
                    </fieldset>
                    <span style={{ display: error ? 'block' : 'none' }}>el usuario o la contraseña son incorrectas</span>
                    <br />

                    <button type="submit">{loading ? <Spinner /> : 'INICIAR SESIÓN'} </button>
                </form>

                <a href="">¿Olvidaste tu contraseña?</a>
            </div>
        </section>
    );
}