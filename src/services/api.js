const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "https://api.schneck.dlab.software/api";
const token = localStorage.getItem('token');

export async function getAllUsers(searchTerm, filters, signal) {
    const query = buildQuery(searchTerm, filters);

    try {
        const response = await fetch(`${API_BASE_URL}/users/?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            signal: signal
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener usuarios: ${errorData.detail || response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getAllReceipts(searchTerm, filters, signal) {
    const query = buildQuery(searchTerm, filters)
    try {
        const response = await fetch(`${API_BASE_URL}/receipts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Token ${token}`
            },
            signal
        });

        if (!response) {
            const errorData = await response.json();
            throw new Error(`Error al obtener recibos: ${errorData.detail || response.status}`)
        }

        return await response.json();

    } catch (error) {
        console.error('Error', error)
        throw error;
    }
}

export async function handleLogin(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/demo_login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error durante el inicio de sesión: ${errorData.detail || response.status}`);
        }

        const json_res = await response.json();

        return { ok: response.ok, body: json_res };

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// construir parametros de consulta basado en el termino de busqueda y los filtros seleccionados
export function buildQuery(searchTerm, filters) {
    const query = [];

    if (searchTerm) {
        query.push(`search=${encodeURIComponent(searchTerm)}`);
    }

    if (filters) {
        for (const [key, value] of Object.entries(filters)) {
            if (value !== 'Todos') {
                query.push(`${key}=${encodeURIComponent(value)}`);
            }
        }
    }

    return query.length ? `${query.join('&')}` : '';
}