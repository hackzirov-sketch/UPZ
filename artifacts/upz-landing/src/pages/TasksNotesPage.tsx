import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, CheckCircle2, Circle, Trash2, FileText, StickyNote, X, Edit3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile, Task, Note, Priority } from "@/types";
import { storage } from "@/utils/storage";
import { INITIAL_TASKS, INITIAL_NOTES } from "@/data/mockData";

interface Props { user: UserProfile; onLogout: () => void; }

const PRIORITY_STYLES: Record<Priority, { bg: string; text: string }> = {
  high: { bg: "rgba(239,68,68,0.12)", text: "#DC2626" },
  medium: { bg: "rgba(245,158,11,0.14)", text: "#B45309" },
  low: { bg: "rgba(16,185,129,0.14)", text: "#047857" },
};

export default function TasksNotesPage({ user, onLogout }: Props) {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState<"tasks" | "notes">("tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    const t = storage.getTasks();
    const n = storage.getNotes();
    setTasks(t.length ? t : INITIAL_TASKS);
    setNotes(n.length ? n : INITIAL_NOTES);
    if (!t.length) storage.saveTasks(INITIAL_TASKS);
    if (!n.length) storage.saveNotes(INITIAL_NOTES);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = { id: `t${Date.now()}`, text: newTask.trim(), done: false, createdAt: Date.now(), priority: newPriority };
    const updated = [task, ...tasks];
    setTasks(updated);
    storage.saveTasks(updated);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task);
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const openNewNote = () => {
    setEditNote(null);
    setNoteTitle("");
    setNoteContent("");
    setShowNoteModal(true);
  };

  const openEditNote = (note: Note) => {
    setEditNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setShowNoteModal(true);
  };

  const saveNote = () => {
    if (!noteTitle.trim()) return;
    let updated: Note[];
    if (editNote) {
      updated = notes.map((note) => note.id === editNote.id ? { ...note, title: noteTitle, content: noteContent, updatedAt: Date.now() } : note);
    } else {
      const note: Note = { id: `n${Date.now()}`, title: noteTitle, content: noteContent, createdAt: Date.now(), updatedAt: Date.now() };
      updated = [note, ...notes];
    }
    setNotes(updated);
    storage.saveNotes(updated);
    setShowNoteModal(false);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
    storage.saveNotes(updated);
  };

  const taskText = (task: Task) => {
    const initial = INITIAL_TASKS.find((item) => item.id === task.id);
    return initial && initial.text === task.text ? t(`app.mock.tasks.${task.id}`, task.text) : task.text;
  };

  const noteText = (note: Note, field: "title" | "content") => {
    const initial = INITIAL_NOTES.find((item) => item.id === note.id);
    return initial && initial[field] === note[field] ? t(`app.mock.notes.${note.id}.${field}`, note[field]) : note[field];
  };

  const doneTasks = tasks.filter((task) => task.done);
  const pendingTasks = tasks.filter((task) => !task.done);

  return (
    <AppLayout user={user} title={t("app.nav.tasks")} onLogout={onLogout}>
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="flex gap-1 rounded-xl p-1" style={{ background: "#FFFFFF", width: "fit-content" }}>
          {(["tasks", "notes"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
              style={{
                background: tab === item ? "#6366F1" : "transparent",
                color: tab === item ? "white" : "#6B7280",
              }}
            >
              {item === "tasks" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <StickyNote className="h-3.5 w-3.5" />}
              {t(`app.tasksNotes.tabs.${item}`)}
              {item === "tasks" && pendingTasks.length > 0 && (
                <span className="rounded-full bg-white/20 px-1.5 text-xs text-white">{pendingTasks.length}</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "tasks" && (
            <motion.div key="tasks" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                <input
                  type="text"
                  placeholder={t("app.tasksNotes.addTaskPlaceholder")}
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder-gray-400"
                />
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as Priority)}
                  className="rounded-lg px-2 py-1.5 text-xs outline-none"
                  style={{ background: "#F7FAFC", color: "#6B7280", border: "1px solid #E5E7EB" }}
                >
                  <option value="low">{t("app.priority.low")}</option>
                  <option value="medium">{t("app.priority.medium")}</option>
                  <option value="high">{t("app.priority.high")}</option>
                </select>
                <motion.button onClick={addTask} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  <Plus className="h-4 w-4 text-white" />
                </motion.button>
              </div>

              {pendingTasks.length > 0 && (
                <div className="overflow-hidden rounded-xl" style={{ border: "1px solid #E5E7EB" }}>
                  <div className="px-4 py-3" style={{ background: "#FFFFFF" }}>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <Circle className="h-3.5 w-3.5" /> {t("app.tasksNotes.pending", { count: pendingTasks.length })}
                    </h3>
                  </div>
                  <div style={{ background: "#FFFFFF" }}>
                    <AnimatePresence>
                      {pendingTasks.map((task, index) => (
                        <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10, height: 0 }} transition={{ delay: index * 0.03 }} className="group flex items-center gap-3 border-t px-4 py-3" style={{ borderColor: "#E5E7EB" }}>
                          <button onClick={() => toggleTask(task.id)}>
                            <Circle className="h-4 w-4 text-gray-500 transition-colors hover:text-indigo-500" />
                          </button>
                          <span className="flex-1 text-sm text-[#111827]">{taskText(task)}</span>
                          <span className="rounded-full px-2 py-0.5 text-xs" style={{ background: PRIORITY_STYLES[task.priority].bg, color: PRIORITY_STYLES[task.priority].text }}>{t(`app.priority.${task.priority}`)}</span>
                          <button onClick={() => deleteTask(task.id)} className="opacity-0 transition-opacity group-hover:opacity-100">
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {doneTasks.length > 0 && (
                <div className="overflow-hidden rounded-xl" style={{ border: "1px solid #E5E7EB" }}>
                  <div className="px-4 py-3" style={{ background: "#FFFFFF" }}>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {t("app.tasksNotes.completed", { count: doneTasks.length })}
                    </h3>
                  </div>
                  <div style={{ background: "#FFFFFF" }}>
                    {doneTasks.map((task, index) => (
                      <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }} className="group flex items-center gap-3 border-t px-4 py-3" style={{ borderColor: "#E5E7EB" }}>
                        <button onClick={() => toggleTask(task.id)}>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </button>
                        <span className="flex-1 text-sm text-gray-500 line-through">{taskText(task)}</span>
                        <button onClick={() => deleteTask(task.id)} className="opacity-0 transition-opacity group-hover:opacity-100">
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {tasks.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  <CheckCircle2 className="mx-auto mb-3 h-12 w-12 opacity-30" />
                  <p>{t("app.tasksNotes.noTasks")}</p>
                </div>
              )}
            </motion.div>
          )}

          {tab === "notes" && (
            <motion.div key="notes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-4">
              <button onClick={openNewNote} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
                <Plus className="h-4 w-4" /> {t("app.tasksNotes.newNote")}
              </button>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {notes.map((note, index) => (
                  <motion.div key={note.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -3 }} className="group relative cursor-pointer rounded-xl p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }} onClick={() => openEditNote(note)}>
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex h-6 w-6 items-center justify-center rounded" style={{ background: "rgba(99,102,241,0.15)" }}>
                        <FileText className="h-3.5 w-3.5 text-indigo-500" />
                      </div>
                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={(e) => { e.stopPropagation(); openEditNote(note); }} className="rounded p-1 text-gray-500 hover:text-indigo-500">
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} className="rounded p-1 text-gray-500 hover:text-red-500">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="mb-1 truncate text-sm font-semibold text-[#111827]">{noteText(note, "title")}</h4>
                    <p className="line-clamp-3 text-xs leading-relaxed text-gray-500">{noteText(note, "content")}</p>
                    <p className="mt-3 text-xs text-gray-500">{new Date(note.updatedAt).toLocaleDateString(i18n.language, { month: "short", day: "numeric" })}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showNoteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.45)" }} onClick={() => setShowNoteModal(false)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} className="w-full max-w-lg rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }} onClick={(e) => e.stopPropagation()}>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-[#111827]">{editNote ? t("app.tasksNotes.editNote") : t("app.tasksNotes.newNote")}</h3>
                <button onClick={() => setShowNoteModal(false)} className="text-gray-500 hover:text-indigo-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <input type="text" placeholder={t("app.tasksNotes.noteTitlePlaceholder")} value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} autoFocus className="mb-3 w-full rounded-xl px-4 py-3 text-sm text-[#111827] outline-none placeholder-gray-400" style={{ background: "#F7FAFC", border: "1px solid #E5E7EB" }} />
              <textarea placeholder={t("app.tasksNotes.noteContentPlaceholder")} value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={8} className="w-full resize-none rounded-xl px-4 py-3 text-sm text-[#111827] outline-none placeholder-gray-400" style={{ background: "#F7FAFC", border: "1px solid #E5E7EB" }} />
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setShowNoteModal(false)} className="rounded-xl px-4 py-2 text-sm text-gray-500 hover:text-indigo-600">
                  {t("app.common.cancel")}
                </button>
                <button onClick={saveNote} className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
                  {editNote ? t("app.tasksNotes.saveChanges") : t("app.tasksNotes.createNote")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
