import React from "react";
import "./Detail.css";
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import Logo from "../../asset/image.png";
const Detail = () => {
  return (
    <div className="detail-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <label className="label-cum">Cụm 1</label>
          <div className="auth-links">
            <a href="/signin">Sign in</a> | <a href="/signup">Sign up</a>
          </div>
        </div>
      </header>

      {/* Job Information */}
      <section className="job-header-detail">
        <div className="job-info-detail">
          <img src={Logo} alt="Job" className="job-image" />
          <div>
            <p className="text-job-detail">
              Chuyên viên Quản trị mạng truyền thông – Mã vị trí CNTT04 (số
              lượng 02)
            </p>
            <p className="text-job-detail">
              Trung tâm Công nghệ thông tin BIDV
            </p>
            <p className="location">
              <FaMapMarkerAlt size={12} color="#085587" /> Tòa nhà A, số 18 Trần
              Hữu Dực, Quận Hà Bà Trưng, Hà Nội
            </p>
            <p className="salary">
              <FaDollarSign size={12} color="#085587" /> 15,000,000 - 20,000,000
              VND
            </p>
          </div>
        </div>
        <div className="job-actions">
          <button className="apply-btn">Ứng tuyển ngay</button>
          <button className="create-cv-btn">Tạo CV trực tuyến</button>
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
              - Quản trị hệ thống mạng truyền thông, cơ sở dữ liệu BIDV.
              <br />
              - Phát triển và vận hành các giải pháp về bảo mật thông tin, an
              ninh mạng.
              <br />
              - Xây dựng và triển khai các công cụ, giải pháp tự động hóa để
              quản trị hệ thống mạng truyền thông.
              <br />
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
                <li>
                  <strong>Lĩnh vực:</strong> Công nghệ thông tin
                </li>
                <li>
                  <strong>Địa điểm:</strong> Hà Nội
                </li>
                <li>
                  <strong>Nhân viên:</strong> Hơn 1000
                </li>
                <li>
                  <strong>Website:</strong> <a href="#">bidv.com.vn</a>
                </li>
              </ul>
            </div>
            <div className="general-info">
              <h4>Thông tin chung</h4>
              <p>Hạn nộp hồ sơ: 01/09/2024</p>
              <p>Ngành nghề: IT</p>
            </div>
          </aside>
        </div>
        {/* Company Info */}
      </div>
    </div>
  );
};

export default Detail;
