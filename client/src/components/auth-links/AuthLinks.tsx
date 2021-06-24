import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../types';
import { userLoggedOut } from '../../redux/actions/auth/actions';
import { Button } from '@material-ui/core';

const AuthLinks = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IStore) => state.auth);

  const logoutHandler = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      {authState.currentUser ? (
        <>
          <Button component={Link} to={"/"} onClick={logoutHandler} variant="outlined" style={{ minHeight: "55" }}></Button>
          {/* <Link to='/' onClick={logoutHandler}>
            Logout
          </Link> */}
        </>
      ) : (
        <>
          {!authState.isLoading ? (
            <>
              <Button component={Link} to={"/login"} variant={"outlined"} style={{ minHeight: "55" }}>Login</Button>
              {/* <Link to="/login">Login</Link>
              <span style={{ padding: '0 0.2rem' }}></span> */}
              {/* <Link style={{ fontWeight: 'bold' }} to="/register">
                Register
              </Link> */}
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default AuthLinks;
