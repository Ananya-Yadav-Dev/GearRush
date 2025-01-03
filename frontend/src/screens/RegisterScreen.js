import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  useEffect(() => {
    const loadReCaptchaScript = () => {
      if (document.getElementById('recaptcha-script')) {
        // If the script is already loaded, attempt to initialize reCAPTCHA
        initializeReCaptcha();
        return;
      }

      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.grecaptcha) {
          initializeReCaptcha();
        } else {
          console.error('reCAPTCHA failed to load.');
        }
      };

      script.onerror = () => {
        console.error('Failed to load the reCAPTCHA script.');
      };

      document.body.appendChild(script);
    };

    const initializeReCaptcha = () => {
      if (window.grecaptcha && !captchaLoaded) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.render('recaptcha', {
            sitekey: '6LfTZKsqAAAAAGIfArxRxq3nDMp_ytgXZy1k6D1U', // Replace with your actual site key
            callback: (token) => {
              setCaptchaToken(token);
            },
            'expired-callback': () => {
              setCaptchaToken(''); // Reset token on expiry
            },
          });
          setCaptchaLoaded(true);
        });
      }
    };

    loadReCaptchaScript();
  }, [captchaLoaded]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else if (!captchaToken) {
      setMessage('Please complete the reCAPTCHA');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <center><h1>Sign Up</h1></center>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <center><div id="recaptcha"></div></center>
        <br />
        <center><Button type="submit" variant="primary">
          Register
        </Button></center>
      </Form>

      <Row className="py-3">
        <center><Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col></center>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
