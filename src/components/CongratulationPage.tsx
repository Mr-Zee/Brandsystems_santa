import React, { useEffect, useState } from 'react';

const CongratulationPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 500); // Delay the animation for a better effect
  }, []);

  return (
    <div className="congratulation-page">
      <h1 className={`message ${showMessage ? 'show' : ''}`}>🎉 Congratulations! 🎉</h1>
      <p className={`sub-message ${showMessage ? 'show' : ''}`}>
        You have completed all the tasks. Well done! 🎉
      </p>
      <br />
      <p>Congratulations! Capture a screenshot with the time and then meet<b className='text-green-700'> Mr. Z</b> </p>
    </div>
  );
};

export default CongratulationPage;
