import React from "react";

export default function ErrorContainer({pageError}) {
  return (
    <div className="w-1/2 mx-auto bg-white text-center p-2 mb-6 text-white">
      <p className="text-red-500 font-bold">Something went wrong, Error : {pageError}</p>
    </div>
  );
}
