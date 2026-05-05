import type { UserProfile, Task, Note, Integration, ChatRoom } from '@/types';

const K = {
  USER: 'upz_user',
  TASKS: 'upz_tasks',
  NOTES: 'upz_notes',
  INTEGRATIONS: 'upz_integrations',
  ONBOARDED: 'upz_onboarded',
  CHAT_ROOMS: 'upz_chat_rooms',
};

function get<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function set(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  isOnboarded: () => !!localStorage.getItem(K.ONBOARDED),
  setOnboarded: () => localStorage.setItem(K.ONBOARDED, '1'),
  clearOnboarded: () => localStorage.removeItem(K.ONBOARDED),

  getUser: () => get<UserProfile>(K.USER),
  saveUser: (u: UserProfile) => set(K.USER, u),

  getTasks: (): Task[] => get<Task[]>(K.TASKS) ?? [],
  saveTasks: (tasks: Task[]) => set(K.TASKS, tasks),

  getNotes: (): Note[] => get<Note[]>(K.NOTES) ?? [],
  saveNotes: (notes: Note[]) => set(K.NOTES, notes),

  getIntegrations: (): Record<string, boolean> | null => get(K.INTEGRATIONS),
  saveIntegrations: (data: Record<string, boolean>) => set(K.INTEGRATIONS, data),

  getChatRooms: (): ChatRoom[] => get<ChatRoom[]>(K.CHAT_ROOMS) ?? [],
  saveChatRooms: (rooms: ChatRoom[]) => set(K.CHAT_ROOMS, rooms),
};
