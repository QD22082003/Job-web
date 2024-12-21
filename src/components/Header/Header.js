import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoweb from "../../assets/1.png";
import "./Header.css";

const Header = () => {
  const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
  const [userData, setUserData] = useState({ name: "", uid: "" }); // State lưu thông tin người dùng
  const [loading, setLoading] = useState(false); // Thêm state loading

  useEffect(() => {
    if (token) {
      setLoading(true); // Bắt đầu trạng thái loading
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
        })
        .finally(() => {
          setLoading(false); // Kết thúc trạng thái loading
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="home-link">
          <img src={logoweb} alt="Job" className="logo-image" />
          <label className="label-cum">Cụm 1</label>
        </Link>
        <div className="auth-links">
          {loading ? ( // Kiểm tra trạng thái loading
            <div className="loading-container-info">
              <div className="loading-spinner"></div>
            </div>
          ) : token ? (
            <>
              <span className="user-name">
                {userData.name} - {userData.uid}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#085587",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#d9363e")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#085587")}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <a href="/login">Đăng nhập</a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
