import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ROUTES from "../utils/ROUTES.json";
import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const UsersInfoView = () => {
  const [users, setUsers] = useState<User[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      api.get("/users/get").then(({data }) => setUsers(data));
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {users?.map((user) => (
        <div
          style={{
            flexDirection: "column",
            padding: 10,
            border: "2px solid black",
            margin: 10,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <div>
            <p>Username: {user?.username}</p>
            <p>E-mail: {user?.email}</p>
            <p>Phone number: {user?.number}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersInfoView;