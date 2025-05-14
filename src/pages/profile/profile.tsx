import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { updateUser } from '../../services/slices/profileSlice';
import { ProfileUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const nameFromProfile = useSelector(
    (state) => state.profile.user?.name || ''
  );
  const emailFromProfile = useSelector(
    (state) => state.profile.user?.email || ''
  );

  const user = {
    name: nameFromProfile,
    email: emailFromProfile
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: nameFromProfile || '',
      email: emailFromProfile || '',
      password: ''
    });
  }, [nameFromProfile, emailFromProfile]);

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password && { password: formValue.password })
    };
    dispatch(updateUser(userData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
