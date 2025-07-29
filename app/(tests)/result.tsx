import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

export default function Result() {
  const router = useRouter();

  const cefrLevel = "B1";
  const score = 78;
  const roundScores = [
    { round: "Reading & Repetition", score: 82, icon: "📖" },
    { round: "Listen & Repeat", score: 75, icon: "🎧" },
    { round: "Free Speech", score: 77, icon: "💭" }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getCEFRDescription = (level) => {
    const descriptions = {
      'A1': 'Beginner - Can understand and use familiar everyday expressions',
      'A2': 'Elementary - Can communicate in simple and routine tasks',
      'B1': 'Intermediate - Can deal with most situations while traveling',
      'B2': 'Upper Intermediate - Can interact with fluency and spontaneity',
      'C1': 'Advanced - Can use language flexibly and effectively',
      'C2': 'Proficient - Can understand virtually everything heard or read'
    };
    return descriptions[level] || 'Assessment complete';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Celebration Header */}
          <View style={styles.celebrationSection}>
            <Text style={styles.celebrationEmoji}>🎉</Text>
            <Text style={styles.celebrationTitle}>Test Completed!</Text>
            <Text style={styles.celebrationSubtitle}>
              Congratulations on finishing your English proficiency assessment
            </Text>
          </View>

          {/* Overall Score Card */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreLabel}>Overall Score</Text>
            </View>
            
            <View style={styles.scoreDisplay}>
              <Text style={[styles.scoreNumber, { color: getScoreColor(score) }]}>
                {score}%
              </Text>
              <View style={styles.scoreBar}>
                <View 
                  style={[
                    styles.scoreBarFill, 
                    { 
                      width: `${score}%`,
                      backgroundColor: getScoreColor(score)
                    }
                  ]} 
                />
              </View>
            </View>
          </View>

          {/* CEFR Level Card */}
          <View style={styles.cefrCard}>
            <View style={styles.cefrHeader}>
              <Text style={styles.cefrIcon}>🏆</Text>
              <View style={styles.cefrInfo}>
                <Text style={styles.cefrLabel}>CEFR Level</Text>
                <Text style={styles.cefrLevel}>{cefrLevel}</Text>
              </View>
            </View>
            <Text style={styles.cefrDescription}>
              {getCEFRDescription(cefrLevel)}
            </Text>
          </View>

          {/* Round Breakdown */}
          <View style={styles.breakdownSection}>
            <Text style={styles.breakdownTitle}>Round Breakdown</Text>
            
            {roundScores.map((round, index) => (
              <View key={index} style={styles.roundCard}>
                <View style={styles.roundHeader}>
                  <Text style={styles.roundIcon}>{round.icon}</Text>
                  <View style={styles.roundInfo}>
                    <Text style={styles.roundName}>{round.round}</Text>
                    <View style={styles.roundScoreContainer}>
                      <Text style={[styles.roundScore, { color: getScoreColor(round.score) }]}>
                        {round.score}%
                      </Text>
                      <View style={styles.roundScoreBar}>
                        <View 
                          style={[
                            styles.roundScoreBarFill, 
                            { 
                              width: `${round.score}%`,
                              backgroundColor: getScoreColor(round.score)
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Recommendations */}
          <View style={styles.recommendationsCard}>
            <Text style={styles.recommendationsTitle}>💡 Recommendations</Text>
            <View style={styles.recommendationsList}>
              <Text style={styles.recommendationItem}>
                • Continue practicing listening comprehension with English media
              </Text>
              <Text style={styles.recommendationItem}>
                • Focus on expanding vocabulary for everyday conversations
              </Text>
              <Text style={styles.recommendationItem}>
                • Practice speaking regularly to improve fluency and confidence
              </Text>
              <Text style={styles.recommendationItem}>
                • Consider intermediate-level English courses or materials
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.replace('/')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>🏠 Return to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/test')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>🔄 Take Test Again</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Note */}
          <View style={styles.footerNote}>
            <Text style={styles.footerText}>
              Results are based on your performance across all three rounds. 
              Keep practicing to improve your English proficiency!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 30,
  },
  celebrationSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  celebrationEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  celebrationTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  scoreCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreDisplay: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 72,
    fontWeight: '800',
    marginBottom: 16,
  },
  scoreBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  cefrCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  cefrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cefrIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  cefrInfo: {
    flex: 1,
  },
  cefrLabel: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '600',
    marginBottom: 4,
  },
  cefrLevel: {
    fontSize: 28,
    fontWeight: '700',
    color: '#28a745',
  },
  cefrDescription: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  breakdownSection: {
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  roundCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  roundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  roundInfo: {
    flex: 1,
  },
  roundName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  roundScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundScore: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
    minWidth: 50,
  },
  roundScoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  roundScoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  recommendationsCard: {
    backgroundColor: '#e7f3ff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#b3d9ff',
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0056b3',
    marginBottom: 16,
  },
  recommendationsList: {
    paddingLeft: 8,
  },
  recommendationItem: {
    fontSize: 15,
    color: '#004085',
    lineHeight: 22,
    marginBottom: 8,
  },
  actionSection: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerNote: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});