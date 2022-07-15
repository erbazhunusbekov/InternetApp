import React, { useState } from 'react'
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Row,
  Col,
  Card,
  Container
} from 'react-bootstrap'
import PRODUCTS from '../source/products.json';
import CATEGORY from '../source/categories';

const NewMarket = () => {

  const [data, setData] = useState(PRODUCTS);
  const [value, setValue] = useState(null);
  const [inpValue, setInpValue] = useState('')

  const btnAll = () => setData(PRODUCTS)

  const btnDiscount = () => setData([...data.filter((v) => v.discount !== null)])

  const btnSearch = () => {
    const result = PRODUCTS.filter((item) => {
      if (item.title.toLowerCase().indexOf(inpValue.toLowerCase()) !== -1) return item
    })
    setData(result)
    setInpValue('')
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => btnAll()}>
          New Market
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => btnDiscount()}>Discount%</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {CATEGORY.map((v, i) => {
                return (
                  <NavDropdown.Item key={i} onClick={() => setValue(v.id)}>{v.title}</NavDropdown.Item>
                )
              })}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl value={inpValue} onChange={(e) => setInpValue(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
            <Button onClick={() => btnSearch()} variant="outline-warning">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          {data.filter((v) => {
            return value !== null ? (value == v.category_id) : true
          }).map((item, i) => {
            return (
              <Col key={i} xs={3}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.main_image.path.original} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Button variant="info">
                      {item.discount ? <del>{item.price}</del> : ''}
                      {item.discount ? (item.price - (item.price * item.discount / 100)).toFixed(0) : item.price} сом
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default NewMarket