import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../containers/Navbar';

const Home = () => {
  const [welcomeMsg, setWelcomeMsg] = useState<string>('');
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/start');
      setWelcomeMsg(res.data.msg);
    })();
  }, []);

  return (
    <div className="App-header">
      <Navbar />
      <p>{welcomeMsg}</p>
    </div>
  );
};

export default Home;
