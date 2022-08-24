import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const ShowParticipation = () => {

    //status for show participations
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3200/contestant/getContestants')
            .then((res) => {
                setParticipants(res.data.participants);
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: (err.response.data.message || err.response.data),
                    confirmButtonColor: '#E74C3C'
                });
            });
    })

    return (
        <div className="me-5 ms-5 mt-4">
            <h2 className="text-center mb-4">Reporte</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">No.</th>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Carnet</th>
                        <th className="text-center" scope="col">Carrera del estudiante</th>
                        <th className="text-center" scope="col">Edad</th>
                        <th className="text-center" scope="col">Género de Poesía</th>
                        <th className="text-center" scope="col">Fecha de Declamación</th>
                        <th className="text-center" scope="col">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        participants.map((contestant, index) => {
                            return (
                                <tr key={contestant._id}>
                                    <th className="text-center" scope="row">{index+1}</th>
                                    <td className="text-center">{contestant.fullName}</td>
                                    <td className="text-center">{contestant.carnet}</td>
                                    <td className="text-center">{contestant.studentCareer}</td>
                                    <td className="text-center">{contestant.age}</td>
                                    <td className="text-center">{contestant.poetryGenre}</td>
                                    <td className="text-center">{contestant.declamationDate.slice(0,-14)}</td>
                                    <td className="text-center">{contestant.phone}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowParticipation;