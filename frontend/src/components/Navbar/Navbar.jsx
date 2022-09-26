import { Avatar, Select, Stack } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { SearchIcon } from "@chakra-ui/icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../features/authSlice";
import LogoutModal from "../Authentication/LogoutModal";
import VideosUploadModal from "../VideosUpload/VideoUploadModal";

function NavScrollExample() {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("access_token");
  if (token) {
    const { name, id } = decodeToken(token);
    console.log(name, id);
    dispatch(setUser({ name, id }));
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand className=" me-5" href="/">
          StreamX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {" "}
            <Form className="d-flex ">
              <Form.Control
                style={{ borderRadius: "0px", width: "18.5em" }}
                type="search"
                placeholder="Search"
                className="d-flex"
                aria-label="Search"
              />
              <Button
                className="me-2"
                style={{ borderRadius: "0px" }}
                variant="outline-primary"
              >
                <SearchIcon />
              </Button>
            </Form>
            {/* <Nav.Link className="me-3" href="#action1">
              Home
            </Nav.Link> */}
            {user ? (
              <Nav.Link href="#action2">
                <VideosUploadModal />
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>

          <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />
          {user ? (
            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
            >
              Logout
            </Button>
          ) : (
            <Button variant="outline-success">
              <Link to="/authenticate">Login</Link>
            </Button>
          )}

          {user ? (
            <Avatar
              size="sm"
              style={{ marginLeft: "2em" }}
              name={user}
              src=""
            />
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
