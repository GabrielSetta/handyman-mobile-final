import { API_URL } from '../constants/ApiUrl';
import { 
    ConfiguracaoAspectos, 
    AvaliacaoUsuario, 
    EstatisticasRanking, 
    RankingData 
} from '../types/rankingType';

export class RankingService {
    static async getConfiguracaoAspectos(): Promise<ConfiguracaoAspectos> {
        try {
            const response = await fetch(`${API_URL}/ranking/configuracao-aspectos`);
            if (!response.ok) {
                throw new Error('Erro ao carregar configuração de aspectos');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar configuração:', error);
            throw error;
        }
    }

    static async avaliarUsuario(avaliacao: AvaliacaoUsuario): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/ranking/avaliar-usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(avaliacao)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao enviar avaliação');
            }
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            throw error;
        }
    }

    static async getEstatisticasUsuario(idUsuario: string): Promise<EstatisticasRanking> {
        try {
            const response = await fetch(`${API_URL}/ranking/estatisticas/${idUsuario}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar estatísticas');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
            throw error;
        }
    }

    static async getRankingUsuario(idUsuario: string): Promise<RankingData> {
        try {
            const response = await fetch(`${API_URL}/ranking/usuario/${idUsuario}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar ranking do usuário');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar ranking:', error);
            throw error;
        }
    }
} 