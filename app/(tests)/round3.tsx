import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

const topics = [
  "Describe your favorite holiday.",
  "Talk about a challenge you overcame.",
  "Explain your daily routine.",
  "Talk about your future goals.",
  "Describe your hometown.",
];

export default function Round3() {
  const router = useRouter();
  const [topic] = useState(topics[Math.floor(Math.random() * topics.length)]);
  const [recording, setRecording] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (recording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => interval && clearInterval(interval);
  }, [recording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return alert('Microphone permission is required');

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await rec.startAsync();
      setRecording(rec);
    } catch (err) {
      console.error("Recording failed:", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording saved to:", uri);
      setRecording(null);
      router.push('/(tests)/result');
    } catch (err) {
      console.error("Stop failed:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Round 3: Free Speech</Text>
        <Text style={styles.subtitle}>Speak for 2-3 minutes on this topic</Text>

        <View style={styles.topicCard}>
          <Text style={styles.emoji}>💭</Text>
          <Text style={styles.topicLabel}>Your Topic:</Text>
          <Text style={styles.topic}>{topic}</Text>
        </View>

        <View style={styles.mainContent}>
          {!recording ? (
            <>
              <View style={styles.tipsBox}>
                <Text style={styles.tipsHeading}>💡 Tips for Success:</Text>
                <Text style={styles.tipsText}>
                  • Speak clearly and at a natural pace{'\n'}
                  • Share personal stories and examples{'\n'}
                  • Organize with beginning, middle, and end{'\n'}
                  • Don’t worry about being perfect
                </Text>
              </View>
              <TouchableOpacity style={styles.startBtn} onPress={startRecording}>
                <Text style={styles.startBtnText}>🎤 Start Speaking</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.recordingBox}>
              <View style={styles.recordingIndicator}>
                <View style={styles.redDot} />
                <Text style={styles.recordingText}>Recording in Progress</Text>
              </View>
              <Text style={styles.timer}>{formatTime(recordingTime)}</Text>
              <Text style={styles.timerMsg}>
                {recordingTime < 120
                  ? "Keep going..."
                  : recordingTime < 180
                  ? "You can stop anytime now"
                  : "Great! Feel free to wrap up"}
              </Text>

              <Text style={styles.tipNote}>
                🎙️ Speak naturally and stay on topic
              </Text>

              <TouchableOpacity style={styles.stopBtn} onPress={stopRecording}>
                <Text style={styles.stopBtnText}>🛑 Finish Recording</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.progressBar}>
          <Text style={styles.progressText}>Final Round</Text>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.complete]} />
            <View style={[styles.dot, styles.complete]} />
            <View style={[styles.dot, styles.active]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  wrapper: { flex: 1, padding: 20, justifyContent: 'space-between' },

  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 6, color: '#1f2937' },
  subtitle: { textAlign: 'center', color: '#6b7280', fontSize: 15, marginBottom: 20 },

  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderLeftColor: '#10b981',
    borderLeftWidth: 5,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: { fontSize: 40, marginBottom: 10 },
  topicLabel: { textTransform: 'uppercase', color: '#6b7280', fontWeight: '600', fontSize: 14 },
  topic: { fontSize: 20, color: '#1f2937', fontWeight: '600', textAlign: 'center', marginTop: 10 },

  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tipsBox: {
    backgroundColor: '#e0f2fe',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    borderColor: '#bae6fd',
    borderWidth: 1,
  },
  tipsHeading: { fontSize: 17, fontWeight: '600', color: '#0284c7', marginBottom: 10 },
  tipsText: { fontSize: 14, lineHeight: 22, color: '#0369a1' },

  startBtn: {
    backgroundColor: '#10b981',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 50,
    elevation: 4,
  },
  startBtnText: { color: 'white', fontSize: 18, fontWeight: '600' },

  recordingBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#ef4444',
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fee2e2',
    padding: 10,
    borderRadius: 20,
    borderColor: '#fecaca',
    borderWidth: 1,
  },
  redDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ef4444', marginRight: 8 },
  recordingText: { color: '#991b1b', fontWeight: '600' },

  timer: { fontSize: 42, fontWeight: '700', fontFamily: 'monospace', color: '#1f2937' },
  timerMsg: { marginTop: 8, fontSize: 15, color: '#6b7280', textAlign: 'center' },
  tipNote: { fontStyle: 'italic', color: '#92400e', marginTop: 20, marginBottom: 20 },

  stopBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 50,
    elevation: 4,
  },
  stopBtnText: { color: '#fff', fontSize: 17, fontWeight: '600' },

  progressBar: { alignItems: 'center', marginBottom: 10 },
  progressText: { color: '#6b7280', marginBottom: 8, fontSize: 14 },
  dots: { flexDirection: 'row' },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#d1d5db',
  },
  complete: { backgroundColor: '#10b981' },
  active: { backgroundColor: '#3b82f6' },
});
