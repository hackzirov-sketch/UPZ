import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, Circle, Trash2, FileText, StickyNote, X, Edit3 } from "lucide-react";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile, Task, Note, Priority } from "@/types";
import { storage } from "@/utils/storage";
import { INITIAL_TASKS, INITIAL_NOTES } from "@/data/mockData";

interface Props { user: UserProfile; onLogout: () => void; }

const PRIORITY_STYLES: Record<Priority, { bg: string; text: string; label: string }> = {
  high: { bg: 'rgba(239,68,68,0.15)', text: '#F87171', label: 'High' },
  medium: { bg: 'rgba(245,158,11,0.15)', text: '#FCD34D', label: 'Medium' },
  low: { bg: 'rgba(16,185,129,0.15)', text: '#6EE7B7', label: 'Low' },
};

export default function TasksNotesPage({ user, onLogout }: Props) {
  const [tab, setTab] = useState<'tasks' | 'notes'>('tasks');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
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
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const openNewNote = () => {
    setEditNote(null);
    setNoteTitle('');
    setNoteContent('');
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
      updated = notes.map((n) => n.id === editNote.id ? { ...n, title: noteTitle, content: noteContent, updatedAt: Date.now() } : n);
    } else {
      const note: Note = { id: `n${Date.now()}`, title: noteTitle, content: noteContent, createdAt: Date.now(), updatedAt: Date.now() };
      updated = [note, ...notes];
    }
    setNotes(updated);
    storage.saveNotes(updated);
    setShowNoteModal(false);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    storage.saveNotes(updated);
  };

  const doneTasks = tasks.filter((t) => t.done);
  const pendingTasks = tasks.filter((t) => !t.done);

  return (
    <AppLayout user={user} title="Tasks & Notes" onLogout={onLogout}>
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#111827", width: "fit-content" }}>
          {(['tasks', 'notes'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
              style={{
                background: tab === t ? "#6366F1" : "transparent",
                color: tab === t ? "white" : "#9CA3AF",
              }}
            >
              {t === 'tasks' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <StickyNote className="w-3.5 h-3.5" />}
              {t === 'tasks' ? 'Tasks' : 'Notes'}
              {t === 'tasks' && pendingTasks.length > 0 && (
                <span className="bg-white/20 text-white text-xs rounded-full px-1.5">{pendingTasks.length}</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* TASKS TAB */}
          {tab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              {/* Add task input */}
              <div
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <input
                  type="text"
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-600"
                />
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as Priority)}
                  className="text-xs rounded-lg px-2 py-1.5 outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", color: "#9CA3AF", border: "none" }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <motion.button
                  onClick={addTask}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0"
                >
                  <Plus className="w-4 h-4 text-white" />
                </motion.button>
              </div>

              {/* Pending */}
              {pendingTasks.length > 0 && (
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="px-4 py-3" style={{ background: "#111827" }}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <Circle className="w-3.5 h-3.5" /> Pending ({pendingTasks.length})
                    </h3>
                  </div>
                  <div style={{ background: "#111827" }}>
                    <AnimatePresence>
                      {pendingTasks.map((task, i) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10, height: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center gap-3 px-4 py-3 group border-t"
                          style={{ borderColor: "rgba(255,255,255,0.05)" }}
                        >
                          <button onClick={() => toggleTask(task.id)}>
                            <Circle className="w-4 h-4 text-gray-600 hover:text-indigo-400 transition-colors" />
                          </button>
                          <span className="flex-1 text-sm text-gray-200">{task.text}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: PRIORITY_STYLES[task.priority].bg, color: PRIORITY_STYLES[task.priority].text }}
                          >{PRIORITY_STYLES[task.priority].label}</span>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Done */}
              {doneTasks.length > 0 && (
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="px-4 py-3" style={{ background: "#111827" }}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Completed ({doneTasks.length})
                    </h3>
                  </div>
                  <div style={{ background: "#111827" }}>
                    {doneTasks.map((task, i) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-3 px-4 py-3 group border-t"
                        style={{ borderColor: "rgba(255,255,255,0.05)" }}
                      >
                        <button onClick={() => toggleTask(task.id)}>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </button>
                        <span className="flex-1 text-sm text-gray-600 line-through">{task.text}</span>
                        <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {tasks.length === 0 && (
                <div className="text-center py-12 text-gray-600">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No tasks yet. Add one above!</p>
                </div>
              )}
            </motion.div>
          )}

          {/* NOTES TAB */}
          {tab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <button
                onClick={openNewNote}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                <Plus className="w-4 h-4" /> New Note
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note, i) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="rounded-xl p-4 cursor-pointer group relative"
                    style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
                    onClick={() => openEditNote(note)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "rgba(99,102,241,0.15)" }}>
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); openEditNote(note); }}
                          className="p-1 rounded text-gray-500 hover:text-indigo-400"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                          className="p-1 rounded text-gray-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1 truncate">{note.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{note.content}</p>
                    <p className="text-xs text-gray-700 mt-3">
                      {new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setShowNoteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl p-6"
              style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-white">{editNote ? 'Edit Note' : 'New Note'}</h3>
                <button onClick={() => setShowNoteModal(false)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Note title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                autoFocus
                className="w-full mb-3 px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none text-sm"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
              />
              <textarea
                placeholder="Write your note here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none text-sm resize-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  {editNote ? 'Save Changes' : 'Create Note'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
