import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { userActions } from "../../_actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../../css/style2.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const authentication = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return setError("Email or Password should not be empty!");
    }
    dispatch(
      userActions.login(emailRef.current.value, passwordRef.current.value)
    );
  }

  useEffect(() => {
    if (authentication.error) {
      return setError(authentication.error);
    }
    return setError("");
  }, [authentication]);

  return (
    <>
      <div className="background">
        <div className="form-container">
          <div className="form-content-right">
            <div className="d-block mx-auto">
              <h1 className="text-center mb-2">Sign In</h1>
              {error && (
                <Alert
                  variant="danger"
                  style={{
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="form-size">
                  <Form.Group id="email">
                    <Form.Label style={{ color: "#FFFFFF", fontSize: "20px" }}>
                      Email
                    </Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label style={{ color: "#FFFFFF", fontSize: "20px" }}>
                      Password
                    </Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                </div>
                <div className="w-100 text-center mt-2">
                  <Button className="w-35" size="lg" type="submit">
                    Sign In
                  </Button>
                </div>
              </Form>
              <div
                className="w-100 text-center mt-2"
                style={{ color: "#FFFFFF", fontSize: "20px" }}
              >
                Do not have an account?
                <NavLink
                  to="/Register"
                  style={{ marginLeft: "20px", fontSize: "20px" }}
                >
                  Register
                </NavLink>
              </div>
            </div>
          </div>
          <div className="form-content-left"></div>
        </div>
      </div>
    </>
  );
}
