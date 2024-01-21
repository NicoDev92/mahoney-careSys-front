import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {

    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    const [darkMode, setDarkMode] = useState(storedDarkMode);
    const currentDate = new Date();

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <nav className="navbar bg-primary-subtle">
                <div className="container-fluid">
                    <NavLink className={`navbar-brand ${darkMode ? 'text-white' : 'text-dark'}`}
                        to="/">
                        <img src="/src/assets/mahoney-logo.png"
                            alt="Logo" width="35" height="35"
                            className={`me-2 d-inline-block align-text-top  ${darkMode ? 'logo-light' : 'logo-dark'}`}
                        />
                        Mahoney CareSys
                    </NavLink>
                    <div className="d-flex align-items-center justify-content-centert">

                        <div className="form-check form-switch m-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                checked={darkMode}
                                onChange={toggleDarkMode}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                {darkMode ?
                                    <ion-icon name="moon"></ion-icon> :
                                    <ion-icon name="sunny"></ion-icon>
                                }
                            </label>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </div>
                    <div className="offcanvas offcanvas-end bg-primary-subtle" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Mahoney CareSys</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body d-flex flex-column justify-content-between">
                            <div>
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li>
                                        <NavLink className="nav-link m-2" to="/">
                                            Inicio
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="nav-link m-2" to="/patients">
                                            Pacientes
                                        </NavLink>
                                    </li>

                                    <li>
                                        <div className="form-check form-switch m-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="flexSwitchCheckDefault"
                                                checked={darkMode}
                                                onChange={toggleDarkMode}
                                            />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                                {darkMode ?
                                                    <ion-icon name="moon"></ion-icon> :
                                                    <ion-icon name="sunny"></ion-icon>
                                                }
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className='mb-3'>
                                {<h3 className="fs-5 text-center">Nicode  {currentDate.toLocaleString('es-ES', { year: 'numeric' })}</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

