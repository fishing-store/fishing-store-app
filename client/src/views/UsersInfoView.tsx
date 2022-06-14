import { useState, useEffect } from "react";
import { api, authApi } from "../api";

const UsersInfoView = () => {
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    const fetchData = () => {
      authApi.get("/users/get").then(({ data }) => {
        console.log({ data })
        setUsers(data)
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{width: "100%", textAlign: 'center'}}><h1>User list</h1></div>
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
            key={user.username}
          >
            <div>
              <p>Username: {user?.username}</p>
              <p>E-mail: {user?.email}</p>
              <p>Phone number: {user?.number}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersInfoView;