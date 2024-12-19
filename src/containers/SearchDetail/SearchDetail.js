import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./SearchDetail.css";

const SearchDetail = () => {
    const [futureCareer, setFutureCareer] = useState("");

    const initialValues = {
        student_id: "",
        name: "",
        gender: "",
        age: "",
        gpa: "",
        major: "",
        interested_domain: "",
        projects: "",
        python: "",
        sql: "",
        java: "",
    };

    const validationSchema = Yup.object({
        student_id: Yup.string().required("Trường này là bắt buộc"),
        name: Yup.string()
            .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Tên chỉ được chứa chữ")
            .required("Trường này là bắt buộc"),
        gender: Yup.string()
            .oneOf(["Male", "Female"], "Giới tính không hợp lệ")
            .required("Trường này là bắt buộc"),
        age: Yup.number()
            .min(1, "Tuổi phải lớn hơn 0")
            .max(100, "Tuổi không hợp lệ")
            .required("Trường này là bắt buộc"),
        gpa: Yup.number()
            .min(0, "Điểm GPA phải từ 0")
            .max(4, "Điểm GPA tối đa là 4")
            .required("Trường này là bắt buộc"),
        major: Yup.string().required("Trường này là bắt buộc"),
        interested_domain: Yup.string().required("Trường này là bắt buộc"),
        projects: Yup.string().required("Trường này là bắt buộc"),
        python: Yup.string()
            .oneOf(["Strong", "Average", "Weak"], "Giá trị không hợp lệ")
            .required("Trường này là bắt buộc"),
        sql: Yup.string()
            .oneOf(["Strong", "Average", "Weak"], "Giá trị không hợp lệ")
            .required("Trường này là bắt buộc"),
        java: Yup.string()
            .oneOf(["Strong", "Average", "Weak"], "Giá trị không hợp lệ")
            .required("Trường này là bắt buộc"),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("https://api/test", values);
            setFutureCareer(response.data.futureCareer);
        } catch (error) {
            console.error("Error predicting future career:", error);
        }
    };

    return (
        <div className="search-detail-container">
            <Header />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur
                validateOnChange
            >
                {({ touched, errors }) => (
                    <Form className="search-detail-form">
                        <button type="button" onClick={() => window.history.back()} className="back-button-top-right">
                            Quay lại
                        </button>

                        <h2>Dự đoán Nghề Nghiệp</h2>

                        {/* Các trường nhập liệu */}
                        {[{ name: "student_id", label: "Mã Sinh Viên" },
                          { name: "name", label: "Tên" },
                          { name: "age", label: "Tuổi", type: "number" },
                          { name: "gpa", label: "GPA", type: "number" },
                          { name: "major", label: "Chuyên ngành" },
                          { name: "interested_domain", label: "Lĩnh vực quan tâm" },
                          { name: "projects", label: "Dự án" }].map(
                            ({ name, label, type = "text" }) => (
                                <div key={name} className={`form-group ${touched[name] && errors[name] ? "error-field" : ""}`}>
                                    <label>{label}</label>
                                    <Field type={type} name={name} />
                                    {touched[name] && errors[name] && <div className="error">{errors[name]}</div>}
                                </div>
                            )
                        )}

                        {/* Dropdown Giới tính */}
                        <div className={`form-group ${touched.gender && errors.gender ? "error-field" : ""}`}>
                            <label>Giới tính</label>
                            <Field as="select" name="gender">
                                <option value="">Chọn giới tính</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Field>
                            {touched.gender && errors.gender && <div className="error">{errors.gender}</div>}
                        </div>

                        {/* Trường chọn mức độ */}
                        {[{ name: "python", label: "Python" },
                          { name: "sql", label: "SQL" },
                          { name: "java", label: "Java" }].map(({ name, label }) => (
                            <div key={name} className={`form-group ${touched[name] && errors[name] ? "error-field" : ""}`}>
                                <label>{label}</label>
                                <Field as="select" name={name}>
                                    <option value="">Chọn mức độ</option>
                                    <option value="Strong">Strong</option>
                                    <option value="Average">Average</option>
                                    <option value="Weak">Weak</option>
                                </Field>
                                {touched[name] && errors[name] && <div className="error">{errors[name]}</div>}
                            </div>
                        ))}

                        <button type="submit" className="submit-button">
                            Dự đoán
                        </button>
                    </Form>
                )}
            </Formik>

            {futureCareer && (
                <div className="result">
                    <h3>Nghề nghiệp dự kiến:</h3>
                    <p>{futureCareer}</p>
                </div>
            )}
        </div>
    );
};

export default SearchDetail;
