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
        background: 'black',
    },

    modalContent: {
        width: '10rem',
        height: '5rem',
    }
}