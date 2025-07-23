import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/api";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await handleLogin(username, password);

            if (response.ok) {
                const { token } = response.body;
                localStorage.setItem('token', token);
                navigate('/home');
            } else {
                console.log('ndoikoi');
                setError(true);
                setLoading(false);
            }

        } catch (error) {
            console.error(error, 'Error login page');
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
                            required
                        />
                    </fieldset>
                    <span style={{ display: error ? 'block' : 'none' }}>el usuario o la contraseña son incorrectas</span>
                    <br />

                    <button type="submit">{loading ? 'loading...' : 'INICIAR SESIÓN'} </button>
                </form>

                <a href="">¿Olvidaste tu contraseña?</a>
            </div>
        </section>
    );
}