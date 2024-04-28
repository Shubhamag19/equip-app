import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiTriangleFill } from "react-icons/ri";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { positionsAction } from "../redux/slices/positionsSlice";

const CreatePositions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    experience: "",
    location: "",
    salary: "",
    description: "",
  });

  const [userDataNeeded, setUserDataNeeded] = useState({
    name: true,
    email: true,
    phone: false,
    linkedin: false,
    company: false,
  });

  const [jobDescription, setJobDescription] = useState("");

  const handleJDChange = (value) => {
    setJobDescription(value);
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      id: Date.now(),
      ...formData,
      applicantNameNeeded: userDataNeeded.name,
      applicantEmailNeeded: userDataNeeded.email,
      applicantPhoneNeeded: userDataNeeded.phone,
      applicantLinkedInNeeded: userDataNeeded.linkedin,
      applicantCompanyNeeded: userDataNeeded.company,
    };

    dispatch(positionsAction.updateRecords({ data: updatedData }));
    setFormData({
      title: "",
      experience: "",
      location: "",
      salary: "",
      description: "",
    });
    navigate("/");
  };

  const handleMoveToHome = () => {
    navigate("/");
  };

  const handleDataNeededChange = (e) => {
    const { name, checked } = e.target;
    setUserDataNeeded((prevData) => {
      return {
        ...prevData,
        [name]: checked,
      };
    });
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="create-positions-main">
      <div className="create-positions-header">
        <RiTriangleFill
          style={{ fontSize: "18px", cursor: "pointer" }}
          onClick={handleMoveToHome}
        />
        &gt; <h1>Create Position</h1>
      </div>
      <div className="create-positions-body">
        <form onSubmit={handleSubmit}>
          <div className="create-positions-body-single">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="create-positions-body-single">
            <label htmlFor="experience">Experience</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="create-positions-body-location">
            <label htmlFor="location">Location</label>
            <div className="create-positions-body-location-div">
              <div className="create-positions-body-location-div-radio">
                <input
                  type="radio"
                  name="location"
                  value="In-person"
                  checked={formData.location === "In-person"}
                  onChange={handleChange}
                />
                <label>In-person</label>
              </div>
              <div className="create-positions-body-location-div-radio">
                <input
                  type="radio"
                  name="location"
                  value="Remote"
                  checked={formData.location === "Remote"}
                  onChange={handleChange}
                />
                <label>Remote</label>
              </div>
            </div>
          </div>
          <div className="create-positions-body-single">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
            <span>lpa</span>
          </div>
          <div className="create-positions-body-jd">
            <label htmlFor="description">Job Description</label>
            <ReactQuill
              theme="snow"
              modules={module}
              value={jobDescription}
              onChange={handleJDChange}
              required
              style={{ width: "600px", height: "200px", marginBottom: "50px" }}
            />
          </div>
          <div className="create-positions-data">
            <div>Data Needed</div>
            <div className="create-positions-data-wrap">
              <div className="create-positions-data-single">
                <input
                  type="checkbox"
                  name="name"
                  id="name"
                  value="name"
                  checked={userDataNeeded.name}
                  // onChange={() => {}}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="create-positions-data-single">
                <input
                  type="checkbox"
                  name="email"
                  id="email"
                  value="email"
                  checked={userDataNeeded.email}
                  // onChange={() => {}}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="create-positions-data-single">
                <input
                  type="checkbox"
                  name="phone"
                  id="phone"
                  value="phone"
                  checked={userDataNeeded.phone}
                  onChange={handleDataNeededChange}
                />
                <label htmlFor="phone">Phone number</label>
              </div>
              <div className="create-positions-data-single">
                <input
                  type="checkbox"
                  name="linkedin"
                  id="linkedin"
                  value="linkedin"
                  checked={userDataNeeded.linkedin}
                  onChange={handleDataNeededChange}
                />
                <label htmlFor="linkedin">LinkedIn URL</label>
              </div>
              <div className="create-positions-data-single">
                <input
                  type="checkbox"
                  name="company"
                  id="company"
                  value="company"
                  checked={userDataNeeded.company}
                  onChange={handleDataNeededChange}
                />
                <label htmlFor="company">Current company</label>
              </div>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePositions;
