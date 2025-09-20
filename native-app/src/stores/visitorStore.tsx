// src/stores/visitorStore.ts
import { create } from 'zustand';

type VisitorState = {
  name: string | null;
  setName: (name: string) => void;
  loadName: () => void;
};

// 웹 환경에서만 작동하는 간단한 스토리지
const setStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(key, value);
  }
};

const getStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem(key);
  }
  return null;
};

export const useVisitorStore = create<VisitorState>((set) => ({
  name: null,
  setName: (name) => {
    setStorageItem('visitorName', name);
    set({ name });
  },
  loadName: () => {
    const storedName = getStorageItem('visitorName');
    if (storedName) {
      set({ name: storedName });
    }
  },
}));