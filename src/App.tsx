import React from 'react';
import './App.css';
import CommentsContainer from './components/CommentsContainer'
import logo from './components/img/images.png'

function App() {
  return (
    <div className="container flex">
      <div className='w-100'>
        <img src={logo} alt="Logo" className='img' />
      </div>
      <CommentsContainer />
    </div>
  );
}

export default App;
