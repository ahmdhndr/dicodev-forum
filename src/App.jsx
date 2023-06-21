import React from 'react';
import './index.css';

function App() {
  return (
    <div className="text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl font-bold mb-2">Hello world</h1>
        <button type="button" className="btn btn-accent">
          Button
        </button>
      </div>
    </div>
  );
}

export default App;
