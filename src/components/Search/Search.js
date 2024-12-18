import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import "./Search.css";

const Search = ({ keyword, setKeyword, handleSearch }) => {
    const navigate = useNavigate(); 

    const goToSearchDetail = () => {
        navigate("/search-detail"); 
    };

    return (
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
                            onChange={(e) => setKeyword(e.target.value)}
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

                    <button className="search-button" onClick={goToSearchDetail}>
                        Tìm kiếm theo thông tin chi tiết
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Search;
