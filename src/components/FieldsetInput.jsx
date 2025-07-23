export default function FieldsetInput() {

    return (
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
    );
}