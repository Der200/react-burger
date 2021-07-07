import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';

import Preloader from '../preloader/preloader';

import { user, getUserData, userStatus } from '../../services/redux/authorization-slice/authorization-slice';
import { useAppDispatch, useAppSelector } from '../../utils/common';

const ProtectedRoute : FC<RouteProps> = ({ children, ...rest }) => {
  const currentUser = useAppSelector(user);
  const authorizationStatus = useAppSelector(userStatus);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('refreshToken') !== null) {
      //@ts-ignore
      dispatch(getUserData());
    }
  }, [])

  if (authorizationStatus !== 'succeeded' && currentUser === null && localStorage.getItem('refreshToken') !== null) {
    return <Preloader/>
  }

  return (
    <Route
      {...rest}
      render={() => 
        localStorage.getItem('refreshToken') !== null ? (children) : (<Redirect to={{pathname: '/login', state: {forward: location}}} />)
      }
    />
  );
} 

export default ProtectedRoute;