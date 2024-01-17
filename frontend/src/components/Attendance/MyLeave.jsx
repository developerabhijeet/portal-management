import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

 export const MyLeave = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the 'username' cookie
    const storedUsername = Cookies.get('access_token');
    if (storedUsername) {
     const token= setUsername(storedUsername);
    }
  }, []);
  return (
    <div>
      <h1>Welcome, !</h1>
      {/* Your component content here */}
    </div>
  );
};

