import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import Detail from '../containers/Detail/Detail';
import Login from '../containers/Login/Login';
import SearchDetail from '../containers/SearchDetail/SearchDetail';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search-detail" element={<SearchDetail />} />
        </Routes>
    );
};

export default AppRoutes;
