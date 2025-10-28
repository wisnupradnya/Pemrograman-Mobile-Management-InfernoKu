import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useJobStore } from "../../store/UseJobStore";

export default function Finance() {
  const { jobs } = useJobStore();
  const { colors, toggleTheme, isDark } = useAppTheme();

  // Hitung total uang
  const total = jobs.reduce((sum, job) => sum + Number(job.payment || 0), 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        💰 Total Pendapatan
      </Text>
      <Text style={[styles.total, { color: colors.text }]}>
        Rp {total.toLocaleString("id-ID")}
      </Text>

      <Text style={[styles.subtitle, { color: colors.text }]}>
        📋 Daftar Job
      </Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobItem}>
            <Text style={[styles.jobTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.jobPayment, { color: colors.text }]}>
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
