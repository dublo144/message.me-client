import { useLazyQuery } from '@apollo/client';
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import { AccountCircle, LockOutlined } from '@material-ui/icons';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthDispatch } from '../../../contexts/AuthContext';
import { queries } from '../../../helpers/graphqlQueries';
import './LogIn.less';

const LogIn = () => {
  const dispatch = useAuthDispatch();
  const [values, setValues] = React.useState({});

  const [signIn, { loading: queryLoading, error: queryError }] = useLazyQuery(
    queries.SIGN_IN,
    {
      fetchPolicy: 'network-only',
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ variables: { email: values.email, password: values.password } });
  };

  return (
    <div className={'login'}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={'login__container'}>
          {queryLoading ? (
            <CircularProgress />
          ) : (
            <img
              src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd-650-80.jpg.webp'
              alt=''
            />
          )}
          <Typography variant='h5'>Sign in</Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              onChange={handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockOutlined />
                  </InputAdornment>
                )
              }}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              size={'large'}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={queryLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signUp' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LogIn;
