import React from "react";
import "./Detail.css";
import { FaBriefcase, FaDollarSign } from "react-icons/fa";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaIndustry,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import Logo from "../../asset/image.png";
import logoweb from "../../asset/1.png";
import { useNavigate } from "react-router-dom";
const Detail = () => {
  const navigate = useNavigate();
  const handleCombackHome = () => {
    navigate(`/`);
  };
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
            <div className="input-with-icon">
              <FaMapMarkerAlt size={15} color="#007bff" />
              <input type="text" placeholder="Chọn địa chỉ" />
            </div>
            <button className="search-button">Tìm kiếm</button>
            <button className="search-button" >
              Tìm kiếm theo thông tin chi tiết
            </button>
          </div>
        </section>
      </div>

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
          <button className="create-cv-btn" onClick={handleCombackHome}>Quay lại trang chủ</button>
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
              Công ty TNHH GMO-Z.com Financial System VN là công ty con của tập
              đoàn GMO Financial Holdings, Inc., một doanh nghiệp hàng đầu trong
              lĩnh vực công nghệ, tài chính tại Nhật Bản và là một thành viên
              trong tập đoàn GMO Group. Công ty đang cần tuyển vị trí như sau:
              Mobile Developer: cụ thể là Android Developer (Tiếng Nhật N1~N4)
              Thu nhập tại Việt Nam lên tới 70Tr/tháng, tại Nhật lên tới
              160Tr/tháng
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
