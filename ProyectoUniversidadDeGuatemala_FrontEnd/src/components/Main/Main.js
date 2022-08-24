import Form from '../Form/Form';
import ShowParticipation from '../Participation/ShowParticipation'
import NavBar from '../Navbar/Navbar'
import ShowInscription from '../ShowInscription/ShowInscription'

import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

export const Main = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route exact path="/form" element={<Form />} />
                <Route path="/showParticipation" element={<ShowParticipation />} />
                <Route path="/showInscription" element={<ShowInscription />} />
                <Route path="/" element={<Navigate to="/form" replace />} />
                <Route path="*" element={<Navigate to="/form" replace />} />
            </Routes>
        </>
    )
}