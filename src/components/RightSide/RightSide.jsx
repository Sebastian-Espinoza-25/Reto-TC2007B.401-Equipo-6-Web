import React from "react";
import Updates from "../Updates/Updates";
import "./RightSide.css";
import RightGraph from "../RightGraph/RightGraph";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h3>Updates</h3>
        <Updates />
      </div>
      <div>
        <h3>Graph</h3>
        <RightGraph />
      </div>
    </div>
  );
};

export default RightSide;
