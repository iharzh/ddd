import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface LoginProps {
  handleLogin: (data: any) => void;
}

const Login = ({ handleLogin }: LoginProps) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(handleLogin);

  return (
    <Container className="h-100">
      <Row className="justify-content-md-center">
        <Col sm={4}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" {...register('email', { required: true })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          Click <Link to="/register">here</Link> to register
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
