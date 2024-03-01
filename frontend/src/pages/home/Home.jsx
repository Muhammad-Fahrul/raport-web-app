import './home.css';

import { useSelector } from 'react-redux';

import Button from '../../components/button/Button';
import { selectCurrentToken } from '../auth/redux/authSlice';

const Home = () => {
  const token = useSelector((state) => selectCurrentToken(state));

  return (
    <div className="container-home">
      <div className="wrapper-home">
        <div className="wrapper-home-item">
          <div>
            <h1>{token ? 'Welcome' : 'Raport'}</h1>
            <p>
              {token ? 'Start ' : 'Easy way on '}
              {token ? (
                <strong>Your Journey</strong>
              ) : (
                <strong>Marking Student Achievements</strong>
              )}
            </p>
          </div>
          <Button
            url={token ? `/me` : '/login'}
            text={token ? "Let's Go" : 'Login'}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
