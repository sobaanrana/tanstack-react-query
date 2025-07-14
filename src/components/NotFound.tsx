import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      Nothing here! Go to <Link to={"/"}>(Here)</Link>
    </div>
  );
};

export default NotFound;
