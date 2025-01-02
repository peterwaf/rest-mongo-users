import React from "react";

function EditForm({ updateEditStatus, selectedUser, handleUserChange,handleUserSubmit }) {
  return (
    <div
      id="editFormContainer"
      className="absolute bg-black bg-opacity-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-screen min-h-screen"
    >
      <form onSubmit={handleUserSubmit}
        id="editForm"
        className="flex flex-col p-2 gap-2 align-middle justify-center w-[300px] h-[300px] bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border border-white"
      >
        <input
          type="text"
          className="w-full p-2"
          name="name"
          id="name"
          placeholder="Name"
          value={selectedUser.name}
          onChange={handleUserChange}
        />
        <input
          type="email"
          className="w-full p-2"
          name="email"
          id="email"
          placeholder="Email"
          value={selectedUser.email}
          onChange={handleUserChange}
        />
        <button className="text-white p-2 mt-2 mb-2 border-orange-300 border-2 m-2">
          Save
        </button>
        <button
          onClick={() => {
            updateEditStatus();
          }}
          className="text-white p-2 mt-2 mb-2 border-orange-300 border-2 m-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditForm;
