
import { useContext, useEffect, useState } from "react";
import { PatientRow } from "./PatientRow";
import { Paginator } from "./layout/Paginator";
import { PatientForm } from "./PatientForm";
import { PatientContext } from "../context/PatientContext";
import { NavLink } from "react-router-dom";


export const PatientList = () => {

    const {
        patientsState,
        totalPages,
        currentPage,
        searchTerm,
        isLoading,
        searchInput,
        visiblePatientForm,
        initialPatientForm,
        getPatientsList,
        handleSearchChange,
        handlePageChange,
        handleRemovePatient,
        handleSavePatient,
        handleVisiblePatientForm,
    } = useContext(PatientContext);


    useEffect(() => {
        getPatientsList();
    }, [searchInput]);


    useEffect(() => {
        getPatientsList();
    }, [currentPage]);

    return (
        <>
            {!visiblePatientForm ||
                <div className="open-modal animation fadeIn">
                    <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <PatientForm
                                        handleSavePatient={handleSavePatient}
                                        initialPatientForm={initialPatientForm}
                                        isModal={true}
                                        handleVisiblePatientForm={handleVisiblePatientForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


            <div className="container">
                <h2>Pacientes</h2>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary d-flex align-items-center justify-content-between mb-4"
                            onClick={handleVisiblePatientForm}>
                            <ion-icon name="person-add"></ion-icon>
                            <div className="mx-2">Nuevo paciente</div>
                        </button>
                    </div>

                    <div className="col-md-6">
                        <form className="d-flex justify-content-center align-items-center w-75 mb-4" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Buscar por Nombre, apellido o servicio..."
                                aria-label="Search"
                                id="searchInput"
                                name="searchTerm"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <label htmlFor="searchInput">
                                <div className="border bg-info rounded-circle p-1 fs-3 text-light fw-bold d-flex justify-content-center align-items-center">
                                    <ion-icon name="search"></ion-icon>
                                </div>
                            </label>
                        </form>
                    </div>

                </div>

                {(patientsState.length > 0 && !isLoading) &&
                    (<div className="d-flex flex-column align-items-center">
                        <Paginator
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            totalPages={totalPages} />
                        <table className="table table-striped table-hover my-3">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Ubicación</th>
                                    <th>Sector</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientsState.map((patient) => (
                                    <PatientRow
                                        key={patient.id}
                                        patient={patient}
                                        handleRemovePatient={handleRemovePatient}
                                    />
                                ))}
                            </tbody>
                        </table>
                        {patientsState.length > 3 &&
                            <Paginator
                                handlePageChange={handlePageChange}
                                currentPage={currentPage}
                                totalPages={totalPages} />
                        }
                    </div>

                    )}

                {isLoading &&
                    <div className="w-100 d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                        <div className="loader"></div>
                    </div>
                }
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
            </div>
        </>
    )
}