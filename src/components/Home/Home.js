import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import Logo from "../../asset/image.png";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoweb from "../../asset/1.png";
const jobData = [
  {
    jobId: 1,
    jobTitle: "Chuyên viên đảm bảo chất lượng (QA)",
    companyName: "BIDV - Trung tâm Phát triển phần mềm",
    address: "Hà Nội",
    salary: "Thương lượng",
    companyLogo: Logo,
  },
];

const Home = () => {
  const [keyword, setKeyword] = useState(""); // Lưu từ khóa tìm kiếm
  const [jobData, setJobData] = useState([]); // Lưu dữ liệu công việc
  const [loading, setLoading] = useState(false); // Quản lý trạng thái tải

  // Hàm xử lý sự kiện khi bấm vào nút tìm kiếm
  const handleSearch = async () => {
    if (!keyword) return; // Kiểm tra nếu không có từ khóa thì không gọi API

    setLoading(true); // Đặt trạng thái loading

    try {
      const response = await axios.post(
        "https://ms.vietnamworks.com/job-search/v1.0/search",
        {
          keyword: keyword, // Gửi từ khóa vào body
        }
      );

      setJobData(response.data.data); // Lưu dữ liệu công việc vào state
    } catch (error) {
      console.error("Error fetching job data: ", error);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };
  const handleJobClick = (id) => {
    navigate(`/detail/${id}`);
  };
  const navigate = useNavigate();
  return (
    <div className="home-container">
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
              <input
                type="text"
                placeholder="Tìm việc theo từ khóa"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)} // Cập nhật giá trị từ khóa khi người dùng nhập
              />
            </div>

            {/* Tìm kiếm địa điểm */}
            <div className="input-with-icon">
              <FaMapMarkerAlt size={15} color="#007bff" />
              <input type="text" placeholder="Chọn địa chỉ" />
            </div>
            <button className="search-button" onClick={handleSearch}>
              Tìm kiếm
            </button>

            <button className="search-button">
              Tìm kiếm theo thông tin chi tiết
            </button>
          </div>
        </section>
      </div>

      {/* Filters */}
      <div className="content-block">
        <div className="filter-section">
          <div className="filter-box">
            <h3>Bộ lọc theo thành phố</h3>
            <ul>
              <li className="checkbox-block">
                <input type="checkbox" /> Hà Nội (10)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> Hồ Chí Minh (15)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> Hải Phòng (5)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> Đà Nẵng (8)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> Quảng Ninh (2)
              </li>
            </ul>
          </div>
          <div className="filter-box">
            <h3>Bộ lọc theo vị trí</h3>
            <ul>
              <li className="checkbox-block">
                <input type="checkbox" /> Developer (10)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> Tester (5)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> Bank (8)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> IT (15)
              </li>
              <li className="checkbox-block">
                <input type="checkbox" /> Human Resource (5)
              </li>
            </ul>
          </div>
        </div>

        {/* Featured Jobs */}
        <div className="featured-jobs">
          <h3>Danh sách Job</h3>
          <ul className="job-list">
            {jobData.map((job) => (
              <li key={job.id} onClick={() => handleJobClick(job.id)}>
                <img src={job.companyLogo} alt={job.jobTitle} className="job-image" />
                <div className="job-info">
                  <p className="job-text">
                    <FaBriefcase size={16} color="currentColor" /> {job.jobTitle}
                  </p>
                  <p className="cp-text">
                    <FaBuilding size={12} color="#085587" /> {job.companyName}
                  </p>
                  <p className="ad-text">
                    <FaMapMarkerAlt size={10} color="#085587" /> {job.address}
                  </p>
                </div>
                <button className="salary-button"></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
