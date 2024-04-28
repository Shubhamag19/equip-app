import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { usersAction } from "../redux/slices/usersSlice";

const ApplyPosition = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { position } = useParams();
  let applyingPosition = position;
  applyingPosition = applyingPosition
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const positionsData = useSelector((state) => state.positions.records);

  let updatedPositionsData = [];
  positionsData.forEach((data) => {
    let { title } = data;
    title = title.split(" ").join("-").toLowerCase();
    updatedPositionsData = [...updatedPositionsData, { ...data, title: title }];
  });

  const [currentPosition, setCurrentPosition] = useState("");

  useEffect(() => {
    updatedPositionsData.forEach((data) => {
      if (data.title === position) {
        setCurrentPosition(data);
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    company: "",
  });

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
      container: "applied",
      position: position,
    };
    dispatch(
      usersAction.updateUsersData({
        data: updatedData,
      })
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      company: "",
    });
    navigate("/");
  };

  return (
    <div className="apply-positions-main">
      <h1>Acme Inc</h1>
      <h2>
        {applyingPosition} <span>(3 years)</span>
      </h2>
      <div className="apply-positions-description">
        <div
          dangerouslySetInnerHTML={{ __html: currentPosition.description }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="apply-positions-user-data">
          {currentPosition.applicantNameNeeded && (
            <div>
              <label htmlFor="title">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {currentPosition.applicantEmailNeeded && (
            <div>
              <label htmlFor="title">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {currentPosition.applicantPhoneNeeded && (
            <div>
              <label htmlFor="title">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {currentPosition.applicantLinkedInNeeded && (
            <div>
              <label htmlFor="title">Linkedin</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {currentPosition.applicantCompanyNeeded && (
            <div>
              <label htmlFor="title">Current company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>
        <div className="apply-positions-button">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ApplyPosition;
