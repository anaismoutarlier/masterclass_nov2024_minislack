import { RaisedButton } from "@/components";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { FirebaseContext } from "@/firebase/context";
export default function Login() {
  const { signin, user } = useContext(FirebaseContext);
  const router = useRouter();
  console.log(signin);
  useEffect(() => {
    if (user) router.push("/chat");
  }, [user]);

  return (
    <div className="login container">
      <RaisedButton size="large" onClick={signin}>
        LOGIN
      </RaisedButton>
    </div>
  );
}
