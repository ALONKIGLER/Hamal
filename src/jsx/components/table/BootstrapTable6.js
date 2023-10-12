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
} from "react-bootstrap";
import axios from "axios";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";

const BootstrapTable6 = () => {
  const [emails, setEmail] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://kiglerserver.com/api/v1/contactUs/"
      ); // Adjust the API endpoint
      setEmail(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteEmail = async (emailId) => {
    console.log("Error fetching orders:", emailId);

    try {
      const response = await axios.delete(
        `https://kiglerserver.com/api/v1/contactUs/${emailId}`
      );
      setStatus(!status);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
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

  return (
    <Fragment>
      <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>email's Table</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive className="primary-table-bordered">
                <thead className="thead-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">name</th>
                    <th scope="col">body</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email, index) => (
                    <tr key={email._id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>{email.email}</td>
                      <td>{email.name}</td>
                      <td>{email.body}</td>
                      <td>
                        {" "}
                        <bottun
                          href="#"
                          onClick={() => deleteEmail(email._id)}
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-trash"></i>
                        </bottun>
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
  );
};

export default BootstrapTable6;
