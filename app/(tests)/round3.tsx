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
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // softer neutral background
  },

  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },

  /* ---------- Titles ---------- */

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0F172A',
    letterSpacing: 0.4,
  },

  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 24,
  },

  /* ---------- Topic Card ---------- */

  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    marginBottom: 32,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,

    borderLeftWidth: 6,
    borderLeftColor: '#22C55E',
  },

  emoji: {
    fontSize: 42,
    marginBottom: 12,
  },

  topicLabel: {
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 1.2,
  },

  topic: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 30,
  },

  /* ---------- Main ---------- */

  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Tips ---------- */

  tipsBox: {
    backgroundColor: '#F0FDF4',
    padding: 22,
    borderRadius: 14,
    width: '100%',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  tipsHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 10,
  },

  tipsText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#14532D',
  },

  /* ---------- Start Button ---------- */

  startBtn: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 44,
    paddingVertical: 18,
    borderRadius: 999,
    shadowColor: '#22C55E',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  startBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  /* ---------- Recording State ---------- */

  recordingBox: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',

    borderLeftWidth: 6,
    borderLeftColor: '#EF4444',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 18,
  },

  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },

  recordingText: {
    color: '#991B1B',
    fontWeight: '700',
    fontSize: 14,
  },

  timer: {
    fontSize: 44,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1,
    marginBottom: 6,
  },

  timerMsg: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 22,
  },

  tipNote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#92400E',
    textAlign: 'center',
    marginBottom: 26,
  },

  /* ---------- Stop Button ---------- */

  stopBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 999,
    shadowColor: '#EF4444',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  stopBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  /* ---------- Progress ---------- */

  progressBar: {
    alignItems: 'center',
    marginTop: 10,
  },

  progressText: {
    color: '#64748B',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },

  dots: {
    flexDirection: 'row',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: '#CBD5E1',
  },

  complete: {
    backgroundColor: '#22C55E',
  },

  active: {
    backgroundColor: '#3B82F6',
  },
});
