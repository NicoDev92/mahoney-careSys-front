import { usePatients } from "../hooks/usePatients"
import { PatientContext } from "./PatientContext"


export const PatientProvider = ({ children }) => {

    const {

        patientsState,
        patientState,
        patient,
        totalPages,
        currentPage,
        searchTerm,
        searchInput,
        initialPatientForm,
        visiblePatientForm,
        isLoading,
        getPatientsList,
        handleSearchChange,
        handlePageChange,
        handleSavePatient,
        handleRemovePatient,
        calculateDateDifference,
        handlerDateFormat,
        calculateAge,
        handleVisiblePatientForm,
        validateForm,
    } = usePatients({ id: '' })
    return (
        <PatientContext.Provider
            value={
                {
                    patientsState,
                    patientState,
                    patient,
                    totalPages,
                    currentPage,
                    searchTerm,
                    searchInput,
                    initialPatientForm,
                    visiblePatientForm,
                    isLoading,
                    getPatientsList,
                    handleSearchChange,
                    handlePageChange,
                    handleSavePatient,
                    handleRemovePatient,
                    calculateDateDifference,
                    handlerDateFormat,
                    calculateAge,
                    handleVisiblePatientForm,
                    validateForm,
                }
            }>
            {children}

        </PatientContext.Provider>
    )
}