import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/Contexts';

const CountDown = () => {
  const navigate = useNavigate();
  const [ user, setUser ] = useContext(UserContext);
  const [ result, setResult ] = useState('');

  // Set the date we're counting down to
  const countDownDate = new Date(user.exp * 1000).getTime();

  // Update the count down every 1 second
  const count = setInterval(() => {
    // Get now date and time
    const now = new Date().getTime();
            
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
            
    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      // When count down is over
      clearInterval(count);
      setResult('tempo esgotado');
      
      setUser([]);
      localStorage.clear();
      navigate('/');
    } else {
      // Output the result
      setResult(minutes + "m " + seconds + "s");
    }
  }, 1000);

  return (
    <>
      {result}
    </>
  );
};

export default CountDown;
