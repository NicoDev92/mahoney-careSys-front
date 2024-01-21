import { useEffect, useState } from "react";
import { useNursingControls } from "../hooks/useNursingControls";
import Swal from "sweetalert2";

export const NursingControlForm = ({ nursingControlId = '', handleVisibleControlForm = '', medicalHistoryId, handlerSaveNursingControl, initialNursingControlForm }) => {

    const [nursingControlForm, setNursingControlForm] = useState(initialNursingControlForm);

    const {
        validateNotEmptyValue,
        validateBloodPressureFormat,
        validateControlDate,
    } = useNursingControls({ patientId: '' });

    const {
        id,
        heartRate,
        respiratoryRate,
        temperature,
        bloodPressure,
        controlDate,
        observations
    } = nursingControlForm ?? {};

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        const sanitizedValue = name === "temperature" ? value.replace(",", ".") : value;
        setNursingControlForm({
            ...nursingControlForm,
            [name]: sanitizedValue,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!validateNotEmptyValue(nursingControlForm)) {
            return;
        }

        if (!validateBloodPressureFormat(nursingControlForm.bloodPressure)) {
            return;
        }

        if (!validateControlDate(nursingControlForm.controlDate)) {
            return
        }

        handlerSaveNursingControl(medicalHistoryId, nursingControlForm);
        handleVisibleControlForm();
    }

    return (
        <>
            <form className="container" onSubmit={onSubmit}>
                <input type="hidden"
                    name="id"
                    value={id ?? ''} />
                <div className="row d-flex justify-content-between">

                    {(id > 0) ?
                        <div className="col">
                            <h5 className="my-4"> Modificar Control de Signos vitales</h5>
                        </div> :
                        <div className="col">
                            <h5 className="my-4"> Agregar Control de Signos vitales</h5>
                        </div>
                    }

                    <div className="col d-flex justify-content-end" style={{ height: '30px', width: '30px' }}>
                        <button className="btn btn-danger btn-sm"
                            onClick={handleVisibleControlForm}> X </button>
                    </div>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="heartRate"
                        className="form-label">
                        Frecuencia Cardíaca (LPM)
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="heartRateHelp"
                        placeholder="ej.:77"
                        id="heartRate"
                        name="heartRate"
                        value={heartRate ?? ''}
                        onChange={onInputChange}
                    />
                    <div id="departmentHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="respiratoryRate"
                        className="form-label">
                        Frecuencia Respiratoria (RPM)
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="respiratoryRateHelp"
                        placeholder="ej.:18"
                        id="respiratoryRate"
                        name="respiratoryRate"
                        value={respiratoryRate ?? ''}
                        onChange={onInputChange}
                    />
                    <div id="departmentHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="bloodPressure"
                        className="form-label">
                        Presión sanguínea (mmHg)
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="bloodPressureHelp"
                        placeholder="ej.: 120/80"
                        id="bloodPressure"
                        name="bloodPressure"
                        value={bloodPressure ?? ''}
                        onChange={onInputChange}
                    />
                    <div id="departmentHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="temperature"
                        className="form-label">
                        Temperatura (°C)
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="temperatureHelp"
                        placeholder="ej.: 36,8"
                        id="temperature"
                        name="temperature"
                        value={temperature ?? ''}
                        onChange={onInputChange}
                    />
                    <div id="departmentHelp" className="form-text">{/* contador de caracteres */}</div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="dateTime" className="form-label">
                        Fecha y Hora
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="controlDate"
                        name="controlDate"
                        value={controlDate ?? ''}
                        onChange={onInputChange}
                    />
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
                        onChange={onInputChange}
                    />
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