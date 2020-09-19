import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SignUpLoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email,
      password
    };
    console.log(email, password);
    axios
      .post(`${url}/auth/register_login`, userData)
      .then(res => {
        localStorage.setItem('id', res.data.success.id); //save id to local storage
        localStorage.setItem('leader', res.data.success.leader); // save leader boolean to local storage
        // var aValue = localStorage.getItem("id") exemplar call to local storage
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      });
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Grid item container spacing={50}>
            <Typography variant="h1">Sign Up/Log In</Typography>
            <Grid item xs={12}>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Row>
                    <Col xs="1" sm="1">
                      <Form.Control
                        size="lg"
                        type="email"
                        placeholder="Enter email"
                        onChange={e => {
                          setEmail(e.target.value);
                          console.log(email);
                        }}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Row>
                    <Col xs="10" sm="11">
                      <Form.Control
                        size="lg"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Row>
                    <Col xs="2" sm="1">
                      <Form.Check type="checkbox" />
                    </Col>
                    <Col xs="10" sm="11">
                      <Typography>
                        I hereby confirm that the referral app is allowed to
                        send me emails, up until I unsubscribe.
                      </Typography>
                    </Col>
                  </Row>
                </Form.Group>

                <Button variant="contained" color="primary" onClick={onSubmit}>
                  Login
                </Button>
              </Form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default SignUpLoginForm;
