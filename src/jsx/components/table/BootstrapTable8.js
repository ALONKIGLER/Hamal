import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
} from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";

import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

const BootstrapTable = () => {
  const [authUser, setAuthUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [citizenConst, setcitizenConst] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setAuthUser(true);
        setUser(user.email);
        console.log("lol");
        if (user.email === "cyber@gmail.com" || user.email === "k@gmail.com") {
          fetchOrders();
        }
      } else {
        // User is signed out
        // ...
      }
    });
  }, [authUser]);

  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );
  const [citizen, setcitizen] = useState([]);
  const [status22, setStatus22] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show2, setShow2] = useState(false);
  const [edit_id, setEdit_id] = useState("");

  const [productPic, setProductPic] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [del, setDel] = useState(false);
  const [Token, setToken] = useState("");

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    console.log("product:", FormData);
    try {
      const response = await axios.post(
        `http://kiglerserver.com/api/v1/product/`,
        formData
      );

      setStatus22(!status22);
      setIsSubmitted(true); // Set the form submission status
      setFormData(FormData); // Reset form fields after successful submission
      console.error("product:", FormData);
    } catch (error) {
      console.error("Error creating product:", error);
      console.error("Error creating product:");
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchOrders();
    }
  }, [del, isSubmitted]);

  const fetchOrders = async () => {
    if(Token){

      try {
          const response = await axios.get(
        "https://kiglerserver.com/api/v1/citizen",
        {
          headers: {
            Authorization: `Bearer ${Token}`, // Add the token to the Authorization header
          },
        }
      );
          const filteredData = response.data.filter(
            (item) => item.assistanceType === "התקפת סייבר"
            );
            setcitizenConst(filteredData);
            
            setcitizen(filteredData);
            setStatus22(!status22);
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
        }
  };

  const deleteProduct = async (orderId) => {
    console.log("Deleting order:", orderId);
    try {
      const response = await axios.delete(
        `https://kiglerserver.com/api/v1/citizen/${orderId}`
      );
      setDel(!status22);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const edit = async (product) => {
    console.log("setEdit_id", product._id);
    setEdit_id(product._id);
    setProductPic(product);
    setFormData(product);
    handleShow();
  };

  const [detailfullName, setDetailfullName] = useState("");
  const [detailphoneNumber, setDetailphoneNumber] = useState("");
  const [detaildate, setDetaildate] = useState("");
  const [detaildatestatus, setDetaildatestatus] = useState("");
  const [detaildadmin, setDetailadmin] = useState("");
  const [detaildAssistanceDetails, setDetailssistanceDetails] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    assistanceType: "",
    phoneNumber: "",
    assistanceDetails: "",
    admin: "",
    date: "",
    status: "",
    _id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("product:", formData);
    console.log("product:", edit_id);
    try {
      const response = await axios.patch(
        `https://kiglerserver.com/api/v1/citizen/${edit_id}`,
        formData
      );

      setStatus22(!status22);

      setIsSubmitted(!isSubmitted); // Set the form submission status
      setFormData(formData); // Reset form fields after successful submission
      console.error("product:", formData);
    } catch (error) {
      console.error("Error creating product:", error);
      console.error("Error creating product:");
    }
  };

  const add = async (citiz) => {
    console.log(citiz);
    setDetailfullName(citiz.fullName);
    setDetailphoneNumber(citiz.phoneNumber);
    setDetaildate(citiz.data);
    setDetaildatestatus(citiz.status);
    setDetailadmin(citiz.admin);
    setDetailssistanceDetails(citiz.assistanceDetails);

    handleShow2();
  };

  const loginWithUsernameAndPassword = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userToken = await user.getIdToken();
      console.log(userToken)
      setToken(userToken)
      if (userName === "cyber@gmail.com") setAuthUser(true);
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };

  const logoutUser = async (e) => {
    e.preventDefault();

    await signOut(auth);
    setAuthUser(false);
  };

  const [citizenfi, setcitizenfi] = useState("");

  const search = async (e) => {
    e.preventDefault();

    const fill = citizen.filter((item) =>
      Object.values(item).some(
        (val) => typeof val === "string" && val.includes(citizenfi)
      )
    );
    setcitizen(fill);
    console.log(fill);
  };

  const searchClear = async (e) => {
    e.preventDefault();
    setcitizen(citizenConst);
    setcitizenfi("");
    console.log(citizenConst);
  };

  if (authUser) {
    return (
      <>
        <Fragment>
          {/* <PageTitle activeMenu="פניות" motherMenu="טבלה" /> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="profile card card-body px-3 pt-3 pb-0">
                <div className="profile-head">
                  <div className="photo-content ">
                    {/* <div className="cover-photo rounded"></div> */}
                  </div>
                  <div className="profile-info">
                    <div
                      className="profile-name px-3 pt-2"
                      style={{
                        //   textAlign: "right",
                        textAlign: "center",
                        //   fontSize: "1rem",
                        //   margin: "center",
                      }}
                    >
                      <h3 className="text-red">
                        בקשות לסיוע - מבצע חרבות ברזל
                      </h3>
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

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title
                    style={{
                      // textAlign: "ce",
                      // marginLeft: "80%",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>
                      <div className="card">
                        {/* <div className="card-header">
                          <h4 className="card-title">Inline Form</h4>
                        </div> */}
                        <div className="card-body">
                          <div className="basic-form">
                            <form
                              className="d-flex align-items-center"
                              onSubmit={search}
                            >
                              <div className="">
                                <label className="sr-only">שם</label>
                                <input
                                  style={{ textAlign: "right" }}
                                  type="text"
                                  name="admin"
                                  value={citizenfi}
                                  className="form-control"
                                  onChange={(e) => setcitizenfi(e.target.value)}
                                />
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary mb-2"
                                style={{ margin: "5px" }}
                              >
                                חפש
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary mb-2"
                                style={{ margin: "5px" }}
                                onClick={searchClear}
                              >
                                נקה
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p> פניות- התקפות סייבר</p>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "right", margin: "auto" }}></th>
                        <th style={{ textAlign: "right", margin: "auto" }}>
                          <strong> גוף הפנייה</strong>
                        </th>
                        <th style={{ textAlign: "right", margin: "auto" }}>
                          <strong>מספר פלאפון</strong>
                        </th>
                        <th style={{ textAlign: "right", margin: "auto" }}>
                          <strong>שם מלא</strong>
                        </th>
                        <th style={{ textAlign: "right", margin: "auto" }}>
                          <strong>תאריך</strong>
                        </th>
                        <th style={{ textAlign: "right", margin: "auto" }}>
                          <strong>סטאטוס</strong>
                        </th>
                        <th style={{ textAlign: "right", margin: "auto" }}>
                          <strong>שם אחראי</strong>
                        </th>

                        <th
                          className="width80"
                          style={{ textAlign: "right", margin: "auto" }}
                        >
                          <strong></strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {citizen
                        // .filter((order) => order.status === "start")
                        .map((product, index) => (
                          <tr>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="warning"
                                  className="light sharp i-false"
                                >
                                  {svg1}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => edit(product)}>
                                    ערוך
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => deleteProduct(product._id)}
                                  >
                                    מחק
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>

                            <td style={{ textAlign: "right", margin: "auto" }}>
                              {/* {product.assistanceDetails} */}
                              <Button
                                onClick={() => add(product)}
                                // className="me-2"
                                // variant="info btn-rounded"
                              >
                                {/* <span className="btn-icon-start text-info"> */}
                                {/* <i className="fa fa-plus color-info" /> */}
                                {/* </span> */}
                                תיאור פנייה
                              </Button>
                            </td>

                            <td style={{ textAlign: "right", margin: "auto" }}>
                              {product.phoneNumber}
                            </td>
                            <td style={{ textAlign: "right", margin: "auto" }}>
                              <strong>{product.fullName}</strong>
                            </td>

                            <td style={{ textAlign: "right", margin: "auto" }}>
                              {
                                new Date(product.date)
                                  .toISOString()
                                  .split("T")[0]
                              }{" "}
                              {""}
                              {
                                new Date(product.date)
                                  .toISOString()
                                  .split("T")[1]
                                  .split(".")[0]
                              }
                            </td>
                            <td style={{ textAlign: "right", margin: "auto" }}>
                              {product.status}
                            </td>
                            <td style={{ textAlign: "right", margin: "auto" }}>
                              {product.admin}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Fragment>
        <Modal show={show} onHide={handleClose} className="bd-example-modal-lg">
          <div className="col-xl-12    col-lg-12">
            <div className="card">
              <div
                className="card-header"
                style={{ textAlign: "right", margin: "auto" }}
              >
                <h4
                  className="card-title"
                  style={{ textAlign: "right", margin: "auto" }}
                >
                  ערוך פרטים
                </h4>
              </div>
              <div className="card-body">
                <div className="basic-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div
                        className="form-group mb-3 col-md-6"
                        style={{ textAlign: "right", margin: "auto" }}
                      >
                        <label>שם אחראי</label>
                        <input
                          style={{ textAlign: "right", margin: "auto" }}
                          type="text"
                          name="admin"
                          value={formData.admin}
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                      <div
                        className="form-group mb-3 col-md-6"
                        style={{ textAlign: "right", margin: "auto" }}
                      >
                        {" "}
                        <label>סטאטוס</label>
                        <select
                          style={{ textAlign: "right", margin: "auto" }}
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option></option>
                          <option value={"לא בוצע"}>לא בוצע</option>
                          <option value={"בטיפול"}>בטיפול</option>
                          <option value={"בוצע"}>בוצע</option>
                        </select>
                      </div>
                      <div
                        className="row-4"
                        style={{ textAlign: "center", margin: "auto" }}
                      >
                        <button type="submit" className="btn btn-primary">
                          שמור
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", margin: "auto" }}>
                      {isSubmitted && (
                        <p style={{ textAlign: "center", margin: "auto" }}>
                          {" "}
                          המידע נשמר בהצלחה{" "}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          show={show2}
          onHide={handleClose2}
          className="bd-example-modal-lg"
          style={{ textAlign: "right", margin: "auto" }}
        >
          <div
            className="col-xl-12    col-lg-12"
            style={{ textAlign: "right", margin: "auto" }}
          >
            <div className="card">
              <div
                className="card-header"
                style={{ textAlign: "right", margin: "auto" }}
              >
                <h4 className="card-title">פרטי הבקשה </h4>
              </div>
              <div
                className="card-body"
                style={{ textAlign: "right", margin: "auto" }}
              >
                <div className="basic-form">{detailfullName}</div>
                <div className="basic-form">{detailphoneNumber}</div>
                <div className="basic-form">{detaildate}</div>
                <div className="basic-form">{detaildatestatus}</div>
                <div>
                  :פרטי הבקשה
                  <div className="basic-form"></div>
                  <div
                    className="basic-form"
                    style={{ textAlign: "right", margin: "5px" }}
                  >
                    {detaildAssistanceDetails}
                  </div>
                  <div className="basic-form"></div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <div className="profile-head">
          <div className="photo-content ">
            {/* <div className="cover-photo rounded"></div> */}
          </div>
          <div className="profile-info">
            <div
              className="profile-name px-3 pt-2"
              style={{ textAlign: "right", margin: "auto" }}
            >
              <h2
                style={{ textAlign: "right", margin: "auto" }}
                className="text-red"
              >
                אין הרשאת גישה
              </h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <form className="col-md-4 mt-3 pt-3 pb-3">
              {"" !== notice && (
                <div className="alert alert-warning" role="alert">
                  {notice}
                </div>
              )}
              <div
                className="form-floating mb-3"
                style={{ textAlign: "right", margin: "auto" }}
              >
                <input
                  style={{ textAlign: "right", margin: "auto" }}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  // placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  כתובת מייל
                </label>
              </div>
              <div
                className="form-floating mb-3"
                style={{ textAlign: "right", margin: "auto" }}
              >
                <input
                  style={{ textAlign: "right", margin: "auto" }}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  // placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label htmlFor="exampleInputPassword1" className="form-label">
                  סיסמא
                </label>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary pt-3 pb-3"
                  onClick={(e) => loginWithUsernameAndPassword(e)}
                >
                  שלח
                </button>
              </div>
              <div className="mt-3 text-center">
                <span>
                  support@rsecurity.tech צור קשר על מנת להירשם
                  {/* <Link to="./signup">Click here.</Link> */}
                </span>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default BootstrapTable;
