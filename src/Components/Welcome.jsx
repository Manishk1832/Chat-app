import React from 'react'
import styled from 'styled-components'
import welcome from '../assets/giphy.gif'

export default function Welcome({currentuser}) {
    const username = currentuser ? currentuser.username : 'Guest';

    console.log(username)
  return (
    <Container>
        <img src={welcome} alt="welcome" />
        <h1>
          Welcome, <span> {username} </span>
        </h1>
        <h3>Please Select a chat to start Messaging.</h3>
    </Container>
  )
}

const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;

  img {
    height: 20rem;
  }
  span{
    color: #4e0eff;
  }


`
