import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import EditForm from "../components/EditForm";
import ErrorContainer from "../components/ErrorContainer";
import AddUsersForm from "../components/AddUsersForm";

function Users() {
  const [users, setUsers] = useState([]);
  const [pageError, setPageError] = useState("");
  const [editing, setEditing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAddingUser, setIsAddingUser] = useState(false);

  //load users function

  const loadUsers = async () => {
    try {
      const dbUsers = await axios.get("http://localhost:5000/api/users");
      setUsers(dbUsers.data);
    } catch (error) {
      setPageError(error.response.data.message);
    }
  };

  //load users on page load

  useEffect(() => {
    loadUsers();
  }, []);

  //check if user has clicked edit button

  const updateEditStatus = () => {
    setEditing(!editing);
  };

  // check if the user clicked the add user button

  const updateAddingStatus = () => {
    setIsAddingUser(!isAddingUser);
  };

  //handle user data change

  const handleUserChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  //handle submit user data

  const handleUserSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(
        `http://localhost:5000/api/users/${selectedUser._id}`,
        {
          name: selectedUser.name,
          email: selectedUser.email,
          password: selectedUser.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("user updated successfuly");
      //loop through the users to update the users on the front end
      const newUsersList = users.map((user) =>
        user._id === selectedUser._id ? selectedUser : user
      );
      setUsers(newUsersList);
      setEditing(!editing);
      setIsError(false);
    } catch (error) {
      setPageError(error.response.data.message);
      setIsError(true);
      setEditing(!editing);
    }
  };

  // delete a user

  const deleteUser = async (userId) => {
    try {
      const selectedUser = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      const selectedUserEmail = selectedUser.data.email;
      const confirmDelete = confirm(
        `Are you sure you want to delete the user with email ${selectedUserEmail} ?`
      );
      if (!confirmDelete) {
        setIsError(false);
        return;
      }
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);

      //update usersList

      const newUsersArr = users.filter((user) => user._id != userId);
      setUsers(newUsersArr);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setPageError(error.response.data.message);
    }
  };

  // add a user

  const addUser = async (user) => {
    //add user to the db
    try {
      await axios.post(
        "http://localhost:5000/api/users/create-user",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      //update users state

      const addedUserData = await axios.get(
        `http://localhost:5000/api/users/email/${user.email}`
      );
      const addedUser = addedUserData.data.user;
      setUsers((prevUsers) => {
        return [...prevUsers, addedUser];
      });
      //update Adding status;
      setIsError(false);
      updateAddingStatus();
    } catch (error) {
      console.log(error)
      setPageError(error.response.data.message);
      setIsError(true);
      updateAddingStatus();
    }
  };

  return (
    <div id="users" className="w-full bg-orange-300 h-screen">
      {editing && (
        <EditForm
          updateEditStatus={updateEditStatus}
          selectedUser={selectedUser}
          handleUserChange={handleUserChange}
          handleUserSubmit={handleUserSubmit}
        />
      )}

      {isAddingUser && (
        <AddUsersForm
          updateAddingStatus={updateAddingStatus}
          addUser={addUser}
        />
      )}

      <h1 className="p-3 text-center font-bold underline">Users </h1>
      <div className="text-center">
        <button
          onClick={() => {
            setIsAddingUser(!isAddingUser);
          }}
          className="border-2 font-bold border-white m-2 mx-auto p-2"
        >
          Add User
        </button>{" "}
      </div>

      {isError && <ErrorContainer pageError={pageError} />}
      <div className="grid gap-1 lg:grid-cols-5 pt-4 pb-4 bg-black font-bold text-white">
        <div className="p-3 text-left">User Id</div>
        <div className="p-3 text-left">User Name</div>
        <div className="p-3 text-left">User Email</div>
        <div className="p-3 text-left">Edit</div>
        <div className="p-3 text-left">Delete</div>
      </div>
      <div className=" bg-white rounded-b-lg">
        {users.map((user) => (
          <div className="grid gap-1 lg:grid-cols-5 pt-4 pb-4" key={user._id}>
            <div className="p-3 text-left">{user._id}</div>
            <div className="p-3 text-left">{user.name}</div>
            <div className="p-3 text-left">{user.email}</div>
            <div className="p-3 text-left">
              <button
                onClick={() => {
                  setEditing(!editing);
                  setSelectedUser(user);
                }}
                className="border-orange-300 border-2 w-full p-2"
              >
                Edit
              </button>
            </div>
            <div className="p-3 text-left">
              <button
                onClick={() => {
                  deleteUser(user._id);
                }}
                className="border-orange-300 border-2 w-full p-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
