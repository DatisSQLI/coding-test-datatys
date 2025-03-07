import React from 'react';
import PropTypes, { string } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { notification, Modal } from 'antd';
import { isValidPhoneNumber } from 'libphonenumber-js';
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

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.put(`/user/${user.id}`, data);
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
    Modal.confirm({
      title: 'Warning',
      content: 'Are you sure you want to delete your account ?',
      onOk: async () => {
        await axios.delete(`/user/${user.id}`);
        navigate('/');
      },
    });
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
              required: {
                value: true,
                message: 'email is mandatory',
              },
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
          <input
            id="phone-number"
            {...register('phoneNumber', {
              validate: (n) => isValidPhoneNumber(n) || 'Invalid phone number',
            })}
          />
        </label>
        {errors.phoneNumber && <small className="form-error" role="alert">{errors.phoneNumber.message}</small>}

        <button type="submit">Save</button>
        <button type="button" onClick={deleteAccount}>Delete my account</button>
      </form>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
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
