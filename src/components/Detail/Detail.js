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
  FaEye,
} from "react-icons/fa";
import Logo from "../../assets/logo-tlu.png";
import logoweb from "../../assets/1.png";
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
            <a href="/login">Đăng nhập</a> | <a href="/signup">Đăng kí</a>
          </div>
        </div>
      </header>

      {/* Search Section */}
      {/* <div className="search-section-block">
        <section className="search-section">
          <label className="title">Hệ thống tìm việc</label>
          <div className="search-box">
            <div className="input-with-icon">
              <FaSearch size={15} color="#007bff" />
              <input type="text" placeholder="Tìm việc theo từ khóa" />
            </div>
            <button className="search-button">Tìm kiếm</button>
            <button className="search-button">
              Tìm kiếm theo thông tin chi tiết
            </button>
          </div>
        </section>
      </div> */}
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
              <FaEye size={12} color="#085587" /> {companyData?.followerCount}{" "}
              Lượt quan tâm
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
            {companyData?.jobs.map((job) => (
              <div key={job.jobId} className="job-card">
                <h3 className="job-title">{job.jobTitle}</h3>
                <div className="job-details">
                  <p>
                    <strong>Công ty: </strong>
                    {job.companyName}
                  </p>
                  <p>
                    <strong>Địa chỉ: </strong>
                    {job.address}
                  </p>
                  <p>
                    <strong>Mô tả công việc: </strong>
                  </p>
                  <div
                    className="job-description-content"
                    dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                  ></div>
                  <p>
                    <strong>Yêu cầu công việc: </strong>
                  </p>
                  <div
                    className="job-requirement-content"
                    dangerouslySetInnerHTML={{ __html: job.jobRequirement }}
                  ></div>
                  <p>
                    <strong>Mức lương: </strong>
                    <span className="salary-highlight">{job.prettySalary}</span>
                  </p>
                  <div className="job-actions">
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="job-link"
                    >
                      Xem chi tiết công việc
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className="content-block-job-detail-right">
          <div className="blockBlue">
            <h3>Giới thiệu công ty</h3>
          </div>
          <aside className="sidebar">
            <p
              style={{
                fontWeight: "500",
                lineHeight: "1.8", // Tăng khoảng cách giữa các dòng
                fontStyle: "italic", // Chữ in nghiêng
              }}
            >
              {companyData?.companyProfile}
            </p>
          </aside>
        </div>
        {/* Company Info */}
      </div>
    </div>
  );
};

export default Detail;
