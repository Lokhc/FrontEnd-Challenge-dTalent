export default function Modal() {
    return (
        <section style={modalStyle.modalContainer}>
            <div style={modalStyle.modalContent}>
                <h3>Modal</h3>
            </div>
        </section>
    );
}

const modalStyle = {
    modalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#00000066',
        height: '100 %',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100 %',
    },

    modalContent: {
        width: '10rem',
        height: '5rem',
        background: 'gray',
        width: '10rem',
        height: '5rem',
        background: '#1d1e23',
        borderRadius: '3px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    }
}