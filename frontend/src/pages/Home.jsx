import React from "react";

function Home() {
  return (
    <div className="bg-[url('images/pexels-ithalu-907485.jpg')] bg-cover">
      <div
        id="sign-up"
        className="h-[600px] flex flex-col justify-center align-middle"
      >
        <div className="flex flex-col justify-center align-center bg-black bg-opacity-50 rounded w-[400px] h-[400px] text-center mx-auto">
          <h1 className="text-4xl py-4 text-white font-bold">Users App</h1>
          <a
            href="#"
            className="text-orange-400 w-[200px] border my-2 p-2 mx-auto"
          >
            Sign Up
          </a>
          <a
            href="#"
            className="text-orange-400 w-[200px] border my-2 p-2 mx-auto"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
