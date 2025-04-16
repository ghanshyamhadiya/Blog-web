import React, { useState } from 'react';

function ButtonHandler() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Click Me");

  const handleClick = () => {
    setIsDisabled(true);
    setButtonText("Please wait...");

    // Re-enable after 3 seconds
    setTimeout(() => {
      setIsDisabled(false);
      setButtonText("Click Me");
    }, 4000);
  };

  return (
    <button onClick={handleClick} disabled={isDisabled}>
      {buttonText}
    </button>
  );
}

export default ButtonHandler;
