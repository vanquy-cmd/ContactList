import React from 'react';
import { View, Text } from 'react-native';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import DrawerNavigator from './components/routes';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';
import Store from './screens/store';
import { Provider } from 'react-redux';

const App = () => 
{
    return (
        <Provider store={Store}>
            <DrawerNavigator />
        </Provider>
    );
}

export default App;