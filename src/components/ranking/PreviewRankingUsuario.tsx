import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { RankingService } from '../../services/RankingService';
import { RankingData } from '../../types/rankingType';

interface PreviewRankingUsuarioProps {
  id_usuario: string;
  visible: boolean;
  onClose: () => void;
}

export const PreviewRankingUsuario: React.FC<PreviewRankingUsuarioProps> = ({
  id_usuario,
  visible,
  onClose,
}) => {
  const [ranking, setRanking] = useState<RankingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      carregarRanking();
    }
  }, [visible, id_usuario]);

  const carregarRanking = async () => {
    try {
      setLoading(true);
      const data = await RankingService.getRankingUsuario(id_usuario);
      console.log('DADOS RANKING MOBILE:', JSON.stringify(data, null, 2));
      setRanking(data);
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      Alert.alert('Erro', 'Erro ao carregar ranking do usuário');
    } finally {
      setLoading(false);
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Bronze':
        return '#CD7F32';
      case 'Prata':
        return '#C0C0C0';
      case 'Ouro':
        return '#FFD700';
      case 'Platina':
        return '#E5E4E2';
      case 'Diamante':
        return '#B9F2FF';
      default:
        return '#C0C0C0';
    }
  };

  const getNivelIcon = (nivel: string) => {
    switch (nivel) {
      case 'Bronze':
        return '🥉';
      case 'Prata':
        return '🥈';
      case 'Ouro':
        return '🥇';
      case 'Platina':
        return '💎';
      case 'Diamante':
        return '💎';
      default:
        return '🏆';
    }
  };

  const getRecomendacao = (score: number) => {
    if (score >= 70) {
      return {
        texto: '✅ Cliente com boa reputação. Recomendado para aceitar o pedido.',
        cor: '#4CAF50',
      };
    } else if (score >= 50) {
      return {
        texto: '⚠️ Cliente com reputação moderada. Avalie com cuidado.',
        cor: '#FF9800',
      };
    } else {
      return {
        texto: '❌ Cliente com baixa reputação. Considere recusar o pedido.',
        cor: '#f44336',
      };
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ranking do Cliente</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#A75C00" />
              <Text style={styles.loadingText}>Carregando ranking...</Text>
            </View>
          ) : ranking ? (
            <>
              {/* Nível e Score */}
              <View style={[styles.rankingCard, {borderWidth: 1, borderColor: 'blue', backgroundColor: '#f0f8ff', marginBottom: 10}]}> 
                <Text style={styles.nivelIcon}>{getNivelIcon(ranking.nivel)}</Text>
                <View style={[styles.nivelBadge, { backgroundColor: getNivelColor(ranking.nivel) }]}> 
                  <Text style={styles.nivelText}>{ranking.nivel}</Text>
                </View>
                <Text style={{fontSize: 18, color: '#333', marginTop: 8}}>Score: {ranking.score}/100</Text>
              </View>

              {/* Total de Avaliações */}
              <View style={{borderWidth: 1, borderColor: 'green', backgroundColor: '#eaffea', padding: 8, marginBottom: 10, borderRadius: 8}}>
                <Text style={{fontSize: 16, color: '#333'}}>
                  <Text style={{fontWeight: 'bold'}}>{ranking.total_avaliacoes}</Text> avaliações recebidas
                </Text>
              </View>

              {/* Aspectos Negativos */}
              {ranking.aspectos_negativos.length > 0 ? (
                <View style={{borderWidth: 1, borderColor: 'orange', backgroundColor: '#fff7e6', padding: 8, marginBottom: 10, borderRadius: 8}}>
                  <Text style={{fontWeight: 'bold', color: '#b26a00', marginBottom: 4}}>⚠️ Aspectos Negativos</Text>
                  {ranking.aspectos_negativos.map((aspecto, index) => (
                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                      <Text style={{color: '#333'}}>{aspecto.aspecto}</Text>
                      <Text style={{color: '#b26a00'}}>{aspecto.percentual}%</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{borderWidth: 1, borderColor: 'green', backgroundColor: '#eaffea', padding: 8, marginBottom: 10, borderRadius: 8}}>
                  <Text style={{color: '#4CAF50'}}>✅ Nenhum aspecto negativo registrado</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyText}>Cliente sem avaliações ainda.</Text>
              <Text style={styles.emptySubtext}>Pode ser um novo usuário.</Text>
            </View>
          )}

          {/* Botão Fechar */}
          <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
            <Text style={styles.closeModalButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
    minHeight: 300,
    borderWidth: 2,
    borderColor: 'red',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4000',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  rankingCard: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  nivelIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  nivelBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  nivelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreText: {
    fontSize: 16,
    color: '#666',
  },
  avaliacoesCard: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  avaliacoesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1976d2',
  },
  aspectosSection: {
    marginBottom: 15,
  },
  aspectosTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f44336',
    marginBottom: 10,
  },
  aspectoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  aspectoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#c62828',
  },
  aspectoPercentual: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c62828',
  },
  aspectosPositivosCard: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  aspectosPositivosText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2e7d32',
  },
  recomendacaoCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  recomendacaoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4000',
    marginBottom: 8,
  },
  recomendacaoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  closeModalButton: {
    backgroundColor: '#A75C00',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  boldText: {
    fontWeight: 'bold',
  },
}); 