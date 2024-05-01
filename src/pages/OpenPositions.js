import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const OpenPositions = () => {
  const navigate = useNavigate();

  const userType = useSelector((state) => state.login.userType);
  const positionsData = useSelector((state) => state.positions.records);

  const [isRecruiterLogged, setIsRecruiterLogged] = useState(false);

  useEffect(() => {
    if (userType === "recruiter") {
      setIsRecruiterLogged(true);
    } else {
      setIsRecruiterLogged(false);
    }
  }, []);

  const handleAddPosition = () => {
    navigate("/create-position");
  };

  const handleClick = (title) => {
    title = title.split(" ").join("-").toLowerCase();
    if (isRecruiterLogged) {
      navigate(`/${title}/application-status`);
    } else {
      navigate(`/${title}/apply`);
    }
  };

  return (
    <div className="open-positions-main">
      <Navigation pageName="Open Positions" />
      {isRecruiterLogged && (
        <div className="open-positions-add">
          <button onClick={handleAddPosition}>Add Position</button>
        </div>
      )}
      <div className="open-positions-header-wrap">
        {isRecruiterLogged && (
          <div className="open-positions-header">
            Select the position to see application status
          </div>
        )}
        {!isRecruiterLogged && (
          <div className="open-positions-header">
            Select the position to apply
          </div>
        )}
        <div className="open-positions-header-arrow"></div>
      </div>
      <div className="open-positions-card">
        {positionsData?.map((position) => {
          return (
            <div
              key={position.id}
              className="open-positions-card-single"
              onClick={() => handleClick(position?.title)}
            >
              {position?.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpenPositions;
