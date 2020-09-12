import React from 'react';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { queries } from '../../../helpers/graphqlQueries';
import { useAuthDispatch } from '../../../contexts/AuthContext';
import './SignIn.less';
import { Link, Redirect } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useAuthDispatch();

  const [signIn, { loading: queryLoading, error: queryError }] = useLazyQuery(
    queries.SIGN_IN,
    {
      onCompleted: (data) => {
        dispatch({
          type: 'SIGN_IN',
          payload: {
            ...data.signIn
          }
        });
        return <Redirect to='/' />;
      }
    }
  );

  const onFinish = (values) => {
    signIn({ variables: { email: values.email, password: values.password } });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row
      type='flex'
      align='middle'
      className={'vertical-center-container signIn-form'}
    >
      <Form
        size={'large'}
        name='signInForm'
        className={'signIn-form'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input placeholder={'Email'} />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input.Password placeholder={'Password'} />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            loading={queryLoading}
            type='primary'
            htmlType='submit'
            className='signin-form-button'
          >
            Sign In
          </Button>
        </Form.Item>
        <span>
          Dont have an account? <Link to='/signUp'>Register now!</Link>
        </span>
      </Form>
    </Row>
  );
};

export default SignIn;
