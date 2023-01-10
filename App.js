import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

import Home from "./screens/Home";
import Detail from "./screens/Details";
import Hadiths from "./screens/Hadiths";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator options={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details Screen" component={Detail} />
        <Stack.Screen
          name="Hadiths"
          component={Hadiths}
          options={{
            headerStyle: {
              backgroundColor: "#ffe6b6",
            },
            headerTintColor: "#000",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
            },
            headerLeft: () => (
              <Icon.Button
                name="bars"
                backgroundColor="#ffe6b6"
                onPress={() => alert("This is a Menubar!")}
                color="#000"
              ></Icon.Button>
            ),
            headerRight: () => (
              <Icon.Button
                name="whatsapp"
                backgroundColor="#ffe6b6"
                onPress={() => alert("Opening to the Whatsapp")}
                color="#4bad35"
                size={30}
              ></Icon.Button>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
