import { NavLink, useParams } from "react-router-dom";
import { PatientData } from "../components/PatientData.jsx";
import { usePatients } from "../hooks/usePatients.js";
import { MedicalHistory } from "../components/MedicalHistory.jsx";
import { useMedicalHistory } from "../hooks/useMedicalHistory.js";
import { NursingControls } from "../components/NursingControls.jsx";
import { useNursingControls } from "../hooks/useNursingControls.js";
import { PatientHistoryForm } from "../components/PatientHistoryForm.jsx";
import { NursingControlForm } from "../components/NursingControlForm.jsx";
import { PatientForm } from "../components/PatientForm.jsx";
import { useEffect, useRef, useState } from "react";
import { ExportToPdfButton } from "../components/ExportToPdfButton.jsx";


export const PatientInfoPage = ({
    visiblePatientForm,
    initialPatientForm,
    calculateAge,
    handlerDateFormat,
    calculateDateDifference,
    handleVisiblePatientForm,
}) => {

    const { id } = useParams();

    const nursingControlsChartRef = useRef();
    const medicalHistoryRef = useRef();
    const patientDataRef = useRef();
    const nursingControlClass = useRef();

    const {
        patientState,
        isLoading,
        handleSavePatient,
    } = usePatients({ id });

    const {
        nursingControls,
        visibleNursingControlForm,
        initialNursingControlForm,
        handlerSaveNursingControl,
        handleVisibleControlForm,
    } = useNursingControls({ patientId: id });

    const {
        medicalHistory,
        visibleHistoryForm,
        handleVisibleHistoryForm,
        calculateImc,
        getImcColorClass,
        handlerSaveMedicalHistory
    } = useMedicalHistory({ id });
    /* 
        useEffect(() => {
            nursingControlClass.current = document.getElementsByClassName("nursingControlClass")
            nursingControlsChartRef.current = document.getElementById("nursingControlsChartRef");
            medicalHistoryRef.current = document.getElementById("medicalHistory");
            patientDataRef.current = document.getElementById("patientData");
        }, [nursingControls]); */

    return (
        <>
            {!visibleHistoryForm ||
                <div className="open-modal animation fadeIn">
                    <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <PatientHistoryForm
                                        patientId={id}
                                        handlerSaveMedicalHistory={handlerSaveMedicalHistory}
                                        handleVisibleHistoryForm={handleVisibleHistoryForm}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {!visibleNursingControlForm ||
                <div className="open-modal animation fadeIn">
                    <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <NursingControlForm
                                        medicalHistoryId={medicalHistory.id}
                                        initialNursingControlForm={initialNursingControlForm}
                                        handleVisibleControlForm={handleVisibleControlForm}
                                        handlerSaveNursingControl={handlerSaveNursingControl}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {!visiblePatientForm ||
                <div className="open-modal animation fadeIn">
                    <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <PatientForm
                                        patientState={patientState}
                                        isModal={true}
                                        patientId={id}
                                        initialPatientForm={initialPatientForm}
                                        handleSavePatient={handleSavePatient}
                                        handleVisiblePatientForm={handleVisiblePatientForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className="container">
                <div className="text-end mt-4">
                    <NavLink className="btn btn-warning"
                        to={"/patients"}>
                        <span className=" d-flex align-items-center justify-content-center">
                            <ion-icon name="arrow-back-sharp"></ion-icon>
                            <span className="ms-2">
                                Volver
                            </span>
                        </span>
                    </NavLink>
                </div>

                {isLoading ?
                    <div className="w-100 d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                        <div className="loader"></div>
                    </div>
                    :
                    <div className="card m-4">
                        <div>
                            <div id="patientData">
                                <PatientData
                                    calculateAge={calculateAge}
                                    handlerDateFormat={handlerDateFormat}
                                    calculateDateDifference={calculateDateDifference}
                                    patientState={patientState}
                                />

                            </div>

                            <div className="w-100 text-center">
                                <button className="btn btn-primary mb-3 fw-semibold"
                                    onClick={handleVisiblePatientForm} >
                                    Actualizar
                                </button>
                            </div>
                        </div>

                        <div className="border w-75 m-auto border-warning-subtle border-opacity-50"></div>

                        <div className="row m-2">

                            {medicalHistory ? (
                                <div className="col">
                                    <MedicalHistory
                                        medicalHistory={medicalHistory}
                                        calculateImc={calculateImc}
                                        getImcColorClass={getImcColorClass}
                                        handleVisibleHistoryForm={handleVisibleHistoryForm} />
                                </div>

                            ) : <div className="col m-2 text-center">
                                <p className="fw-bold text">Historia clínica:</p>
                                <div className="alert alert-warning text-center w-75 mx-auto" role="alert">
                                    <span>Historia clínica no registrada.</span>
                                </div>
                                <button className="btn btn-primary fw-semibold text-light"
                                    onClick={handleVisibleHistoryForm}>
                                    Registrar Historia Clínica
                                </button>
                            </div>}
                        </div>

                        <div className="border w-75 m-auto border-warning-subtle border-opacity-50"></div>

                        <div className="row m-2 text-center">
                            <div className="d-flex alig-items-center justify-content-center flex-column">
                                <div className="d-flex alig-items-center justify-content-between">
                                    <p className="fw-bold">Controles de signos vitales:</p>

                                    {medicalHistory &&
                                        <button className="btn btn-primary btn-xl fw-semibold m-1"
                                            onClick={handleVisibleControlForm}>
                                            Agregar control
                                        </button>
                                    }
                                </div>
                            </div>

                            {!medicalHistory &&
                                <div className="d-flex alig-items-center justify-content-center">
                                    <div className="alert alert-warning text-center w-75" role=" alert">
                                        <span>Debe añadir una Historia Clínica donde guardar los Controles de signos vitales.</span>
                                    </div>
                                </div>
                            }

                            {(medicalHistory && nursingControls.length > 0) ?
                                <div>
                                    <NursingControls
                                        nursingControls={nursingControls} />
                                </div>
                                :
                                <div className="d-flex alig-items-center justify-content-center">
                                    <div className="alert alert-warning text-center w-75 mt-4" role=" alert">
                                        <span>No hay regisros de signos vitales a la fecha.</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }

            </div >
        </>
    );
}