import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom'; 
import Hero from '../components/Hero';


function Home() {
  const router= useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token'); 

  //   if (token) {
  //     fetch('https://example.com/api/validateToken', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //         router('/dashboard');
  //         } else {
         
  //           console.error('Token validation failed');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error validating token:', error);
  //       });
  //   }
  // }, []);

  return (
    <div>
      <Hero />
    </div>
  );
}

export default Home;
