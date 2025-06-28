import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation } from './TabNavigation';
import LoginScreen from '../pages/LoginScreen';
import CadastroScreen from '../pages/CadastroScreen';
import CadastroFornecedorScreen from '../pages/CadastroFornecedorScreen';
import { RankingScreen } from '../pages/RankingScreen';
// Tipos para as rotas
export type RootStackParamList = {
    Login: undefined;
    MainApp: undefined;
    Cadastro: undefined;
    CadastroFornecedor: undefined;
    Ranking: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStackNavigation = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainApp" component={TabNavigation} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="CadastroFornecedor" component={CadastroFornecedorScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
        </Stack.Navigator>
    );
}; 