import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Dropdown, Tab, Nav } from "react-bootstrap";
import axios from "axios";
import PageTitle from "../../layouts/PageTitle";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  ProgressBar,
  Modal,
  Container,
  DropdownButton,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import avatar1 from "../../../images/avatar/1.jpg";

const DropdownBlog = () => {
  return (
    <>
      <Dropdown className="dropdown">
        <Dropdown.Toggle
          as="div"
          className="btn-link i-false"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
              stroke="#262626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
              stroke="#262626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
              stroke="#262626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const GuestList = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#example2_wrapper tbody tr")
  );
  const sort = 8;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#example2_wrapper tbody tr"));
    //chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const chackbox = document.querySelectorAll(".sorting_1 input");
  const motherChackBox = document.querySelector(".sorting_asc input");
  // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  //  ---------------------//

  const [orders, setOrders] = useState([]);
  const [gridInsideModal, setGridInsideModal] = useState(false);
  const [gridInsideModal2, setGridInsideModal2] = useState(false);

  const [apartmentNumber, setApartmentNumber] = useState("");
  const [productsArray, setProductsArray] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [cite, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [shippingType, setshippingType] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://kiglerserver.com/api/v1/order/"
      ); // Adjust the API endpoint
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    console.log("Deleting order:", orderId);
    // You can implement your delete logic here

    try {
      const response = await axios.delete(
        `https://kiglerserver.com/api/v1/order/${orderId}`
      );
      setStatus(!status);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleDropdownItemClick = async (value, order) => {
    const newOrder = {
      ...order,
      status: value,
    };

    const url = newOrder["_id"];
    try {
      const response = await axios.patch(
        `https://kiglerserver.com/api/v1/order/${url}`,
        newOrder
      );
      setStatus(!status);
    } catch (error) {
      console.error("Error deleting order:", error);
    }

    console.log("Dropdown item clicked with value:", value);
  };

  const ModalAddress = (shippingAddress) => {
    setGridInsideModal(true);
    console.log(shippingAddress);
    setApartmentNumber(shippingAddress.apartmentNumber);
    setCity(shippingAddress.cite);
    setStreet(shippingAddress.street);
    setshippingType(shippingAddress.shippingType);
  };

  const ModelProductsArray = (order) => {
    setProductsArray(order.products);
    setOrderId(order._id);
    setGridInsideModal2(true);
    console.log(order.products);
    console.log(order._id);
  };

  return (
    <>
      <Tab.Container defaultActiveKey="Booked">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="card-action coin-tabs mb-2">
            <Nav as="ul" className="nav nav-tabs">
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" eventKey="Booked">
                  start
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" eventKey="Canceled">
                  progress
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" eventKey="Refund">
                  end
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="Booked">
                    <Fragment>
                      <PageTitle activeMenu="Table" motherMenu="Bootstrap" />

                      <Row>
                        {" "}
                        <Col lg={12}>
                          <Card>
                            <Card.Header>
                              <Card.Title>orders whit status start</Card.Title>
                            </Card.Header>
                            <Card.Body>
                              <Table responsive>
                                <thead>
                                  <tr>
                                    <th className="width50 ">
                                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="checkAll"
                                          required=""
                                          onClick={() => chackboxFun("all")}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="checkAll"
                                        ></label>
                                      </div>
                                    </th>
                                    <th>
                                      <strong>_id</strong>
                                    </th>
                                    <th>
                                      <strong>NAME</strong>
                                    </th>
                                    <th>
                                      <strong>Email</strong>
                                    </th>
                                    <th>
                                      <strong>S.Address</strong>
                                    </th>
                                    <th>
                                      <strong>o.products</strong>
                                    </th>
                                    <th>
                                      <strong>o.Date</strong>
                                    </th>
                                    <th>
                                      <strong>S.Type</strong>
                                    </th>

                                    <th>
                                      <strong>pay</strong>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders
                                    .filter((order) => order.status === "start")
                                    .map((order, index) => (
                                      <tr>
                                        <td>
                                          <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="customCheckBox2"
                                            ></label>
                                          </div>
                                        </td>
                                        <td>
                                          <strong>{order._id}</strong>
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <img
                                              src={avatar1}
                                              className="rounded-lg me-2"
                                              width="24"
                                              alt=""
                                            />{" "}
                                            <span className="w-space-no">
                                              {order.customerName}
                                            </span>
                                          </div>
                                        </td>
                                        <td>{order.userEmail} </td>
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              variant="primary btn-xs"
                                              className="mb-1 me-1"
                                              onClick={() =>
                                                ModalAddress(
                                                  order.shippingAddress
                                                )
                                              }
                                            >
                                              show Address
                                            </Button>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              variant="primary btn-xs"
                                              className="mb-1 me-1"
                                              onClick={() =>
                                                ModelProductsArray(order)
                                              }
                                            >
                                              show{" "}
                                            </Button>
                                          </div>
                                        </td>

                                        <td>
                                          <td>
                                            {new Date(
                                              order.orderDate
                                            ).toLocaleDateString()}
                                          </td>{" "}
                                        </td>
                                        <td>
                                          <td>{order.shippingType}</td>
                                        </td>
                                        <td>
                                          {order.payment === "Accepted" ? (
                                            <div className="d-flex align-items-center">
                                              <i className="fa fa-circle text-success me-1"></i>{" "}
                                              Successful
                                            </div>
                                          ) : (
                                            <div className="d-flex align-items-center">
                                              <i className="fa fa-circle text-danger me-1"></i>{" "}
                                              Canceled
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <div className="d-flex">
                                            <DropdownButton
                                              as={ButtonGroup}
                                              id="dropdown-button-drop-down"
                                              drop="down"
                                              variant="primary"
                                              size="sm"
                                              className="mt-1 me-1"
                                              title={
                                                <i className="fas fa-pencil-alt"></i>
                                              }
                                            >
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "start",
                                                    order
                                                  )
                                                }
                                              >
                                                start
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "Progress",
                                                    order
                                                  )
                                                }
                                              >
                                                Progress
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "end",
                                                    order
                                                  )
                                                }
                                              >
                                                end
                                              </Dropdown.Item>
                                            </DropdownButton>

                                            <bottun
                                              href="#"
                                              onClick={() =>
                                                deleteOrder(order._id)
                                              }
                                              className="btn btn-danger shadow btn-xs sharp"
                                            >
                                              <i className="fa fa-trash"></i>
                                            </bottun>
                                          </div>
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
                  </Tab.Pane>
                  <Tab.Pane eventKey="Canceled">
                    <Fragment>
                      <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
                      <Row>
                        {" "}
                        <Col lg={12}>
                          <Card>
                            <Card.Header>
                              <Card.Title>
                                orders whit status Progress
                              </Card.Title>
                            </Card.Header>
                            <Card.Body>
                              <Table responsive>
                                <thead>
                                  <tr>
                                    <th className="width50 ">
                                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="checkAll"
                                          required=""
                                          onClick={() => chackboxFun("all")}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="checkAll"
                                        ></label>
                                      </div>
                                    </th>
                                    <th>
                                      <strong>_id</strong>
                                    </th>
                                    <th>
                                      <strong>NAME</strong>
                                    </th>
                                    <th>
                                      <strong>Email</strong>
                                    </th>
                                    <th>
                                      <strong>S.Address</strong>
                                    </th>
                                    <th>
                                      <strong>o.products</strong>
                                    </th>
                                    <th>
                                      <strong>o.Date</strong>
                                    </th>
                                    <th>
                                      <strong>S.Type</strong>
                                    </th>

                                    <th>
                                      <strong>pay</strong>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders
                                    .filter(
                                      (order) => order.status === "Progress"
                                    )
                                    .map((order, index) => (
                                      <tr>
                                        <td>
                                          <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="customCheckBox2"
                                            ></label>
                                          </div>
                                        </td>
                                        <td>
                                          <strong>{order._id}</strong>
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <img
                                              src={avatar1}
                                              className="rounded-lg me-2"
                                              width="24"
                                              alt=""
                                            />{" "}
                                            <span className="w-space-no">
                                              {order.customerName}
                                            </span>
                                          </div>
                                        </td>
                                        <td>{order.userEmail} </td>
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              variant="primary btn-xs"
                                              className="mb-1 me-1"
                                              onClick={() =>
                                                ModalAddress(
                                                  order.shippingAddress
                                                )
                                              }
                                            >
                                              show Address
                                            </Button>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              variant="primary btn-xs"
                                              className="mb-1 me-1"
                                              onClick={() =>
                                                ModelProductsArray(order)
                                              }
                                            >
                                              show{" "}
                                            </Button>
                                          </div>
                                        </td>

                                        <td>
                                          <td>
                                            {new Date(
                                              order.orderDate
                                            ).toLocaleDateString()}
                                          </td>{" "}
                                        </td>
                                        <td>
                                          <td>{order.shippingType}</td>
                                        </td>
                                        <td>
                                          {order.payment === "Accepted" ? (
                                            <div className="d-flex align-items-center">
                                              <i className="fa fa-circle text-success me-1"></i>{" "}
                                              Successful
                                            </div>
                                          ) : (
                                            <div className="d-flex align-items-center">
                                              <i className="fa fa-circle text-danger me-1"></i>{" "}
                                              Canceled
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <div className="d-flex">
                                            <DropdownButton
                                              as={ButtonGroup}
                                              id="dropdown-button-drop-down"
                                              drop="down"
                                              variant="primary"
                                              size="sm"
                                              className="mt-1 me-1"
                                              title={
                                                <i className="fas fa-pencil-alt"></i>
                                              }
                                            >
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "start",
                                                    order
                                                  )
                                                }
                                              >
                                                start
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "Progress",
                                                    order
                                                  )
                                                }
                                              >
                                                Progress
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "end",
                                                    order
                                                  )
                                                }
                                              >
                                                end
                                              </Dropdown.Item>
                                            </DropdownButton>

                                            <bottun
                                              href="#"
                                              onClick={() =>
                                                deleteOrder(order._id)
                                              }
                                              className="btn btn-danger shadow btn-xs sharp"
                                            >
                                              <i className="fa fa-trash"></i>
                                            </bottun>
                                          </div>
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
                  </Tab.Pane>
                  <Tab.Pane eventKey="Refund">
                    <Fragment>
                      <PageTitle activeMenu="Table" motherMenu="Bootstrap" />

                      <Row>
                        {" "}
                        <Col lg={12}>
                          <Card>
                            <Card.Header>
                              <Card.Title>orders whit status end</Card.Title>
                            </Card.Header>
                            <Card.Body>
                              <Table responsive>
                                <thead>
                                  <tr>
                                    <th className="width50 ">
                                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="checkAll"
                                          required=""
                                          onClick={() => chackboxFun("all")}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="checkAll"
                                        ></label>
                                      </div>
                                    </th>
                                    <th>
                                      <strong>_id</strong>
                                    </th>
                                    <th>
                                      <strong>NAME</strong>
                                    </th>
                                    <th>
                                      <strong>Email</strong>
                                    </th>
                                    <th>
                                      <strong>S.Address</strong>
                                    </th>
                                    <th>
                                      <strong>o.products</strong>
                                    </th>
                                    <th>
                                      <strong>o.Date</strong>
                                    </th>
                                    <th>
                                      <strong>S.Type</strong>
                                    </th>

                                    <th>
                                      <strong>pay</strong>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders
                                    .filter((order) => order.status === "end")
                                    .map((order, index) => (
                                      <tr>
                                        <td>
                                          <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="customCheckBox2"
                                            ></label>
                                          </div>
                                        </td>
                                        <td>
                                          <strong>{order._id}</strong>
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <img
                                              src={avatar1}
                                              className="rounded-lg me-2"
                                              width="24"
                                              alt=""
                                            />{" "}
                                            <span className="w-space-no">
                                              {order.customerName}
                                            </span>
                                          </div>
                                        </td>
                                        <td>{order.userEmail} </td>
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              variant="primary btn-xs"
                                              className="mb-1 me-1"
                                              onClick={() =>
                                                ModalAddress(
                                                  order.shippingAddress
                                                )
                                              }
                                            >
                                              show Address
                                            </Button>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              variant="primary btn-xs"
                                              className="mb-1 me-1"
                                              onClick={() =>
                                                ModelProductsArray(order)
                                              }
                                            >
                                              show{" "}
                                            </Button>
                                          </div>
                                        </td>

                                        <td>
                                          <td>
                                            {new Date(
                                              order.orderDate
                                            ).toLocaleDateString()}
                                          </td>{" "}
                                        </td>
                                        <td>
                                          <td>{order.shippingType}</td>
                                        </td>
                                        <td>
                                          {order.payment === "Accepted" ? (
                                            <div className="d-flex align-items-center">
                                              <i className="fa fa-circle text-success me-1"></i>{" "}
                                              Successful
                                            </div>
                                          ) : (
                                            <div className="d-flex align-items-center">
                                              <i className="fa fa-circle text-danger me-1"></i>{" "}
                                              Canceled
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <div className="d-flex">
                                            <DropdownButton
                                              as={ButtonGroup}
                                              id="dropdown-button-drop-down"
                                              drop="down"
                                              variant="primary"
                                              size="sm"
                                              className="mt-1 me-1"
                                              title={
                                                <i className="fas fa-pencil-alt"></i>
                                              }
                                            >
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "start",
                                                    order
                                                  )
                                                }
                                              >
                                                start
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "Progress",
                                                    order
                                                  )
                                                }
                                              >
                                                Progress
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                href="#"
                                                onClick={() =>
                                                  handleDropdownItemClick(
                                                    "end",
                                                    order
                                                  )
                                                }
                                              >
                                                end
                                              </Dropdown.Item>
                                            </DropdownButton>

                                            <bottun
                                              href="#"
                                              onClick={() =>
                                                deleteOrder(order._id)
                                              }
                                              className="btn btn-danger shadow btn-xs sharp"
                                            >
                                              <i className="fa fa-trash"></i>
                                            </bottun>
                                          </div>
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
                  </Tab.Pane>
                </Tab.Content>
              </div>
              <Modal className="fade" show={gridInsideModal}>
                <Modal.Header>
                  <Modal.Title>shippingAddress</Modal.Title>
                  <Button
                    variant=""
                    className="btn-close"
                    onClick={() => setGridInsideModal(false)}
                  ></Button>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      <Col md="2" className="ms-auto"></Col>
                      <Col md="8" className="ms-auto">
                        <h4> city: {cite}</h4>
                      </Col>
                      <Col md="2" className="ms-auto"></Col>
                    </Row>
                    <Row>
                      <Col md="2" className="ms-auto"></Col>
                      <Col md="8" className="ms-auto">
                        <h4>apartmentNumber: {apartmentNumber}</h4>
                      </Col>
                      <Col md="2" className="ms-auto"></Col>
                    </Row>
                    <Row>
                      <Col md="2" className="ms-auto"></Col>
                      <Col md="8" className="ms-auto">
                        <h4> street: {street}</h4>
                      </Col>
                      <Col md="2" className="ms-auto"></Col>
                    </Row>
                    <Row>
                      <Col md="2" className="ms-auto"></Col>
                      <Col md="8" className="ms-auto">
                        <h4> shippingType: {shippingType}</h4>
                      </Col>
                      <Col md="2" className="ms-auto"></Col>
                    </Row>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger light"
                    onClick={() => setGridInsideModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary">Save changes</Button>
                </Modal.Footer>
              </Modal>

              <Modal className="fade" show={gridInsideModal2}>
                <Modal.Header>
                  <Modal.Title></Modal.Title>
                  <Button
                    variant=""
                    className="btn-close"
                    onClick={() => setGridInsideModal2(false)}
                  ></Button>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Card>
                      <Card.Header>
                        <Card.Title>order number {orderId}</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Table responsive bordered className="header-border ">
                          <thead>
                            <tr>
                              <th>id</th>
                              <th>name</th>
                              <th>price</th>
                              <th>quantity</th>
                              <th>text</th>
                              <th>text2</th>
                              <th>size letter</th>
                              <th>color litter</th>
                              <th>der</th>
                            </tr>
                          </thead>
                          {productsArray.map((product, index) => (
                            <tbody>
                              <tr>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.text}</td>
                                <td>{product.text2}</td>
                                <td>{product.color}</td>
                                <td>{product.der}</td>
                              </tr>
                            </tbody>
                          ))}
                        </Table>
                      </Card.Body>
                    </Card>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger light"
                    onClick={() => setGridInsideModal2(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary">Save changes</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </Tab.Container>
    </>
  );
};
export { DropdownBlog };
export default GuestList;
