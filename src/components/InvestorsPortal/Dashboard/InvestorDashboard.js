import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';

export default function InvestorDashboard(props) {
  
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  console.log(props.authState.token)
  
  // Currently userIdeas are ALL ideas, because it is a non-specific GET request
  const [userIdeas, setUserIdeas] = useState([]);
  
  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body))
    else props.history.push('/Investors/login');
  }, []);
  
  // For testing purposes, this gets ALL ideas
  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(res => setUserIdeas(res.body));
  }, []);
  
  const userLogout = () => {
    localStorage.removeItem('currentUserJwt');
    setUserLoggedIn(false);
  };
  
  if (userLoggedIn === false)
    return (
      <Redirect to='/login' />);

  console.log(userIdeas)
  
  
  // Condition below should be userIdeas.length > 0, userData.firstName is purely for testing purposes
  // if (userData.firstName) {
    // console.log(userData)
    // console.log(userIdeas)

    
  
  return (
      <div className='dashboard-container'>
        <br />
        <br />
        <br />
        <div className='title'>
          <h1>{userData.firstName}'s Dashboard</h1>
        </div>
        <div className='flex-tilescontainer'>
          {userIdeas.map(idea =>
            <Link key={idea.id} className='tile-link' to={`/dashboard/ideas/${idea.id}`}>
              <div className='idea-tile' key={idea.id}>
                <p>{idea.idea[3].answers[0].qAnswer}</p>
                <br />
                <p>{idea.idea[3].answers[1].qAnswer}</p>
              </div>

            </Link>
          )}
        </div>
      </div>
    );
  }

