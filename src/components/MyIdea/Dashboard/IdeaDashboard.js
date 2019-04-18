import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './IdeaDashboard.css'
import posed from 'react-pose';


export default function IdeaDashboard(props) {
  
  const [user, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  // progress bar
  const [percentRange, setProgress] = useState(0);


  
  // Currently userIdeas are ALL ideas, because it is a non-specific GET request
  const [userIdeas, setUserIdeas] = useState([]);

  useEffect(() => {
     if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body));
    else props.history.replace('/MyIdea/login');
  }, []);
  
  // For testing purposes, this gets ALL ideas
  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(res => setUserIdeas(res.body));
  }, []);
  

   const handleClick = () => {
     props.history.replace('/MyIdea/')
   }
  
  if (props.authState.LoggedIn === false)
    return (
      <Redirect to='/myIdea' />
    );

    var listOne = userIdeas.map(idea => idea.idea.map(idea => idea))

    var listTwo = listOne.map(idea => idea[0])
 
    var listThree = listTwo.map(list => list.answers)
  


    return (
      <div className='dashboard-container'>
        <br/>
        <br/>
        <br/>
        <div className='title'>
          <h1>{user.firstName}'s Dashboard</h1>
        </div>
           <h2 style={styledH2}>Please follow your next step: your market check</h2>
        <div className='flex-tilescontainer'>
            {userIdeas.map(idea => 
            <Link key={idea.id} className='tile-link' to={`/dashboard/ideas/${idea.id}`}>
              <div className='idea-tile' key={idea.id}>
                <p>{idea.idea[3].answers[0].qAnswer}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
}

// Code below is just sample data because the ideas database is empty
const sampleData =
  [
    {
      "createdAt": "2019-03-12T13:57:40.889Z",
      "id": 1,
      "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}",
    },
    {
      "createdAt": "2019-03-12T13:57:54.639Z",
      "id": 2,
      "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}",
    },
    {
      "createdAt": "2019-03-12T13:58:14.973Z",
      "id": 3,
      "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}",
    },
  ]


  const PStartContent = posed.div({
    notDisplayingLogin: {
      y: 0,
      opacity: 1.0,
    },
    displayingLogin: {
      y: -390,
      opacity: 0.15,
    },
  });
  
  
  const styledH2 = {
    fontSize: 20,
    fontWeight: 800,
    color: 'white',
  }
