import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Detail from '../components/Detail/Detail';
import Login from '../containers/Login/Login';
import SearchDetail from '../containers/SearchDetail/SearchDetail';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>} />

            <Route path="/detail/:companyName" element={<Detail />} />

            <Route path="/login" element={<Login />} />

            <Route path="/search-detail" element={<SearchDetail />} />
        </Routes>
    );
};

export default AppRoutes;
