import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppTheme } from "../../context/ThemeContext";
import { useJobStore } from "../../store/UseJobStore";

export default function SearchScreen() {
  const { jobs } = useJobStore();
  const { colors } = useAppTheme(); // ✅ ambil warna dari context
  const [query, setQuery] = useState("");

  // Filter job berdasarkan query
  const filtered = jobs.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.searchBox,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}
      >
        <Ionicons name="search" size={20} color={colors.primary} />
        <TextInput
          placeholder="Cari List Job..."
          placeholderTextColor={colors.placeholder}
          style={[styles.input, { color: colors.text }]}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.text }]}>
            {query ? "Job Tidak Ditemukan" : "Ketik untuk mencari List Job."}
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.primary }]}>
                {item.title}
              </Text>
              <Text style={[styles.info, { color: colors.text }]}>
                Client: {item.client}
              </Text>
              <Text style={[styles.info, { color: colors.text }]}>
                Location: {item.Location}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  info: {
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
