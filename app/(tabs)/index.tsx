import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

const app = () => {
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
              style={styles.startButton}
              onPress={() => {
                router.push('/instructions');
              }}
            >
              <Ionicons name="play-circle" size={24} color="#fff" />
              <Text style={styles.startButtonText}>Start Assessment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => {
                // Navigate to info screen
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
    backgroundColor: '#e0f2fe', // Fixed invalid color
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#b3e5fc', // Fixed invalid color
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#0277bd', // Fixed invalid color
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
    color: '#0288d1', // Fixed invalid color
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#0288d1', // Fixed invalid color
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