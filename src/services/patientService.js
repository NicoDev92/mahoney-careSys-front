const URL_API = `${import.meta.env.VITE_API_BASE_URL}/patients`;

export const getPatientsPaged = async (pageNumber = 0, elementsQuantity = 10, keyword) => {
    let url = `${URL_API}/paged-patients`;

    if (keyword) {
        url = `${URL_API}/search/${keyword}`;
    }

    try {
        const response = await fetch(`${url}?pageNumber=${pageNumber}&elementsQuantity=${elementsQuantity}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const patients = await response.json();
        return patients;
    } catch (error) {
        console.error('Error getting patients: ', error);
        throw error;
    }
}

export const getPatient = async (id) => {
    try {
        const response = await fetch(`${URL_API}/patient/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`No se pudo encontrar al paciente con id: ${id}. ${response.statusText}`);
        }

        const patientlData = await response.json();

        return patientlData;
    } catch (error) {
        console.error('Error al buscar:', error);
        throw error;
    }
}

export const savePatient = async (data) => {

    try {
        const response = await fetch(`${URL_API}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.statusText}`);
        }

        const successMessage = await response.json();

        return successMessage;
    } catch (error) {
        console.error('Error al guardar:', error);
        throw error;
    }
}

export const updatePatient = async (data) => {
    try {
        const response = await fetch(`${URL_API}/update/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar: ${response.statusText}`);
        }

        const successMessage = await response.json();

        return successMessage;
    } catch (error) {
        console.error('Error al actualizar:', error);
        throw error;
    }
};

export const deletePatient = async (id) => {
    const url = `${URL_API}/delete/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar: ', response.statusText);
        }

        const successMesage = await response.json();

        return successMesage;

    } catch (error) {
        console.error('Error al eliminar:', error);
        throw error;
    }
}