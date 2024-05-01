import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { RiTriangleFill } from "react-icons/ri";

import Navigation from "../components/Navigation";
import UserCard from "../components/UserCard";
import Droppable from "../components/Droppable";

import { usersAction } from "../redux/slices/usersSlice";

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { position } = useParams();

  let applyingPosition = position;
  applyingPosition = applyingPosition
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const sensors = useSensors(useSensor(MouseSensor));

  const usersData = useSelector((state) => state.users.usersData);

  const containers = [
    "applied",
    "assessed",
    "interviewed",
    "hired",
    "rejected",
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const updatedUsersData = usersData.filter(
      (user) => user.position === position
    );
    setUsers(updatedUsersData);
  }, [usersData]);

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    // setUsers((prevUsers) => {
    //   return prevUsers.map((user) => {
    //     if (String(user.id) === String(active.id)) {
    //       user.container = over.id;
    //     }
    //     return user;
    //   });
    // });
    dispatch(
      usersAction.updateUsersContainer({
        data: { activeUserId: active.id, container: over.id },
      })
    );
  };

  const handleMoveToHome = () => {
    navigate("/open-positions");
  };

  return (
    <div className="application-status-main">
      <Navigation pageName="Application Status" />
      <div className="application-status-wrap">
        <div className="application-status-header">
          {/* <RiTriangleFill
            style={{ fontSize: "18px", cursor: "pointer" }}
            onClick={handleMoveToHome}
          /> */}
          <div className="application-status-link" onClick={handleMoveToHome}>
            Home
          </div>
          &gt; <h1>{applyingPosition}</h1>
        </div>
        <div className="application-status-body">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="application-status-body-container">
              {containers.map((container) => (
                <div
                  key={container}
                  className="application-status-body-container-single"
                >
                  <div className="application-status-body-container-single-header">
                    <p>{container?.toUpperCase()}</p>
                  </div>
                  <Droppable id={container.toLowerCase()}>
                    <SortableContext
                      items={users.filter(
                        (user) => user.container === container
                      )}
                      strategy={sortableKeyboardCoordinates}
                    >
                      {users
                        .filter((user) => user.container === container)
                        .map((user) => (
                          <UserCard key={user.id} user={user} />
                        ))}
                    </SortableContext>
                  </Droppable>
                </div>
              ))}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
