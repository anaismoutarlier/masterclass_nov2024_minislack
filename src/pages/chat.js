import { RaisedButton, Message } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "@/firebase/context";

export default function Chat() {
  const [messageContent, setMessageContent] = useState("");
  const { user, signout, newMessage, messages } = useContext(FirebaseContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const sendMessage = async e => {
    e.preventDefault();
    await newMessage(messageContent);
    setMessageContent("");
  };

  if (!user) return null;
  return (
    <div className="chat container">
      <div className="sider">
        <div>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="sider-avatar"
          />
          <h2>{user.displayName}</h2>
          <h3>a{user.email}</h3>
        </div>
        <RaisedButton onClick={signout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          {messages.map(message => {
            return (
              <Message
                key={message.id}
                message={message}
                isOwnMessage={user.uid === message.user.id}
              />
            );
          })}
        </div>
        <form className="input-container" onSubmit={sendMessage}>
          <input
            placeholder="Enter your message here"
            value={messageContent}
            onChange={e => setMessageContent(e.target.value)}
          />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
