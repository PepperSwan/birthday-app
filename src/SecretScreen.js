import React from 'react';

const SecretScreen = () => {
  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1>Well done!</h1>
        <p>You achieved a perfect score!</p>
        <p></p>
        <p>Now I shall reveal to you my secret...<br /><b>The true story of the name "Pepper Swan"!</b></p>
        Basically, I fancied a guy in school who said Pepper was a cool name, so I made it my nickname.
        <p>Pepper needed a last name, so I took Swan from Bella Swan... A character in Twilight.</p>
        <p><i>I have never even seen Twilight.</i></p>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>Play Again..?</button>
      </div>
  );
};

export default SecretScreen;