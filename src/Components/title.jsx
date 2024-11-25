import React from "react";

const Title = ({ title }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <h1 className="section-title position-relative text-center mb-5">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Title;
