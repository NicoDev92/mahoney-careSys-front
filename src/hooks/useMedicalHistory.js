import { useEffect, useReducer, useState } from "react";
import { medicalHistoryReducer } from "../reducers/medicalHistoryReducer";
import Swal from "sweetalert2";
import { getMedicalHistory, saveMedicalHistory, updatePatientHistory } from "../services/medicalHistoryService";

const initialHistoryForm = {
    id: '',
    sex: '',
    height: '',
    weight: '',
    bloodType: '',
    observations: '',
};

export const useMedicalHistory = ({ id = '' }) => {

    const [medicalHistory, dispatch] = useReducer(medicalHistoryReducer, []);
    const [visibleHistoryForm, setVisibleForm] = useState(false);

    const handleVisibleHistoryForm = () => {
        setVisibleForm(!visibleHistoryForm);
    }

    const calculateImc = (height, weight) => {
        const imc = (weight / (height * height)).toFixed(2);
        return imc;
    }

    const getImcColorClass = (imc) => {
        if (imc < 18.5) {
            return "text-blue"; // Color para bajo peso
        } else if (imc >= 18.5 && imc < 24.9) {
            return "text-green"; // Color para peso normal
        } else if (imc >= 25 && imc < 29.9) {
            return "text-yellow"; // Color para sobrepeso
        } else {
            return "text-red"; // Color para obesidad
        }
    };

    const swalWindow = (icon, title, text, footer) => {
        const currentDate = new Date();
        return Swal.fire({
            icon: icon + '',
            title: title,
            text: text,
            footer: footer || `Nicode  ${currentDate.toLocaleString('es-ES', { year: 'numeric' })}`
        });
    }

    const validateForm = (historyForm) => {

        const {
            sex,
            height,
            weight,
            bloodType,
        } = historyForm;

        if (!sex) {
            swalWindow("error", "Campos vacíos", `El campo "Sexo" no puede estar vacío.`)
            return false;
        }
        if (!height) {
            swalWindow("error", "Campos vacíos", `El campo "Altura" no puede estar vacío.`)
            return false;
        }
        if (!weight) {
            swalWindow("error", "Campos vacíos", `El campo "Peso" no puede estar vacío.`)
            return false;
        }
        if (!bloodType) {
            swalWindow("error", "Campos vacíos", `El campo "Grupo Sangíneo" no puede estar vacío.`)
            return false;
        }
        return true;
    }

    const saveData = async (patientId, patientHistoryFormData) => {
        try {
            const response = await saveMedicalHistory(patientId, patientHistoryFormData);
            const success = response && !response.error;
            return {
                success,
                message: success ? 'Guardado con éxito' : 'Error al guardar: ',
                response,
                data: response,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al guardar',
                error,
            };
        }
    }

    const updateData = async (patientId, patientHistoryFormData) => {
        try {
            const response = await updatePatientHistory(patientId, patientHistoryFormData);
            const success = response && !response.error;
            return {
                success,
                message: success ? 'Actualizado con éxito' : 'Error al actualizar: ',
                response,
                data: response,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al guardar',
                error,
            };
        }
    }

    useEffect(() => {
        if (id !== undefined || id !== '') {
            const fetchData = async () => {
                try {
                    const history = await getMedicalHistory(id);
                    dispatch({
                        type: 'setMedicalHistory',
                        payload: history,
                    });
                } catch (error) {
                    dispatch({
                        type: 'setMedicalHistory',
                        payload: null,
                    });
                }
            };
            fetchData();
        }
    }, [id]);

    const handlerSaveMedicalHistory = async (patientId, patientHistoryFormData) => {
        let type;
        if (patientHistoryFormData.id === '' || patientHistoryFormData.id === undefined) {
            const saveResult = await saveData(patientId, patientHistoryFormData);
            if (saveResult.success) {
                type = 'addMedicalHistory';
                await swalWindow("success", saveResult.message, "Se guardaron con éxito los datos!");
            } else {
                await swalWindow("error", saveResult.message, saveResult.error);
            }
        }
        if (patientHistoryFormData.id !== '' && patientHistoryFormData.id !== undefined) {
            const updateResult = await updateData(patientId, patientHistoryFormData);
            if (updateResult.success) {
                type = 'updateMedicalHistory';
                await swalWindow("success", updateResult.message, "Se actualizaron con éxito los datos!");
            } else {
                await swalWindow("error", updateResult.message, updateResult.error);
            }
        }
        dispatch({
            type: type,
            payload: patientHistoryFormData,
        });
    }

    return {
        medicalHistory,
        visibleHistoryForm,
        handleVisibleHistoryForm,
        handlerSaveMedicalHistory,
        calculateImc,
        getImcColorClass,
        validateForm,
    }
}