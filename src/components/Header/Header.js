import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoweb from "../../assets/1.png";
import "./Header.css";

const Header = () => {
    const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
    const [userData, setUserData] = useState({ name: "", uid: "" }); // State lưu thông tin người dùng

    // Gọi API khi có token
    useEffect(() => {
        if (token) {
            debugger
            fetch("http://localhost:3000/api/student/getSummaryMark", {
                method: "GET",
                headers: {
                    Authorization: `${token}`, // Truyền token vào header Authorization
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json()) // Parse JSON từ response
                .then((data) => {
                    if (data.message === "Get student info success") {
                        // Lưu tên và mã sinh viên vào state
                        setUserData({
                            name: data.data.displayName,
                            uid: data.data.uid,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching student data:", error);
                });
        }
    }, [token]); // useEffect sẽ chạy khi token thay đổi

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="home-link">
                    <img src={logoweb} alt="Job" className="logo-image" />
                    <label className="label-cum">Cụm 1</label>
                </Link>
                <div className="auth-links">
                    {token ? (
                        <span className="user-name">
                            {userData.name} - {userData.uid}
                        </span>
                    ) : (
                        <a href="/login">Đăng nhập</a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
