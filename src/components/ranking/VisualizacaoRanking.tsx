import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { RankingService } from '../../services/RankingService';
import { EstatisticasRanking, NivelRanking } from '../../types/rankingType';

interface VisualizacaoRankingProps {
  id_usuario: string;
}

export const VisualizacaoRanking: React.FC<VisualizacaoRankingProps> = ({ id_usuario }) => {
  const [estatisticas, setEstatisticas] = useState<EstatisticasRanking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEstatisticas();
  }, [id_usuario]);

  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      const data = await RankingService.getEstatisticasUsuario(id_usuario);
      setEstatisticas(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      Alert.alert('Erro', 'Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  };

  const getNivelColor = (nivel: NivelRanking) => {
    switch (nivel) {
      case NivelRanking.BRONZE:
        return '#CD7F32';
      case NivelRanking.PRATA:
        return '#C0C0C0';
      case NivelRanking.OURO:
        return '#FFD700';
      case NivelRanking.PLATINA:
        return '#E5E4E2';
      case NivelRanking.DIAMANTE:
        return '#B9F2FF';
      default:
        return '#C0C0C0';
    }
  };

  const getNivelIcon = (nivel: NivelRanking) => {
    switch (nivel) {
      case NivelRanking.BRONZE:
        return '🥉';
      case NivelRanking.PRATA:
        return '🥈';
      case NivelRanking.OURO:
        return '🥇';
      case NivelRanking.PLATINA:
        return '💎';
      case NivelRanking.DIAMANTE:
        return '💎';
      default:
        return '🏆';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A75C00" />
        <Text style={styles.loadingText}>Carregando ranking...</Text>
      </View>
    );
  }

  if (!estatisticas) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma estatística disponível</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Seu Ranking</Text>

      {/* Nível e Score */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.nivelIcon}>{getNivelIcon(estatisticas.nivel_atual)}</Text>
          <View style={[styles.nivelBadge, { backgroundColor: getNivelColor(estatisticas.nivel_atual) }]}>
            <Text style={styles.nivelText}>{estatisticas.nivel_atual}</Text>
          </View>
          <Text style={styles.statLabel}>Nível Atual</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.scoreText}>{estatisticas.score_atual}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${estatisticas.score_atual}%` },
              ]}
            />
          </View>
          <Text style={styles.scoreLabel}>Score: {estatisticas.score_atual}/100</Text>
        </View>
      </View>

      {/* Estatísticas Gerais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estatísticas Gerais</Text>
        <View style={styles.generalStats}>
          <Text style={styles.generalStatsText}>
            <Text style={styles.boldText}>{estatisticas.total_avaliacoes}</Text> avaliações recebidas
          </Text>
        </View>
      </View>

      {/* Aspectos Positivos */}
      {estatisticas.aspectos_positivos.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Aspectos Mais Elogiados</Text>
          {estatisticas.aspectos_positivos.map((aspecto, index) => (
            <View key={index} style={styles.aspectoItem}>
              <Text style={styles.aspectoLabel}>{aspecto.aspecto}</Text>
              <View style={styles.aspectoBar}>
                <View
                  style={[
                    styles.aspectoBarFill,
                    { width: `${aspecto.percentual}%` },
                  ]}
                />
              </View>
              <Text style={styles.aspectoPercentual}>{aspecto.percentual}%</Text>
            </View>
          ))}
        </View>
      )}



      {/* Mensagem quando não há avaliações */}
      {estatisticas.total_avaliacoes === 0 && (
        <View style={styles.emptyStatsContainer}>
          <Text style={styles.emptyStatsIcon}>📊</Text>
          <Text style={styles.emptyStatsText}>Você ainda não recebeu avaliações.</Text>
          <Text style={styles.emptyStatsSubtext}>
            Complete serviços para começar a construir seu ranking!
          </Text>
        </View>
      )}

      {/* Informações sobre níveis */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Como funciona o ranking?</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoItem}>• <Text style={styles.boldText}>Bronze:</Text> 0-29 pontos</Text>
          <Text style={styles.infoItem}>• <Text style={styles.boldText}>Prata:</Text> 30-59 pontos</Text>
          <Text style={styles.infoItem}>• <Text style={styles.boldText}>Ouro:</Text> 60-79 pontos</Text>
          <Text style={styles.infoItem}>• <Text style={styles.boldText}>Platina:</Text> 80-89 pontos</Text>
          <Text style={styles.infoItem}>• <Text style={styles.boldText}>Diamante:</Text> 90-100 pontos</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4000',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  nivelIcon: {
    fontSize: 40,
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
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A75C00',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A75C00',
    borderRadius: 4,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  generalStats: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
  },
  generalStatsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1976d2',
  },
  aspectoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  aspectoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  aspectoBar: {
    width: 80,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginHorizontal: 10,
  },
  aspectoBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  aspectoPercentual: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    minWidth: 35,
    textAlign: 'right',
  },
  emptyStatsContainer: {
    alignItems: 'center',
    padding: 30,
  },
  emptyStatsIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyStatsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  emptyStatsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4000',
    marginBottom: 10,
  },
  infoList: {
    gap: 5,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
  },
}); 