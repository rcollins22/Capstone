import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Button } from '@material-ui/core';
import url from '../../url';


const SignUpLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        e.preventDefault();

        const userData = {
            email,
            password
        };
        console.log(email, password)
        axios
            .post(`${url}/auth/register_login`, userData)
            .then(res => {
                localStorage.setItem("id", res.data.success.id) //save id to local storage
                localStorage.setItem("leader", res.data.success.leader) // save leader boolean to local storage
                // var aValue = localStorage.getItem("id") exemplar call to local storage
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Row>
                    <Form.Label column xs="2" sm="1">
                    </Form.Label>
                    <Col xs="10" sm="11">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={e => {
                                setEmail(e.target.value);
                                console.log(email);
                            }}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Row>
                    <Form.Label column xs="2" sm="1">
                    </Form.Label>
                    <Col xs="10" sm="11">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Row>
                    <Col xs="2" sm="1">
                        <Form.Check type="checkbox" />
                    </Col>
                    <Col xs="10" sm="11">
                        <Form.Label>
                                I hereby confirm that the referral app is allowed to send me emails, up until I
                                unsuscribe
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
            >Login</Button>
        </Form>
    );
};

export default SignUpLoginForm;