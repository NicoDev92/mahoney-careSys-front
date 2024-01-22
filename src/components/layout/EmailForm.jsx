import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export const EmailForm = () => {

    const [formResetKey, setFormResetKey] = useState(0);
    const currentDate = new Date();
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAIL_PUBLIC_KEY)
            .then((result) => {
                Swal.fire({
                    icon: "success",
                    title: "Se envió tu correo correctamente 🚀📨",
                    text: "Pronto me pondré en contacto contigo.",
                    footer: `Nicode  ${currentDate.toLocaleString('es-ES', { year: 'numeric' })}`
                });

                setFormResetKey(prevKey => prevKey + 1);
            }, (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Algo sucedió mal 😓",
                    text: "Si el problema persiste, contáctame a través de Linkedin.",
                    footer: `Nicode  ${currentDate.toLocaleString('es-ES', { year: 'numeric' })}`
                });
                console.log(error.text);
            });
    };
    return (
        <>
            <form ref={form} onSubmit={sendEmail} key={formResetKey}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">E-mail:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        name="user_email"
                    />
                    <div id="emailHelp" className="form-text">Nunca compartiré tu e-mail con nadie! 🙊</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Nombre o empresa:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="user_name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Textarea" className="form-label">Tu mensaje:</label>
                    <textarea
                        className="form-control"
                        placeholder="Pronto me pondré en contacto!"
                        id="Textarea"
                        name="message">
                    </textarea>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    value={"Send"}
                >Enviar!
                </button>
            </form>
        </>
    );

}