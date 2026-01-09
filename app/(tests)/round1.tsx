import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

const { width } = Dimensions.get("window");

/* ================================
   ALL QUESTIONS
================================ */
const ALL_QUESTIONS = [
  "The quick brown fox jumps over the lazy dog.",
  "Artificial intelligence is transforming the world.",
  "She sells seashells by the seashore.",
  "Technology evolves faster than we can imagine.",
  "Despite the rain, they went hiking.",
  "The sun sets beautifully over the horizon.",
  "The stars twinkle brightly in the night sky.",
  "The moon glows brightly in the dark night.",
  "The wind blows gently through the trees.",
  "The leaves rustle softly in the breeze.",
  "The birds chirp melodiously in the morning.",
  "The bees hum contentedly in the garden.",
  "The butterflies flutter gracefully in the air.",
  "The flowers bloom beautifully in the garden.",
  "The grass sways gently in the breeze.",
  "The trees sway gently in the breeze.",
  "The sky is clear and blue.",
  "The sun is shining brightly.",
  "The moon is shining brightly.",
  "The stars are shining brightly.",
];

/* ================================
   PICK RANDOM 5 (NO DUPLICATES)
================================ */
const getRandomQuestions = (questions: string[], count = 5) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Round1() {
  const router = useRouter();

  // 🎯 Random 5 questions ONCE per test
  const [questions] = useState(() =>
    getRandomQuestions(ALL_QUESTIONS, 5)
  );

  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  /* ================================
     START RECORDING
  ================================ */
  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await rec.startAsync();
      setRecording(rec);
    } catch (error) {
      console.error("Start recording failed:", error);
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
      console.log("Audio saved:", uri);

      setRecording(null);

      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        router.push("/(tests)/round2");
      }
    } catch (error) {
      console.error("Stop recording failed:", error);
    }
  };

  /* ================================
     UI
  ================================ */
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
                { width: `${((index + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Question {index + 1} of {questions.length}
          </Text>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.instructionText}>
            Repeat this sentence:
          </Text>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {questions[index]}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.recordButton,
              recording
                ? styles.recordButtonStop
                : styles.recordButtonStart,
            ]}
            onPress={recording ? stopRecording : startRecording}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.recordButtonInner,
                recording
                  ? styles.recordButtonInnerStop
                  : styles.recordButtonInnerStart,
              ]}
            >
              <Text style={styles.recordButtonText}>
                {recording ? "Stop Recording" : "Start Recording"}
              </Text>
            </View>
          </TouchableOpacity>

          {recording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording...</Text>
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
  content: { flex: 1, paddingHorizontal: 20, paddingVertical: 10 },
  progressContainer: { marginBottom: 30 },
  progressBar: {
    height: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    fontWeight: "500",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 30,
    textAlign: "center",
  },
  questionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 40,
    width: width - 40,
    minHeight: 120,
    justifyContent: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    lineHeight: 28,
    color: "#343a40",
    textAlign: "center",
  },
  recordButton: {
    borderRadius: 50,
    elevation: 5,
  },
  recordButtonStart: {
    backgroundColor: "#28a745",
  },
  recordButtonStop: {
    backgroundColor: "#dc3545",
  },
  recordButtonInner: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    minWidth: 200,
    alignItems: "center",
  },
  recordButtonInnerStart: {
    backgroundColor: "#28a745",
  },
  recordButtonInnerStop: {
    backgroundColor: "#dc3545",
  },
  recordButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff3cd",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffeaa7",
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#dc3545",
    marginRight: 8,
  },
  recordingText: {
    fontSize: 16,
    color: "#856404",
    fontWeight: "500",
  },
});
