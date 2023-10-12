import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button, Modal } from "react-bootstrap";
//import { SRLWrapper } from "simple-react-lightbox";

import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

/// Image
import profile01 from "../../../../images/profile/1.jpg";
import profile02 from "../../../../images/profile/2.jpg";
import profile03 from "../../../../images/profile/3.jpg";
import profile04 from "../../../../images/profile/4.jpg";
import profile05 from "../../../../images/profile/5.jpg";
import profile06 from "../../../../images/profile/6.jpg";
import profile07 from "../../../../images/profile/7.jpg";
import profile08 from "../../../../images/profile/8.jpg";
import profile from "../../../../images/profile/profile.png";
import PageTitle from "../../../layouts/PageTitle";

const galleryBlog = [
  { image: profile02 },
  { image: profile03 },
  { image: profile04 },
  { image: profile03 },
  { image: profile02 },
  { image: profile04 },
];

const initialState = false;
const reducer = (state, action) => {
  switch (action.type) {
    case "sendMessageOpen":
      return { ...state, sendMessage: true };
    case "sendMessageClose":
      return { ...state, sendMessage: false };

    default:
      return state;
  }
};

const PostDetails = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onInit = () => {
    //console.log('lightGallery has been initialized');
  };

  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };
  return (
    <div>
      <div>
        <PageTitle
          activeMenu="Post Details"
          motherMenu="Advanced"
          pageContent="Post Details"
        />
        {/* row */}
        <div className="row">
          <div className="col-lg-12">
            <div className="profile card card-body px-3 pt-3 pb-0">
              <div className="profile-head">
                <div className="photo-content ">
                  <div className="cover-photo rounded"></div>
                </div>
                <div className="profile-info">
                  <div className="profile-details">
                    <div className="profile-name px-3 pt-2">
                      <h4 className="text-primary mb-0">Mitchell C. Shay</h4>
                      <p>UX / UI Designer</p>
                    </div>
                    <div className="profile-email px-2 pt-2">
                      <h4 className="text-muted mb-0">hello@email.com</h4>
                      <p>Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default PostDetails;
