import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Detail from '../components/Detail/Detail';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/detail/:companyName" element={<Detail />} />
        </Routes>
    );
};

export default AppRoutes;
