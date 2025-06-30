import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ArrowRight } from 'lucide-react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/TabNavigation';


const { width, height } = Dimensions.get('window');
declare function require(path: string): any;

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  /*useEffect(() => {
    runMigrations().catch((err) => {
      console.error('Erro ao rodar migrations:', err);
    });
  }, []);*/

  const handleDiscoverPress = () => {
    navigation.navigate('Serviços');
  };



  const renderScreen = () => {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>HANDYMAN</Text>
          <Text style={styles.headerTitle}>Não faça você mesmo,{'\n'}encontre um profissional!</Text>
          <Text style={styles.headerSubtitle}>A sua plataforma confiável para serviços manuais!</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.discoverButton} onPress={handleDiscoverPress}>
              <Text style={styles.discoverButtonText}>Descubra</Text>
              <ArrowRight color="#B54708" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Nossa Essência Section */}
        <View style={styles.essenciaSection}>
          <Text style={styles.sectionTitle}>Nossa Essência</Text>
          <Text style={styles.essenciaText}>
            A Handyman nasceu com a missão de conectar você a profissionais qualificados para serviços manuais de forma simples e segura. Seja para consertos, instalações, montagens ou pequenos reparos, estamos aqui para facilitar o seu dia a dia com soluções eficientes e confiáveis.
          </Text>
        </View>

        {/* Descubra Profissionais Section */}
        <View style={styles.profissionaisSection}>
          <Text style={styles.profissionaisTitle}>Descubra Profissionais</Text>
          <Image 
            source={require('../assets/worker.jpg')} 
            style={styles.profissionalImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.rootContainer}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF7F1',
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B54708',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    lineHeight: 38,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  discoverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B54708',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
  },
  discoverButtonText: {
    color: '#B54708',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  essenciaSection: {
    padding: 24,
    backgroundColor: '#FFE5D1',
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B54708',
    marginBottom: 16,
  },
  essenciaText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    textAlign: 'justify',
  },
  profissionaisSection: {
    padding: 24,
    marginTop: 32,
  },
  profissionaisTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B54708',
    marginBottom: 16,
  },
  profissionalImage: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 8,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: height * 0.02,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: width * 0.05,
    marginBottom: height * 0.03,
  },
  mainText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: width * 0.03,
    backgroundColor: 'white',
    marginBottom: height * 0.02,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  serviceItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: height * 0.02,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;

