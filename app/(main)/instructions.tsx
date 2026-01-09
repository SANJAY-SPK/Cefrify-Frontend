import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'

const instructions = () => {

  
  const handleTakeTest = () => {
    router.push('/(tests)/round1')
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'top', 'right']}>
      <Header variant="default" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Discover your English proficiency level with our comprehensive CEFR assessment
          </Text>
          
          <View style={styles.levelsPreview}>
            <Text style={styles.levelsTitle}>CEFR Levels</Text>
            <View style={styles.levelsGrid}>
              <View style={[styles.levelBadge, { backgroundColor: "#e8f5e8" }]}>
                <Text style={[styles.levelText, { color: "#2d5a2d" }]}>
                  A1-A2
                </Text> 
                <Text style={styles.levelLabel}>Basic</Text>
              </View>
              <View style={[styles.levelBadge, { backgroundColor: "#fff3cd" }]}>
                <Text style={[styles.levelText, { color: "#856404" }]}>
                  B1-B2
                </Text>
                <Text style={styles.levelLabel}>Independent</Text>
              </View>
              <View style={[styles.levelBadge, { backgroundColor: "#d1ecf1" }]}>
                <Text style={[styles.levelText, { color: "#0c5460" }]}>
                  C1-C2
                </Text>
                <Text style={styles.levelLabel}>Proficient</Text>
              </View>
            </View>
          </View>

          <View style={styles.instructionsSection}>
            <Text style={styles.sectionTitle}>How it works:</Text>
            <View style={styles.instructionsList}>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>1</Text>
                </View>
                <Text style={styles.instructionText}>
                  Answer questions across grammar, vocabulary, reading, and listening
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>2</Text>
                </View>
                <Text style={styles.instructionText}>
                  Test adapts to your responses for accurate assessment
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>3</Text>
                </View>
                <Text style={styles.instructionText}>
                  Receive your CEFR level with detailed feedback
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.testInfo}>
            <Text style={styles.testInfoText}>
              ⏱️ Estimated time: 20-30 minutes
            </Text>
            <Text style={styles.testInfoText}>
              📊 Questions: Approximately 40-60
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.testButton} 
          onPress={handleTakeTest}
          activeOpacity={0.8}
        >
          <Text style={styles.testButtonText}>Take the Test</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default instructions

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },
  levelsPreview: {
    marginBottom: 32,
  },
  levelsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#374151',
  },
  levelsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelBadge: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  levelLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  instructionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151',
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 22,
  },
  testInfo: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  testInfoText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  testButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  testButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
})