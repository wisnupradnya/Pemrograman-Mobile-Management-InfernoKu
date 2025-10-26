import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddJobForm from "../../components/add";
import { Job, useJobStore } from "../../store/UseJobStore";

export default function JobListScreen() {
  const { jobs, init, toggleJobCompleted, deleteJob } = useJobStore();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    init();
  }, []);

  const openAddModal = () => {
    setSelectedJob(null);
    setModalVisible(true);
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.jobItem}
            onPress={() => router.push(`/detail/${item.id}`)}
          >
            <Switch
              value={item.completed || false}
              onValueChange={() => toggleJobCompleted(item.id)}
            />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text
                style={[
                  styles.title,
                  item.completed ? { textDecorationLine: "line-through" } : {},
                ]}
              >
                {item.title}
              </Text>
              <Text>Client: {item.client}</Text>
              <Text>
                Payment: Rp {Number(item.payment || 0).toLocaleString("id-ID")}
              </Text>
            </View>

            <TouchableOpacity onPress={() => openEditModal(item)}>
              <Ionicons name="pencil" size={24} color="#007bff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteJob(item.id)}>
              <Ionicons
                name="trash"
                size={24}
                color="red"
                style={{ marginLeft: 12 }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Belum ada job
          </Text>
        }
      />

      {/* Modal tambah/edit job */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddJobForm job={selectedJob ?? undefined} onClose={closeModal} />
          </View>
        </View>
      </Modal>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  jobItem: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#228B22",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
