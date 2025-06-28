import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { VisualizacaoRanking } from '../components/ranking/VisualizacaoRanking';
import { AvaliacaoUsuario } from '../components/ranking/AvaliacaoUsuario';
import { PreviewRankingUsuario } from '../components/ranking/PreviewRankingUsuario';

export const RankingScreen = () => {
  const [showAvaliacao, setShowAvaliacao] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // IDs de teste
  const idUsuarioTeste = '123456';
  const idServicoTeste = '789012';

  const handleAvaliacaoConcluida = () => {
    setShowAvaliacao(false);
    Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sistema de Ranking - Demonstração</Text>
        <Text style={styles.subtitle}>
          Teste todas as funcionalidades do sistema de ranking
        </Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        {/* Botão para Avaliar Usuário */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => setShowAvaliacao(true)}
        >
          <Text style={styles.actionIcon}>📝</Text>
          <Text style={styles.actionTitle}>Avaliar Usuário (Fornecedor)</Text>
          <Text style={styles.actionDescription}>
            Simula um fornecedor avaliando um usuário após um serviço
          </Text>
        </TouchableOpacity>

        {/* Botão para Ver Preview */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => setShowPreview(true)}
        >
          <Text style={styles.actionIcon}>👁️</Text>
          <Text style={styles.actionTitle}>Ver Ranking do Usuário (Fornecedor)</Text>
          <Text style={styles.actionDescription}>
            Simula um fornecedor visualizando o ranking de um cliente
          </Text>
        </TouchableOpacity>

        {/* Informações */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoTitle}>Informações</Text>
          <Text style={styles.infoText}>• ID Usuário: {idUsuarioTeste}</Text>
          <Text style={styles.infoText}>• ID Serviço: {idServicoTeste}</Text>
          <Text style={styles.infoText}>• Backend: Porta 3003</Text>
        </View>
      </View>

      {/* Visualização do Ranking do Usuário */}
      <View style={styles.rankingSection}>
        <Text style={styles.sectionTitle}>Seu Ranking (Usuário)</Text>
        <View style={styles.rankingContainer}>
          <VisualizacaoRanking id_usuario={idUsuarioTeste} />
        </View>
      </View>

      {/* Explicação do Sistema */}
      <View style={styles.explanationSection}>
        <Text style={styles.sectionTitle}>Como Funciona o Sistema de Ranking</Text>
        
        <View style={styles.explanationGrid}>
          <View style={styles.explanationColumn}>
            <Text style={styles.explanationSubtitle}>Níveis de Ranking</Text>
            <Text style={styles.explanationItem}>• <Text style={styles.boldText}>Bronze:</Text> 0-29 pontos</Text>
            <Text style={styles.explanationItem}>• <Text style={styles.boldText}>Prata:</Text> 30-59 pontos</Text>
            <Text style={styles.explanationItem}>• <Text style={styles.boldText}>Ouro:</Text> 60-79 pontos</Text>
            <Text style={styles.explanationItem}>• <Text style={styles.boldText}>Platina:</Text> 80-89 pontos</Text>
            <Text style={styles.explanationItem}>• <Text style={styles.boldText}>Diamante:</Text> 90-100 pontos</Text>
          </View>
          
          <View style={styles.explanationColumn}>
            <Text style={styles.explanationSubtitle}>Aspectos Avaliados</Text>
            <Text style={styles.aspectosTitle}>Positivos:</Text>
            <Text style={styles.explanationItem}>• Ajudou no processo</Text>
            <Text style={styles.explanationItem}>• Foi educado</Text>
            <Text style={styles.explanationItem}>• Pagamento pontual</Text>
            <Text style={styles.explanationItem}>• Comunicação clara</Text>
            
            <Text style={styles.aspectosTitle}>Negativos:</Text>
            <Text style={styles.explanationItem}>• Pagamento atrasado</Text>
            <Text style={styles.explanationItem}>• Comunicação ruim</Text>
            <Text style={styles.explanationItem}>• Cancelou sem motivo</Text>
            <Text style={styles.explanationItem}>• Desrespeitou horário</Text>
          </View>
        </View>
      </View>

      {/* Modal de Avaliação */}
      <Modal
        visible={showAvaliacao}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <AvaliacaoUsuario
            id_usuario={idUsuarioTeste}
            id_servico={idServicoTeste}
            onAvaliacaoConcluida={handleAvaliacaoConcluida}
            onCancelar={() => setShowAvaliacao(false)}
          />
        </View>
      </Modal>

      {/* Modal de Preview */}
      <PreviewRankingUsuario
        id_usuario={idUsuarioTeste}
        visible={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 20,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4000',
    textAlign: 'center',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoIcon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4000',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rankingSection: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4000',
    textAlign: 'center',
    marginBottom: 15,
  },
  rankingContainer: {
    minHeight: 400,
  },
  explanationSection: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  explanationGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  explanationColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  explanationSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 10,
  },
  explanationItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  aspectosTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginTop: 10,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
}); 