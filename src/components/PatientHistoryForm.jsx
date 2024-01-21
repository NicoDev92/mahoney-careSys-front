import { useEffect, useState } from "react";
import { useMedicalHistory } from "../hooks/useMedicalHistory"
import Swal from "sweetalert2";


export const PatientHistoryForm = ({ handlerSaveMedicalHistory, patientId, handleVisibleHistoryForm }) => {

    const {
        initialHistoryForm,
        medicalHistory,
        validateForm,
    } = useMedicalHistory({ id: patientId });

    const [historyForm, setHistoryForm] = useState(initialHistoryForm);

    const {
        id,
        sex,
        height,
        weight,
        bloodType,
        observations,
    } = historyForm ? historyForm : {};

    useEffect(() => {
        setHistoryForm({ ...medicalHistory });
    }, [medicalHistory]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        const sanitizedValue = name === "weight" || name === "height" ? value.replace(",", ".") : value;
        setHistoryForm({
            ...historyForm,
            [name]: sanitizedValue,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (validateForm(historyForm)) {
            handlerSaveMedicalHistory(patientId, historyForm);
            handleVisibleHistoryForm();
        }
        return;
    }

    return (
        <><div className="d-flex align-items-center justify-content-between w-100  mb-3">
            {id ?

                <h4 className="fs-5 m-0">Actualizar Historia Clínica</h4> :
                <h4 className="mx-4">Guardar nueva Historia Clínica</h4>
            }
            <div>
                <button className="btn btn-danger btn-sm"
                    onClick={handleVisibleHistoryForm}>
                    X
                </button>
            </div>
        </div>
            <form className="container" onSubmit={onSubmit}>
                <input type="hidden"
                    name="id"
                    value={id ?? ''} />
                <div className="mb-3 ">
                    <label htmlFor="sex"
                        className="form-label">
                        Sexo
                    </label>
                    <select className="form-select"
                        aria-label="Default select example"
                        name="sex"
                        value={sex ?? ''}
                        id="sex"
                        onChange={onInputChange}>
                        <option value="" disabled>--Elija una opción--</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="bloodType"
                        className="form-label">
                        Grupo sanguíneo
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        name="bloodType"
                        value={bloodType ?? ''}
                        id="bloodType"
                        onChange={onInputChange} >
                        <option value="" disabled>--Elija una opción--</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="weight"
                        className="form-label">
                        Peso
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="weightHelp"
                        placeholder="ej.: 88,9"
                        id="weight"
                        name="weight"
                        value={weight ?? ''}
                        onChange={onInputChange}
                    />
                    <div id="departmentHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="height"
                        className="form-label">
                        Altura
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="heighttHelp"
                        placeholder="ej.: 1,79"
                        id="height"
                        name="height"
                        value={height ?? ''}
                        onChange={onInputChange} />
                    <div id="departmentHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="observations"
                        className="form-label">
                        Observaciones
                    </label>
                    <textarea
                        className="form-control"
                        id="observations"
                        name="observations"
                        value={observations ?? ''}
                        rows={2}
                        onChange={onInputChange} />
                </div>

                <div className="text-center">
                    <button className={`btn ${id > 0 ? "btn-primary" : "btn-success"} mb-3 w-75 fw-semibold`}
                        type="submit">
                        {id > 0 ? 'Guardar Cambios' : 'Guardar'}
                    </button>
                </div>
            </form>
        </>
    )
}