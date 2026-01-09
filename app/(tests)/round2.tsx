import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

/* ================================
   ALL 14 AUDIO FILES
================================ */
const ALL_AUDIO_FILES = [
  require("@/assets/audios/a1.mp3"),
  require("@/assets/audios/a2.mp3"),
  require("@/assets/audios/a3.mp3"),
  require("@/assets/audios/a4.mp3"),
  require("@/assets/audios/a5.mp3"),
  require("@/assets/audios/a6.mp3"),
  require("@/assets/audios/a7.mp3"),
  require("@/assets/audios/a8.mp3"),
  require("@/assets/audios/a9.mp3"),
  require("@/assets/audios/a10.mp3"),
  require("@/assets/audios/a11.mp3"),
  require("@/assets/audios/a12.mp3"),
  require("@/assets/audios/a13.mp3"),
  require("@/assets/audios/a14.mp3"),
];

/* ================================
   PICK RANDOM 5 (NO DUPLICATES)
================================ */
const getRandomAudios = (audios: any[], count = 5) => {
  const shuffled = [...audios].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Round2() {
  const router = useRouter();

  // 🎯 Random 5 audios ONCE per test
  const [audioFiles] = useState(() =>
    getRandomAudios(ALL_AUDIO_FILES, 5)
  );

  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);

  /* ================================
     PLAY AUDIO
  ================================ */
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
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          setHasPlayedAudio(true);
          await startRecording();
        }
      });
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  /* ================================
     START RECORDING
  ================================ */
  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert("Microphone permission is required");
        return;
      }

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await rec.startAsync();
      setRecording(rec);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  /* ================================
     STOP RECORDING
  ================================ */
  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording saved at:", uri);

      setRecording(null);
      setHasPlayedAudio(false);

      if (index < audioFiles.length - 1) {
        setIndex(index + 1);
      } else {
        router.push("/(tests)/round3");
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  /* ================================
     UI
  ================================ */
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((index + 1) / audioFiles.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Question {index + 1} of {audioFiles.length}
          </Text>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.instructionText}>Listen and Repeat</Text>

          {/* Audio Card */}
          <View style={styles.audioPlayerCard}>
            <Text style={styles.audioIcon}>🎵</Text>

            <Text style={styles.audioDescription}>
              Tap to play the sentence, then repeat what you hear
            </Text>

            <TouchableOpacity
              style={[
                styles.playButton,
                (isPlaying || recording) && styles.disabled,
              ]}
              onPress={playAudio}
              disabled={!!(isPlaying || recording)}
            >
              <Text style={styles.playButtonText}>
                {isPlaying ? "🔊 Playing..." : "Play Sentence"}
              </Text>
            </TouchableOpacity>
          </View>

          {recording && (
            <View style={styles.recordingCard}>
              <Text style={styles.recordingText}>🔴 Recording</Text>

              <TouchableOpacity
                style={styles.stopButton}
                onPress={stopRecording}
              >
                <Text style={styles.stopButtonText}>Stop Recording</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================================
   STYLES
================================ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  content: { flex: 1, padding: 20 },
  progressContainer: { marginBottom: 30 },
  progressBar: {
    height: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: 4,
  },
  progressText: {
    marginTop: 10,
    textAlign: "center",
    color: "#6c757d",
  },
  mainContent: { flex: 1, alignItems: "center" },
  instructionText: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
  },
  audioPlayerCard: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    elevation: 5,
  },
  audioIcon: { fontSize: 40, marginBottom: 10 },
  audioDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#6c757d",
  },
  playButton: {
    backgroundColor: "#17a2b8",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  playButtonText: { color: "#fff", fontSize: 18 },
  disabled: { backgroundColor: "#adb5bd" },
  recordingCard: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
  },
  recordingText: {
    fontSize: 18,
    color: "#dc3545",
    marginBottom: 20,
  },
  stopButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  stopButtonText: { color: "#fff", fontSize: 18 },
});
