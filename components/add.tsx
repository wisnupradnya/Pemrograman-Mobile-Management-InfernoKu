import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppTheme } from "../context/ThemeContext";
import { Job, useJobStore } from "../store/UseJobStore";

interface AddJobFormProps {
  onClose: () => void;
  job?: Job; // ✅ job opsional untuk edit
}

export default function AddJobForm({ onClose, job }: AddJobFormProps) {
  const { addJob, updateJob } = useJobStore();
  const { colors } = useAppTheme();

  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [payment, setPayment] = useState("");
  const [description, setDescription] = useState("");
  const [Location, setLocation] = useState("");

  // Prefill saat edit
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setClient(job.client);
      setPayment(job.payment.toString());
      setDescription(job.description || "");
      setLocation(job.Location || "");
    } else {
      setTitle("");
      setClient("");
      setPayment("");
      setDescription("");
    }
  }, [job]);

  const onSubmit = async () => {
    if (!title || !client || !payment) return alert("Isi semua field wajib!");

    if (job) {
      // ✅ update job jika edit
      await updateJob(job.id, {
        title,
        client,
        payment: Number(payment),
        description,
        Location,
      });
    } else {
      // ✅ tambah job baru
      await addJob({
        title,
        client,
        payment: Number(payment),
        description,
        Location,
      });
    }

    onClose();

    // reset form
    setTitle("");
    setClient("");
    setPayment("");
    setDescription("");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
        placeholder="Title"
        placeholderTextColor={colors.text}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
        placeholder="Client"
        placeholderTextColor={colors.text}
        value={client}
        onChangeText={setClient}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
        placeholder="Payment"
        placeholderTextColor={colors.text}
        value={payment}
        keyboardType="numeric"
        onChangeText={setPayment}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
        placeholder="Description"
        placeholderTextColor={colors.text}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
        placeholder="Location"
        placeholderTextColor={colors.text}
        value={Location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onSubmit}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          {job ? "Update Job" : "Tambah Job"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.secondary }]}
        onPress={onClose}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Batal
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
