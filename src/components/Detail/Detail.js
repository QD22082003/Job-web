import React, { useEffect, useState } from "react";
import "./Detail.css";
import axios from "axios";
import { FaBriefcase, FaDollarSign } from "react-icons/fa";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaIndustry,
  FaUsers,
  FaGlobe,
  FaEye 
} from "react-icons/fa";
import Logo from "../../asset/image.png";
import logoweb from "../../asset/1.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Detail = () => {
  const { companyName } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const navigate = useNavigate();
  const handleCombackHome = () => {
    navigate(`/`);
  };
  const fetchCompanyData = async () => {
    debugger;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/company/search",
        {
          keyword: companyName, // Gửi từ khóa vào body
        }
      );
      // Lấy công ty đầu tiên từ danh sách trả về
      if (response.data.data) {
        setCompanyData(response.data.data);
      } else {
        console.error("Không tìm thấy công ty.");
      }
      console.log("Company data: " + companyData);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    debugger;

    fetchCompanyData(companyName);
  }, []);
  useEffect(() => {
    if (companyData) {
      console.log("Company data thay đổi:", companyData);
    }
  }, [companyData]);
  return (
    <div className="detail-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <img src={logoweb} alt="Job" className="logo-image" />
          <label className="label-cum">Cụm 1</label>
          <div className="auth-links">
            <a href="/signin">Đăng nhập</a> | <a href="/signup">Đăng kí</a>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-section-block">
        <section className="search-section">
          <label className="title">Hệ thống tìm việc</label>
          <div className="search-box">
            <div className="input-with-icon">
              <FaSearch size={15} color="#007bff" />
              <input type="text" placeholder="Tìm việc theo từ khóa" />
            </div>

            {/* Tìm kiếm địa điểm */}
            {/* <div className="input-with-icon">
              <FaMapMarkerAlt size={15} color="#007bff" />
              <input type="text" placeholder="Chọn địa chỉ" />
            </div> */}
            <button className="search-button">Tìm kiếm</button>
            <button className="search-button">
              Tìm kiếm theo thông tin chi tiết
            </button>
          </div>
        </section>
      </div>
      <img
        src={companyData?.bannerDesktopUri}
        alt="Job"
        className="backCompany-image"
      />
      {/* Job Information */}
      <section className="job-header-detail">
        <div
          className="job-info-detail"
          style={
            {
              // backgroundImage: `url(${companyData?.bannerDesktopUri})`, // Cập nhật ảnh nền
            }
          }
        >
          <img
            src={companyData?.companyLogoURL}
            alt="Job"
            className="job-image"
          />
          <div>
            <p className="text-job-detail">{companyData?.companyName}</p>
            <p className="location">
              <FaMapMarkerAlt size={12} color="#085587" />{" "}
              {companyData?.address}
            </p>
            <p className="salary">
              <FaEye size={12} color="#085587" /> {companyData?.followerCount} Lượt quan tâm
            </p>
          </div>
        </div>
        <div className="job-actions">
          <button className="apply-btn">Ứng tuyển ngay</button>
          <button className="create-cv-btn" onClick={handleCombackHome}>
            Quay lại trang chủ
          </button>
        </div>
      </section>

      {/* Job Description */}
      <div className="content-block-job-detail">
        <div className="content-block-job-detail-left">
          <div className="blockBlue">
            <h3>Mô tả công việc</h3>
          </div>
          <section className="job-description">
            <p>
            {companyData?.companyProfile}
            </p>
          </section>
        </div>
        <div className="content-block-job-detail-right">
          <div className="blockBlue">
            <h3>Mô tả công việc</h3>
          </div>
          <aside className="sidebar">
            <div className="company-info">
              <h4>Thông tin công ty</h4>
              <ul>
                <li className="company-info-detail">
                  <FaIndustry size={15} color="#007bff" />
                  <span style={{ color: "#007bff", fontWeight: "600" }}>
                    Lĩnh vực:
                  </span>{" "}
                  Công nghệ thông tin
                </li>
                <li className="company-info-detail">
                  <FaMapMarkerAlt size={15} color="#007bff" />
                  <span style={{ color: "#007bff", fontWeight: "600" }}>
                    Địa điểm:
                  </span>{" "}
                  Hà Nội
                </li>
                <li className="company-info-detail">
                  <FaUsers size={15} color="#007bff" />
                  <span style={{ color: "#007bff", fontWeight: "600" }}>
                    Nhân viên:
                  </span>{" "}
                  Hơn 1000
                </li>
                <li className="company-info-detail">
                  <FaGlobe size={15} color="#007bff" />
                  <span style={{ color: "#007bff", fontWeight: "600" }}>
                    Website:
                  </span>{" "}
                  <a href="#">bidv.com.vn</a>
                </li>
              </ul>
            </div>
            <div className="general-info">
              <h4>Thông tin chung</h4>
              <p>
                <strong>Hạn nộp hồ sơ:</strong> 01/09/2024
              </p>
              <p>
                <strong>Ngành nghề:</strong> IT
              </p>
            </div>
          </aside>
        </div>
        {/* Company Info */}
      </div>
    </div>
  );
};

export default Detail;
