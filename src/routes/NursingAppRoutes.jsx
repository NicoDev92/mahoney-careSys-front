import { Route, Routes } from "react-router-dom";
import { PatientsListPage } from "../pages/PatientsListPage";
import { PatientInfoPage } from "../pages/PatientInfoPage";
import { Navbar } from "../components/layout/Navbar";
import { Home } from "../pages/Home";
import { Footer } from "../components/layout/Footer";
import { usePatients } from "../hooks/usePatients";
import { PatientProvider } from "../context/PatientProvider";


export const NursingAppRoutes = () => {

    const {
        patientsState,
        totalPages,
        currentPage,
        searchTerm,
        searchInput,
        patient,
        visiblePatientForm,
        initialPatientForm,
        getPatientsList,
        handleSearchChange,
        handlePageChange,
        handleRemovePatient,
        handleSavePatient,
        handleVisiblePatientForm,
        calculateAge,
        handlerDateFormat,
        calculateDateDifference,
    } = usePatients({ id: '' });


    return (
        <>
            <Navbar />
            <PatientProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patients" element={<PatientsListPage />} />
                    <Route path="/patient/:id" element={<PatientInfoPage
                        visiblePatientForm={visiblePatientForm}
                        initialPatientForm={initialPatientForm}
                        calculateAge={calculateAge}
                        handlerDateFormat={handlerDateFormat}
                        calculateDateDifference={calculateDateDifference}
                        handleVisiblePatientForm={handleVisiblePatientForm}
                    />} />
                </Routes>
            </PatientProvider>
            <Footer />
        </>
    )
}