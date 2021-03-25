import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { stat } from 'fs';
import { IStore } from '../types';

const Home = () => {
  const [welcomeMsg, setWelcomeMsg] = useState<string>('');
  const authState = useSelector((state: IStore) => state.auth);
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/start');
      setWelcomeMsg(res.data.msg);
    })();
  }, []);

  return (
    <div className="App-header">
      <p>Welcome to the DataExchange</p>
      {authState.currentUser ? (
        ''
      ) : (
        
          <p>
            <Link to="/login" className="link">Login</Link> to explore EIA data</p>
      )}
      
      {/* <p>{welcomeMsg}</p> */}
    </div>
  );
};

export default Home;