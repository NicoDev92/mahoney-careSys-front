import { useEffect, useReducer, useState } from "react";
import { nursingControlReducer } from "../reducers/nursingControlReducer";
import Swal from "sweetalert2";
import { getAllNursingControls, saveNursingControl, updateNursingControl } from "../services/nursingControlService";


const initialNursingControlForm = {
    id: '',
    heartRate: '',
    respiratoryRate: '',
    bloodPressure: '',
    temperature: '',
    observations: '',
    controlDate: '',
}

export const useNursingControls = ({ patientId = '', controlId = '' }) => {

    const [nursingControls, dispatch] = useReducer(nursingControlReducer, []);
    const [visibleNursingControlForm, setVisibleNursingControlForm] = useState(false);

    const handleVisibleControlForm = () => {
        setVisibleNursingControlForm(!visibleNursingControlForm);
    }

    const swalWindow = (icon, title, text, footer) => {
        const currentDate = new Date();
        return Swal.fire({
            icon: icon + '',
            title: title,
            text: text,
            footer: footer || `Nicode  ${currentDate.toLocaleString('es-ES', { year: 'numeric' })}`
        });
    }

    const validateBloodPressureFormat = (bloodPressure) => {
        if (!bloodPressure || !bloodPressure.includes('/')) {
            swalWindow("error", "Presión sanguínea no válida", "El campo de presión sanguínea debe contener el formato correcto (por ejemplo, 120/80).")
            return false;
        }
        return true;
    };

    const validateControlDate = (controlDate) => {
        const currentDate = new Date();
        const enteredDate = new Date(controlDate);

        if (enteredDate > currentDate || enteredDate === undefined) {
            swalWindow("error",
                "Fecha no válida",
                "La fecha introducida es posterior al día de hoy.",
                `Fecha de hoy:
                ${currentDate.toLocaleString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })})`);
            return false;
        }
        return true;
    }

    const validateNotEmptyValue = (nursingControlForm) => {
        const {
            heartRate,
            respiratoryRate,
            bloodPressure,
            temperature,
            controlDate,
            observations } = nursingControlForm;

        if (!heartRate) {
            swalWindow("error", "Campos obligatorios vacíos", "Por favor, ingresa la frecuencia cardíaca antes de guardar.");
            return false;
        }

        if (!respiratoryRate) {
            swalWindow("error", "Campos obligatorios vacíos", "Por favor, ingresa la frecuencia respiratoria antes de guardar.");
            return false;
        }

        if (!temperature) {
            swalWindow("error", "Campos obligatorios vacíos", "Por favor, ingresa la temperatura antes de guardar.");
            return false;
        }

        if (!bloodPressure) {
            swalWindow("error", "Campos obligatorios vacíos", "Por favor, ingresa la presión sanguinea antes de guardar.");
            return false;
        }

        if (!controlDate) {
            swalWindow("error", "Campos obligatorios vacíos", "Por favor, ingresa la fecha del control antes de guardar.");
            return false;
        }


        if (!observations) {
            swalWindow("error", "Campos obligatorios vacíos", "Por favor, ingresa las observaciones antes de guardar.",);
            return false;
        }

        return true;
    }

    const saveData = async (historyId, nursingControlFormData) => {
        try {
            const response = await saveNursingControl(historyId, nursingControlFormData);
            const success = response && !response.error;
            return {
                success,
                message: success ? 'Guardado con éxito' : 'Error al guardar: ', response,
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

    const updateData = async (historyId, nursingControlFormData) => {
        try {
            const response = await updateNursingControl(historyId, nursingControlFormData);
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
                message: 'Error al actualizar',
                error,
            };
        }
    }

    useEffect(() => {
        if (patientId !== undefined && patientId !== '') {
            const fetchData = async () => {
                try {
                    const controlsList = await getAllNursingControls(patientId);
                    dispatch({
                        type: 'setNursingControls',
                        payload: { id: 'controlsList', data: controlsList },
                    });
                } catch (error) {
                    dispatch({
                        type: 'setNursingControls',
                        payload: null,
                    });
                }
            };
            fetchData();
        }
    }, [patientId]);

    const handlerSaveNursingControl = async (historiId, nursingControlFormData) => {
        let type;
        let result;
        if (nursingControlFormData.id === ''
            || nursingControlFormData.id === undefined
            || nursingControlFormData.id === null) {
            result = await saveData(historiId, nursingControlFormData);
            if (result.success) {
                type = 'addNursingControl';
                await swalWindow("success", result.message, "Se guardaron con éxito los datos!");
            } else {
                await swalWindow("error", result.message, result.error);
            }
        }
        else {
            result = await updateData(historiId, nursingControlFormData);
            if (result.success) {
                type = 'updateNursingControl';
                await swalWindow("success", result.message, "Se actualizaron con éxito los datos!");
            } else {
                await swalWindow("error", result.message, result.error);
            }
        }
        await dispatch({
            type: type,
            payload: nursingControlFormData,
        });
    }

    return {
        nursingControls,
        visibleNursingControlForm,
        initialNursingControlForm,
        handlerSaveNursingControl,
        handleVisibleControlForm,
        validateNotEmptyValue,
        validateBloodPressureFormat,
        validateControlDate,
    }
}