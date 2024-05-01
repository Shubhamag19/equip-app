import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";

const Navigation = (props) => {
  const { pageName } = props;

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/open-positions");
  };

  const handleLogoutClick = () => {
    navigate("/");
  };

  return (
    <div className="open-positions-navigation">
      {pageName ? (
        <div>
          <IoHomeOutline
            style={{ fontSize: "30px", cursor: "pointer", color: "white" }}
            onClick={handleHomeClick}
          />
        </div>
      ) : (
        <div></div>
      )}
      <div className="open-positions-navigation-header">
        {pageName ?? "Applicant Tracking System"}
      </div>
      {pageName ? (
        <div className="open-positions-logo" onClick={handleLogoutClick}>
          <div className="open-positions-logo-text">Logout</div>
          <SlLogout
            style={{ fontSize: "30px", cursor: "pointer", color: "white" }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Navigation;
