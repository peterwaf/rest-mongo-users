import React from "react";
import { useState, useEffect } from "react";

function AddUsersForm({ updateAddingStatus, addUser }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };


  return (
    <div
      id="addUsersForm"
      className="absolute bg-black bg-opacity-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-screen min-h-screen"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser(user);
        }}
        id="addUser"
        className="flex flex-col p-2 gap-2 align-middle justify-center w-[300px] h-[300px] bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border border-white"
      >
        <input
          type="text"
          className="w-full p-2"
          name="name"
          id="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          className="w-full p-2"
          name="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="w-full p-2"
          name="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button className="text-white p-2 mt-2 mb-2 border-orange-300 border-2 m-2">
          Save
        </button>
        <button
          onClick={() => {
            updateAddingStatus();
          }}
          className="text-white p-2 mt-2 mb-2 border-orange-300 border-2 m-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddUsersForm;
