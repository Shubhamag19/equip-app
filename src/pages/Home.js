import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../redux/slices/loginSlice";
import Navigation from "../components/Navigation";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (userType) => {
    dispatch(
      loginAction.updateUserType({
        data: userType,
      })
    );
    navigate("/open-positions");
  };

  return (
    <div className="home-main">
      <Navigation />
    <div className="home-wrap">
      <div className="home-single-card">
        <div
          className="home-single-card-details"
          onClick={() => handleClick("recruiter")}
        >
          Log in as recruiter
        </div>
      </div>
      <div className="home-vertical-line"></div>
      <div className="home-single-card">
        <div
          className="home-single-card-details"
          onClick={() => handleClick("applicant")}
        >
          Log in as applicant
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
