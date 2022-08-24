import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span className="navbar-brand">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png" alt="" width="30" height="24" className="me-2 d-inline-block align-text-top" />
                            Universidad de Guatemala
                        </span>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <span className="nav-link">Formulario</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/showParticipation" style={{ textDecoration: 'none' }}>
                                    <span className="nav-link">Reporte</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;