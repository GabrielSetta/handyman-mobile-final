import axios from 'axios';
import dbPromise from '../../db';
import { checkInternetConnection, handleApiError } from '../utils/networkUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../model/User';
import { API_URL } from '../constants/ApiUrl';

// Substitua 192.168.1.100 pelo IP da sua máquina na rede local

interface LoginSuccess {
    success: true;
    data: {
        token: string;
    };
    useLocalDB: boolean;
}


interface LoginError {
    success: false;
    message: string;
    useLocalDB: boolean;
}

export type LoginResponse = LoginSuccess | LoginError;

export const UserService = {
    async getUsers(idUser:string | undefined):Promise<User | undefined>{
        try{
            const response = await axios.get(`${API_URL}/usuarios/buscar-id/${idUser}`);
            
            const user:User = response.data;

            return user;
        }catch(error){
            console.log(error)
        }
    }
}; 