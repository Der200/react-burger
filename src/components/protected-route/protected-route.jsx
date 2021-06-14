import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { user, getUserData, userStatus } from '../../services/redux/authorization-slice';
import Preloader from '../preloader/preloader';

const ProtectedRoute = ({ children, ...rest }) => {
  const currentUser = useSelector(user);
  const authorizationStatus = useSelector(userStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('refreshToken') !== null) {
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
        localStorage.getItem('refreshToken') !== null ? (children) : (<Redirect to='/login' />)
      }
    />
  );
} 

export default ProtectedRoute;