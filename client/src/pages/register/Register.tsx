import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const registerFormValidationSchema = yup.object().shape({
  firstName: yup.string().min(2, 'Too short!').max(50, 'Too long!').required('Required!'),
  lastName: yup.string().min(2, 'Too short!').max(50, 'Too long!').required('Required!'),
  email: yup.string().email('Invalid email!').required('Required!'),
  userName: yup.string().max(50, 'Too long!'),
  password: yup.string().min(4, 'Too short!'),
  passwordRepeat: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

interface RegisterProps {
  createUser: (userData: any) => void;
}

const Register = ({ createUser }: RegisterProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerFormValidationSchema),
  });

  const onSubmit = handleSubmit(createUser);

  console.log({ errors });

  return (
    <Container className="h-100">
      <Row className="justify-content-md-center">
        <Col sm={6}>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                {...register('firstName')}
                isInvalid={!!errors.firstName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                placeholder="Last name"
                type="text"
                {...register('lastName')}
                isInvalid={!!errors.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                type="text"
                {...register('username')}
                isInvalid={!!errors.username}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                type="text"
                {...register('email')}
                isInvalid={!!errors.email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password')}
                isInvalid={!!errors.password}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                {...register('repeatPassword')}
                isInvalid={!!errors.passwordRepeat}
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

export default Register;
