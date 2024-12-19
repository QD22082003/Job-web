import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/logo-tlu.png";
import "./Login.css";

const Login = () => {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Hàm xử lý đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Xóa lỗi trước đó
        setLoading(true); // Hiển thị loading

        const loginData = {
            client_id: "education_client",
            grant_type: "password",
            username: studentId,
            password: password,
            client_secret: "password"
        };

        try {
            const response = await axios.post("http://localhost:3000/api/login", loginData);
            // Xử lý thành công
            toast.success("Đăng nhập thành công!");
            console.log("Response:", response.data);

            // Lưu token vào localStorage hoặc sessionStorage nếu cần
            localStorage.setItem("accessToken", response.data.token);

            // Chuyển hướng sang trang dashboard hoặc trang chính
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError("Tên đăng nhập hoặc mật khẩu không chính xác!");
            toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
        } finally {
            setLoading(false); // Tắt loading
        }
    };

    return (
        <div className="login-container">
            <div className="div-logo">
                <img src={Logo} alt="Logo" className="logo" />
                <label className="leader-board">Hệ thống tìm việc</label>
            </div>

            <form className="form-main-login" onSubmit={handleSubmit}>
                <p className="form-title">Đăng nhập</p>

                {error && <p className="error-message">{error}</p>}

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <div className="form-group-login">
                            <div className="input-container">
                                <label htmlFor="username" className="input-label">
                                    Tên đăng nhập
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Nhập tên đăng nhập của bạn"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="input-field"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="password" className="input-label">
                                    Mật khẩu
                                </label>
                                <div className="password-container">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field"
                                    />
                                    <span
                                        className="input-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {showPassword ? "👁️" : "🔒"}
                                    </span>
                                </div>
                            </div>
                            <div className="forgot-password">
                                <a href="#" className="forgot-password-link">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit" disabled={!studentId || !password}>
                            Đăng nhập
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default Login;
