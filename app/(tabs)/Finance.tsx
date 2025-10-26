import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useJobStore } from "../../store/UseJobStore";

export default function Finance() {
  const { jobs } = useJobStore();

  // Hitung total uang
  const total = jobs.reduce((sum, job) => sum + Number(job.payment || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Total Pendapatan</Text>
      <Text style={styles.total}>Rp {total.toLocaleString("id-ID")}</Text>

      <Text style={styles.subtitle}>📋 Daftar Job</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobItem}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobPayment}>
              Rp {Number(item.payment || 0).toLocaleString("id-ID")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  total: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 20,
  },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  jobItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  jobTitle: { fontSize: 16 },
  jobPayment: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
