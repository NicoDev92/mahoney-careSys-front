import { EmailForm } from "./EmailForm";

export const Footer = () => {

    const currentDate = new Date();

    return (
        <>
            <nav className="navbar border-bottom border-body mt-4 flex-end bg-primary-subtle">
                <div className="row w-100">
                    <div className="col navbar-nav flex-grow-1 m-4">
                        {<h3 className="fs-5 text-center">Nicode  {currentDate.toLocaleString('es-ES', { year: 'numeric' })}</h3>}

                        <p className="fs-7 p-2">Mahoney CareSys es un proyect ficticio,
                            a fin de demostrar habilidades en React JS, HTML, CSS, JAVA - Spring.
                        </p>
                        <p className="fs-7 p-2">
                            Las personas mostradas, al igual que sus datos, son ficticias y cualquier parecido con la realidad, es mera coincidencia.
                        </p>
                    </div>
                    <div className="col navbar-nav flex-grow-1 m-4">
                        <h3 className="fs-5 text-center">No dudes en ponerte en contacto!</h3>
                        <ul className="d-inline-flex align-items-center justify-content-center">
                            <li className="px-4 d-flex align-items-center text-center">
                                <a
                                    className="link-underline-light fs-1 link-offset-2 link-offset-3-hover link-underline-opacity-0 link-underline-opacity-75-hover"
                                    href="https://www.linkedin.com/in/alenolmedo92"
                                    target="_blank"
                                    rel="noreferrer">
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </a>
                            </li>
                            <li className="my-2 p-2 px-4 d-flex align-items-center">
                                <a className="link-underline-light fs-1 link-offset-2 link-offset-3-hover link-underline-opacity-0 link-underline-opacity-75-hover"
                                    href="https://github.com/NicoDev92"
                                    target="_blank"
                                    rel="noreferrer">
                                    <ion-icon name="logo-github"></ion-icon>
                                </a>
                            </li>
                        </ul>

                        <EmailForm />
                    </div>
                </div>
            </nav >
        </>
    )
}