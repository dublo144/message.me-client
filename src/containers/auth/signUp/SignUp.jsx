import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, Result, Row } from 'antd';
import './SignUp.less';
import { queries } from '../../../helpers/graphqlQueries';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [form] = Form.useForm();
  const [
    signUp,
    { data, loading: mutationLoading, error: mutationError }
  ] = useMutation(queries.SIGN_UP);

  const onFinish = (values) => {
    const { confirm, ...userInput } = values;
    signUp({ variables: { input: userInput } });
  };

  return (
    <>
      {data && !mutationError ? (
        <Result
          status='success'
          title={`Welcome ${data.signUp.username}`}
          subTitle='We are stoked to have you onboard'
          extra={[
            <Link to={'/signIn'}>
              <Button type='primary' shape='round'>
                Sign in
              </Button>
            </Link>
          ]}
        />
      ) : (
        <Row
          type={'flex'}
          align={'middle'}
          className={'vertical-center-container signup-form'}
        >
          <Form
            size={'large'}
            form={form}
            onFinish={onFinish}
            name='signup_form'
            className='signup-form'
            scrollToFirstError
          >
            <Form.Item
              name='firstName'
              rules={[
                { required: true, message: 'Please input your first name!' }
              ]}
              validateStatus={mutationLoading}
            >
              <Input placeholder='First Name' />
            </Form.Item>

            <Form.Item
              name='lastName'
              rules={[
                { required: true, message: 'Please input your last name!' }
              ]}
              validateStatus={mutationLoading}
            >
              <Input placeholder='Last Name' />
            </Form.Item>

            <Form.Item
              name='username'
              rules={[{ required: true, message: 'Please input a username!' }]}
              validateStatus={mutationLoading}
            >
              <Input placeholder='Username' />
            </Form.Item>

            <Form.Item
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
              validateStatus={mutationLoading}
            >
              <Input placeholder='E-mail' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
              hasFeedback
              validateStatus={mutationLoading}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item
              name='confirm'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  }
                })
              ]}
              validateStatus={mutationLoading}
            >
              <Input.Password placeholder='Confirm Password' />
            </Form.Item>

            <Form.Item>
              <Button
                loading={mutationLoading}
                type='primary'
                htmlType='submit'
                className='signup-form-button'
                style={{
                  width: '100%'
                }}
              >
                Register
              </Button>
            </Form.Item>
            <span>
              Already have an account? <Link to='/signIn'>Sign in now!</Link>
            </span>
          </Form>
        </Row>
      )}
    </>
  );
};

export default SignUp;
