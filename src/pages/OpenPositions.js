import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OpenPositions = () => {
  const navigate = useNavigate();

  const positionsData = useSelector((state) => state.positions.records);

  // const positionsArr = ["Python Dev", "React Dev", "Product Marketer"];
  // const [positions, setPositions] = useState(positionsArr);

  const handleAddPosition = () => {
    navigate("/create-position");
  };

  const handleClick = (title) => {
    title = title.split(" ").join("-").toLowerCase();
    navigate(`/${title}/application-status`);
  };

  return (
    <div className="open-positions-main">
      <div className="open-positions-add">
        <button onClick={handleAddPosition}>Add Position</button>
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
