import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const Form = () => {
    //states for save a task
    const [navigate, setNavigate] = useState(false);
    const [fullname, setFullname] = useState('');
    const [carnet, setCarnet] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('DEFAULT');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [studentCareer, setStudentCareer] = useState('');
    const [poetryGenre, setPoetryGenre] = useState('DEFAULT');

    //make the request to the API and save
    const SendForm = async (event) => {
        event.preventDefault();

        //parameters needed to save task
        let parameters = {
            carnet: carnet,
            fullname: fullname,
            address: address,
            gender: gender,
            phone: phone,
            birthDate: birthDate,
            studentCareer: studentCareer,
            poetryGenre: poetryGenre
        }

        await axios.post('http://localhost:3200/contestant/saveContestant', parameters)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: (res.data.message),
                    confirmButtonColor: '#28B463',
                    timer: 2400
                });
                CleanStates();
                localStorage.setItem('participationId', res.data.contestant._id);
                setNavigate(true);
            }).catch((err) => {
                Swal.fire({
                    timer: 2400,
                    icon: 'error',
                    title: (err.response.data.message || err.response.data),
                    confirmButtonColor: '#E74C3C'
                });
            });
    };

    if (navigate) {
        return <Navigate to='/showInscription' />;
    }

    const CleanStates = () => {
        setFullname('');
        setCarnet('');
        setAddress('');
        setGender('DEFAULT');
        setPhone('');
        setBirthDate('');
        setStudentCareer('');
        setPoetryGenre('DEFAULT');
    }

    return (
        <div>
            <div className="container">
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src="https://www3.gobiernodecanarias.org/medusa/ecoescuela/familias/files/2020/03/calendar.png" alt="" className="img-fluid mb-3 d-none d-md-block" />
                        <h2>Inscríbete en nuestro concurso</h2>
                        <p className="font-italic text-muted mb-0">Regístrate para participar en el mayor concurso de poesía de Guatemala</p>
                        <p className="font-italic text-muted"><b>Universidad de Guatemala</b></p>
                    </div>

                    <div className="col-md-7 col-lg-6 ml-auto">
                        <form onSubmit={SendForm}>
                            <div className="row">

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-card-text"></i>
                                    <input value={fullname} type="text" className="form-control" placeholder="Nombre Completo" aria-label="Nombre Completo" aria-describedby="basic-addon1" onChange={event => setFullname(event.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-person-badge-fill"></i>
                                    <input value={carnet} type="text" className="form-control" placeholder="Carnet" aria-label="Carnet" aria-describedby="basic-addon1" onChange={event => setCarnet(event.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-geo-alt-fill"></i>
                                    <input value={address} type="text" className="form-control" placeholder="Dirección" aria-label="Dirección" aria-describedby="basic-addon1" onChange={event => setAddress(event.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-gender-ambiguous"></i>
                                    <select value={gender} className="form-select" aria-label="gender" onChange={event => setGender(event.target.value)}>
                                        <option value="DEFAULT" disabled>Genero</option>
                                        <option value="Hombre">Masculino</option>
                                        <option value="Mujer">Femenino</option>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-phone-fill"></i>
                                    <input value={phone} type="text" className="form-control" placeholder="Teléfono" aria-label="Teléfono" aria-describedby="basic-addon1" onChange={event => setPhone(event.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-calendar-event"></i>
                                    <input value={birthDate} type="date" className="form-control" placeholder="Fecha de Nacimiento" aria-label="Fecha de Nacimiento" aria-describedby="basic-addon1" onChange={event => setBirthDate(event.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-person-workspace"></i>
                                    <input value={studentCareer} type="text" className="form-control" placeholder="Carrera de Estudiante" aria-label="Carrera de Estudiante" aria-describedby="basic-addon1" onChange={event => setStudentCareer(event.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-blockquote-right"></i>
                                    <select value={poetryGenre} className="form-select" aria-label="Género de poesía" onChange={event => setPoetryGenre(event.target.value)}>
                                        <option value="DEFAULT" disabled>Género de poesía</option>
                                        <option value="Lirica">Lírica</option>
                                        <option value="Epico">Épica</option>
                                        <option value="Dramatico">Dramática</option>
                                    </select>
                                </div>


                                <div className="text-center">
                                    <button type='submit' className="btn btn-primary btn-block py-2">
                                        <span className="bi bi-send-check"><span className="ms-2">Inscribirme</span></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;