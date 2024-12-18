import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/icon/logo-tlu.png";
import "./Login.css";

const Login = () => {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!studentId || !password) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                username: studentId,
                password: password,
            });

            const result = response.data;

            if (response.status === 200 && result.status === "success") {
                localStorage.setItem("access_token", result.data.access_token);
                console.log("token:", result.data.access_token);
                toast.success("Đăng nhập thành công!");
                navigate("/Leaderboard");
                setError("");
            } else {
                setError("Tài khoản hoặc mật khẩu không đúng.");
            }
        } catch (error) {
            console.error("Error during login:", error);

            if (error.response) {
                if (error.response.data.message === "Invalid username or password") {
                    setError("Tài khoản hoặc mật khẩu không đúng.");
                } else {
                    setError(error.response.data.message || "Đăng nhập thất bại.");
                }
            } else {
                setError("Không thể kết nối tới server.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="div-logo">
                <img src={Logo} alt="Logo" className="logo" />
                <label className="leader-board">Hệ thống tìm việc</label>
            </div>

            <form className="form-main-login" >
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
