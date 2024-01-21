

export const PatientData = ({ patientState, calculateAge, handlerDateFormat, calculateDateDifference }) => {

    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        idNumber,
        service,
        dateOfBirth,
        bed,
        room,
        admissionDate,
        medicalDischargeDate,
    } = patientState;

    const hospitalizationDaysAndMonths = calculateDateDifference(admissionDate, medicalDischargeDate);
    const { months, remainingDays } = hospitalizationDaysAndMonths;

    return (
        <>
            <div className="mt-4 my-auto">
                <div className="card-body">
                    <h5 className="card-title">
                        {lastName}, {firstName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        {service}, <span className="bold">DNI: </span>
                        {idNumber}
                    </h6>
                    <div className="list-group m-2">
                        <div className="mt-2 row">
                            <div className="col">
                                <p className="fw-bold mb-1">Datos Personales:</p>

                                <p className="mb-0">
                                    <span className="fw-medium">Edad: </span>{" "}
                                    {calculateAge(dateOfBirth)}{" "}
                                </p>
                                <p className="mb-0">
                                    <span className="fw-medium">Fecha de Nacimiento: </span>
                                    {handlerDateFormat(dateOfBirth)}
                                </p>
                                <p className="mb-0">
                                    <span className="fw-medium">Direccion: </span>
                                    {address}
                                </p>
                                <p className="mb-0">
                                    <span className="fw-medium">Teléfono: </span>
                                    {phoneNumber}
                                </p>
                                <p className="mb-0">
                                    <span className="fw-medium">E-mail: </span> {email}
                                </p>
                            </div>

                            <div className="col">
                                <p className="fw-bold mb-1">Datos de Internación:</p>
                                <p className="mb-0">
                                    <span className="fw-medium">Fecha de ingreso: </span>
                                    {handlerDateFormat(admissionDate)}
                                </p>
                                {medicalDischargeDate ? (
                                    <p className="mb-0">
                                        <span className="fw-medium">Fecha de alta: </span>
                                        {handlerDateFormat(medicalDischargeDate)}
                                    </p>
                                ) : (
                                    <p className="mb-0">
                                        <span className="fw-medium">Tiempo de internación:</span>{" "}
                                        {months < 1
                                            ? ""
                                            : `${months} ${months > 1 ? "meses" : "mes"} y `}
                                        {`${remainingDays} ${remainingDays > 1 || remainingDays == 0
                                            ? "días"
                                            : "dia"
                                            }`}
                                    </p>
                                )}

                                <p className="mb-0">
                                    <span className="fw-medium">Habitación: </span>
                                    {room}
                                </p>
                                <p className="mb-0">
                                    <span className="fw-medium">Cama: </span>
                                    {bed}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}