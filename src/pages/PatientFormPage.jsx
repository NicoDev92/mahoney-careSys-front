import { PatientForm } from "../components/PatientForm";
import { useParams } from "react-router-dom";

export const PatientFormPage = () => {
    const { id } = useParams();

    return (
        <>
            <PatientForm patientId={id} />
        </>
    );
};
