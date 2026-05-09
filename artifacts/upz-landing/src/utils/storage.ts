import type { AutomationRule, ChatRoom, DocPage, SmartTask, Task, TaskView, Note, UserProfile } from '@/types';

const K = {
  USER: 'upz_user',
  TASKS: 'upz_tasks',
  NOTES: 'upz_notes',
  INTEGRATIONS: 'upz_integrations',
  ONBOARDED: 'upz_onboarded',
  CHAT_ROOMS: 'upz_chat_rooms',
  SMART_TASKS: 'upz_smart_tasks',
  DOC_PAGES: 'upz_doc_pages',
  AUTOMATIONS: 'upz_automations',
  DASHBOARD_LAYOUT: 'upz_dashboard_layout',
  ACTIVE_VIEW: 'upz_active_view',
  ACTIVE_BOARD: 'upz_active_board',
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

  getSmartTasks: (): SmartTask[] => get<SmartTask[]>(K.SMART_TASKS) ?? [],
  saveSmartTasks: (tasks: SmartTask[]) => set(K.SMART_TASKS, tasks),

  getDocPages: (): DocPage[] => get<DocPage[]>(K.DOC_PAGES) ?? [],
  saveDocPages: (docs: DocPage[]) => set(K.DOC_PAGES, docs),

  getAutomationRules: (): AutomationRule[] => get<AutomationRule[]>(K.AUTOMATIONS) ?? [],
  saveAutomationRules: (rules: AutomationRule[]) => set(K.AUTOMATIONS, rules),

  getDashboardLayout: (): string[] => get<string[]>(K.DASHBOARD_LAYOUT) ?? [],
  saveDashboardLayout: (ids: string[]) => set(K.DASHBOARD_LAYOUT, ids),

  getActiveView: (): TaskView | null => get<TaskView>(K.ACTIVE_VIEW),
  saveActiveView: (view: TaskView) => set(K.ACTIVE_VIEW, view),

  getActiveBoard: (): string | null => get<string>(K.ACTIVE_BOARD),
  saveActiveBoard: (board: string) => set(K.ACTIVE_BOARD, board),
};
