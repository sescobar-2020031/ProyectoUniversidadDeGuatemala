'use strict'

const Contestant = require('../models/contestant.model');

exports.testContestant = (req, res) => {
    return res.send({ message: 'El test en -Contestant- es funcional' });
}

exports.saveContestant = async (req, res) => {
    try {
        const params = req.body;

        /** Data Obligatoria */
        const data = {
            carnet: params.carnet,
            fullName: params.fullname,
            address: params.address,
            gender: params.gender,
            phone: params.phone,
            birthDate: params.birthDate,
            studentCareer: params.studentCareer,
            poetryGenre: params.poetryGenre,
            enrollmentDate: new Date()
        };

        /** Valida que venga la data obligatoria */
        let keys = Object.keys(data), msg = '';
        for (let key of keys) {
            if (data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
            msg += `El campo ${key} es requerido\n`;
        }
        if (msg.trim()) return res.status(400).send(msg);

        /** VALIDACIONES DEL CARNET */

        /** Valida que el carnet tenga 6 caracteres */
        const lengthCarnet = data.carnet.length;
        if (lengthCarnet !== 6) return res.status(400).send({ message: 'El carnet tiene que tener una longitud de 6 dígitos' });

        /** Valida que el carnet no contenga 0 */
        for (let letter of data.carnet) {
            if (letter == 0) return res.status(400).send({ message: 'El carnet no debe de contener 0' });
        }

        /** Valida que el primer caracter sea A o a*/
        if (data.carnet[0] !== 'A' && data.carnet[0] !== 'a') {
            return res.status(400).send({ message: 'El carnet debe de contener una "A" o "a" en el primer carácter' });
        }

        /** Valida que el tercer caracter sea 5 */
        if (data.carnet[2] != 5) {
            return res.status(400).send({ message: 'El carnet debe de contener un "5" en el tercer carácter' });
        }

        /** Valida que el ultimo caracter sea 1,3 o 9 */
        const lastCharacter = data.carnet.charAt(lengthCarnet - 1);
        if (lastCharacter != 1 && lastCharacter != 3 && lastCharacter != 9) {
            return res.status(400).send({ message: 'El carnet debe de contener un "1","3" o "9" en el último carácter' });
        }

        /** Valida que el concursante sea mayor a 17 años */
        /** Fechas Actuales */
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        const currentWeekDay = currentDate.getDay();

        /** Fechas del cumpleaños */
        const birthDate = new Date(data.birthDate);
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth();
        const birthDay = birthDate.getDate() + 1;

        /** Cálculo */
        let age = currentYear - birthYear;
        if (currentMonth < birthMonth) {
            age--;
        } else if (currentMonth == birthMonth) {
            if (currentDay < birthDay) {
                age--;
            }
        }
        if (age < 18) return res.status(400).send({ message: 'Tienes que ser mayor de 17 años para participar' });
        data.age = age;

        /** Validaciones de Fechas para Declamar */
        let dayToDeclaim;
        if (lastCharacter == '1' && data.poetryGenre === 'Dramatico') {
            if (currentWeekDay == 5) dayToDeclaim = currentDay + 10;
            else if (currentWeekDay == 6) dayToDeclaim = currentDay + 9;
            else dayToDeclaim = currentDay + 8;
            data.declamationDate = new Date(currentDate).setDate(dayToDeclaim);
        } else if (lastCharacter == '3' && data.poetryGenre == 'Epico') {
            dayToDeclaim = new Date(currentYear, currentMonth + 1, 0).getDate();
            data.declamationDate = new Date(currentDate).setDate(dayToDeclaim);
        } else {
            if (currentWeekDay == 0) dayToDeclaim = currentDay + 5;
            else if (currentWeekDay == 1) dayToDeclaim = currentDay + 4;
            else if (currentWeekDay == 2) dayToDeclaim = currentDay + 3;
            else if (currentWeekDay == 3) dayToDeclaim = currentDay + 2;
            else if (currentWeekDay == 4) dayToDeclaim = currentDay + 1;
            else if (currentWeekDay == 5) dayToDeclaim = currentDay + 7;
            else dayToDeclaim = currentDay + 6;
            data.declamationDate = new Date(currentDate).setDate(dayToDeclaim);
        }

        let contestant = new Contestant(data);
        await contestant.save();
        return res.send({ message: 'Inscrito Exitosamente', contestant });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error inscribiendote' });
    }
}


exports.getContestants = async (req, res) => {
    try {
        const participants = await Contestant.find();
        if (participants.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        return res.send({ message: 'Participantes encontrados: ', participants });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsCareerAtoZ = async (req, res) => {
    try {
        const participantsCareerAtoZ = await Contestant.find();
        if (participantsCareerAtoZ.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsCareerAtoZ.sort((a, b) => {
            if (a.studentCareer < b.studentCareer) {
                return -1;
            } else if (b.studentCareer > a.studentCareer) {
                return 1;
            } else {
                return 0
            }
        })
        return res.send({ message: 'Participantes encontrados: ', participantsCareerAtoZ });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsCareerZtoA = async (req, res) => {
    try {
        const participantsCareerZtoA = await Contestant.find();
        if (participantsCareerZtoA.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsCareerZtoA.sort((a, b) => {
            if (a.studentCareer > b.studentCareer) {
                return -1;
            } else if (b.studentCareer < a.studentCareer) {
                return 1;
            } else {
                return 0
            }
        })
        return res.send({ message: 'Participantes encontrados: ', participantsCareerZtoA });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsAgeUpward = async (req, res) => {
    try {
        const participantsAgeUpward = await Contestant.find();
        if (participantsAgeUpward === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsAgeUpward.sort((a, b) => { return a.age - b.age })
        return res.send({ message: 'Participantes encontrados: ', participantsAgeUpward });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsAgeDescendant = async (req, res) => {
    try {
        const participantsAgeDescendant = await Contestant.find();
        if (participantsAgeDescendant === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsAgeDescendant.sort((a, b) => { return b.age - a.age })
        return res.send({ message: 'Participantes encontrados: ', participantsAgeDescendant });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsPoetryGenreAtoZ = async (req, res) => {
    try {
        const participantsPoetryGenreAtoZ = await Contestant.find();
        if (participantsPoetryGenreAtoZ === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsPoetryGenreAtoZ.sort((a, b) => {
            if (a.poetryGenre < b.poetryGenre) {
                return -1;
            } else if (b.poetryGenre > a.poetryGenre) {
                return 1;
            } else {
                return 0
            }
        })
        return res.send({ message: 'Participantes encontrados: ', participantsPoetryGenreAtoZ });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsPoetryGenreZtoA = async (req, res) => {
    try {
        const participantsPoetryGenreZtoA = await Contestant.find();
        if (participantsPoetryGenreZtoA.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsPoetryGenreZtoA.sort((a, b) => {
            if (a.poetryGenre > b.poetryGenre) {
                return -1;
            } else if (b.poetryGenre < a.poetryGenre) {
                return 1;
            } else {
                return 0
            }
        })
        return res.send({ message: 'Participantes encontrados: ', participantsPoetryGenreZtoA });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsPoetryGenreAtoZ = async (req, res) => {
    try {
        const participantsPoetryGenreAtoZ = await Contestant.find();
        if (participantsPoetryGenreAtoZ === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsPoetryGenreAtoZ.sort((a, b) => {
            if (a.poetryGenre < b.poetryGenre) {
                return -1;
            } else if (b.poetryGenre > a.poetryGenre) {
                return 1;
            } else {
                return 0
            }
        })
        return res.send({ message: 'Participantes encontrados: ', participantsPoetryGenreAtoZ });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsDeclamationDateUpward = async (req, res) => {
    try {
        const participantsDeclamationDateUpward = await Contestant.find();
        if (participantsDeclamationDateUpward.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsDeclamationDateUpward.sort((a, b) => {
            const firstDate = new Date(a.declamationDate);
            const secondDate = new Date(b.declamationDate);
            if (firstDate < secondDate) return -1;
            if (firstDate > secondDate) return 1;
            return 0;
        })
        return res.send({ message: 'Participantes encontrados: ', participantsDeclamationDateUpward });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsDeclamationDateDescendant = async (req, res) => {
    try {
        const participantsDeclamationDateDescendant = await Contestant.find();
        if (participantsDeclamationDateDescendant.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsDeclamationDateDescendant.sort((a, b) => {
            const firstDate = new Date(a.declamationDate);
            const secondDate = new Date(b.declamationDate);
            if (firstDate > secondDate) return -1;
            if (firstDate < secondDate) return 1;
            return 0;
        })
        return res.send({ message: 'Participantes encontrados: ', participantsDeclamationDateDescendant });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestantsFullNameAtoZ = async (req, res) => {
    try {
        const participantsFullNameAtoZ = await Contestant.find();
        if (participantsFullNameAtoZ.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsFullNameAtoZ.sort((a, b) => {
            if (a.fullName < b.fullName) {
                return -1;
            } else if (b.fullName > a.fullName) {
                return 1;
            } else {
                return 0
            }
        })
        return res.send({ message: 'Participantes encontrados: ', participantsFullNameAtoZ });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' })
    }
}

exports.getContestantsFullNameZtoA = async (req, res) => {
    try {
        const participantsFullNameZtoA = await Contestant.find();
        if (participantsFullNameZtoA.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        participantsFullNameZtoA.sort((a, b) => {
            if (a.fullName > b.fullName) {
                return -1;
            } else if (b.fullName < a.fullName) {
                return 1;
            } else {
                return 0
            }
        })
        return res.send({ message: 'Participantes encontrados: ', participantsFullNameZtoA });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' })
    }
}

exports.getContestant = async (req, res) => {
    try {
        const participationId = req.params.id;
        const contestantParticipation = await Contestant.findOne({ _id: participationId });
        if (!contestantParticipation) return res.status(400).send({ message: 'Participante no encontrado' });
        return res.send({ message: 'Participante encontrado: ', contestantParticipation });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participante' });
    }
}