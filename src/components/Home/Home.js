import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import Header from "../../components/Header/Header";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm xử lý sự kiện khi bấm vào nút tìm kiếm
  const handleSearch = async () => {
    if (!keyword) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/jobs/search",
        {
          keyword: keyword,
        }
      );

      setJobData(response.data.data);
    } catch (error) {
      console.error("Error fetching job data: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleJobClick = (companyName) => {
    navigate(`/detail/${companyName}`);
  };
  const handleSearchDetail = () => {
    navigate(`/search-detail`);
  };
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Header */}
      <Header />

      {/* Search Section */}
      <div className="search-section-block">
        <section className="search-section">
          <label className="title">Hệ thống tìm việc</label>
          <div className="search-box">
            <div className="input-with-icon">
              <FaSearch size={15} color="#007bff" />
              <input
              style={{backgroundColor:'#fff'}}
                type="text"
                placeholder="Tìm việc theo từ khóa"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Ngăn reload trang nếu dùng trong form
                    handleSearch(); // Gọi hàm tìm kiếm
                  }
                }}
              />
            </div>

            <button className="search-button" onClick={handleSearch}>
              Tìm kiếm
            </button>

            <button className="search-button" onClick={handleSearchDetail}>
              Tìm kiếm theo thông tin chi tiết
            </button>
          </div>
        </section>
      </div>

      {/* Filters */}
      <div className="content-block">
        {/* <div className="filter-section">
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
        </div> */}

        {/* Featured Jobs */}
        <div className="featured-jobs">
          <h3>Danh sách Job</h3>
          {/* Hiển thị Đang tìm kiếm... khi loading */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <ul className="job-list">
              {jobData.map((job) => (
                <li
                  key={job.companyName}
                  onClick={() => handleJobClick(job.companyName)}
                >
                  <img
                    src={job.companyLogo}
                    alt={job.jobTitle}
                    className="job-image"
                  />
                  <div className="job-info">
                    <p className="job-text">
                      <FaBriefcase size={16} color="currentColor" />{" "}
                      {job.jobTitle}
                    </p>
                    <p className="cp-text">
                      <FaBuilding size={12} color="#085587" /> {job.companyName}
                    </p>
                    <p className="ad-text">
                      <FaMapMarkerAlt size={10} color="#085587" /> {job.address}
                    </p>
                  </div>
                  <button className="salary-button">{job.prettySalary}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
