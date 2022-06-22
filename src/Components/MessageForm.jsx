import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import "./MessageForm.css"

const MessageForm = () => {
    function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <div>
            <div className="messages-output"> </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control type="text" placeholder='Your message'></Form.Control>
                        </Form.Group>
                    
                    </Col>
                    <Col md={1}>
                        <Button variant='primary' type='submit' style={{ width: "100%", backgroundColor: "orange"}}>
                            <i className="fas fa-paper-plane">Submit</i>
                            {/* TODO style icons not importing?  */}
                        </Button>
                    </Col>


                </Row>


            </Form>

        </div>
  )
}

export default MessageForm