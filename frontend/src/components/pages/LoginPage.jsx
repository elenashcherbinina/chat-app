import axios from 'axios';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Card, Col, Container, Form, FloatingLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../contexts';
import routes from '../../routes';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      useAuth.loggedIn = true;
    }
    useAuth.loggedIn = false;
    navigate('/login');
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required('Обязательное поле'),
    password: Yup.string().trim().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.login, values);
        localStorage.setItem('user', JSON.stringify(data.token));
        navigate('/');
      } catch (error) {
        formik.errors = error;
      }
    },
    validationSchema,
  });

  console.log(formik);
  return (
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-items-center h-100'>
        <Col className='col-sm-4'>
          <Card className='shadow-sm'>
            <Card.Body className='row p-5'>
              <Form onSubmit={formik.handleSubmit}>
                <h1 className='text-center mb-4 h3'>Войти</h1>
                <FloatingLabel controlId='username' label='Ваш ник' className='mb-3'>
                  <Form.Control
                    type='text'
                    name='username'
                    placeholder='Ваш ник'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    autoComplete='username'
                  />
                </FloatingLabel>

                <FloatingLabel controlId='password' label='Пароль' className='mb-3'>
                  <Form.Control
                    type='password'
                    name='password'
                    placeholder='Пароль'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    autoComplete='new-password'
                  />
                </FloatingLabel>

                {formik.errors && (
                  <Form.Control.Feedback type='invalid'>
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                )}

                <Button variant='outline-primary' className='w-100 mb-3' type='submit'>
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className='p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span> <Link to='/signup'>Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
