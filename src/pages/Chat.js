import React from 'react'
import {Row, Col, Container} from 'react-bootstrap';
import MessageForm from '../Components/MessageForm';
import Sidebar from '../Components/Sidebar';

const Chat = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Chat