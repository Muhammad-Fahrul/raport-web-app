import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../components/button/Button';

import { useRefreshMutation } from '../pages/auth/redux/authApiSlice';
import { selectCurrentToken } from '../pages/auth/redux/authSlice';

const PersistLogin = () => {
  const token = useSelector((state) => selectCurrentToken(state));
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <>
        <p>{`${error?.data?.message} - `}</p>
        <Button url="/login" text="Login" />
      </>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
