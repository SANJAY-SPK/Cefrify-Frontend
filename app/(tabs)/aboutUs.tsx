import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert 
} from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Here you would typically send the data to your backend
    Alert.alert('Success', 'Your message has been sent! We\'ll get back to you soon.', [
      {
        text: 'OK',
        onPress: () => {
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'top', 'right']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.headerContainer}>
            <Ionicons name="information-circle" size={32} color="#4A90E2" />
            <Text style={styles.mainTitle}>About CEFRify</Text>
          </View>
          
          <Text style={styles.description}>
            CEFRify is a comprehensive platform designed to help users assess and improve their language proficiency levels based on the Common European Framework of Reference for Languages (CEFR).
          </Text>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>What We Offer</Text>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
              <Text style={styles.featureText}>Accurate CEFR level assessment</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
              <Text style={styles.featureText}>Comprehensive skill evaluation</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
              <Text style={styles.featureText}>Detailed progress tracking</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
              <Text style={styles.featureText}>Personalized learning recommendations</Text>
            </View>
          </View>

          <View style={styles.cefrInfo}>
            <Text style={styles.cefrTitle}>CEFR Levels</Text>
            <Text style={styles.cefrDescription}>
              The Common European Framework of Reference for Languages (CEFR) is an international standard for describing language ability. It describes language ability on a six-point scale, from A1 for beginners, up to C2 for those who have mastered a language.
            </Text>
            
            <View style={styles.levelsContainer}>
              <View style={styles.levelRow}>
                <View style={[styles.levelBadge, { backgroundColor: '#FF6B6B' }]}>
                  <Text style={styles.levelBadgeText}>A1</Text>
                </View>
                <Text style={styles.levelLabel}>Beginner</Text>
              </View>
              
              <View style={styles.levelRow}>
                <View style={[styles.levelBadge, { backgroundColor: '#FFA726' }]}>
                  <Text style={styles.levelBadgeText}>A2</Text>
                </View>
                <Text style={styles.levelLabel}>Elementary</Text>
              </View>
              
              <View style={styles.levelRow}>
                <View style={[styles.levelBadge, { backgroundColor: '#FFCC02' }]}>
                  <Text style={styles.levelBadgeText}>B1</Text>
                </View>
                <Text style={styles.levelLabel}>Intermediate</Text>
              </View>
              
              <View style={styles.levelRow}>
                <View style={[styles.levelBadge, { backgroundColor: '#66BB6A' }]}>
                  <Text style={styles.levelBadgeText}>B2</Text>
                </View>
                <Text style={styles.levelLabel}>Upper Intermediate</Text>
              </View>
              
              <View style={styles.levelRow}>
                <View style={[styles.levelBadge, { backgroundColor: '#42A5F5' }]}>
                  <Text style={styles.levelBadgeText}>C1</Text>
                </View>
                <Text style={styles.levelLabel}>Advanced</Text>
              </View>
              
              <View style={styles.levelRow}>
                <View style={[styles.levelBadge, { backgroundColor: '#AB47BC' }]}>
                  <Text style={styles.levelBadgeText}>C2</Text>
                </View>
                <Text style={styles.levelLabel}>Proficient</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Form Section */}
        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <Ionicons name="mail" size={28} color="#4A90E2" />
            <Text style={styles.contactTitle}>Have Questions?</Text>
          </View>
          <Text style={styles.contactSubtitle}>
            Send us your queries and we'll get back to you as soon as possible.
          </Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the subject (optional)"
                value={formData.subject}
                onChangeText={(value) => handleInputChange('subject', value)}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Type your message here..."
                value={formData.message}
                onChangeText={(value) => handleInputChange('message', value)}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Ionicons name="send" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoTitle}>Get in Touch</Text>
          <View style={styles.contactInfoItem}>
            <Ionicons name="mail-outline" size={20} color="#4A90E2" />
            <Text style={styles.contactInfoText}>support@cefrify.com</Text>
          </View>
          <View style={styles.contactInfoItem}>
            <Ionicons name="globe-outline" size={20} color="#4A90E2" />
            <Text style={styles.contactInfoText}>www.cefrify.com</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutUs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  aboutSection: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  cefrInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cefrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  cefrDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 20,
  },
  levelsContainer: {
    gap: 12,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    minWidth: 5,
    alignItems: 'center',
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  contactSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
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
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  contactInfoText: {
    fontSize: 14,
    color: '#4A90E2',
    flex: 1,
  },
});