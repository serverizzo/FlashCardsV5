import { View, Text, Button } from 'react-native'
import React from 'react'
import { supabase } from '../utils/supabase'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter()

  const signout = () => {
    supabase.auth.signOut()
    router.replace("/(tabs)")
  }

  return (
    <View>
      <Text>Home</Text>
      <Button title="Sign Out" onPress={signout} />
    </View>
  )
}