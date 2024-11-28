import React from 'react';
import ReactDOM from 'react-dom/client';

import ActivityFeed from './ActivityFeed.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <ActivityFeed/>
      <Footer/>
    </div>
  );
};

root.render(<App/>);

export default App;
