import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
    FaClipboard,
    FaGraduationCap,
    FaChalkboardTeacher,
    FaPython,
    FaJava,
    FaCogs,
    FaHtml5,
    FaPhp,
    FaDatabase,
    FaUsers,
    FaHandshake,
    FaClock,
    FaAdjust,
} from "react-icons/fa";
import "./SearchDetail.css";

const SearchDetail = () => {
    const [careerGoal, setCareerGoal] = useState("");

    const initialValues = {
        python: 0,
        java: 0,
        cpp: 0,
        javascript: 0,
        csharp: 0,
        php: 0,
        database_management: 0,
        networking_skills: 0,
        web_development_experience: 0,
        communication_skills: 0,
        problem_solving_abilities: 0,
        teamwork_collaboration: 0,
        time_management: 0,
        adaptability: 0,
        gpa: 0.0,
        academic_achievements: "Medium",
        internship_experience: "No",
        certifications_training: "No",
        leadership_experience: "No",
    };

    const validationSchema = Yup.object({
        python: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        java: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        cpp: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        javascript: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        csharp: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        php: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        database_management: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        networking_skills: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        web_development_experience: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        communication_skills: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        problem_solving_abilities: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        teamwork_collaboration: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        time_management: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        adaptability: Yup.number()
            .min(0, "Nhập trong khoảng 0 đến 10")
            .max(10, "Nhập trong khoảng 0 đến 10")
            .required("Trường này là bắt buộc"),
        gpa: Yup.number()
            .min(0, "Điểm GPA phải từ 0")
            .max(4, "Điểm GPA tối đa là 4")
            .required("Trường này là bắt buộc"),
        academic_achievements: Yup.string().required("Trường này là bắt buộc"),
        internship_experience: Yup.string().required("Trường này là bắt buộc"),
        certifications_training: Yup.string().required("Trường này là bắt buộc"),
        leadership_experience: Yup.string().required("Trường này là bắt buộc"),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("https://api/test", values);
            setCareerGoal(response.data.careerGoal);
        } catch (error) {
            console.error("Error predicting career goal:", error);
        }
    };

    return (
        <div className="search-detail-container">
            {/* Header */}
            <Header />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={true}
                validateOnChange={true}
            >
                {({ values, touched, errors, handleChange, handleBlur, validateForm, submitForm }) => (
                    <Form className="search-detail-form">
                        <button type="button" onClick={() => window.history.back()} className="back-button-top-right">
                            Quay lại
                        </button>

                        <h2>Dự đoán Nghề Nghiệp</h2>

                        {/* Các trường nhập từ 0-10 */}
                        {[
                            { name: "python", label: "Python", icon: <FaPython /> },
                            { name: "java", label: "Java", icon: <FaJava /> },
                            { name: "cpp", label: "C++", icon: <FaCogs /> },
                            { name: "javascript", label: "JavaScript", icon: <FaHtml5 /> },
                            { name: "csharp", label: "C#", icon: <FaCogs /> },
                            { name: "php", label: "PHP", icon: <FaPhp /> },
                            { name: "database_management", label: "Quản lý cơ sở dữ liệu", icon: <FaDatabase /> },
                            { name: "networking_skills", label: "Kỹ năng mạng", icon: <FaDatabase /> },
                            {
                                name: "web_development_experience",
                                label: "Kinh nghiệm phát triển web",
                                icon: <FaHtml5 />,
                            },
                            { name: "communication_skills", label: "Kỹ năng giao tiếp", icon: <FaUsers /> },
                            {
                                name: "problem_solving_abilities",
                                label: "Khả năng giải quyết vấn đề",
                                icon: <FaCogs />,
                            },
                            { name: "teamwork_collaboration", label: "Kỹ năng làm việc nhóm", icon: <FaHandshake /> },
                            { name: "time_management", label: "Quản lý thời gian", icon: <FaClock /> },
                            { name: "adaptability", label: "Khả năng thích ứng", icon: <FaAdjust /> },
                        ].map(({ name, label, icon }) => (
                            <div
                                key={name}
                                className={`form-group ${touched[name] && errors[name] ? "error-field" : ""}`}
                            >
                                <label>
                                    {icon} {label}
                                </label>
                                <Field
                                    type="number"
                                    name={name}
                                    min="0"
                                    max="10"
                                    required
                                    value={values[name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched[name] && errors[name] && <div className="error">{errors[name]}</div>}
                            </div>
                        ))}

                        {/* GPA */}
                        <div className={`form-group ${touched.gpa && errors.gpa ? "error-field" : ""}`}>
                            <label>
                                <FaGraduationCap /> Điểm GPA (hệ 4):
                            </label>
                            <Field type="number" name="gpa" step="0.1" min="0" max="4" required />
                            {touched.gpa && errors.gpa && <div className="error">{errors.gpa}</div>}
                        </div>

                        {/* Các trường select */}
                        {[
                            {
                                name: "academic_achievements",
                                options: ["Medium", "High", "Low"],
                                icon: <FaGraduationCap />,
                            },
                            { name: "internship_experience", options: ["No", "Yes"], icon: <FaClipboard /> },
                            { name: "certifications_training", options: ["No", "Yes"], icon: <FaClipboard /> },
                            { name: "leadership_experience", options: ["No", "Yes"], icon: <FaChalkboardTeacher /> },
                        ].map(({ name, options, icon }) => (
                            <div
                                key={name}
                                className={`form-group ${touched[name] && errors[name] ? "error-field" : ""}`}
                            >
                                <label>
                                    {icon}
                                    {name === "academic_achievements" && "Thành tích học tập"}
                                    {name === "internship_experience" && "Kinh nghiệm thực tập"}
                                    {name === "certifications_training" && "Chứng chỉ & Đào tạo"}
                                    {name === "leadership_experience" && "Kinh nghiệm lãnh đạo"}
                                </label>
                                <Field as="select" name={name} required>
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Field>
                                {touched[name] && errors[name] && <div className="error">{errors[name]}</div>}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => {
                                validateForm().then(() => submitForm());
                            }}
                            className="submit-button"
                        >
                            Dự đoán
                        </button>
                    </Form>
                )}
            </Formik>

            {careerGoal && (
                <div className="result">
                    <h3>Nghề nghiệp dự kiến:</h3>
                    <p>{careerGoal}</p>
                </div>
            )}
        </div>
    );
};

export default SearchDetail;
