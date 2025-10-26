import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

/* ===============================
   🧩 Type Definition
================================= */
export interface Job {
  id: number;
  title: string;
  client: string;
  payment: number;
  description?: string;
  date?: string;
  completed?: boolean; // ✅ untuk checkbox
  Location?: string;
}

interface JobStore {
  jobs: Job[];
  loading: boolean;

  // CRUD + Persistence
  init: () => Promise<void>;
  persist: () => Promise<void>;
  addJob: (job: Omit<Job, "id" | "completed">) => Promise<void>;
  updateJob: (id: number, updates: Partial<Job>) => Promise<void>;
  deleteJob: (id: number) => Promise<void>;
  toggleJobCompleted: (id: number) => Promise<void>;

  // Finance
  getTotalPayment: () => number;
}

/* ===============================
   ⚙️ Store Implementation
================================= */
const STORAGE_KEY = "INFERNO_JOBS_V1";

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  loading: true,

  // 🔸 Load data dari AsyncStorage
  init: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = stored ? (JSON.parse(stored) as Job[]) : [];
      set({ jobs: parsed, loading: false });
    } catch (error) {
      console.error("❌ Gagal load jobs:", error);
      set({ jobs: [], loading: false });
    }
  },

  // 🔸 Simpan ke AsyncStorage
  persist: async () => {
    try {
      const { jobs } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch (error) {
      console.error("❌ Gagal simpan jobs:", error);
    }
  },

  // 🔸 Tambah job baru
  addJob: async (job) => {
    const newJob: Job = {
      ...job,
      id: Date.now(),
      completed: false, // default belum selesai
    };
    set((state) => ({ jobs: [newJob, ...state.jobs] }));
    await get().persist();
  },

  // 🔸 Update job (untuk edit)
  updateJob: async (id, updates) => {
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
    }));
    await get().persist();
  },

  // 🔸 Hapus job
  deleteJob: async (id) => {
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== id),
    }));
    await get().persist();
  },

  // 🔸 Toggle completed
  toggleJobCompleted: async (id) => {
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === id ? { ...j, completed: !j.completed } : j
      ),
    }));
    await get().persist();
  },

  // 🔸 Total keuangan
  getTotalPayment: () => {
    const { jobs } = get();
    return jobs.reduce((sum, j) => sum + (j.payment || 0), 0);
  },
}));
