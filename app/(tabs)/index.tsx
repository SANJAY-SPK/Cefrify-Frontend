import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

const app = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAndStartTest = () => {
    // Validate required fields
    if (!userInfo.name.trim()) {
      Alert.alert('Required Field', 'Please enter your name to continue');
      return;
    }

    if (!userInfo.email.trim()) {
      Alert.alert('Required Field', 'Please enter your email address to continue');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Store user info (you can save to AsyncStorage or pass as navigation params)
    // For now, we'll just navigate to instructions
    router.push({
      pathname: '/instructions',
      params: {
        userName: userInfo.name,
        userEmail: userInfo.email
      }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'top', 'right']}>
      <Header/>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.welcomeTitle}>Welcome to CEFRify</Text>
            <Text style={styles.description}>
              Discover your language proficiency level with our comprehensive CEFR assessment
            </Text>
          </View>

          {/* User Information Form */}
          <View style={styles.userInfoCard}>
            <Text style={styles.userInfoTitle}>Your Information</Text>
            <Text style={styles.userInfoSubtitle}>
              Please provide your details to personalize your assessment experience
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={userInfo.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                value={userInfo.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Assessment Structure</Text>
            <View style={styles.infoItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Text Repetition</Text>
                <Text style={styles.infoText}>Read and repeat given texts</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Audio Comprehension</Text>
                <Text style={styles.infoText}>Listen and respond to audio clips</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Free Speech</Text>
                <Text style={styles.infoText}>Express yourself on given topics</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Test Statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>~15</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Rounds</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>Instant</Text>
                <Text style={styles.statLabel}>Results</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.startButton,
                (!userInfo.name.trim() || !userInfo.email.trim()) && styles.startButtonDisabled
              ]}
              onPress={validateAndStartTest}
            >
              <Ionicons name="play-circle" size={24} color="#fff" />
              <Text style={styles.startButtonText}>Start Assessment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => {
                router.push('/aboutUs');
              }}
            >
              <Text style={styles.learnMoreText}>Learn about CEFR</Text>
              <Ionicons name="information-circle-outline" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Added extra bottom padding for tab bar
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e293b',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  userInfoCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  userInfoSubtitle: {
    fontSize: 14,
    color: '#0369a1',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
    backgroundColor: '#fff',
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  statsCard: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#b3e5fc',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#0277bd',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#0288d1',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    gap: 12,
  },
  startButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0.1,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  learnMoreButton: {
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnMoreText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});