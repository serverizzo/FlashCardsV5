import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Auth from "../supabase_components/Auth";
import Account from "../supabase_components/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { useUser } from "../context/userContext";
import Decks from "../decks/decks";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const { userId, setUserId } = useUser();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        console.log(session.user.id);
        setUserId(session.user.id) // ensure that Id is being set on every login or every return the app (since async storage should save the session to memory)
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        // <Account key={session.user.id} session={session} />
        // <Account />
        <Decks />
      ) : (
        <Auth />
      )}
    </View>
  );
}
