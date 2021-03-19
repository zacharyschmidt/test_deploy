import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <p>Welcome to the DataExchange</p>
      <p>Login to explore EIA data</p>
      {/* <p>{welcomeMsg}</p> */}
    </div>
  );
};

export default Home;