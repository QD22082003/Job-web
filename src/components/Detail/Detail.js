import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEye,
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import "./Detail.css";

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const { companyName } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const navigate = useNavigate();
  const handleCombackHome = () => {
    navigate(`/`);
  };
  const fetchCompanyData = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.post(
        "http://localhost:3000/api/company/search",
        { keyword: companyName }
      );
  
      if (response.data.data) {
        setCompanyData(response.data.data);
      } else {
        console.error("Không tìm thấy công ty.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };
  

  useEffect(() => {

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
      <Header />
  
      {/* Kiểm tra trạng thái loading */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          {/* Banner */}
          <img
            src={companyData?.bannerDesktopUri}
            alt="Job"
            className="backCompany-image"
          />
  
          {/* Job Information */}
          <section className="job-header-detail">
            <div className="job-info-detail">
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
                  <FaEye size={12} color="#085587" />{" "}
                  {companyData?.followerCount} Lượt quan tâm
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
                        dangerouslySetInnerHTML={{
                          __html: job.jobRequirement,
                        }}
                      ></div>
                      <p>
                        <strong>Mức lương: </strong>
                        <span className="salary-highlight">
                          {job.prettySalary}
                        </span>
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
                    lineHeight: "1.8",
                    fontStyle: "italic",
                  }}
                >
                  {companyData?.companyProfile}
                </p>
              </aside>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
