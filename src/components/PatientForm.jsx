import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../hooks/usePatients";

export const PatientForm = ({
    isModal = false,
    handleVisiblePatientForm,
    patientId,
    initialPatientForm,
    handleSavePatient,
}) => {

    const {
        patientState,
        validateForm
    } = usePatients({ id: patientId })
    const [patientForm, setPatientForm] = useState(initialPatientForm);
    const navigate = useNavigate();

    const {
        id,
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        idNumber,
        bed,
        room,
        service,
        dateOfBirth,
        admissionDate,
        medicalDischargeDate
    } = patientForm || {};

    useEffect(() => {
        setPatientForm({ ...patientState });
    }, [patientState]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setPatientForm({
            ...patientForm,
            [name]: value,
        });
    }


    const onSubmit = (event) => {
        event.preventDefault();

        if (validateForm(patientForm)) {

            handleSavePatient(patientForm);
            setPatientForm(initialPatientForm);
            handleVisiblePatientForm();
        }

        if (!isModal) {
            navigate("/patients");
        }
    };


    return (
        <>
            <div className="d-flex align-items-center justify-content-between w-100  mb-3">
                {id ?

                    <h4 className="fs-5 m-0">Actualizar Perfil del Paciente</h4> :
                    <h4 className="mx-4">Guardar nuevo Perfil de Paciente</h4>
                }
                {isModal &&
                    <div>
                        <button className="btn btn-danger btn-sm"
                            onClick={handleVisiblePatientForm}>
                            X
                        </button>
                    </div>
                }
            </div>
            <form className="container" onSubmit={onSubmit}>
                <input type="hidden"
                    name="id"
                    value={id ?? ''} />
                <div className="mb-2">
                    <label htmlFor="firstName"
                        className="form-label">
                        Nombre
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="nameHelp"
                        placeholder="ej.: Jose"
                        id="firstName"
                        name="firstName"
                        value={firstName ?? ''}
                        onChange={onInputChange} />
                    <div id="nameHelp" >

                    </div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="lastName"
                        className="form-label">
                        Apellido
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="lastNameHelp"
                        placeholder="ej.: García"
                        id="lastName"
                        name="lastName"
                        value={lastName ?? ''}
                        onChange={onInputChange} />
                    <div id="nameHelp">

                    </div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="idNumber"
                        className="form-label">
                        DNI
                    </label>
                    <input type="number"
                        inputMode="numeric"
                        className="form-control"
                        aria-describedby="idNumberHelp"
                        placeholder="12345678"
                        id="idNumber"
                        name="idNumber"
                        value={idNumber ?? ''}
                        onChange={onInputChange} />
                    <div id="idNumberHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="dateOfBirth"
                        className="form-label">
                        Fecha de Nacimiento
                    </label>
                    <input type="date"
                        className="form-control"
                        aria-describedby="dateOfBirthHelp"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={dateOfBirth ?? ''}
                        onChange={onInputChange} />
                </div>

                <div className="mb-3 ">
                    <label htmlFor="email"
                        className="form-label">
                        E-mail
                    </label>
                    <input type="email"
                        className="form-control"
                        aria-describedby="emailrHelp"
                        placeholder="example@mail.com"
                        id="email"
                        name="email"
                        value={email ?? ''}
                        onChange={onInputChange} />
                    <div id="emailHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="phoneNumber"
                        className="form-label">
                        Núm. Teléfono
                    </label>
                    <input type="tel"
                        className="form-control"
                        aria-describedby="phoneNumberHelp"
                        placeholder="ej.: 2641223344"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber ?? ''}
                        onChange={onInputChange} />
                    <div id="phoneNumberHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="address"
                        className="form-label">
                        Dirección
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="addressHelp"
                        placeholder="ej.:los Alces 123 - B° San Agustín, Capital, San Juan"
                        id="address"
                        name="address"
                        value={address ?? ''}
                        onChange={onInputChange} />
                    <div id="addressHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="bed"
                        className="form-label">
                        Cama
                    </label>
                    <input type="number"
                        className="form-control"
                        aria-describedby="bedHelp"
                        placeholder="ej.: 20"
                        id="bed"
                        name="bed"
                        value={bed ?? ''}
                        onChange={onInputChange} />
                    <div id="bedHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="room"
                        className="form-label">
                        Habitación
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="roomHelp"
                        placeholder="ej.: 101"
                        id="room"
                        name="room"
                        value={room ?? ''}
                        onChange={onInputChange} />
                    <div id="roomHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <p>Servicio</p>
                    <select className="form-select"
                        aria-label="Default select example"
                        name="service"
                        value={service || ''}
                        onChange={onInputChange}>
                        <option value="" disabled>--Elija una opción--</option>
                        <option value="Urgencias">Urgencias</option>
                        <option value="Clínica Médica">Clínica Médica</option>
                        <option value="Oncología">Oncología</option>
                        <option value="Maternidad">Maternidad</option>
                        <option value="Pediatría">Pediatría</option>
                    </select>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="admissionDate"
                        className="form-label">
                        Fecha de Ingreso
                    </label>
                    <input type="date"
                        className="form-control"
                        aria-describedby="admissionDateHelp"
                        id="admissionDate"
                        name="admissionDate"
                        value={admissionDate ?? ''}
                        onChange={onInputChange}
                        max={new Date().toISOString().split("T")[0]} />
                </div>

                {id &&
                    <div className="mb-3 ">
                        <label htmlFor="medicalDischargeDate"
                            className="form-label">
                            Fecha de Alta
                        </label>
                        <input type="date"
                            className="form-control"
                            aria-describedby="medicalDischargeDateHelp"
                            id="medicalDischargeDate"
                            name="medicalDischargeDate"
                            value={medicalDischargeDate ?? ''}
                            onChange={onInputChange}
                            min={admissionDate}
                            max={new Date().toISOString().split("T")[0]} />
                    </div>
                }

                <div className="text-center">
                    <button className={`btn ${id > 0 ? "btn-primary" : "btn-success"} mb-3 w-75 fw-semibold`}
                        type="submit">
                        {id > 0 ? 'Guardar Cambios' : 'Guardar'}
                    </button>
                </div>
            </form>
        </>
    );
}
