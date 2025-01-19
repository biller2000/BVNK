import React from "react";

const LogoItem = ({ src, alt = "" }) => {
  return <img src={src} alt="" className="h-8" />;
};

export default LogoItem;
