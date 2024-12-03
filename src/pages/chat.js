import { RaisedButton, Message } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { FirebaseContext } from "@/firebase/context";

export default function Chat() {
  const { user, signout } = useContext(FirebaseContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

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
          <Message
            message={{
              content: "Hello there",
              sentAt: Date.now() - 400000,
              user: {
                id: 1,
                displayName: "Anais Moutarlier",
                photoURL: "",
              },
            }}
            isOwnMessage={true}
          />
          <Message
            message={{
              content: "Welcome to MiniSlack",
              sentAt: Date.now() - 2000,
              user: {
                id: 1,
                displayName: "Anais Moutarlier",
                photoURL: "",
              },
            }}
            isOwnMessage={false}
          />
        </div>
        <form className="input-container">
          <input placeholder="Enter your message here" />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
