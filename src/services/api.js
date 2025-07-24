export const URL_BASE = "https://api.schneck.dlab.software/api";
const token = localStorage.getItem('token');

export async function getAllUsers(searchTerm, filters, signal) {
    const query = buildQuery(searchTerm, filters);

    try {
        const response = await fetch(`${URL_BASE}/users/${query}`, {
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

/* 
{nationality: "Alemán"},
{paymentType: "Jornalero"},
{role: "Supervisor"},
{position: "FullStack"},
{paymentType: "Todos"},

target: nationality=Alem%C3%A1n&paymentType=Jornalero&role=Supervisor&position=FullStack&paymentType=Todos
*/

// construir query
export function buildQuery(searchTerm, filtersArr) {
    const query = [];

    if (searchTerm) {
        query.push(`search=${encodeURIComponent(searchTerm)}`);
    }

    for (const filterObj of filtersArr) {
        for (const [key, value] of Object.entries(filterObj)) {
            query.push(`${key}=${encodeURIComponent(value)}`);
        }
    }

    return query.length ? `${query.join('&')}` : '';
}

// test function

























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