import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../context/ThemeContext";
import { useJobStore } from "../../store/UseJobStore";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { jobs, toggleJobCompleted } = useJobStore();
  const { colors } = useAppTheme();

  const job = jobs.find((j) => j.id.toString() === id);

  if (!job)
    return (
      <Text style={[styles.text, { margin: 20, color: colors.text }]}>
        Job tidak ditemukan
      </Text>
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
      <Text style={[styles.text, { color: colors.text }]}>
        Client: {job.client}
      </Text>
      <Text style={[styles.text, { color: colors.text }]}>
        Payment: ${job.payment}
      </Text>
      {job.description && (
        <Text style={[styles.text, { color: colors.text }]}>
          Description: {job.description}
        </Text>
      )}
      {job.date && (
        <Text style={[styles.text, { color: colors.text }]}>
          Date: {job.date}
        </Text>
      )}
      {job.Location && (
        <Text style={[styles.text, { color: colors.text }]}>
          Location: {job.Location}
        </Text>
      )}

      <View style={styles.completedRow}>
        <Text style={[styles.text, { color: colors.text }]}>Completed: </Text>
        <Switch
          value={job.completed || false}
          onValueChange={() => toggleJobCompleted(job.id)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={job.completed ? colors.primary : colors.text}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => router.back()}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Kembali
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    marginTop: 40,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
