import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userActions } from "../../_actions";
import "../../css/style2.css";
import { useDispatch } from "react-redux";

export default function Signup() {
  const nameRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
  const authentication = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    dispatch(
      userActions.register(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      )
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
          <div className="form-content-left"></div>

          <div className="form-content-right">
            <div className="d-block mx-auto">
              <h1 className="text-center mb-2">Sign Up</h1>
              {error && (
                <Alert
                  style={{
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  variant="danger"
                >
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="form-size">
                  <Form.Group id="name">
                    <Form.Label style={{ color: "#FFFFFF", fontSize: "20px" }}>
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={nameRef}
                      required
                      minLength="3"
                    />
                  </Form.Group>
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
                  <Form.Group id="password-confirm">
                    <Form.Label style={{ color: "#FFFFFF", fontSize: "20px" }}>
                      Password Confirmation
                    </Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="w-100 text-center mt-2">
<<<<<<< HEAD
                  <Button className="w-35" size="lg" type="submit">
=======
                  <Button
                    disabled={loading}
                    className="w-35"
                    size="lg"
                    type="submit"
                  >
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
                    Sign Up
                  </Button>
                </div>
              </Form>
              <div
                className="w-100 text-center mt-2"
                style={{ color: "#FFFFFF", fontSize: "20px" }}
              >
                Already have an account?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
