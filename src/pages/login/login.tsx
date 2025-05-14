import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserApi, TLoginData } from '@api';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import { checkAuth } from '../../services/slices/profileSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data: TLoginData = {
    email: email,
    password: password
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await loginUserApi(data);
      if (response.success) {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(checkAuth());
        navigate('/');
      }
    } catch (error: any) {
      setErrorText(error.message || 'Произошла ошибка при авторизации');
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
