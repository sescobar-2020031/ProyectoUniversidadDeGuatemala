import { useEffect, useState } from "react";
import axios from 'axios';

const ShowParticipation = () => {

    //Normal Participants
    const [participants, setParticipants] = useState([]);
    const [normalParticipants, setNormalParticipants] = useState(true);
    //Sort by student career
    const [participantsCareerAtoZ, setParticipantsCareerAtoZ] = useState([]);
    const [participantsCareerZtoA, setParticipantsCareerZtoA] = useState([]);
    const [sortCareerAtoZ, setSortCareerAtoZ] = useState(false);
    const [sortCareerZtoA, setSortCareerZtoA] = useState(false);
    //sort by poetry genre
    const [participantsPoetryGenreAtoZ, setParticipantsPoetryGenreAtoZ] = useState([]);
    const [participantsPoetryGenreZtoA, setParticipantsPoetryGenreZtoA] = useState([]);
    const [sortPoetryGenreAtoZ, setSortPoetryGenreAtoZ] = useState(false);
    const [sortPoetryGenreZtoA, setSortPoetryGenreZtoA] = useState(false);
    //sort by age
    const [participantsAgeUpward, setParticipantsAgeUpward] = useState([]);
    const [participantsAgeDescendant, setParticipantsAgeDescendant] = useState([]);
    const [sortAgeUpward, setSortAgeUpward] = useState(false);
    const [sortAgeDescendant, setSortAgeDescendant] = useState(false);
    //sort by declamation date
    const [participantsDeclamationDateUpward, setParticipantsDeclamationDateUpward] = useState([]);
    const [participantsDeclamationDateDescendant, setParticipantsDeclamationDateDescendant] = useState([]);
    const [sortDeclamationDateUpward, setSortDeclamationDateUpward] = useState(false);
    const [sortDeclamationDateDescendant, setSortDeclamationDateDescendant] = useState(false);
    //sort by name
    const [participantsFullNameAtoZ, setParticipantsFullNameAtoZ] = useState([]);
    const [participantsFullNameZtoA, setParticipantsFullNameZtoA] = useState([]);
    const [sortFullNameAtoZ, setSortFullNameAtoZ] = useState(false);
    const [sortFullNameZtoA, setSortFullNameZtoA] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3200/contestant/getContestants')
            .then((res) => {
                setParticipants(res.data.participants);
            }).catch((err) => {
                console.log(err);
                setNormalParticipants(false)
            });
    });

    const cleanTable = (state) => {
        setNormalParticipants(false);
        setSortCareerAtoZ(false);
        setSortCareerZtoA(false);
        setSortAgeUpward(false);
        setSortAgeDescendant(false);
        setSortPoetryGenreAtoZ(false);
        setSortPoetryGenreZtoA(false);
        setSortDeclamationDateUpward(false);
        setSortDeclamationDateDescendant(false);
        setSortFullNameAtoZ(false);
        setSortFullNameZtoA(false);
        switch (state) {
            case 'ChangeNormalParticipants':
                setNormalParticipants(true);
                break;
            case 'sortCareerAtoZ':
                setSortCareerAtoZ(true);
                break;
            case 'sortCareerZtoA':
                setSortCareerZtoA(true);
                break;
            case 'sortAgeUpward':
                setSortAgeUpward(true);
                break;
            case 'sortAgeDescendant':
                setSortAgeDescendant(true);
                break;
            case 'sortPoetryGenreAtoZ':
                setSortPoetryGenreAtoZ(true);
                break;
            case 'sortPoetryGenreZtoA':
                setSortPoetryGenreZtoA(true);
                break;
            case 'sortDeclamationDateUpward':
                setSortDeclamationDateUpward(true);
                break;
            case 'sortDeclamationDateDescendant':
                setSortDeclamationDateDescendant(true);
                break;
            case 'sortFullNameAtoZ':
                setSortFullNameAtoZ(true);
                break;
            case 'sortFullNameZtoA':
                setSortFullNameZtoA(true)
                break;
            default:
                setNormalParticipants(true);
                break;
        }
    }

    const contestantsNormalParticipants = async () => {
        await axios.get('http://localhost:3200/contestant/getContestants')
            .then((res) => {
                setParticipants(res.data.participants);
                cleanTable('ChangeNormalParticipants')
            }).catch((err) => {
                console.log(err);
            });
    };

    const contestantsCareerAtoZ = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsCareerAtoZ')
            .then((res) => {
                setParticipantsCareerAtoZ(res.data.participantsCareerAtoZ);
                cleanTable('sortCareerAtoZ')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsCareerZtoA = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsCareerZtoA')
            .then((res) => {
                setParticipantsCareerZtoA(res.data.participantsCareerZtoA);
                cleanTable('sortCareerZtoA')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsAgeUpward = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsAgeUpward')
            .then((res) => {
                setParticipantsAgeUpward(res.data.participantsAgeUpward);
                cleanTable('sortAgeUpward')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsAgeDescendant = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsAgeDescendant')
            .then((res) => {
                setParticipantsAgeDescendant(res.data.participantsAgeDescendant);
                cleanTable('sortAgeDescendant')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsPoetryGenreAtoZ = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsPoetryGenreAtoZ')
            .then((res) => {
                setParticipantsPoetryGenreAtoZ(res.data.participantsPoetryGenreAtoZ);
                cleanTable('sortPoetryGenreAtoZ')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsPoetryGenreZtoA = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsPoetryGenreZtoA')
            .then((res) => {
                setParticipantsPoetryGenreZtoA(res.data.participantsPoetryGenreZtoA);
                cleanTable('sortPoetryGenreZtoA')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsDeclamationDateUpward = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsDeclamationDateUpward')
            .then((res) => {
                setParticipantsDeclamationDateUpward(res.data.participantsDeclamationDateUpward);
                cleanTable('sortDeclamationDateUpward')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsDeclamationDateDescendant = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsDeclamationDateDescendant')
            .then((res) => {
                setParticipantsDeclamationDateDescendant(res.data.participantsDeclamationDateDescendant);
                cleanTable('sortDeclamationDateDescendant')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsFullNameAtoZ = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsFullNameAtoZ')
            .then((res) => {
                setParticipantsFullNameAtoZ(res.data.participantsFullNameAtoZ);
                cleanTable('sortFullNameAtoZ')
            }).catch((err) => {
                console.log(err)
            });
    };

    const contestantsFullNameZtoA = async () => {
        await axios.get('http://localhost:3200/contestant/getContestantsFullNameZtoA')
            .then((res) => {
                setParticipantsFullNameZtoA(res.data.participantsFullNameZtoA);
                cleanTable('sortFullNameZtoA')
            }).catch((err) => {
                console.log(err)
            });
    };

    return (
        <div className="me-5 ms-5 mt-4 table-responsive">
            <h2 className="text-center mb-4">Reporte</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">No.</th>
                        {
                            sortFullNameAtoZ
                                ? <th className="text-center" scope="col">Nombre <i className="bi bi-sort-alpha-down" style={{ color: '#000000' }} onClick={contestantsFullNameAtoZ}></i> <i style={{ color: '#999595' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsFullNameZtoA}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                : sortFullNameZtoA
                                    ? <th className="text-center" scope="col">Nombre <i className="bi bi-sort-alpha-down" style={{ color: '#999595' }} onClick={contestantsFullNameAtoZ}></i> <i style={{ color: '#000000' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsFullNameZtoA}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                    : <th className="text-center" scope="col">Nombre <i className="bi bi-sort-alpha-down" style={{ color: '#999595' }} onClick={contestantsFullNameAtoZ}></i> <i style={{ color: '#999595' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsFullNameZtoA}></i></th>
                        }
                        <th className="text-center" scope="col">Carnet</th>
                        {
                            sortCareerAtoZ
                                ? <th className="text-center" scope="col">Carrera del estudiante <i className="bi bi-sort-alpha-down" style={{ color: '#000000' }} onClick={contestantsCareerAtoZ}></i> <i style={{ color: '#999595' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsCareerZtoA}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                : sortCareerZtoA
                                    ? <th className="text-center" scope="col">Carrera del estudiante <i className="bi bi-sort-alpha-down" style={{ color: '#999595' }} onClick={contestantsCareerAtoZ}></i> <i style={{ color: '#000000' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsCareerZtoA} ></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                    : <th className="text-center" scope="col">Carrera del estudiante <i className="bi bi-sort-alpha-down" style={{ color: '#999595' }} onClick={contestantsCareerAtoZ}></i> <i style={{ color: '#999595' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsCareerZtoA} ></i></th>
                        }
                        {
                            sortAgeUpward
                                ? <th className="text-center" scope="col">Edad <i className="bi bi-sort-numeric-down" style={{ color: '#000000' }} onClick={contestantsAgeUpward} ></i> <i className="bi bi-sort-numeric-up-alt" style={{ color: '#999595' }} onClick={contestantsAgeDescendant}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                : sortAgeDescendant
                                    ? <th className="text-center" scope="col">Edad <i className="bi bi-sort-numeric-down" style={{ color: '#999595' }} onClick={contestantsAgeUpward} ></i> <i className="bi bi-sort-numeric-up-alt" style={{ color: '#000000' }} onClick={contestantsAgeDescendant}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                    : <th className="text-center" scope="col">Edad <i className="bi bi-sort-numeric-down" style={{ color: '#999595' }} onClick={contestantsAgeUpward} ></i> <i className="bi bi-sort-numeric-up-alt" style={{ color: '#999595' }} onClick={contestantsAgeDescendant}></i></th>
                        }
                        {
                            sortPoetryGenreAtoZ
                                ? <th className="text-center" scope="col">Género de Poesía <i className="bi bi-sort-alpha-down" style={{ color: '#000000' }} onClick={contestantsPoetryGenreAtoZ}></i> <i style={{ color: '#999595' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsPoetryGenreZtoA}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                : sortPoetryGenreZtoA
                                    ? <th className="text-center" scope="col">Género de Poesía <i className="bi bi-sort-alpha-down" style={{ color: '#999595' }} onClick={contestantsPoetryGenreAtoZ}></i> <i style={{ color: '#000000' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsPoetryGenreZtoA}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                    : <th className="text-center" scope="col">Género de Poesía <i className="bi bi-sort-alpha-down" style={{ color: '#999595' }} onClick={contestantsPoetryGenreAtoZ}></i> <i style={{ color: '#999595' }} className="bi bi-sort-alpha-up-alt" onClick={contestantsPoetryGenreZtoA}></i></th>
                        }
                        {
                            sortDeclamationDateUpward
                                ? <th className="text-center" scope="col">Fecha de Declamación <i className="bi bi-sort-down-alt" style={{ color: '#000000' }} onClick={contestantsDeclamationDateUpward}></i> <i className="bi bi-sort-up" style={{ color: '#999595' }} onClick={contestantsDeclamationDateDescendant}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                : sortDeclamationDateDescendant
                                    ? <th className="text-center" scope="col">Fecha de Declamación <i className="bi bi-sort-down-alt" style={{ color: '#999595' }} onClick={contestantsDeclamationDateUpward}></i> <i className="bi bi-sort-up" style={{ color: '#000000' }} onClick={contestantsDeclamationDateDescendant}></i><i className="bi bi-x-circle-fill ms-1" style={{ color: 'red', fontSize: '0.8rem' }} onClick={contestantsNormalParticipants}></i></th>
                                    : <th className="text-center" scope="col">Fecha de Declamación <i className="bi bi-sort-down-alt" style={{ color: '#999595' }} onClick={contestantsDeclamationDateUpward}></i> <i className="bi bi-sort-up" style={{ color: '#999595' }} onClick={contestantsDeclamationDateDescendant}></i></th>
                        }
                        <th className="text-center" scope="col">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        normalParticipants ?
                            participants.map((contestant, index) => {
                                return (
                                    <tr key={contestant._id}>
                                        <th className="text-center" scope="row">{index + 1}</th>
                                        <td className="text-center">{contestant.fullName}</td>
                                        <td className="text-center">{contestant.carnet}</td>
                                        <td className="text-center">{contestant.studentCareer}</td>
                                        <td className="text-center">{contestant.age}</td>
                                        <td className="text-center">{contestant.poetryGenre}</td>
                                        <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                        <td className="text-center">{contestant.phone}</td>
                                    </tr>
                                )
                            })
                            : sortCareerAtoZ ?
                                participantsCareerAtoZ.map((contestant, index) => {
                                    return (
                                        <tr key={contestant._id}>
                                            <th className="text-center" scope="row">{index + 1}</th>
                                            <td className="text-center">{contestant.fullName}</td>
                                            <td className="text-center">{contestant.carnet}</td>
                                            <td className="text-center">{contestant.studentCareer}</td>
                                            <td className="text-center">{contestant.age}</td>
                                            <td className="text-center">{contestant.poetryGenre}</td>
                                            <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                            <td className="text-center">{contestant.phone}</td>
                                        </tr>
                                    )
                                })
                                : sortCareerZtoA ?
                                    participantsCareerZtoA.map((contestant, index) => {
                                        return (
                                            <tr key={contestant._id}>
                                                <th className="text-center" scope="row">{index + 1}</th>
                                                <td className="text-center">{contestant.fullName}</td>
                                                <td className="text-center">{contestant.carnet}</td>
                                                <td className="text-center">{contestant.studentCareer}</td>
                                                <td className="text-center">{contestant.age}</td>
                                                <td className="text-center">{contestant.poetryGenre}</td>
                                                <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                <td className="text-center">{contestant.phone}</td>
                                            </tr>
                                        )
                                    })
                                    : sortAgeUpward ?
                                        participantsAgeUpward.map((contestant, index) => {
                                            return (
                                                <tr key={contestant._id}>
                                                    <th className="text-center" scope="row">{index + 1}</th>
                                                    <td className="text-center">{contestant.fullName}</td>
                                                    <td className="text-center">{contestant.carnet}</td>
                                                    <td className="text-center">{contestant.studentCareer}</td>
                                                    <td className="text-center">{contestant.age}</td>
                                                    <td className="text-center">{contestant.poetryGenre}</td>
                                                    <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                    <td className="text-center">{contestant.phone}</td>
                                                </tr>
                                            )
                                        })
                                        : sortAgeDescendant ?
                                            participantsAgeDescendant.map((contestant, index) => {
                                                return (
                                                    <tr key={contestant._id}>
                                                        <th className="text-center" scope="row">{index + 1}</th>
                                                        <td className="text-center">{contestant.fullName}</td>
                                                        <td className="text-center">{contestant.carnet}</td>
                                                        <td className="text-center">{contestant.studentCareer}</td>
                                                        <td className="text-center">{contestant.age}</td>
                                                        <td className="text-center">{contestant.poetryGenre}</td>
                                                        <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                        <td className="text-center">{contestant.phone}</td>
                                                    </tr>
                                                )
                                            })
                                            : sortPoetryGenreAtoZ ?
                                                participantsPoetryGenreAtoZ.map((contestant, index) => {
                                                    return (
                                                        <tr key={contestant._id}>
                                                            <th className="text-center" scope="row">{index + 1}</th>
                                                            <td className="text-center">{contestant.fullName}</td>
                                                            <td className="text-center">{contestant.carnet}</td>
                                                            <td className="text-center">{contestant.studentCareer}</td>
                                                            <td className="text-center">{contestant.age}</td>
                                                            <td className="text-center">{contestant.poetryGenre}</td>
                                                            <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                            <td className="text-center">{contestant.phone}</td>
                                                        </tr>
                                                    )
                                                })
                                                : sortPoetryGenreZtoA ?
                                                    participantsPoetryGenreZtoA.map((contestant, index) => {
                                                        return (
                                                            <tr key={contestant._id}>
                                                                <th className="text-center" scope="row">{index + 1}</th>
                                                                <td className="text-center">{contestant.fullName}</td>
                                                                <td className="text-center">{contestant.carnet}</td>
                                                                <td className="text-center">{contestant.studentCareer}</td>
                                                                <td className="text-center">{contestant.age}</td>
                                                                <td className="text-center">{contestant.poetryGenre}</td>
                                                                <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                                <td className="text-center">{contestant.phone}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    : sortDeclamationDateUpward ?
                                                        participantsDeclamationDateUpward.map((contestant, index) => {
                                                            return (
                                                                <tr key={contestant._id}>
                                                                    <th className="text-center" scope="row">{index + 1}</th>
                                                                    <td className="text-center">{contestant.fullName}</td>
                                                                    <td className="text-center">{contestant.carnet}</td>
                                                                    <td className="text-center">{contestant.studentCareer}</td>
                                                                    <td className="text-center">{contestant.age}</td>
                                                                    <td className="text-center">{contestant.poetryGenre}</td>
                                                                    <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                                    <td className="text-center">{contestant.phone}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        : sortDeclamationDateDescendant ?
                                                            participantsDeclamationDateDescendant.map((contestant, index) => {
                                                                return (
                                                                    <tr key={contestant._id}>
                                                                        <th className="text-center" scope="row">{index + 1}</th>
                                                                        <td className="text-center">{contestant.fullName}</td>
                                                                        <td className="text-center">{contestant.carnet}</td>
                                                                        <td className="text-center">{contestant.studentCareer}</td>
                                                                        <td className="text-center">{contestant.age}</td>
                                                                        <td className="text-center">{contestant.poetryGenre}</td>
                                                                        <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                                        <td className="text-center">{contestant.phone}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                            : sortFullNameAtoZ ?
                                                                participantsFullNameAtoZ.map((contestant, index) => {
                                                                    return (
                                                                        <tr key={contestant._id}>
                                                                            <th className="text-center" scope="row">{index + 1}</th>
                                                                            <td className="text-center">{contestant.fullName}</td>
                                                                            <td className="text-center">{contestant.carnet}</td>
                                                                            <td className="text-center">{contestant.studentCareer}</td>
                                                                            <td className="text-center">{contestant.age}</td>
                                                                            <td className="text-center">{contestant.poetryGenre}</td>
                                                                            <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                                            <td className="text-center">{contestant.phone}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                : sortFullNameZtoA ?
                                                                    participantsFullNameZtoA.map((contestant, index) => {
                                                                        return (
                                                                            <tr key={contestant._id}>
                                                                                <th className="text-center" scope="row">{index + 1}</th>
                                                                                <td className="text-center">{contestant.fullName}</td>
                                                                                <td className="text-center">{contestant.carnet}</td>
                                                                                <td className="text-center">{contestant.studentCareer}</td>
                                                                                <td className="text-center">{contestant.age}</td>
                                                                                <td className="text-center">{contestant.poetryGenre}</td>
                                                                                <td className="text-center">{contestant.declamationDate.slice(0, -14)}</td>
                                                                                <td className="text-center">{contestant.phone}</td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <th className="text-center" scope="row">-</th>
                                                                        <td className="text-center">-</td>
                                                                        <td className="text-center">-</td>
                                                                        <td className="text-center">-</td>
                                                                        <td className="text-center">-</td>
                                                                        <td className="text-center">-</td>
                                                                        <td className="text-center">-</td>
                                                                        <td className="text-center">-</td>
                                                                    </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowParticipation;