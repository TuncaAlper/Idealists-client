import React, { useEffect, useState, Component } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import './IdeaDashBoardDetail.css';
import styled from '@emotion/styled';

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'


export default function IdeaDashboardDetail(props) {
    const [userIdeas, setUserIdeas] = useState([]);
    const ideasId = props.match.params.id

    useEffect(() => {
        request
            .get(`${baseUrl}/ideas/${ideasId}`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(res => setUserIdeas(res.body.idea))
    }, []);

    let qAnswers = []
    const qTitles = []
    userIdeas.map(idea => {
        idea.answers.map(question => 
            qTitles.push(question.qTitle)
        )
    })

    userIdeas.map(idea => {
        idea.answers.map(answer => {
            qAnswers.push(answer.qAnswer)
        })
    })

    qAnswers = qAnswers.map(answer => typeof answer === 'object' ? answer[0] ? answer[0].value : answer.value : answer)

    if (qAnswers[0] === 'true') {
        qAnswers[0] = 'yes'
    }

    return (
        <div className="dashboard-container">
        <Container>
            <Left>
                <FlexRow>
                    <FlexColumn>
                       
                        <StyledDiv>
                            <h1>Assessing Your Idea:</h1><hr/>
                            <ul className="step-progress">
                                <li className="step-progress-item is-done"><strong>Submit your idea</strong></li>
                                <li className="step-progress-item current"><strong>First patent check (1 week)</strong></li>
                                <li className="step-progress-item"><strong>Expert check (2 weeks)</strong></li>
                                <li className="step-progress-item"><strong>Second patent check (2 weeks)</strong></li>
                                <li className="step-progress-item"><strong>Validation phase (4 weeks)</strong></li>
                                <li className="step-progress-item"><strong>Final patent check (2 weeks)</strong></li>
                                <li className="step-progress-item"><strong>Business plan phase (2 weeks)</strong></li>
                                <li className="step-progress-item"><strong>Funding phase (2 weeks)</strong></li>
                                <li className="step-progress-item"><strong>Company is born (1 week)</strong></li>
                            </ul>
                        </StyledDiv>
                    </FlexColumn>
                </FlexRow>
            </Left>
            <Right>
                <Content>
                    <h1 className='header'> Questions and Answers about Idea:</h1>
                    { qTitles.map((title, index) => 
                        <div key={index}>
                            <StyledCard>
                                <h4>{title}:</h4>
                                <p>{qAnswers[index]}</p>
                            </StyledCard>
                        </div>
                    )}
                </Content>
            </Right>
        </Container>
        </div>
        // <Grid className='dashboard-container'
        //     container
        //     direction="row"
        //     justify="space-evenly"
        //     alignItems="flex-start"
        //     >   
        //     <div>
        //         <br /><br /><br /><br /><br />
                // <StyledDiv>
                //     <h1>Assessing Your Idea:</h1>
                //     <ul className="step-progress">
                //         <li className="step-progress-item is-done"><strong>Submit your idea</strong></li>
                //         <li className="step-progress-item current"><strong>First patent check (1 week)</strong></li>
                //         <li className="step-progress-item"><strong>Expert check (2 weeks)</strong></li>
                //         <li className="step-progress-item"><strong>Second patent check (2 weeks)</strong></li>
                //         <li className="step-progress-item"><strong>Validation phase (4 weeks)</strong></li>
                //         <li className="step-progress-item"><strong>Final patent check (2 weeks)</strong></li>
                //         <li className="step-progress-item"><strong>Business plan phase (2 weeks)</strong></li>
                //         <li className="step-progress-item"><strong>Funding phase (2 weeks)</strong></li>
                //         <li className="step-progress-item"><strong>Company is born (1 week)</strong></li>
                //     </ul>
                // </StyledDiv>
        //     </div>
        //     <main>
        //         <br /><br /><br /><br /><br /><br />
                // <h1 className='header'> Questions and Answers about Idea</h1>
                // { qTitles.map((title, index) => 
                //     <div key={index} className='questions-answers'>
                //         <StyledCard className='card-detail'>
                //             <h4>{title}:</h4>
                //             <p>{qAnswers[index]}</p>
                //         </StyledCard>
                //     </div>
                // )}
        //     </main>
        // </Grid>
    )

}

const StyledDiv = styled.div `
    margin: 0 auto;
    width: 330px;
    font-family: 'Helvetica';
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 20px;
    color: white;
`;
const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);
    padding-left: 8px;
    padding-right: 8px;
`;
const Left = styled.div`
    grid-area: left;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    padding-top: 100px;
    padding-left: 30px;
`;
    
const FlexRow = styled.div`
    display: flex;
    @media only screen and (orientation:portrait) { 
        flex-direction: column;
    }
`;

const FlexColumn = styled.div`
    display: flex;
    flex: 1;
`;

const Content = styled.div`
    align-self: center;
    justify-self: center;
    color: #ffffff;
    width: 90vw;
    max-width: 800px;
    height: auto;
    padding: 20px;
    
`;

const Right = styled.div`
    grid-area: right;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:start;
    align-items:flex-start;
    padding-top:100px;
`;

const Container = styled.div`
    width: 100vw;
    
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
    grid-template-areas: "left right";
    
	background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
`;