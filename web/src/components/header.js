import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to={'/'}>
                        <div className="navbar-brand">Universities App</div>
                    </Link>
                </div>

                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li><Link to={'/university'}>Universidades</Link></li>
                        <li><Link to={'/listUniversity'}>Lista Universidades</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;
