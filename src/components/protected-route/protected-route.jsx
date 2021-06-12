import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { user } from '../../services/redux/authorization-slice';

const ProtectedRoute = ({ children, ...rest }) => {
  const currentUser = useSelector(user);

  const [isUserLoaded, setUserLoaded] = useState(false);
  if (isUserLoaded) {
    return (
      <Redirect to={{pathname: '/'}}/>
    );
  }

  return (
    <Route
      {...rest}
      render={() => 
        currentUser !== null ? (children) : (<Redirect to='/login' />)
      }
    />
  );
} 

export default ProtectedRoute;