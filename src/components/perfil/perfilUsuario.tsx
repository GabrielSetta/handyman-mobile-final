import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useGetToken } from '../../hooks/useGetToken';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { User } from '../../model/User';
import { UserService } from '../../services/UserService';
import { useAuth } from '../../context/AuthContext';
import { VisualizacaoRanking } from '../ranking/VisualizacaoRanking';

const { height } = Dimensions.get('window');

const PerfilUsuario = () => {
  const navigation = useNavigation();
  const token = useGetToken();
  const { logout } = useAuth();

  const userId = token?.id;
  
  const [usuario, setUsuario] = useState<User | undefined>(undefined);
  const [isPrestador, setIsPrestador] = useState<boolean>(false);
  const [showRanking, setShowRanking] = useState<boolean>(false);
  //const [nome, setNome] = useState<string>('');
  //const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [areaAtuacao, setAreaAtuacao] = useState<string>('');
  const [descricaoServicos, setDescricaoServicos] = useState<string>('');

  const handleLogout = async () => {
    try {
      await logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout.');
    }
  };

  const handleGetUsuario = async () => {
    try {
      if (!userId) {
        console.log('Aguardando token...');
        return;
      }
      const usuario = await UserService.getUsers(userId);
      setUsuario(usuario);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    }
  };

  useEffect(() => {
    if (userId) {
      handleGetUsuario();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      if (!userId) {
        Alert.alert('Erro', 'Usuário não identificado');
        return;
      }

      if (!usuario) {
        Alert.alert('Erro', 'Dados do usuário não encontrados');
        return;
      }

      //await UserService.updateUser(usuario, userId);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
        </View>

        <View style={styles.profileInfo}>
          <Image 
            source={usuario?.picture ? { uri: usuario.picture } : require('../../assets/handman.jpg')} 
            style={styles.avatar}
            onError={(e) => {
              console.log('Erro ao carregar imagem:', e.nativeEvent.error);
            }}
            defaultSource={require('../../assets/handman.jpg')}
          />
          <Text style={styles.name}>{usuario?.nome}</Text>
          <Text style={styles.email}>{usuario?.email}</Text>

          <View style={styles.prestadorSwitch}>
            <Text>Prestador de Serviço?</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPrestador ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsPrestador(!isPrestador)}
              value={isPrestador}
            />
          </View>
        </View>

        {isPrestador ? (
          <View style={styles.prestadorDetails}>
            <Text style={styles.sectionTitle}>Detalhes do Prestador</Text>
            <TextInput
              style={styles.input}
              placeholder="Área de Atuação"
              value={areaAtuacao}
              onChangeText={setAreaAtuacao}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição dos Serviços"
              multiline
              value={descricaoServicos}
              onChangeText={setDescricaoServicos}
            />
          </View>
        ) : (
          <View style={styles.clienteDetails}>
            <Text style={styles.sectionTitle}>Detalhes do Cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>
        )}

        {/* Seção de Ranking */}
        <View style={styles.rankingSection}>
          <Text style={styles.sectionTitle}>Meu Ranking</Text>
          <TouchableOpacity
            style={styles.rankingButton}
            onPress={() => setShowRanking(!showRanking)}
          >
            <Text style={styles.rankingButtonText}>
              {showRanking ? 'Ocultar Ranking' : 'Ver Meu Ranking'}
            </Text>
          </TouchableOpacity>
          
          {showRanking && (
            <View style={styles.rankingContainer}>
              <VisualizacaoRanking id_usuario={userId || ''} />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PerfilUsuario;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: height,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  prestadorSwitch: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  rankingSection: {
    marginTop: 20,
  },
  rankingButton: {
    backgroundColor: '#A75C00',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  rankingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rankingContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    minHeight: 300,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  prestadorDetails: {
    marginTop: 10,
  },
  clienteDetails: {
    marginTop: 10,
  },
});
