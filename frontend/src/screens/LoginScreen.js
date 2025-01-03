import React,{useState,useEffect} from 'react'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { Link,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormConatiner from '../components/FormContainer'
import { login } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'



const LoginScreen = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userLogin= useSelector(state =>state.userLogin)
    const {loading, error, userInfo} = userLogin
    

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=> {
        if (userInfo){
            navigate(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormConatiner>
            <h1>
                Sign In
            </h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label className='m-1'>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email}
                    onChange = {(e) => setEmail(e.target.value) }></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label className='m-1'>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password}
                    onChange = {(e) => setPassword(e.target.value) } className='m-1'></Form.Control>
                </Form.Group>

                <Button type= 'submit' variant = 'primary' className='m-3'>
                    Sign In 
                </Button>


            </Form>

            <Row className = 'py-3'>
                <Col className='m-1'>
                    New Customer? {' '}
                    <Link to = { redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                    </Link>
                </Col>
                </Row>
            
        </FormConatiner>
    )
}

export default LoginScreen
