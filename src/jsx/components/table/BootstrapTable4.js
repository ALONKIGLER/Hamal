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

const BootstrapTable = () => {
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
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show2, setShow2] = useState(false);
  const [edit_id, setEdit_id] = useState("");
  const [productPic, setProductPic] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("product:", FormData);
    console.log("product:", edit_id);
    try {
      const response = await axios.put(
        `http://kiglerserver.com/api/v1/product/${edit_id}`,
        formData
      );

      setStatus(!status);

      setIsSubmitted(true); // Set the form submission status
      setFormData(FormData); // Reset form fields after successful submission
      console.error("product:", FormData);
    } catch (error) {
      console.error("Error creating product:", error);
      console.error("Error creating product:");
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    console.log("product:", FormData);
    try {
      const response = await axios.post(
        `http://kiglerserver.com/api/v1/product/`,
        formData
      );

      setStatus(!status);
      setIsSubmitted(true); // Set the form submission status
      setFormData(FormData); // Reset form fields after successful submission
      console.error("product:", FormData);
    } catch (error) {
      console.error("Error creating product:", error);
      console.error("Error creating product:");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://kiglerserver.com/api/v1/product"
      ); // Adjust the API endpoint
      setProducts(response.data);
      setStatus(!status);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteProduct = async (orderId) => {
    console.log("Deleting order:", orderId);
    try {
      const response = await axios.delete(
        `http://kiglerserver.com/api/v1/product/${orderId}`
      );
      setStatus(!status);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const FormData = {
    name: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    availability: true,
    imageURL: "",
  };

  const [formData, setFormData] = useState(FormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const add = async () => {
    setFormData("");
    handleShow2();
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title> Product </Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>_id</strong>
                    </th>
                    <th>
                      <strong>name</strong>
                    </th>
                    <th>
                      <strong>category</strong>
                    </th>
                    <th>
                      <strong>PRICE</strong>
                    </th>
                    <th>
                      <strong>state</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    // .filter((order) => order.status === "start")
                    .map((product, index) => (
                      <tr>
                        <td>
                          <strong>{product._id}</strong>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>
                          <Badge variant="success light">Successful</Badge>
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              className="light sharp i-false"
                            >
                              {svg1}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => edit(product)}>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => deleteProduct(product._id)}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <div className="card-body">
          <Button onClick={add} className="me-2" variant="info btn-rounded">
            <span className="btn-icon-start text-info">
              <i className="fa fa-plus color-info" />
            </span>
            Add Product
          </Button>
        </div>
      </Card>
      <Modal show={show} onHide={handleClose} className="bd-example-modal-lg">
        <div className="col-xl-12    col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">edit product</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label>Edit Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label>Edit Title:</label>
                      <textarea
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-md-12">
                      <label>Edit Description:</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-6 col-md-6">
                      {/* <label>State</label>
                      <select
                        defaultValue={"option"}
                        id="inputState"
                        className="form-control"
                      >
                        <option value="option" disabled>
                          Choose...
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select> */}
                      <label>Edit Category:</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Edit Price:</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Edit Image URL:</label>
                      <input
                        type="text"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-2">
                      <label>Edit Availability:</label>
                      <input
                        type="checkbox"
                        name="availability"
                        checked={formData.availability}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">Check me out</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <button type="submit" className="btn btn-primary">
                      Edit Product{" "}
                    </button>
                  </div>
                  {isSubmitted && <p>Form submitted successfully!</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={show2} onHide={handleClose2} className="bd-example-modal-lg">
        <div className="col-xl-12    col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">add product</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit2}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label>Edit Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label>Edit Title:</label>
                      <textarea
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-md-12">
                      <label>Edit Description:</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-6 col-md-6">
                      {/* <label>State</label>
                      <select
                        defaultValue={"option"}
                        id="inputState"
                        className="form-control"
                      >
                        <option value="option" disabled>
                          Choose...
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select> */}
                      <label>Edit Category:</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Edit Price:</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Edit Image URL:</label>
                      <input
                        type="text"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-2">
                      <label>Edit Availability:</label>
                      <input
                        type="checkbox"
                        name="availability"
                        checked={formData.availability}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">Check me out</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <button type="submit" className="btn btn-primary">
                      add Product{" "}
                    </button>
                  </div>
                  {isSubmitted && <p>Form submitted successfully!</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default BootstrapTable;
