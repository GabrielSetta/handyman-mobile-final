import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RankingService } from '../../services/RankingService';
import { ConfiguracaoAspectos, AspectoPositivo, AspectoNegativo } from '../../types/rankingType';

interface AvaliacaoUsuarioProps {
  id_usuario: string;
  id_servico: string;
  onAvaliacaoConcluida: () => void;
  onCancelar: () => void;
}

export const AvaliacaoUsuario: React.FC<AvaliacaoUsuarioProps> = ({
  id_usuario,
  id_servico,
  onAvaliacaoConcluida,
  onCancelar,
}) => {
  const [aspectosPositivos, setAspectosPositivos] = useState<string[]>([]);
  const [aspectosNegativos, setAspectosNegativos] = useState<string[]>([]);
  const [comentario, setComentario] = useState('');
  const [configuracao, setConfiguracao] = useState<ConfiguracaoAspectos | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarConfiguracao();
  }, []);

  const carregarConfiguracao = async () => {
    try {
      const data = await RankingService.getConfiguracaoAspectos();
      setConfiguracao(data);
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
      Alert.alert('Erro', 'Erro ao carregar configuração de aspectos');
    }
  };

  const toggleAspectoPositivo = (aspecto: string) => {
    setAspectosPositivos(prev =>
      prev.includes(aspecto)
        ? prev.filter(a => a !== aspecto)
        : [...prev, aspecto]
    );
  };

  const toggleAspectoNegativo = (aspecto: string) => {
    setAspectosNegativos(prev =>
      prev.includes(aspecto)
        ? prev.filter(a => a !== aspecto)
        : [...prev, aspecto]
    );
  };

  const handleSubmit = async () => {
    if (aspectosPositivos.length === 0 && aspectosNegativos.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um aspecto para avaliar');
      return;
    }

    setLoading(true);

    try {
      await RankingService.avaliarUsuario({
        id_usuario,
        id_servico,
        aspectos_positivos: aspectosPositivos,
        aspectos_negativos: aspectosNegativos,
        comentario: comentario.trim() || undefined,
      });

      Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
      onAvaliacaoConcluida();
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      Alert.alert('Erro', 'Erro ao enviar avaliação');
    } finally {
      setLoading(false);
    }
  };

  if (!configuracao) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A75C00" />
        <Text style={styles.loadingText}>Carregando configuração...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Avaliar Cliente</Text>

      {/* Aspectos Positivos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Aspectos Positivos</Text>
        <View style={styles.aspectosGrid}>
          {configuracao.positivos.map((aspecto) => (
            <TouchableOpacity
              key={aspecto.valor}
              style={[
                styles.aspectoItem,
                aspectosPositivos.includes(aspecto.valor) && styles.aspectoSelecionado,
              ]}
              onPress={() => toggleAspectoPositivo(aspecto.valor)}
            >
              <Text
                style={[
                  styles.aspectoText,
                  aspectosPositivos.includes(aspecto.valor) && styles.aspectoTextSelecionado,
                ]}
              >
                {aspecto.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Aspectos Negativos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❌ Aspectos Negativos</Text>
        <View style={styles.aspectosGrid}>
          {configuracao.negativos.map((aspecto) => (
            <TouchableOpacity
              key={aspecto.valor}
              style={[
                styles.aspectoItem,
                aspectosNegativos.includes(aspecto.valor) && styles.aspectoNegativoSelecionado,
              ]}
              onPress={() => toggleAspectoNegativo(aspecto.valor)}
            >
              <Text
                style={[
                  styles.aspectoText,
                  aspectosNegativos.includes(aspecto.valor) && styles.aspectoTextSelecionado,
                ]}
              >
                {aspecto.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Comentário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comentário (opcional)</Text>
        <TextInput
          style={styles.comentarioInput}
          value={comentario}
          onChangeText={setComentario}
          placeholder="Adicione um comentário sobre sua experiência com este cliente..."
          multiline
          numberOfLines={4}
          maxLength={500}
        />
        <Text style={styles.contadorCaracteres}>
          {comentario.length}/500 caracteres
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancelar}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (aspectosPositivos.length === 0 && aspectosNegativos.length === 0) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={loading || (aspectosPositivos.length === 0 && aspectosNegativos.length === 0)}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
          )}
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4000',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  aspectosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  aspectoItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  aspectoSelecionado: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  aspectoNegativoSelecionado: {
    backgroundColor: '#f44336',
    borderColor: '#f44336',
  },
  aspectoText: {
    fontSize: 14,
    color: '#333',
  },
  aspectoTextSelecionado: {
    color: 'white',
    fontWeight: '600',
  },
  comentarioInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  contadorCaracteres: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#A75C00',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
}); 