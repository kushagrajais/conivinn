import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getAllUsers = () => {
  return fetch("https://reqres.in/api/users").then((res) => res.json());
};

const getSingleUser = (id) => {
  return fetch(`https://reqres.in/api/users/${id}`).then((res) => res.json());
};

const getFullName = (first_name, last_name) => first_name + " " + last_name;

function App() {
  const [loading, setLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);
  const [singleUser, setSingleUser] = useState({});
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers().then((res) => {
      setLoading(false);
      dispatch({ type: "SET_USERS", payload: res.data });
    });
  }, [dispatch]);

  const handleClick = (e) => {
    const { id } = e.target;
    if (id) {
      setCardLoading(true);
      getSingleUser(id).then((res) => {
        setSingleUser(res.data);
        setCardLoading(false);
      });
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="App">
      {singleUser.id && (
        <div className="user-card-container">
          {cardLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <img src={singleUser.avatar} alt="user avatar" />
              <h1>
                {getFullName(singleUser.first_name, singleUser.last_name)}
              </h1>
              <p>{singleUser.email}</p>
            </div>
          )}
        </div>
      )}

      <h1 style={{ textAlign: "center" }}>
        Click on the button to retrieve user Info
      </h1>

      <div className="buttons-container" onClick={handleClick}>
        {users.map((user) => (
          <button className="user-btn" id={user.id} key={user.id}>
            {getFullName(user.first_name, user.last_name)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
