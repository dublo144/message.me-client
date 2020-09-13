import {
  Avatar,
  Button,
  Checkbox,
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
import { Link } from 'react-router-dom';
import './LogIn.less';

const LogIn = () => {
  return (
    <div className={'login'}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={'login__container'}>
          <img
            src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd-650-80.jpg.webp'
            alt=''
          />
          <Typography variant='h5'>Sign in</Typography>
          <form noValidate>
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
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
