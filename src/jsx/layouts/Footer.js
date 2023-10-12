import React from "react";

const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Developed by
          <a href="https://rsecurity.tech/en/" target="_blank" rel="noreferrer">
            {" "}
            rsecurity
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
