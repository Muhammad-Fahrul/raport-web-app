import './notFound.css';

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-notfound">
      <h3>Sorry, the page you were looking for was not found.</h3>
      <Link to="/">
        <button>
          Home
          <div className="wrapper-arrow">
            <div className="arrow"></div>
          </div>
        </button>
      </Link>
    </div>
  );
}
