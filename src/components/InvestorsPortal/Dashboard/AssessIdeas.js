import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './InvestorDashboard.css'
import styled from '@emotion/styled';
import Button from '../../reogranisation/Questions/Button';
import posed from 'react-pose';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'


export default function AssessIdeas(props) {

  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const [expertIdeas, setExpertIdeas] = useState([]);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body))
    else props.history.push('/InvestorStart');
  }, []);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/ideas`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setExpertIdeas(res.body));

  }, []);

  const userLogout = () => {
    localStorage.removeItem('currentUserJwt');
    setUserLoggedIn(false);
  };

  console.log(userLoggedIn, "LOGG")

  if (userLoggedIn === false)
    return (
      <Redirect to='/login' />);

  return (

    <div className='dashboard-container'>
      <br />
      <br />

      <h4 className='title'>This is {userData.firstName}'s dashboard</h4>
      <StyledCard>
        Here you get to assess ideas in a very simple and fast way and get rewarded for it at the same time.
        When an idea you helped assess becomes incorporated, you’ll receive € 100,- worth of equity in that company.
        Assessing an idea takes on average 3 minutes.[Open]
        </StyledCard>
      <StyledCard>
        {expertIdeas.map(idea =>
          <Link key={idea.id} className='tile-link' to={`/investors/dashboard/assess/${idea.id}`}>
            <div className='idea-tile' key={idea.id}>
              <p>{idea.idea[3].answers[0].qAnswer}</p>
              <br />
              <p>{idea.idea[3].answers[1].qAnswer}</p>
              {idea.progress === null ||
                idea.progress.step01 === true &&
                idea.progress.step02 === true &&
                idea.progress.step03 === false && <p>Status: First patent check </p>}
              {idea.progress === null ||
                idea.progress.step01 === true &&
                idea.progress.step02 === true &&
                idea.progress.step03 === true &&
                idea.progress.step04 === false && <p>Status: Expert check </p>}
            </div>
          </Link>
        )}
      </StyledCard>
    </div>
  )
}


const StyledCard = styled(Card)`
    background-color: rgb(255,255,255, 0.3);
    padding: 50px;
    width: 500px;
    margin-left: 70px;
    color: white
  `;