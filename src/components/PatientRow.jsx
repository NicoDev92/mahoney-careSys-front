import { NavLink } from "react-router-dom";


export const PatientRow = ({ patient, handleRemovePatient }) => {

    const {
        id,
        firstName,
        lastName,
        idNumber,
        bed,
        room,
        service } = patient;

    return (
        <>
            <tr key={id}>
                <td>
                    <NavLink
                        className="patient-row-link"
                        to={`${''}/patient/${id}`}>
                        <div>
                            {lastName}, {firstName}
                        </div>
                    </NavLink>
                </td>
                <td>{idNumber}</td>
                <td>Cama: {bed}, Hab.: {room}</td>
                <td>{service}</td>
                <td>
                    <div className="btn-group d-flex align-items-center justify-content-center">
                        <button type="button"
                            className="btn btn-info btn-sm rounded d-flex align-items-center justify-content-center"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <ion-icon name="caret-down-outline"></ion-icon>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end text-center">
                            <li className="m-2">
                                <NavLink className="btn btn-info btn-sm m-1 text-light fw-semibold"
                                    to={`${''}/patient/${id}`}>
                                    Ver
                                </NavLink>
                            </li>
                            <li className="m-2">
                                <button type="button" className="btn btn-danger btn-sm m-1 fw-semibold"
                                    onClick={() => handleRemovePatient(id)}>
                                    Borrar
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}