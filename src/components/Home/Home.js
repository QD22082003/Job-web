import React from "react";
import "./Home.css";
import Logo from "../../asset/image.png";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

const jobData = [
  {
    id: 1,
    title: "Chuyên viên đảm bảo chất lượng (QA)",
    company: "BIDV - Trung tâm Phát triển phần mềm",
    location: "Hà Nội",
    salary: "Thương lượng",
    image: Logo,
  },
  {
    id: 2,
    title: "Chuyên viên kiểm thử tự động (Automation Tester)",
    company: "MB Bank",
    location: "Hồ Chí Minh",
    salary: "15 triệu - 20 triệu VND",
    image: Logo,
  },
  {
    id: 3,
    title: "TIGER TRIBE - DevOps Engineer",
    company: "TIGER TRIBE",
    location: "Hà Nội",
    salary: "Thương lượng",
    image: Logo,
  },
  {
    id: 4,
    title: "Full-stack Developer (Java, Spring, ReactJS)",
    company: "WINR TECH",
    location: "Đà Nẵng",
    salary: "Thương lượng",
    image: Logo,
  },
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <label className="label-cum">Cụm 1</label>
          <div className="auth-links">
            <a href="/signin">Sign in</a> | <a href="/signup">Sign up</a>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-section-block">
        <section className="search-section">
          <label className="title">Find a Job</label>
          <div className="search-box">
            <input type="text" placeholder="Job title or keyword" />
            <input type="text" placeholder="Set location" />
            <button className="search-button">Search</button>
            <button className="search-button">Search Details</button>
          </div>
        </section>
      </div>

      {/* Filters */}
      <div className="content-block">
        <div className="filter-section">
          <div className="filter-box">
            <h3>Refine by City</h3>
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
            <h3>Refine by Category</h3>
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
          <h3>Featured Jobs</h3>
          <ul className="job-list">
            {jobData.map((job) => (
              <li key={job.id}>
                <img src={job.image} alt={job.title} className="job-image" />
                <div className="job-info">
                  <p className="job-text">
                    <FaBriefcase size={16} color="#085587" /> {job.title}
                  </p>
                  <p className="cp-text">
                    <FaBuilding size={12} color="#085587" /> {job.company}
                  </p>
                  <p className="ad-text">
                    <FaMapMarkerAlt size={10} color="#085587" /> {job.location}
                  </p>
                </div>
                <button className="salary-button">{job.salary}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
