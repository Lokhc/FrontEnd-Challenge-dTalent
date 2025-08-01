import Spinner from "./Spinner";

export default function Modal({ setShowModal, pdfURL, isModalContentLoading }) {

    return (
        <section className="modal-container">

            {isModalContentLoading ? (
                <div className="modal-loader">
                    <Spinner />
                    <h3>Cargando archivo</h3>
                </div>
            ) : (
                <div className="modal-content">
                    <iframe
                        src={pdfURL}
                        width="100%"
                        height="500px"
                    >
                        Tu navegador no soporta iframes, pero puedes descargar el PDF.
                    </iframe>

                    <div className="modal-footer">
                        <button onClick={() => setShowModal(false)}>CERRAR</button>
                        <div>
                            <a href=""><i className="bi bi-box-arrow-up-right"></i></a>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}