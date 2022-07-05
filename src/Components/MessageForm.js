import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import sendIcon from '../assets/send-icon.png'
import "./MessageForm.css";
function MessageForm() {
    const [message, setMessage] = useState("");
    const user = useSelector((state) => state.user);
    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    // ScrollToBottom function everytime message is sent 
    const messageEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }
    // handle submit function
    function handleSubmit(e) {
        e.preventDefault();
    }
    // scroll to bottom function 
    function scrollToBottom() {
        // takes message and references it, and if there is a current message window will scroll into view
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const todayDate = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    }
    return (
        <>
            <div className="messages-output">
                {/* display user is in chatroom, when not in private message */}
                {user && !privateMemberMsg?._id && <div className="alert alert-info">You are in the {currentRoom} room</div>}
                {/* display user is in privating message with other user  */}
                {user && privateMemberMsg?._id && (
                    <>
                        <div className="alert alert-info conversation-info">
                            <div>
                            <img src={privateMemberMsg.picture} className="conversation-profile-pic"></img> 
                            
                            Your conversation with {privateMemberMsg.name}
                            </div>
                        </div>
                    </>
                )}
                {!user && <div className="alert alert-danger">Please login</div>}
                {/*  */}
                {user &&
                    messages.map(({ _id: date, messagesByDate }, idx) => (
                        <div key={idx}>
                            <p className="alert alert-info text-center message-date-indicator">{date}</p>
                            {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                                // differentiate between incoming messages and user messages
                                // if there is a sender email matches user email display class "message", but if is it doesn't then display class "incoming message"
                                <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx}>
                                    <div className="message-inner">
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={sender.picture} style={{ width: 30, height: 30, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                                            <br></br>
                                            <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                        </div>
                                        <p className="message-content">{content}</p>
                                        <p className="message-timestamp-left">{time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                <div ref={messageEndRef} />
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Your message" disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button variant="primary" type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "orange", height: "40px", width: "100%"}} disabled={!user}>
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>

                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default MessageForm;