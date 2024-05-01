import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const UserCard = ({ user }) => {
  const { id, name, email, phone, linkedIn, company } = user;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(id),
  });

  const style = {
    backgroundColor: "#6b96f2",
    color: "white",
    border: "2px solid #4072e0",
    borderRadius: "5px",
    margin: "10px 10px",
    padding: "5px 10px",
    cursor: "grab",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: "relative",
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleUserEnter = () => {
    setShowDetails(true);
  };

  const handleUserLeave = () => {
    setShowDetails(false);
  };

  return (
    <div
      onMouseEnter={handleUserEnter}
      onMouseLeave={handleUserLeave}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{name}</p>
      <p>{email}</p>
      {showDetails && (
        <>
          <div className="usercard-arrow"></div>
          <div className="usercard-details">
            <p>
              <b>Name:</b> {name ? name : "NA"}
            </p>
            <p>
              <b>Email:</b> {email ? email : "NA"}
            </p>
            <p>
              <b>Phone:</b> {phone ? phone : "NA"}
            </p>
            <p>
              <b>LinkedIn:</b> {linkedIn ? linkedIn : "NA"}
            </p>
            <p>
              <b>Company:</b> {company ? company : "NA"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
