import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Youtube from "./components/Youtube";
import Settings from "./components/Settings";
import BrandHeader from "./components/BrandHeader";
import { Icon } from "react-native-paper";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <BrandHeader>
    <NavigationContainer>
      <BottomTab.Navigator backBehavior="history">
        <BottomTab.Screen
          name="Article"
          component={Home}
          options={{
            headerShown: false,
            tabBarColor: "red",
            tabBarIcon: ({ color }) => (
              <Icon
                source={"newspaper"}
                color={color}
                size={responsiveHeight(3.7)}
              />
            ),
            tabBarLabelStyle: { fontSize: responsiveFontSize(1.4), fontWeight:'bold' },
            // tabBarActiveBackgroundColor:'#f93734',
            tabBarActiveTintColor:'red',
            // tabBarInactiveBackgroundColor:'#ff514f',
            tabBarInactiveTintColor:'darkgray'
          }}
        />
        <BottomTab.Screen
          name="Youtube"
          component={Youtube}
          options={{
            headerShown: false,
            tabBarColor: "red",
            tabBarIcon: ({ color }) => (
              <Icon
                source={"youtube"}
                color={color}
                size={responsiveHeight(4.6)}
              />
            ),
            tabBarLabelStyle: { fontSize: responsiveFontSize(1.4), fontWeight:'bold' },
            // tabBarActiveBackgroundColor:'#f93734',
            tabBarActiveTintColor:'red',
            // tabBarInactiveBackgroundColor:'#ff514f',
            tabBarInactiveTintColor:'darkgray'
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            tabBarColor: "red",
            tabBarIcon: ({ color }) => (
              <Icon
                source={"account-settings"}
                color={color}
                size={responsiveHeight(4.5)}
              />
            ),
            tabBarLabelStyle: { fontSize: responsiveFontSize(1.4), fontWeight:'bold' },
            // tabBarActiveBackgroundColor:'#f93734',
            tabBarActiveTintColor:'red',
            // tabBarInactiveBackgroundColor:'#ff514f',
            tabBarInactiveTintColor:'darkgray'
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
    <StatusBar style="inverted" translucent={false} backgroundColor="red" />
    </BrandHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
