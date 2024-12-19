import React from "react";
import { Link } from "react-router-dom";
import logoweb from "../../assets/1.png";
import "./Header.css";

const Header = () => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem("accessToken");
    const userName = "Bùi Quang Đạo"; // Giả định tên người dùng, có thể lấy từ token khi giải mã

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="home-link">
                    <img src={logoweb} alt="Job" className="logo-image" />
                    <label className="label-cum">Cụm 1</label>
                </Link>
                <div className="auth-links">
                    {token ? (
                        <span className="user-name">{userName}</span> // Hiển thị tên người dùng
                    ) : ( 
                        <a href="/login">Đăng nhập</a> // Hiển thị Đăng nhập khi không có token
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
