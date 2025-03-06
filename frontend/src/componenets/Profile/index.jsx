import React from 'react';
import PropTypes, { string } from 'prop-types';
import { useForm } from 'react-hook-form';

function Profile({ user }) {
  const { register } = useForm({
    defaultValues: {
      firstName: user.firstname ?? '',
      lastName: user.lastname ?? '',
      country: user.country ?? '',
      city: user.city ?? '',
      email: user.email ?? '',
      phoneNumber: user.phonenumber ?? '',
    },
  });

  return (
    <div>
      <h1>My Profile</h1>
      <form id="user-profile" onSubmit={(e) => e.preventDefault()}>
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
          <input {...register('email')} id="email" />
        </label>

        <label htmlFor="phone-number">
          <span>Phone number</span>
          <input {...register('phoneNumber')} id="phone-number" />
        </label>

        <button type="submit">Save</button>
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
