
export const Home = () => {
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Mahoney CareSys</h2>

            <div className="row g-0 d-flex align-items-center justify-content-center flex-column">
                <div className="col-md-12 mb-4">
                    <p>
                        En el siglo XIX, la enfermera Mary Eliza Mahoney desempeñó un papel crucial al convertirse en la primera mujer afroamericana
                        registrada como profesional de enfermería. Su valentía y dedicación sentaron las bases para una enfermería más inclusiva y
                        de calidad.
                    </p>
                    <p>
                        Al igual que Mahoney, nuestro sistema se esfuerza por cambiar la forma en que los profesionales de la salud abordan
                        el cuidado de los pacientes, proporcionando una herramienta efectiva y fácil de usar que potencia la atención personalizada y el
                        seguimiento detallado de los signos vitales a lo largo del tiempo.
                    </p>
                    <p className="text-center">
                        En honor a la visión pionera de la enfermera Mahoney, perseguimos
                        la excelencia y la equidad en la atención médica moderna.
                    </p>

                </div>

                <div className="col-md-4 d-flex align-items-center justify-content-center flex-column">
                    <h3>Un vistazo a nuestro sistema:</h3>
                    <div style={{ width: '18rem' }}>
                        <div className="card-body">
                            <iframe
                                title="YouTube Video"
                                width="100%"
                                height="200"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Características destacadas:
                    <ul>
                        <li>Registro y seguimiento de signos vitales.</li>
                        <li>Visualización de datos a lo largo del tiempo.</li>
                        <li>Acceso rápido a historiales médicos y registros anteriores.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
