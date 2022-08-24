import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import './ShowInscription.css'

const ShowInscription = () => {

    const [fullname, setFullname] = useState('');
    const [carnet, setCarnet] = useState('');
    const [phone, setPhone] = useState('');
    const [poetryGenre, setPoetryGenre] = useState('');
    const [declamationDate, setDeclamationDate] = useState('')

    useEffect(() => {
        const id = localStorage.getItem('participationId')
        axios.get(`http://localhost:3200/contestant/getContestant/${id}`)
            .then((res) => {
                setFullname(res.data.contestantParticipation.fullName);
                setCarnet(res.data.contestantParticipation.carnet);
                setPhone(res.data.contestantParticipation.phone);
                setPoetryGenre(res.data.contestantParticipation.poetryGenre);
                setDeclamationDate(res.data.contestantParticipation.declamationDate)
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: (err.response.data.message || err.response.data),
                    confirmButtonColor: '#E74C3C'
                });
            });
    });

    const exit = () =>{
        localStorage.removeItem('participationId')
    }


    return (
        <div className="box">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-6 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-4">
                            <div className="card-body p-sm-5">
                                <h4 className="card-title text-center">Felicitaciones {fullname}</h4>
                                <p className="text-center"> Te has registrado exitosamente </p>
                                <p className="mb-1">Carnet</p>
                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-person-badge-fill"></i>
                                    <input disabled value={carnet} type="text" className="form-control" placeholder="Carnet" aria-label="Carnet" aria-describedby="basic-addon1" />
                                </div>
                                <p className="mb-1">Teléfono</p>
                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-phone-fill"></i>
                                    <input disabled value={phone} type="text" className="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
                                </div>
                                <p className="mb-1">Género de poesía</p>
                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-blockquote-right"></i>
                                    <input disabled value={poetryGenre} type="text" className="form-control" placeholder="GéneroPoesía" aria-label="Género Poesía" aria-describedby="basic-addon1" />
                                </div>
                                <p className="mb-1">Fecha de Declamación</p>
                                <div className="input-group mb-3">
                                    <i className="input-group-text bi bi-calendar-check-fill"></i>
                                    <input disabled value={declamationDate.slice(0, -14)} type="text" className="form-control" placeholder="FechaDeclamacion" aria-label="Fecha Declamacion" aria-describedby="basic-addon1" />
                                </div>

                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <div className="text-center mt-2">
                                        <button onClick={exit} className="btn btn-primary btn-block">
                                            <span className="bi bi-send-check"><span className="ms-2">Volver</span></span>
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowInscription;