import { useEffect, useReducer, useState } from "react";
import { patientsReducer } from "../reducers/patientsReducer";
import { deletePatient, getPatient, getPatientsPaged, savePatient, updatePatient } from "../services/patientService";
import Swal from "sweetalert2";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays, differenceInMonths, differenceInYears, format, isAfter, parseISO } from "date-fns";
import { patientReducer } from "../reducers/patientReducer";


const initialSearchInput = {
    searchTerm: "",
};

const initialPatientForm = {
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    idNumber: '',
    bed: '',
    room: '',
    service: '',
    dateOfBirth: '',
    admissionDate: '',
    medicalDischargeDate: ''
};

export const usePatients = ({ id }) => {

    const [patientsState, patientsDispatch] = useReducer(patientsReducer, []);
    const [patientState, patientDispatch] = useReducer(patientReducer, {});

    const [isLoading, setIsLoading] = useState(true);

    const [patient, dispatch] = useState(initialPatientForm);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchInput, setSearchInput] = useState(initialSearchInput);
    const [visiblePatientForm, setVisiblePatientForm] = useState(false);
    const navigate = useNavigate();

    const { searchTerm } = searchInput;
    const elementsPerPage = 10;


    useEffect(() => {
        if (patientsState.length > 0) {
            setIsLoading(false);
        }
        if (patientState.id !== undefined) {
            setIsLoading(false);
        }
    }, [patientsState, patientState]);


    const handleVisiblePatientForm = () => {
        setVisiblePatientForm(!visiblePatientForm);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const handleSearchChange = ({ target }) => {
        const { name, value } = target;
        setSearchInput({
            [name]: value,
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
        scrollToTop();
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


    const validateForm = (patientForm) => {
        const {
            firstName,
            lastName,
            bed,
            room,
            service,
            admissionDate,
            medicalDischargeDate
        } = patientForm;

        if (!firstName || !lastName) {
            swalWindow("error", "Campo Vacío.", `Debe comoletar el campo "Nombre" y "Apellido".`);
            return false;
        }
        if (!bed || !room) {
            swalWindow("error", "Campo Vacío.", `Debe comoletar el campo "Cama" y "Habitación".`);
            return false;
        }
        if (!service) {
            swalWindow("error", "Campo Vacío.", `Debe comoletar el campo "Servicio".`);
            return false;
        }
        if (!admissionDate) {
            swalWindow("error", "Campo Vacío.", `Debe comoletar el campo "Fecha de Ingreso".`);
            return false;
        }

        const currentDate = new Date();
        const admissionDateObj = new Date(admissionDate);
        const dischargeDateObj = new Date(medicalDischargeDate);

        if (admissionDateObj > currentDate) {
            swalWindow("error", "Campo Vacío.", "La fecha de ingreso no puede ser posterior al día actual.");
            return false;
        }

        if (medicalDischargeDate && dischargeDateObj < admissionDateObj) {
            swalWindow("error", "Campo Vacío.", "La fecha de alta no puede ser anterior a la fecha de ingreso.");
            return false;
        }

        return true;

    }

    const saveData = async (patientFormData) => {
        try {
            const response = await savePatient(patientFormData);
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

    const updateData = async (patientFormData) => {
        try {
            const response = await updatePatient(patientFormData);
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

    const deleteData = async (id) => {
        try {
            const response = await deletePatient(id);
            const success = response && !response.error;
            return {
                success,
                message: success ? 'Eliminado con éxito' : 'Error al Eliminar: ',
                response,
                data: response,
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error al Eliminar',
                error,
            }
        }
    }

    const getPatientsList = async () => {
        let patientList;
        try {
            if (searchTerm) {
                const response = await getPatientsPaged(currentPage, elementsPerPage, searchTerm);
                patientList = response.content;
                setTotalPages(response.totalPages);
            } else {
                const response = await getPatientsPaged(currentPage, elementsPerPage);
                patientList = response.content;
                setTotalPages(response.totalPages);
            }
            patientsDispatch({
                type: 'setPatientList',
                payload: { id: 'patients', data: patientList },
            });

        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }

    useEffect(() => {
        if (id !== undefined && id !== '') {
            const fetchData = async () => {
                try {
                    const pat = await getPatient(id);

                    patientDispatch({
                        type: 'setPatient',
                        payload: pat,
                    });
                } catch (error) {
                    console.error('Error fetching patient:', error);
                }
            };
            fetchData();
        }
    }, [id]);

    const handleSavePatient = async (patientFormData) => {
        if (patientFormData.id === '' || patientFormData.id === undefined || patientFormData.id === null) {
            const saveResult = await saveData(patientFormData);
            if (saveResult.success) {
                await swalWindow("success", saveResult.message, "Se guardaron con éxito los datos!");
            } else {
                await swalWindow("error", saveResult.message, saveResult.error, "Nicode 2023");
            }
            patientsDispatch({
                type: 'addPatient',
                payload: saveResult.data.patient,
            });
        }
        else {
            const updateResult = await updateData(patientFormData);

            if (updateResult.success) {
                await swalWindow("success", updateResult.message, "Se actualizaron con éxito los datos!");
            } else {
                await swalWindow("error", updateResult.message, updateResult.error);
            }
            patientDispatch({
                type: 'updatePatient',
                payload: patientFormData,
            })
        }
    }

    const handleRemovePatient = async (id) => {
        const result = await Swal.fire({
            title: "¿Desea Eliminar el registro?",
            text: "Esto no se puede revertir.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar",
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const deleteResult = await deleteData(id);
                if (deleteResult.success) {
                    await swalSuccessWindow(deleteResult.message, "Se eliminó con éxito el registro", 'NicoDev 2023');
                    patientsDispatch({
                        type: 'removePatient',
                        payload: id,
                    });
                } else {
                    await swalErrorWindow(deleteResult.message, "Algo ha salido mal al borrar!", deleteResult.error);
                }
            } catch (error) {
                await swalErrorWindow("No se pudo eliminar", "Algo ha salido mal al borrar!", error);
            }
        }
    }

    const calculateDateDifference = (startDate, endDate) => {
        const today = new Date();
        endDate = endDate ? endDate : today;

        if (isAfter(endDate, startDate)) {
            const monthsDifference = differenceInMonths(endDate, startDate);
            const remainingDays = differenceInCalendarDays(endDate, startDate) % 30;

            return {
                months: monthsDifference,
                remainingDays: remainingDays,
            };
        } else {
            return {
                months: 0,
                remainingDays: 0,
            };
        }
    };

    const handlerDateFormat = (date) => {
        const formattedDate = date ? format(new Date(date), "dd-MM-yyyy", { locale: es }) : "Fecha no disponible";
        return formattedDate;
    }

    const calculateAge = (date) => {
        if (!date) {
            return "Fecha no disponible";
        }

        const today = new Date();
        const age = differenceInYears(today, new Date(date));
        return age;
    };


    return {
        patientsState,
        patientState,
        patient,
        isLoading,
        totalPages,
        currentPage,
        searchTerm,
        searchInput,
        initialPatientForm,
        visiblePatientForm,
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

}