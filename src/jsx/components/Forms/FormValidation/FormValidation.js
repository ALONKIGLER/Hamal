import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "שם המשתמש צריך לכלול לפחות 3 תוויים ")
    .max(50, "שם המשתמש צריך לכלול לכל היותר 50 תוויים ")
    .required("אנא הזן שם משתמש"),
  phone: Yup.string()
    .min(3, "מספר הפלאפון צריך לכלול לפחות 3 תוויים ")
    .max(50, " מספר הפלאפון לכלול לכל היותר 50 תוויים ")
    .required("אנא הזן מספר טלפון"),
  assistanceType: Yup.string()
    // .min(3, "סוג הפלאפון צריך לכלול לפחות 3 תוויים ")
    // .max(50, " סוג הפלאפון לכלול לכל היותר 50 תוויים ")
    .min(3, "סוג סיוע צריך לכלול לפחות 3 תוויים ")
    .required("אנא הזן סוג סיוע"),
  assistanceDetails: Yup.string()
    // .min(3, "תיאור הבקשה צריך לכלול לפחות 3 תוויים ")
    .max(250, " תיאור הבקשה לכלול לכל היותר 250 תוויים "),
  // .required("אנא הזן מספר את "),
  // password: Yup.string()
  //   .min(5, "Your password must be at least 5 characters long")
  //   .max(50, "Your password must be at least 5 characters long")
  //   .required("Please provide a password"),
});

