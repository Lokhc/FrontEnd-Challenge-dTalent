export const URL_BASE = "https://api.schneck.dlab.software/api";
const token = localStorage.getItem('token');

export async function getAllUsers() {
    try {
        const response = await fetch(`${URL_BASE}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener usuarios: ${errorData.status}`)
        }

        return await response.json();

    } catch (error) {
        console.error(error.detail);
        throw error;
    }
}

export async function getAllReceipts() {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${URL_BASE}/receipts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response) {
            const errorData = await response.json();
            throw new Error(`Error al obtener recibos: ${errorData.detail}`)
        }

        return await response.json();

    } catch (error) {
        console.error('Error', error)
        throw error;
    }
}

// construir query
const buildQuery = (searchTerm, filters) => {
    if (searchTerm) {
        query.push(`search=${encodeURIComponent(searchTerm)}`);
    }

    for (const [key, value] of Object.entries(filters)) {
        if (value && value !== 'Todos') {
            query.push(`${key}=${encodeURIComponent(value)}`);
        }
    }

    return query.length ? `${query.join('&')}` : '';
}

// test function
export async function getUsers(searchTerm, filters, signal) {
    const query = buildQuery(searchTerm, filters);

    try {
        const response = await fetch(`${URL_BASE}/users${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            signal: signal
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error obtieniendo ', error);
    }
}























export async function handleLogin(username, password) {
    try {
        const response = await fetch(`${URL_BASE}/users/demo_login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error durante el login: ${errorData.status}`);
        }

        const json_res = await response.json();

        return { ok: response.ok, body: json_res };

    } catch (error) {
        throw error;
    }
}