

export const MedicalHistory = ({
    medicalHistory,
    calculateImc,
    getImcColorClass,
    handleVisibleHistoryForm
}) => {

    const {
        sex,
        height,
        weight,
        bloodType,
        observations,
    } = medicalHistory ?? {};

    const imc = calculateImc(height, weight);
    const imcColorClass = getImcColorClass(imc);

    return (
        <>
            <div className="row m-2">
                <div className="col">
                    {medicalHistory ? (
                        <div className="list-group">
                            <div>
                                <p className="fw-bold mb-1">Historia Clínica:</p>
                                <div className="">
                                    <p className="mb-0">
                                        <span className="fw-medium">Sexo: </span>
                                        {sex}
                                    </p>
                                    <p className="mb-0">
                                        <span className="fw-medium">Altura: </span>
                                        {height} mts.
                                    </p>
                                    <p className="mb-0">
                                        <span className="fw-medium">Peso: </span>
                                        {weight} Kg.
                                    </p>
                                    <p className="mb-0">
                                        <span className="fw-medium">Grupo sanguíneo: </span>
                                        {bloodType}
                                    </p>
                                    <p className="mb-0">
                                        <span className="fw-medium">Observaciones: </span>
                                        {observations}
                                    </p>
                                    <p className="mb-0">
                                        <span className="fw-medium">IMC: </span>
                                        <span className={`mb-0 fw-medium ${imcColorClass}`}>{imc}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <button className="btn btn-primary btn-xl bold fw-semibold"
                                    onClick={handleVisibleHistoryForm}
                                >
                                    Modificar Historia Clínica
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <p className="fw-bold fs-5 text mt-3">Historia Clínica:</p>
                            <div className="alert alert-warning text-center" role="alert">
                                <span>No hay Historia Clínica registrada.</span>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary my-4 text-center bold"
                                    onClick={handleVisibleHistoryForm}
                                >
                                    Agregar Historia Clínica
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}