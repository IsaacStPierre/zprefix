import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Posts from './components/posts/Posts'
import { AppContext } from './Context';

//const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const App = () => {

  const [posts, setPosts] = useState([]);

  const provider = {posts, setPosts}

  return (
    <div>
      <AppContext.Provider value={provider}>
        <Navbar />
        <div className='Home'>
          <Posts />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