const FormValidation = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [verification, setVerification] = useState("");

  const onChange = async (value) => {
    console.log("Captcha value:", value);
    setVerification(value);
  };

  // const [goSteps, setGoSteps] = useState(0);
  // const [successMessage, setSuccessMessage] = useState("");
  // const [verification, setVerification] = useState("");

  // const [formData, setFormData] = useState({
  //   fullName: "ד",
  //   assistanceType: "",
  //   phoneNumber: "",
  //   assistanceDetails: "",
  //   status: "",
  //   admin: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const onChange = async (value) => {
  //   console.log("Captcha value:", value);
  //   setVerification(value);
  // };

  // // const handleSubmit = async () => {
  // //   console.log("formData", formData);
  // //   if (verification) {
  // //     try {
  // //       const response = await axios.post(
  // //         "http://209.38.208.60/api/v1/citizen",
  // //         formData
  // //       );
  // //       setSuccessMessage("Form submitted successfully!"); // Set success message
  // //       console.log("Data sent successfully:");
  // //     } catch (error) {
  // //       console.error("Error sending data:", error);
  // //     }
  // //   } else {
  // //     console.log("נסה שוב");
  // //   }
  // // };

  return (
    <Fragment>
      {/* <PageTitle
        activeMenu="Validation"
        motherMenu="Form"
        pageContent="Validation"
      /> */}
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
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
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
                <div className="basic-form">
                  <Formik
                    initialValues={{
                      username: "",
                      phone: "",
                      assistanceDetails: "",
                      assistanceType: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (values) => {
                      console.log(values);
                      await new Promise((r) => setTimeout(r, 500));
                      // alert(JSON.stringify(values, null, 2));

                      const form = {
                        fullName: values.username,
                        assistanceType: values.assistanceType,
                        phoneNumber: values.phone,
                        assistanceDetails: values.assistanceDetails,
                        status: "",
                        admin: "",
                      };
                      console.log("Data sent successfully:", form);
                      if (verification) {
                        try {
                          const response = await axios.post(
                            "http://209.38.208.60/api/v1/citizen/",
                            form
                          );
                          setSuccessMessage("Form submitted successfully!"); // Set success message
                          console.log("Data sent successfully:");
                        } catch (error) {
                          console.error("Error sending data:", error);
                        }
                      } else {
                        console.log("נסה שוב");
                      }
                    }}
                  >
                    {({
                      values,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div
                            className={` col-lg-6 mb-2  ${
                              values.username
                                ? errors.username
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            style={{ textAlign: "right" }}
                          >
                            <label className="text-label">שם משתמש/חמ"ל</label>
                            <div className="input-group">
                              <input
                                type="text"
                                style={{ textAlign: "right" }}
                                className="form-control"
                                id="val-username1"
                                // placeholder="Enter a username.."
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                              />
                              <div
                                id="val-username1-error"
                                className="invalid-feedback fadeInUp"
                                style={{ display: "block" }}
                              >
                                {errors.username && errors.username}
                              </div>
                            </div>
                          </div>

                          <div
                            className="col-lg-6 mb-2"
                            style={{ textAlign: "right" }}
                          >
                            <label
                              className="text-label"
                              style={{ textAlign: "right" }}
                            >
                              טלפון
                            </label>
                            <div className="input-group transparent-append mb-2">
                              <input
                                type="text"
                                className="form-control"
                                id="val-phone"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                style={{ textAlign: "right" }}
                              />

                              <div
                                id="val-username1-error"
                                className="invalid-feedback animated fadeInUp"
                                style={{ display: "block" }}
                              >
                                {errors.phone && errors.phone}
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-lg-12 mb-2"
                            style={{ textAlign: "right" }}
                          >
                            <label
                              style={{ textAlign: "right" }}
                              className="text-label"
                            >
                              סוג פנייה
                            </label>
                            <div className="input-group transparent-append mb-2">
                              <select
                                className="form-control"
                                id="val-assistanceType"
                                name="assistanceType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.assistanceType}
                                style={{ textAlign: "right" }}
                              >
                                <option value="  " label=" " />
                                <option
                                  value="התקפת סייבר"
                                  label="התקפת סייבר"
                                />
                                <option
                                  value="ישראל בידור"
                                  label=" חמל ישראל בידור"
                                />
                                <option value="כללי" label="כללי" />
                                <option value="דיור" label="דיור" />
                                {/* <option value="נעדר" label="נעדר" /> */}
                                <option value="מזון" label="מזון" />
                                {/* <option value="פצוע" label="פצוע" /> */}
                                <option value="כלכלי" label="כלכלי" />
                                {/* <option value="מנהלים" label="מנהלים" /> */}
                                {/* <option value="חמל לאודר " label="חמל לאודר " /> */}
                                <option value="חבל לכיש" label="חמל חבל לכיש" />
                                <option
                                  value="קפה הספסל ברמת גן"
                                  label=" חמל קפה הספסל ברמת גן"
                                />

                                {/* Add more options as needed */}
                              </select>

                              <div
                                id="val-assistanceType-error"
                                className="invalid-feedback animated fadeInUp"
                                style={{ display: "block" }}
                              >
                                {errors.assistanceType && errors.assistanceType}
                              </div>
                            </div>
                          </div>

                          <div
                            className="col-lg-12 mb-2"
                            style={{ textAlign: "right" }}
                          >
                            <label
                              style={{ textAlign: "right" }}
                              className="text-label"
                            >
                              {" "}
                              (אופציונלי) תיאור נוסף
                            </label>
                            <div className="input-group transparent-append mb-2">
                              <input
                                type="text"
                                className="form-control"
                                style={{ textAlign: "right" }}
                                id="val-assistanceDetails"
                                name="assistanceDetails"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.assistanceDetails}
                                // placeholder="Choose a safe one.."
                              />

                              <div
                                id="val-username1-error"
                                className="invalid-feedback animated fadeInUp"
                                style={{ display: "block" }}
                              >
                                {errors.assistanceDetails &&
                                  errors.assistanceDetails}
                              </div>
                            </div>
                          </div>

                          {/* <div className="form-group mb-3">
                        <div className="form-check">
                          <input
                            id="checkbox1"
                            className="form-check-input"
                            type="checkbox"
                          />
                          <label
                            htmlFor="checkbox1"
                            className="form-check-label"
                          >
                            Check me out
                          </label>
                        </div>
                      </div> */}
                          <div>
                            {" "}
                            <ReCAPTCHA
                              sitekey="6LfJ7JYoAAAAAEqMI9jxDiI0vXSyozDDI6S9ezn4"
                              onChange={onChange}
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary sw-btn-next ms-1"
                            disabled={isSubmitting}
                          >
                            שלח
                          </button>
                          {/* <button className="btn btn-danger light">Cancel</button> */}
                        </div>
                      </form>
                    )}
                  </Formik>
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

export default FormValidation;
