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
          "https://kiglerserver.com/api/v1/citizen",
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

    // try {
    //   // Make a request to Google's reCAPTCHA verification endpoint
    //   const googleResponse = await axios.post(
    //     `https://www.google.com/recaptcha/api/siteverify?secret=6LcyMYcoAAAAAG1BD6KKw4NQrTa1Xqi38E4jEfQ5&response=03AFcWeA4gSEHAAJB0QAUF-0z-NPAr4LEXJ5loJ-Vxx8ts_3KbExm4ARO3FsoAUhVq2NRa3ER9JFXn3ab8tWBpztdsFnzYCvg4GCeZVyb9CmirNbzVRA69ntpk9dzXXtqTX5KobQgbjqRy8cSkmfokw6zp6_Ui8bdHGQkP8FdWjLe1ZoZFBVlOK6QMcEPpzmeLxcbHPA2ChuGmwI2TfWvz1b_QPys_mS4KtvnBH0T4_MoZXZBmUVaEVE3VUvVCYbQc8H1GdWN5aXm3c2EY4lb8Mq1eOROd94vNYXNGaWaz614_VE6qXmX6W6FZ7BUuf6CP16DYkeec95ujk3fsE3ZQE_HqFTISKZIkXKMI3CMFL7Ansq2hquwhq6beQYLtHXyYSQIICknnTwAzPwjsBgvm_LHsGQ1ulrg_VyXaX7VdyuMayEtK1YhU3qkrVnuS12skirzb3acDxZoJOG1RNtAi2BLHXy4t6g-T9Zyn0ne0ciqxW5j9v3ar02NojGampAA6E0ru-x3o9VK9RrQuoRCmNK8Ik6x1lgjxjiliHOaVuEnImjoU02BIjpuyJSgAOD2copQM3642ZDXGf_6l3Tni6hwlYl6kxm3JjKSsfv-A42RaABvjZDUcLmFpVCuWa9AM0Yl_OW4LSI2_wbH2U6HDU_G_5NmhyorTnX1sKoKJOXi44I1ghV5CY-bK6IH8i_FhzqmB2DR_94O3QMHzXnyRFD5e1kK_TD-TZulHgrLdtrPOE23n0EKFvrIQe9yc8yEiYtqDQigLyDY8Eu4a1BSvnjKabT146Kd7i71P_hcIkFOBDGlJkf6ZkFALgeEu0KXszsMGZGR5INOG_xBVfOdlWUz7qbN5AaDJnrx6EKKQaLjWZ-G4vgy7qZxajPPZ1asRxzuGj0qB0CheQfGEkKfk960H0fCQkRYrZzOyvyO6n0VqCasYCaSTdy2z1D2fj1m756hMeNYG3xcPp6z6NaM0bxSGlvU_j4kCwVcVRhRApsLt0CyNe11SwC2k9a8zyL9KSBo7J9XVboOGbnDluuF-iirQwILPUzz5K79btFtq_ul0ptoLOP2O7Wxh976vzIek-96K98_O1gVpclmzNmKpVqN-FROhQeMwVW1WsgebJOFOr18Ya8AgUkgQYUUxBWSRGiQe5yleEAZw47X6cakJKJBkDgqhdQiAPh_auzbcifiKIoX316XfdJMbFuNBY9fcPNrKgJh1DyiEsr-L2j1NFJ3ILgzzouhpKP8rlBgKTdqq5nFNjc7zWI27pTJpfzRNFu_dWMvkK_PD8mRkst9bGl9XlT0fpFvIqWXQGa1iq4LOEWkqLYlEME962K-JWqIfaDgtG83-KagAPzDbDJykp3soZEb5Gq5ltoywThD1Bv8N4kifEcdMAK1MD5BU80Xu3OrBJsVS9H97OJD4t9oCmyoCAiT_um4iTv2fzTf3E_0NjQ4RNP0sGSn3tzEBPP8PLqgkApHrd7dI0545xlQlqB_D_FEKQpkmIr6gdx0skjt2xmg2xoFvQyiN1-L7M-ehwPWPMfajWY3MN_mT55C7um_nlBVAjQ6M_XGGrDUwCnO6wGLudCqZ2D_Ghwi43SHfzwPZRVD5LtU-tT_DqeVvWTBFVWNzJsR1Kw1`
    //   );

    //   // Check if the verification was successful
    //   if (googleResponse.data.success) {
    //     // The reCAPTCHA response is valid
    //     console.log("reCAPTCHA verification successful");
    //   } else {
    //     // The reCAPTCHA response is invalid
    //     console.error("Invalid reCAPTCHA response");
    //   }
    // } catch (error) {
    //   console.error("Error verifying reCAPTCHA response:", error);
    // }
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
