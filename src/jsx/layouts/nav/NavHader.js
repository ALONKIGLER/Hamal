import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

export function NavMenuToggle() {
  setTimeout(() => {
    let mainwrapper = document.querySelector("#main-wrapper");
    if (mainwrapper.classList.contains("menu-toggle")) {
      mainwrapper.classList.remove("menu-toggle");
    } else {
      mainwrapper.classList.add("menu-toggle");
    }
  }, 200);
}

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } =
    useContext(ThemeContext);
  return (
    <div className="nav-header">
      <Link to="/form-validation" className="brand-logo">
        <Fragment>
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="200.000000pt"
            height="200.000000pt"
            viewBox="0 0 200.000000 200.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M538 1106 c-10 -7 -18 -16 -18 -20 0 -3 55 -6 122 -6 120 0 121 0
103 20 -15 17 -31 20 -104 20 -56 -1 -92 -5 -103 -14z"
              />
              <path
                d="M850 1022 c0 -115 12 -142 64 -142 51 0 56 13 56 132 l0 108 -25 0
c-25 0 -25 0 -25 -95 0 -57 -4 -95 -10 -95 -6 0 -10 38 -10 95 0 95 0 95 -25
95 -25 0 -25 0 -25 -98z"
              />
              <path
                d="M1188 1114 c-10 -10 3 -208 14 -221 14 -18 47 -16 54 2 4 8 1 22 -6
30 -7 8 -11 37 -9 67 6 106 1 128 -24 128 -13 0 -26 -3 -29 -6z"
              />
              <path
                d="M1453 1085 c5 -31 3 -35 -17 -35 -35 0 -46 -20 -46 -81 0 -70 13 -86
74 -87 l46 -1 0 119 0 120 -31 0 c-31 0 -31 -1 -26 -35z m7 -115 c0 -22 -4
-40 -10 -40 -5 0 -10 18 -10 40 0 22 5 40 10 40 6 0 10 -18 10 -40z"
              />
              <path
                d="M1120 1084 c0 -21 4 -25 23 -22 14 2 23 11 25 26 3 18 -1 22 -22 22
-21 0 -26 -5 -26 -26z"
              />
              <path
                d="M627 1045 c-4 -8 -13 -15 -20 -15 -9 0 -14 -11 -14 -30 0 -18 6 -30
13 -30 7 0 17 -7 22 -16 8 -14 10 -14 21 0 8 9 19 16 25 16 6 0 11 14 11 30 0
17 -4 30 -9 30 -5 0 -17 7 -26 15 -16 14 -18 14 -23 0z m33 -45 c0 -13 -7 -20
-20 -20 -13 0 -20 7 -20 20 0 13 7 20 20 20 13 0 20 -7 20 -20z"
              />
              <path
                d="M984 1019 c3 -17 6 -56 6 -86 0 -51 2 -54 23 -51 20 3 22 10 26 68
l5 65 5 -65 c6 -61 7 -65 31 -65 25 0 25 1 21 70 -2 39 -8 76 -13 83 -6 6 -33
12 -60 12 l-50 0 6 -31z"
              />
              <path
                d="M1118 1038 c-2 -7 -2 -46 0 -86 3 -68 5 -73 25 -70 20 3 22 10 25 86
3 81 3 82 -22 82 -13 0 -26 -6 -28 -12z"
              />
              <path
                d="M1269 1023 c-14 -36 -6 -123 12 -134 25 -15 78 -10 87 9 14 26 14
122 1 138 -6 8 -29 14 -50 14 -34 0 -41 -4 -50 -27z m61 -28 c0 -8 -4 -15 -10
-15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z m0 -65 c0 -5 -2 -10
-4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4 11 -10z"
              />
              <path
                d="M535 900 c15 -17 31 -20 105 -20 74 0 90 3 105 20 18 20 17 20 -105
20 -122 0 -123 0 -105 -20z"
              />
            </g>
          </svg>
        </Fragment>
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          NavMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
