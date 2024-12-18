import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Logo from "../../assets/image.png";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import "./Home.css";

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

    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!keyword) return; 

        setLoading(true);

        try {
            const response = await axios.post("https://ms.vietnamworks.com/job-search/v1.0/search", {
                keyword: keyword,
            });

            setJobData(response.data.data); 
        } catch (error) {
            console.error("Error fetching job data: ", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleJobClick = (id) => {
        navigate(`/detail/${id}`);
    };

    
    return (
        <div className="home-container">
            {/* Header */}
            <Header />

            {/* Search Section */}
            <Search keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />

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
