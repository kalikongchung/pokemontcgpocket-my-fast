import React from 'react';

const GameDisplay = () => {
  return (
    <div className="h-screen w-screen">
      <iframe 
        src="https://pokerogue.org/pokerogue.embed"
        title="Pokerogue"
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        scrolling="auto"
      />
    </div>
  );
};

export default GameDisplay;

