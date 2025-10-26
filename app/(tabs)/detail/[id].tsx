import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useJobStore } from "../../../store/UseJobStore";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { jobs, toggleJobCompleted } = useJobStore();

  const job = jobs.find((j) => j.id.toString() === id);

  if (!job) return <Text style={{ margin: 20 }}>Job tidak ditemukan</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>Client: {job.client}</Text>
      <Text>Payment: ${job.payment}</Text>
      {job.description && <Text>Description: {job.description}</Text>}
      {job.date && <Text>Date: {job.date}</Text>}
      {job.Location && <Text>Location: {job.Location}</Text>}

      <View style={styles.completedRow}>
        <Text>Completed: </Text>
        <Switch
          value={job.completed || false}
          onValueChange={() => toggleJobCompleted(job.id)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  completedRow: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  button: {
    marginTop: 40,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
