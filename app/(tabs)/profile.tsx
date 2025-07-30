import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

const Profile = () => {
  // Mock user data - replace with actual data from AsyncStorage or navigation params
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null,
  });

  // Mock test results - replace with actual test data
  const [testResults, setTestResults] = useState([
    {
      id: 1,
      date: '2024-07-28',
      overallLevel: 'C1',
      overallScore: 89,
      sections: {
        textRepetition: { score: 92, level: 'C1' },
        audioComprehension: { score: 87, level: 'B2' },
        freeSpeech: { score: 88, level: 'C1' }
      },
      duration: '14:32'
    },
    {
      id: 2,
      date: '2024-07-20',
      overallLevel: 'B2',
      overallScore: 78,
      sections: {
        textRepetition: { score: 82, level: 'B2' },
        audioComprehension: { score: 75, level: 'B2' },
        freeSpeech: { score: 77, level: 'B2' }
      },
      duration: '15:45'
    }
  ]);

  const getCEFRColor = (level) => {
    const colors = {
      'A1': '#FF6B6B',
      'A2': '#FFA726',
      'B1': '#FFCC02',
      'B2': '#66BB6A',
      'C1': '#42A5F5',
      'C2': '#AB47BC'
    };
    return colors[level] || '#9E9E9E';
  };

  const getCEFRDescription = (level) => {
    const descriptions = {
      'A1': 'Beginner',
      'A2': 'Elementary',
      'B1': 'Intermediate',
      'B2': 'Upper Intermediate',
      'C1': 'Advanced',
      'C2': 'Proficient'
    };
    return descriptions[level] || 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderTestCard = (result) => (
    <View key={result.id} style={styles.testCard}>
      <View style={styles.testHeader}>
        <View style={styles.testDateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#64748b" />
          <Text style={styles.testDate}>{formatDate(result.date)}</Text>
        </View>
        <View style={styles.durationContainer}>
          <Ionicons name="time-outline" size={16} color="#64748b" />
          <Text style={styles.duration}>{result.duration}</Text>
        </View>
      </View>

      <View style={styles.overallResult}>
        <View 
          style={[
            styles.levelBadge, 
            { backgroundColor: getCEFRColor(result.overallLevel) }
          ]}
        >
          <Text style={styles.levelText}>{result.overallLevel}</Text>
        </View>
        <View style={styles.overallInfo}>
          <Text style={styles.overallScore}>{result.overallScore}%</Text>
          <Text style={styles.levelDescription}>
            {getCEFRDescription(result.overallLevel)}
          </Text>
        </View>
      </View>

      <View style={styles.sectionsContainer}>
        <Text style={styles.sectionsTitle}>Section Breakdown</Text>
        
        <View style={styles.sectionRow}>
          <View style={styles.sectionInfo}>
            <Ionicons name="document-text-outline" size={18} color="#4A90E2" />
            <Text style={styles.sectionName}>Text Repetition</Text>
          </View>
          <View style={styles.sectionResult}>
            <Text style={styles.sectionScore}>{result.sections.textRepetition.score}%</Text>
            <View 
              style={[
                styles.sectionBadge, 
                { backgroundColor: getCEFRColor(result.sections.textRepetition.level) }
              ]}
            >
              <Text style={styles.sectionLevel}>{result.sections.textRepetition.level}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.sectionInfo}>
            <Ionicons name="headset-outline" size={18} color="#4A90E2" />
            <Text style={styles.sectionName}>Audio Comprehension</Text>
          </View>
          <View style={styles.sectionResult}>
            <Text style={styles.sectionScore}>{result.sections.audioComprehension.score}%</Text>
            <View 
              style={[
                styles.sectionBadge, 
                { backgroundColor: getCEFRColor(result.sections.audioComprehension.level) }
              ]}
            >
              <Text style={styles.sectionLevel}>{result.sections.audioComprehension.level}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.sectionInfo}>
            <Ionicons name="mic-outline" size={18} color="#4A90E2" />
            <Text style={styles.sectionName}>Free Speech</Text>
          </View>
          <View style={styles.sectionResult}>
            <Text style={styles.sectionScore}>{result.sections.freeSpeech.score}%</Text>
            <View 
              style={[
                styles.sectionBadge, 
                { backgroundColor: getCEFRColor(result.sections.freeSpeech.level) }
              ]}
            >
              <Text style={styles.sectionLevel}>{result.sections.freeSpeech.level}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'top', 'right']}>
      <Header/>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.userInfoSection}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
            </View>
          </View>
        </View>

        {/* Statistics Overview */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{testResults.length}</Text>
              <Text style={styles.statLabel}>Tests Taken</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {testResults.length > 0 ? testResults[0].overallLevel : '-'}
              </Text>
              <Text style={styles.statLabel}>Current Level</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {testResults.length > 0 ? `${testResults[0].overallScore}%` : '-'}
              </Text>
              <Text style={styles.statLabel}>Latest Score</Text>
            </View>
          </View>
        </View>

        {/* Test Results */}
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>Test Results</Text>
            <Ionicons name="trophy-outline" size={24} color="#4A90E2" />
          </View>
          
          {testResults.length > 0 ? (
            testResults.map(renderTestCard)
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="document-outline" size={48} color="#9ca3af" />
              <Text style={styles.noResultsText}>No test results yet</Text>
              <Text style={styles.noResultsSubtext}>
                Take your first assessment to see results here
              </Text>
            </View>
          )}
        </View>

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.newTestButton}>
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.newTestButtonText}>Take New Assessment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  userInfoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  testCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  testDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  testDate: {
    fontSize: 14,
    color: '#64748b',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  duration: {
    fontSize: 14,
    color: '#64748b',
  },
  overallResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 16,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  overallInfo: {
    flex: 1,
  },
  overallScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  levelDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  sectionsContainer: {
    gap: 12,
  },
  sectionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  sectionName: {
    fontSize: 14,
    color: '#374151',
  },
  sectionResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  sectionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionLevel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  noResultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  actionContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  newTestButton: {
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
    gap: 8,
  },
  newTestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});