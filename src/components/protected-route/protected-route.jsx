import { Route } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (
          children
      )}
    />
  );
} 

export default ProtectedRoute;