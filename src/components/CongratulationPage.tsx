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
    </div>
  );
};

export default CongratulationPage;
