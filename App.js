import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Calculator from './pages/Home';
import TodoScreen from './pages/Todo';
import StoreList from './pages/StoreList';
import DetailsScreen from './pages/Details';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

// Bottom Tabのアイコンの読み込み
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// 以下画面遷移のプログラミング

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DetailsStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="リスト"
      component={StoreList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="メモ詳細"
      component={DetailsScreen}
      options={(
        { navigation }) => ({
        headerShown: true,
        headerTitleStyle: {
          color: '#FBB03A',
        },
        headerLeft: () => (
          <Feather
            name="chevron-left"
            size={24}
            color="#FBB03A"
            style={{ marginLeft: 16 }}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const TabScreens = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#FBB03A',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      style: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
    }}
  >
    <Tab.Screen
      name="比較計算"
      component={Calculator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Entypo name="calculator" size={size} color={color} />
        ),
        headerStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        },
        headerTitleStyle: {
          color: '#FBB03A',
        },
      }}
    />
    <Tab.Screen
      name="リスト"
      component={TodoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="file-text" size={size} color={color} />
        ),
        headerStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        },
        headerTitleStyle: {
          color: '#FBB03A',
        },
      }}
    />
    <Tab.Screen
      name="店舗比較"
      component={DetailsStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="store" size={size} color={color} />
        ),
        headerStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        },
        headerTitleStyle: {
          color: '#FBB03A',
        },
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <TabScreens />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

