TITLE: StarkChat App

https://c-app.herokuapp.com/

DESCRIPTION 

StarkChat is a full-stack MERN chat app with Socket.io, React, Redux, MongoDB, and Express. StarkChat allows users to send real-time, bi-directional communications. StarkChat was designed to be a smaller company's internal messaging service. Something that could provide a more basic option to other SaaS available. Companies with less than 50 employees might not be afford, or want all the features of the high end platforms. They would be looking for something simplier that could be handled internally, and StarkChat is ready to handle those needs. 

    Happy Chatting!

TECHNOLOGIES USED

    Bootstrap and CSS to style the front end 
    React to build a pipeline from the front end to the MongoDB back end  
    Redux to help deal with shared state management 
    Cloudinary to allow the users the upload and store profile images 
    Bcrypt to encrypt the users' passwords to protect sensitive data
    MongoDB Atlas 
    Mongoose 
    Node.js 
    Express
    Socket.io to enable real-time, bi-directional communication between web clients and servers. 


MODELS
    
    User 
        name: String,
        email: String,
        password: String,
        picture: String,
        newMessages: Object,
        status: String
 
    Messages
        content: String,
        from: Object,
        socketid: String,
        time: String, 
        date: String,
        to: String

CHALLENGES
    One challenge that I encounter with this project involved using JWT for authentication. I had set out to allow the user to edit and even delete their own messages, but not be authorized to edit other member messages. I had  struggled with getting bcrypt to hash the user password. I figured that the project was secure enough for a basic internal messaging application, and decided to move forward with other areas of the application with plans to work on it in the future. 

   I am not very pleased with how it says "(Offline)" when the user is offline. I liked the functionality of knowing when another user is online when sending a private message. I had envisioned an icon next to user profile image that was toggle between yellow and green when the user was offline and online. I am close to getting this feature implemented, and will continue to work on this feature in the future

INSTRUCTIONS
    Upon arrival at StarkChat, the user is greeted with the homepage. The user is directed to log in if they have already registered an account. Otherwise, they are sent to the sign up page by clicking the "Get Started" button. The user will not be able to view any of the chats without being logged in or signed in. In order to create an account, the user will need to upload a profile picture, and set their name, email, and password. The profile image will need to be smaller than 1MB. The user password is encrypted using the bcrypt node.js library. If the user does have account, and clicked get started by accident, then there is a link to take them to the log in page. The log in page only requires the user's email and password to log in. 

   The user has access to the chat page once they have logged in or registered. The chat page is composed of the sidebar to the left, and the message form on the right. The sidebar is split into two parts. The top part are the available rooms. Upon arrival, the user is automatically placed in the general room, but are able to switch into other rooms by clicking on the link. 

   The members are listed below the Available Rooms in the sidebar. It displays the user's profile picture and the user's name. The user is able to locate themselves because "(You)" follows their name. All other users are listed as well. The user is able to see what other users are logged in or out, because "(Offline)" will only appear next to the user's name when they are logged out. You are able to private message other users besides yourself regardless of their status. You can open a private message by clicking the user's name. A private message room will open up with an alert at the top of the message form stating what user you are private messaging along with their profile image. 

   There are notifcations in the sidebar to let the user know When there are new messages while the user is in a different room, or in another private message. The notifications appear as a blue circle with a white number next to the available room or the other user's name. The notifications number increases with every new message sent. The notifications reset once the user rejoins the room or private message.

   The right hand side of the chat page contains the message form. The message form holds all of the messages for the Available Rooms and private messages. The messages are arranged by the message date, and then appear oldest to newest on that message date. The user's messages are a light green, and appear on the left side of the message form. The other users' messages are goldenrod, and are on the right side of the message form. Each message contains the user's name, profile picture, content, and a timestamp of when the post was made. At the bottom of the message form is a form where the user is able to input their content. The user is able to submit their post by clicking the flying airplane icon, or simply hitting return. 

   Happy chatting! 

FUTURE FEATURES

   Allow users to update and change their profile picture after creating account. 

   Allow users or admins to be able to create new Available Rooms

   Allow users to edit and delete their messages

   Allow users to have to have titles, or possibly admin badges

   Improve UX errors 



