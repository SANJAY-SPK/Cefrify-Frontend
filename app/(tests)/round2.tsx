import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

// ✅ Use require for local bundled audio files
const audioFiles = [
  require('@/assets/audios/a1.mp3'),
  require('@/assets/audios/a2.mp3'),
];

export default function Round2() {
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const router = useRouter();

  // Function to play the audio and then start recording
  const playAudio = async () => {
    try {
      setIsPlaying(true);
      
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        audioFiles[index],
        { shouldPlay: true }
      );

      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setHasPlayedAudio(true);
          await startRecording();
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  // Start microphone recording after audio ends
  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert('Microphone permission is required');
        return;
      }

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await rec.startAsync();
      setRecording(rec);
      console.log('Recording started...');
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log(`Recording saved at: ${uri}`);
      setRecording(null);
      setHasPlayedAudio(false);

      if (index < audioFiles.length - 1) {
        setIndex(index + 1);
      } else {
        router.push('/(tests)/round3'); // Navigate to Round 3
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((index + 1) / audioFiles.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Question {index + 1} of {audioFiles.length}
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.instructionText}>Listen and Repeat</Text>

          {/* Audio Player Section */}
          <View style={styles.audioSection}>
            <View style={styles.audioPlayerCard}>
              <View style={styles.audioIcon}>
                <Text style={styles.audioIconText}>🎵</Text>
              </View>
              <Text style={styles.audioDescription}>
                Tap to play the sentence, then repeat what you hear
              </Text>
              
              <TouchableOpacity
                style={[
                  styles.playButton,
                  (isPlaying || !!recording) && styles.playButtonDisabled
                ]}
                onPress={playAudio}
                disabled={!!(isPlaying || recording)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.playButtonText,
                  (isPlaying || !!recording) && styles.playButtonTextDisabled
                ]}>
                  {isPlaying ? "🔊 Playing..." : "Play Sentence"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recording Section */}
          {hasPlayedAudio && !recording && (
            <View style={styles.waitingSection}>
              <Text style={styles.waitingText}>
                Recording will start automatically after audio ends...
              </Text>
            </View>
          )}

          {recording && (
            <View style={styles.recordingSection}>
              <View style={styles.recordingCard}>
                <View style={styles.recordingIndicator}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>Now Recording</Text>
                </View>
                
                <Text style={styles.recordingInstruction}>
                  Repeat the sentence you just heard
                </Text>

                <TouchableOpacity
                  style={styles.stopButton}
                  onPress={stopRecording}
                  activeOpacity={0.8}
                >
                  <Text style={styles.stopButtonText}>🛑 Stop Recording</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Status Messages */}
          {isPlaying && (
            <View style={styles.statusMessage}>
              <Text style={styles.statusText}>🎧 Listen carefully...</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 40,
    textAlign: 'center',
  },
  audioSection: {
    width: '100%',
    marginBottom: 30,
  },
  audioPlayerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#17a2b8',
  },
  audioIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  audioIconText: {
    fontSize: 36,
  },
  audioDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  playButton: {
    backgroundColor: '#17a2b8',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  playButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  playButtonTextDisabled: {
    color: '#ffffff',
  },
  waitingSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  waitingText: {
    fontSize: 16,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '500',
  },
  recordingSection: {
    width: '100%',
  },
  recordingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8d7da',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#f1aeb5',
  },
  recordingDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#dc3545',
    marginRight: 10,
  },
  recordingText: {
    fontSize: 16,
    color: '#721c24',
    fontWeight: '600',
  },
  recordingInstruction: {
    fontSize: 18,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  stopButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  stopButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  statusMessage: {
    backgroundColor: '#d1ecf1',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bee5eb',
  },
  statusText: {
    fontSize: 16,
    color: '#0c5460',
    textAlign: 'center',
    fontWeight: '500',
  },
});