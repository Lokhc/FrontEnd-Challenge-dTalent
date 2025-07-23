// FILTER OPTIONS
export const contextualFilterMenu = () => {
    return {
        filterMenuItems: [
            { id: 'remunarationType', label: 'Tipo de reumneracion' },
            { id: 'sector', label: 'Sector' },
            { id: 'year', label: 'Año' },
            { id: 'month', label: 'Mes' },
            { id: 'sent', label: 'Enviado' },
            { id: 'read', label: 'Leído' },
        ],

        filterOptions: {
            month: [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ],

            year: ["2020", "2021", "2022", "2023", "2024"],

            nose: [
                { id: 'all', label: 'Todos' },
                { id: 'yes', label: 'Si' },
                { id: 'no', label: 'No' },
                { id: 'remove', label: 'Remover filtro' },
            ]
        },

        styles: {
            btnStyle: {
                display: 'inline - block',
                padding: '0.6em 1.2em',
                border: 'unset',
                borderRadius: '25px',
                background: '#80808021',
                fontSize: '12px',
                color: 'cornflowerblue',
            },

            menuStyle: {
                padding: '0.5rem',
            },

            menuItemStyle: {
                padding: '0.5rem',
            },

            filterBtnStyle: {
                color: 'cornflowerblue',
                fontSize: '12px',
                paddingLeft: '2rem',
                cursor: 'pointer',
            }
        },
    }
}

// ORDER OPTIONS
export const contextualOrderMenu = () => {

    return {
        employeesOrderMenuItems: [
            { id: 'number', label: 'Número' },
            { id: 'recent', label: 'Más recientes' },
            { id: 'older', label: 'Más antiguos' },
            { id: 'name', label: 'Nombre' },
            { id: 'lastname', label: 'Apellido' },
            { id: 'email', label: 'Correo electrónico' },
        ],

        receiptsOrderMenuItmes: [
            { id: 'recent', label: 'Mas recientes' },
            { id: 'older', label: 'Más antiguos' },
            { id: 'type', label: 'Tipo' },
        ],
    }
}

const employeeContextualMenu = () => {
    return {
        employeesOrderMenuItems: [
            { id: 'number', label: 'Número' },
            { id: 'recent', label: 'Más recientes' },
            { id: 'older', label: 'Más antiguos' },
            { id: 'name', label: 'Nombre' },
            { id: 'lastname', label: 'Apellido' },
            { id: 'email', label: 'Correo electrónico' },
        ],
    }
}