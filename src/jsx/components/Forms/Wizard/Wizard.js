import React, { Fragment, useState } from "react";
import axios from "axios";
import { Stepper, Step } from "react-form-stepper";
import ReCAPTCHA from "react-google-recaptcha";

import PageTitle from "../../../layouts/PageTitle";

const Wizard = () => {
  const [goSteps, setGoSteps] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [verification, setVerification] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    assistanceType: "",
    phoneNumber: "",
    assistanceDetails: "",
    status: "",
    admin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("formData", formData);
    if (verification) {
      try {
        // Sending data to the server using Axios
        const response = await axios.post(
          "http://209.38.208.60/api/v1/citizen",
          formData
        );

        setSuccessMessage("Form submitted successfully!"); // Set success message

        console.log("Data sent successfully:", response.data);
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error("Error sending data:", error);
      }
    } else {
      console.log("נסה שוב");
    }
  };

  const onChange = async (value) => {
    console.log("Captcha value:", value);
    setVerification(value);
  };

  return (
    <Fragment>
      {/* <div
        className=""
        style={{
          textAlign: "right",
          textAlign: "center",
          fontSize: "1.5rem",
          margin: "center",
        }}
      >
        בקשות לסיוע - מבצע חרבות ברזל
      </div> */}

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                {/* <div className="cover-photo rounded"></div> */}
              </div>
              <div className="profile-info">
                <div className="profile-details">
                  <div
                    className="profile-name px-3 pt-2"
                    style={{
                      //   textAlign: "right",
                      textAlign: "center",
                      //   fontSize: "1rem",
                      //   margin: "center",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "2.25rem",
                      }}
                      className=" card-title text-primary mb-3 "
                    >
                      בקשות לסיוע - מבצע חרבות ברזל
                    </h4>
                    <p className="">
                      אנחנו כאן כדי לנהל ולרכז את כל סוגי הפניות והמידע לסיוע
                      וליצור חיבורים ביניהם בהתאם ובמהירות האפשרית. כל דיווח
                      בנוגע להתקפת סייבר,דרישה לדיור, מזון, ציוד, או כל נושא
                      אחר- השאירו פרטים מטה או חפשו בהתאם מהמידע הקיים
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!successMessage ? (
        <div className="row" style={{ textAlign: "right" }}>
          <div className="col-xl-12 col-xxl-12">
            <div className="card " style={{ textAlign: "right" }}>
              <div
                className="card-header"
                style={{
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <h4
                  className="text-center"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  טופס פנייה
                </h4>
              </div>
              <div className="card-body">
                <div className="form-wizard ">
                  <section>
                    <div className="row">
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label"> שם מלא</label>
                          <input
                            type="text"
                            name="fullName"
                            style={{ textAlign: "right" }}
                            className="form-control"
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">
                            מספר פלאפון (מספרים בלבד)
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            className="form-control"
                            required
                            style={{ textAlign: "right" }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="basic-form">
                          <label className="text-label"> סוג פנייה </label>
                          <div
                            className="form-group mb-3"
                            style={{ textAlign: "right" }}
                          >
                            <select
                              defaultValue={"option"}
                              value={formData.type}
                              className="form-control"
                              style={{ textAlign: "right" }}
                              onChange={handleChange} // Add this line
                              name="assistanceType"
                            >
                              <option></option>
                              <option> התקפת סייבר</option>
                              <option> דיור</option>
                              <option>נעדר </option>
                              <option>מזון </option>
                              <option>פצוע </option>
                              <option>כלכלי </option>
                              <option>כללי </option>
                              <option>חמל לאודר </option>
                              <option>חבל לכיש</option>
                            </select>
                          </div>
                          {/* </form> */}
                        </div>
                      </div>
                      <div className="col-lg-12 mb-3">
                        <div className="form-group mb-3">
                          <label className="text-label">
                            {" "}
                            (אופציונלי) תיאור נוסף{" "}
                          </label>
                          {/* <input
                            type="text"
                            name="assistanceType"
                            className="form-control"
                            required
                            style={{ textAlign: "right" }}
                            onChange={handleChange}
                            // placeholder="נא לרשום את סוג המתקפה"
                          /> */}
                          <div className="form-group ">
                            <textarea
                              rows="4"
                              id="comment"
                              type="text"
                              name="assistanceDetails"
                              className="form-control"
                              required
                              style={{ textAlign: "right" }}
                              onChange={handleChange}
                              // placeholder="נא לרשום א
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <ReCAPTCHA
                        sitekey="6LcyMYcoAAAAAN-WuegpQaVf-bhRP47IdJAjF-mi"
                        onChange={onChange}
                      />
                      ,
                      <button
                        className="btn btn-primary sw-btn-next ms-1"
                        onClick={handleSubmit}
                      >
                        שלח
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="profile card card-body px-3 pt-3 pb-0">
              <div className="profile-head">
                <div className="photo-content ">
                  {/* <div className="cover-photo rounded"></div> */}
                </div>
                <div className="profile-info">
                  <div className="  text-center profile-details">
                    <div
                      style={{ textAlign: "right", margin: "auto" }}
                      className="  text-center profile-name px-3 pt-2"
                    >
                      <h4 className="  text-center card-title text-primary mb-0">
                        תודה. פנייתך התקבלה ותועבר לטיפול ע"י הגורם
                        הרלוונטי בהקדם האפשרי
                      </h4>
                      {/* <p className="card-title">
                        הבקשה התווספה לרשימה שלנו, אנחנו כאן בשבילכם
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Wizard;
