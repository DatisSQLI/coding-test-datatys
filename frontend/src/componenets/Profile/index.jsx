import React from 'react';
import PropTypes, { string } from 'prop-types';
import { useForm } from 'react-hook-form';
import { notification } from 'antd';
import axios from '../../tools/api';

function Profile({ user }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user.firstname ?? '',
      lastName: user.lastname ?? '',
      country: user.country ?? '',
      city: user.city ?? '',
      email: user.email ?? '',
      phoneNumber: user.phonenumber ?? '',
    },
  });

  const [notify, contextHolder] = notification.useNotification();

  const onSubmit = async (data) => {
    try {
      await axios.put('/user/1', data);
      notify.success({
        message: 'Updated',
        description: 'Your profile information has successfuly been updated.',
      });
    } catch (e) {
      notify.error({
        message: 'Update failed',
        description: 'An error occured while updating your profile.',
      });
    }
  };

  const deleteAccount = async () => {
    await axios.delete('/user/1');
  };

  return (
    <div>
      {contextHolder}
      <h1>My Profile</h1>
      <form id="user-profile" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first-name">
          <span>First name</span>
          <input {...register('firstName')} id="first-name" />
        </label>

        <label htmlFor="last-name">
          <span>Last name</span>
          <input {...register('lastName')} id="last-name" />
        </label>

        <label htmlFor="country">
          <span>Country</span>
          <input {...register('country')} id="country" />
        </label>

        <label htmlFor="city">
          <span>City</span>
          <input {...register('city')} id="city" />
        </label>

        <label htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            {...register('email', {
              pattern: {
                value: /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                message: 'Email format is invalid',
              },
            })}
          />
        </label>
        {errors.email && <small className="form-error" role="alert">{errors.email.message}</small>}

        <label htmlFor="phone-number">
          <span>Phone number</span>
          <input {...register('phoneNumber')} id="phone-number" />
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={deleteAccount}>Delete my account</button>
      </form>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    city: string,
    country: string,
  }),
};
Profile.defaultProps = {
  user: { email: '' },
};

export default Profile;
