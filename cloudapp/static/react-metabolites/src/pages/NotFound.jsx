import { Link } from 'react-router-dom';
import { Center } from '../components/Center';

const NotFound = () => <Center>
  <h1 className="display-1 fw-bold">404</h1>

  <p className="fs-3 h5">
    <span className="text-danger">Oops!</span> Page not found.
  </p>
  <p className="lead">
    The page you’re looking for doesn’t exist
  </p>
  <Link to="/" className="btn btn-primary">Go Home</Link>
</Center>;
export default NotFound;
