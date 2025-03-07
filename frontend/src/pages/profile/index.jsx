import React from 'react';
import PropTypes, { string } from 'prop-types';
import Profile from '../../componenets/Profile';

function ProfilePage({ user }) {
  return (
    <div className="container">
      <Profile user={user} />
    </div>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.shape({
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    city: string,
    country: string,
  }).isRequired,
};

export default ProfilePage;
