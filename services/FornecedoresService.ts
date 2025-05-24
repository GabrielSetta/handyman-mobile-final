import axios from 'axios';
import { User } from '../model/User';
import { typeFornecedor } from '../model/Fornecedor';

// Substitua 192.168.1.100 pelo IP da sua máquina na rede local
const API_URL = 'http://192.168.3.10:3003';

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

export const FornecedorService = {
    async getFornecedoresPorCategoria(categoriaSelecionada:string):Promise<typeFornecedor[] | undefined>{
        try{
            const response = await  axios.get(`${API_URL}/fornecedor/categorias/${categoriaSelecionada}`)
            
            const user:typeFornecedor[] = response.data;

            return user;
        }catch(error){
            console.log(error)
        }
    }
}; 