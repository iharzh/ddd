import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import {Link} from 'react-router-dom';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Container className="h-100">
      <Row className="justify-content-md-center">
        <Col sm={4}>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control placeholder="Enter email" value={formik.values.email} name="email" onChange={formik.handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!formik.values.email || !formik.values.password}>
            Submit
          </Button>
        </Form>
          Click <Link to="/register">here</Link> to register
        </Col>
      </Row>
    </Container>

  );
}

export default Login;
