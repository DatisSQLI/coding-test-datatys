import React, { useEffect, useState } from 'react';
import Profile from '../../componenets/Profile';
import axios from '../../tools/api';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/user/1');
        setUser(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <Profile user={user} />
    </div>
  );
}

export default ProfilePage;
