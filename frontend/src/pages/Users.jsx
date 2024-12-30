import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [pageError, setPageError] = useState("");
  const loadUsers = async () => {
    try {
      const dbUsers = await axios.get("http://localhost:5000/api/users");
      setUsers(dbUsers.data);
    } catch (error) {
        setPageError(error.message)
    }
  };

console.log(users);

  useEffect(() => {
    loadUsers();
  }, []);


  return (
    <div id="users" className="w-full bg-orange-300 h-screen p-2 pt-4">
        <span>{pageError}</span>
        <h1 className="p-3 text-center font-bold">Users</h1>
        <div className="grid gap-1 lg:grid-cols-5 pt-4 pb-4 bg-black font-bold text-white">
        <div className="p-3 text-left">User Id</div>
        <div className="p-3 text-left">User Name</div>
        <div className="p-3 text-left">User Email</div>
        <div className="p-3 text-left">Edit</div>
        <div className="p-3 text-left">Delete</div>
        </div>
        <div className=" bg-white rounded-b-lg">
        {users.map(user =><div className="grid gap-1 lg:grid-cols-5 pt-4 pb-4">
            <div className="p-3 text-left">{user._id}</div>
            <div className="p-3 text-left">{user.name}</div>
            <div className="p-3 text-left">{user.email}</div>
            <div className="p-3 text-left"><button className="border-orange-300 border-2 w-full p-2">Edit</button></div>
            <div className="p-3 text-left"><button className="border-orange-300 border-2 w-full p-2">Delete</button></div>
        </div>)}
        </div>
        

            
      
    </div>
  );
}

export default Users;
