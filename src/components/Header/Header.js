import React from "react";
import { Link } from "react-router-dom";
import logoweb from "../../assets/1.png";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="home-link">
                    <img src={logoweb} alt="Job" className="logo-image" />
                    <label className="label-cum">Cụm 1</label>
                </Link>
                <div className="auth-links">
                    <a href="/login">Đăng nhập</a> 
                </div>
            </div>
        </header>
    );
};

export default Header;
