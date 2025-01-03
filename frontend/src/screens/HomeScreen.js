import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
//import axios from 'axios';

const HomeScreen = () => {
    const { keyword } = useParams();
    //const [products, setProducts] = useState([])
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList 

    useEffect(() => {
      dispatch(listProducts())
    },[dispatch])

    return (
        <>
        <Meta />
       {!keyword && <ProductCarousel />}
        <h1>Product Lineup</h1>
        {loading ? 
        ( <Loader/> )
        : error ? 
        ( <Message variant='danger'>{error} </Message>)
        : <Row>
            {products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                <Product product={product} />
                </Col>
            ))}
        </Row>}
        
        </>
    )
}

export default HomeScreen
