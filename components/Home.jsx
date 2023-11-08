import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ArticleList from './ArticleList'
import SingleArticle from './SingleArticle'
const Stack = createStackNavigator()
const Home = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='Articlelist' component={ArticleList} options={{headerShown:false}}/>
    <Stack.Screen name='Singlearticle' component={SingleArticle} options={{headerShown:false}}/>
   </Stack.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})