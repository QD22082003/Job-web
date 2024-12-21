import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Header from "../../components/Header/Header";
import "./SearchDetail.css";

const SearchDetail = () => {
  const [futureCareer, setFutureCareer] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", uid: "" });
  const handleBackClick = () => {
    navigate(-1);
  };
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      setLoading(true);
      fetch("http://localhost:3000/api/student/getSummaryMark", {
        method: "GET",
        headers: {
          Authorization: `${token}`, // Truyền token vào header Authorization
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json()) // Parse JSON từ response
        .then((data) => {
          if (data.message === "Get student info success") {
            // Lưu tên và mã sinh viên vào state
            setUserData({
              name: data.data.displayName,
              uid: data.data.uid,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }, [token]);

  const handleJobHome = () => {
    // Chuyển hướng đến trang Home và truyền giá trị search trong state
    navigate("/?search=" + futureCareer, { state: { futureCareer } });
    console.log("futureCareer", futureCareer);
  };
  
  const projects = [
    "Chatbot Development",
    "Data Analytics",
    "E-commerce Website",
    "Full-Stack Web App",
    "Network Security",
    "Image Recognition",
    "SQL Query Optimization",
    "AWS Deployment",
    "Android App",
    "3D Rendering",
    "Natural Language Processing",
    "iOS App",
    "Game Development",
    "GCP Deployment",
    "Social Media Platform",
    "iOS Game",
    "3D Animation",
    "Machine Learning",
    "Android Game",
    "3D Modeling",
    "Firewall Management",
    "Deep Learning Models",
    "Data Warehouse Design",
    "Embedded Systems",
    "Front-End Development",
    "Statistical Analysis",
    "Robotics",
    "Mobile Game Development",
    "Penetration Testing",
    "Object Detection",
    "DevOps",
    "Genomic Data Analysis",
    "Smart Home Automation",
    "Market Analysis",
    "Cloud Migration Specialist",
    "Usability Testing",
    "Medical Imaging Analysis",
    "Quantum Algorithm Development",
    "Virtual Reality Development",
    "Smart Contracts Developer",
    "Search Engine Optimization",
    "Privacy Compliance Officer",
    "GIS Mapping",
    "Distributed Systems Architect",
    "Computer Forensic Analyst",
    "Protein Structure Prediction",
    "User Experience Researcher",
    "Healthcare Data Analyst",
    "Neural Network Development",
    "Big Data Analytics",
    "Mobile App Development",
    "Image Classification",
    "SQL Database Design",
    "Cloud Infrastructure Management",
    "iOS App Development",
    "Android App Development",
    "Enterprise Software Development",
    "Computer Vision",
    "Web Application Development",
    "Security Auditing",
    "SQL Database Administration",
    "Cloud Solution Architecture",
    "Cross-Platform App Development",
    "Reinforcement Learning",
    "Data Mining",
  ];

  const domains = [
    "Artificial Intelligence",
    "Data Science",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Machine Learning",
    "Database Management",
    "Cloud Computing",
    "Mobile App Development",
    "Computer Graphics",
    "Software Engineering",
    "Network Security",
    "Game Development",
    "Computer Vision",
    "Bioinformatics",
    "IoT (Internet of Things)",
    "Natural Language Processing",
    "Data Mining",
    "Human-Computer Interaction",
    "Biomedical Computing",
    "Quantum Computing",
    "Blockchain Technology",
    "Information Retrieval",
    "Data Privacy",
    "Geographic Information Systems",
    "Distributed Systems",
    "Digital Forensics",
  ];

  const initialValues = {
    student_id: "",
    name: "",
    gender: "",
    age: "",
    gpa: "",
    interested_domain: "",
    projects: "",
    python: "",
    sql: "",
    java: "",
  };

  const validationSchema = Yup.object({
    gender: Yup.string().required("Trường này không được để trống"),
    age: Yup.number()
    .required("Trường này không được để trống")
    .positive("Tuổi phải là số dương")  // Đảm bảo tuổi là số dương
    .integer("Tuổi phải là số nguyên")  // Đảm bảo tuổi là số nguyên
    .min(18, "Tuổi phải ít nhất là 18")  // Thiết lập độ tuổi tối thiểu
    .max(100, "Tuổi không được lớn hơn 100") ,
    gpa: Yup.number()
      .required("Trường này không được để trống")
      .min(1)
      .max(4, "GPA phải nằm trong khoảng 1 đến 4"),
    interested_domain: Yup.string().required("Vui lòng chọn lĩnh vực quan tâm"),
    projects: Yup.string().required("Vui lòng chọn dự án"),
    python: Yup.number().required("Trường này không được để trống"),
    sql: Yup.number().required("Trường này không được để trống"),
    java: Yup.number().required("Trường này không được để trống"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setOpenDialog(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/predict/career",
        {
          age: values.age,
          gpa: values.gpa,
          domain: values.interested_domain,
          projects: values.projects,
          python: values.python,
          sql: values.sql,
          java: values.java,
        }
      );

      if (response.data.data) {
        setFutureCareer(response.data.data);
      } else {
        setFutureCareer("Không tìm thấy nghề nghiệp phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi dự đoán nghề nghiệp:", error);
      setFutureCareer("Đã có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  console.log("name" + userData?.name);
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
        {({ touched, errors, setFieldValue, values }) => (
          <Form className="search-detail-form">
            <button
              type="button"
              onClick={handleBackClick}
              className="back-button-top-right"
            >
              Quay lại
            </button>

            <h2>Dự đoán Nghề Nghiệp</h2>
            {loading ? ( // Kiểm tra trạng thái loading
              <div className="loading-container-info">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <>
                {/* Student ID */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.student_id && !!errors.student_id}
                  >
                    <Field
                      name="student_id"
                      as={TextField} // Luôn render TextField
                      variant="outlined"
                      fullWidth
                      label="Mã sinh viên"
                      value={userData?.uid || ""} // Gán giá trị từ userData.uid nếu tồn tại
                      error={touched.student_id && !!errors.student_id}
                      helperText={touched.student_id && errors.student_id}
                    />
                  </FormControl>
                </div>

                {/* Name */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.name && !!errors.name}
                  >
                    <Field
                      name="name"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      label="Tên"
                      value={userData?.name || ""}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </FormControl>
                </div>

                {/* Gender */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.gender && !!errors.gender}
                  >
                    <InputLabel>Lựa chọn giới tính</InputLabel>
                    <Select
                      name="gender"
                      value={values.gender}
                      onChange={(e) => setFieldValue("gender", e.target.value)}
                      label="Lựa chọn giới tính"
                    >
                      <MenuItem value="Male">Nam</MenuItem>
                      <MenuItem value="Female">Nữ</MenuItem>
                    </Select>
                    {touched.gender && errors.gender && (
                      <div className="error-text">{errors.gender}</div>
                    )}
                  </FormControl>
                </div>

                {/* Age */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.age && !!errors.age}
                  >
                    <Field
                      name="age"
                      type="number"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      label="Tuổi"
                      error={touched.age && !!errors.age}
                      helperText={touched.age && errors.age}
                    />
                  </FormControl>
                </div>

                {/* GPA */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.gpa && !!errors.gpa}
                  >
                    <Field
                      name="gpa"
                      type="number"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      label="GPA"
                      value={'3.2'}
                      error={touched.gpa && !!errors.gpa}
                      helperText={touched.gpa && errors.gpa}
                    />
                  </FormControl>
                </div>

                {/* Lĩnh vực Quan tâm */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={
                      touched.interested_domain && !!errors.interested_domain
                    }
                  >
                    <Autocomplete
                      options={domains}
                      value={values.interested_domain}
                      onChange={(event, newValue) =>
                        setFieldValue("interested_domain", newValue || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Chọn Lĩnh vực"
                          variant="outlined"
                          error={
                            touched.interested_domain &&
                            !!errors.interested_domain
                          }
                          helperText={
                            touched.interested_domain &&
                            errors.interested_domain
                          }
                        />
                      )}
                    />
                  </FormControl>
                </div>

                {/* Dự án */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.projects && !!errors.projects}
                  >
                    <Autocomplete
                      options={projects}
                      value={values.projects}
                      onChange={(event, newValue) =>
                        setFieldValue("projects", newValue || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Chọn Dự án"
                          variant="outlined"
                          error={touched.projects && !!errors.projects}
                          helperText={touched.projects && errors.projects}
                        />
                      )}
                    />
                  </FormControl>
                </div>

                {/* Python */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.python && !!errors.python}
                  >
                    <InputLabel>Python</InputLabel>
                    <Select
                      name="python"
                      value={values.python}
                      onChange={(e) => setFieldValue("python", e.target.value)}
                      label="Python"
                    >
                      <MenuItem value={1}>Giỏi</MenuItem>
                      <MenuItem value={2}>Khá</MenuItem>
                      <MenuItem value={3}>Trung bình</MenuItem>
                    </Select>
                    {touched.python && errors.python && (
                      <div className="error-text">{errors.python}</div>
                    )}
                  </FormControl>
                </div>

                {/* SQL */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.sql && !!errors.sql}
                  >
                    <InputLabel>SQL</InputLabel>
                    <Select
                      name="sql"
                      value={values.sql}
                      onChange={(e) => setFieldValue("sql", e.target.value)}
                      label="SQL"
                    >
                      <MenuItem value={1}>Giỏi</MenuItem>
                      <MenuItem value={2}>Khá</MenuItem>
                      <MenuItem value={3}>Trung bình</MenuItem>
                    </Select>
                    {touched.sql && errors.sql && (
                      <div className="error-text">{errors.sql}</div>
                    )}
                  </FormControl>
                </div>

                {/* Java */}
                <div className="form-group">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.java && !!errors.java}
                  >
                    <InputLabel>Java</InputLabel>
                    <Select
                      name="java"
                      value={values.java}
                      onChange={(e) => setFieldValue("java", e.target.value)}
                      label="Java"
                    >
                      <MenuItem value={1}>Giỏi</MenuItem>
                      <MenuItem value={2}>Khá</MenuItem>
                      <MenuItem value={3}>Trung bình</MenuItem>
                    </Select>
                    {touched.java && errors.java && (
                      <div className="error-text">{errors.java}</div>
                    )}
                  </FormControl>
                </div>

                <button type="submit" className="submit-button">
                  Dự đoán
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="career-dialog"
      >
        <DialogTitle>Thông tin Nghề Nghiệp</DialogTitle>
        <DialogContent>
          {loading ? (
            <div className="loading-container">
              <CircularProgress />
              <span>Đang tải...</span>
            </div>
          ) : (
            <div className="result" onClick={handleJobHome}>
              <h3>Việc làm dự kiến:</h3>
              <p className="future-career">{futureCareer}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <button onClick={() => setOpenDialog(false)} className="close-button">
            Đóng
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchDetail;
