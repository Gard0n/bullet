const APP_ID = "bujo_v3_mood_year";
const STORAGE_VERSION = 3;
const STORAGE_KEY = APP_ID;
const { safeSetItem } = window.SharedUtils;
const SUPABASE_URL = "https://dbskhbnkihvgpcrrxvtq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRic2toYm5raWh2Z3BjcnJ4dnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MzgyMzYsImV4cCI6MjA4NTAxNDIzNn0.Zllx6zSQr48qaGlr6BcQ2MncaWsNzZSPjEI5FMivvtw";
const SYNC_BACKUP_KEY = `${STORAGE_KEY}_backup`;
const DB_NAME = "bujo-db";
const DB_VERSION = 1;
const STORE_NAME = "app_state";

const el = {
  btnTheme: document.getElementById("btnTheme"),
  btnExport: document.getElementById("btnExport"),
  importFile: document.getElementById("importFile"),
  btnReset: document.getElementById("btnReset"),
  btnOnboarding: document.getElementById("btnOnboarding"),
  btnDrawer: document.getElementById("btnDrawer"),
  drawerOverlay: document.getElementById("drawerOverlay"),
  btnDrawerClose: document.getElementById("btnDrawerClose"),
  btnLogin: document.getElementById("btnLogin"),
  btnLogout: document.getElementById("btnLogout"),
  btnSyncNow: document.getElementById("btnSyncNow"),
  syncStatus: document.getElementById("syncStatus"),
  authDialog: document.getElementById("authDialog"),
  authForm: document.getElementById("authForm"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  authSignIn: document.getElementById("authSignIn"),
  authSignUp: document.getElementById("authSignUp"),
  authError: document.getElementById("authError"),
  authClose: document.getElementById("authClose"),
  syncChoiceDialog: document.getElementById("syncChoiceDialog"),
  syncChoiceLocal: document.getElementById("syncChoiceLocal"),
  syncChoiceCloud: document.getElementById("syncChoiceCloud"),
  syncConflictDialog: document.getElementById("syncConflictDialog"),
  syncConflictLocal: document.getElementById("syncConflictLocal"),
  syncConflictCloud: document.getElementById("syncConflictCloud"),
  syncConflictCancel: document.getElementById("syncConflictCancel"),
  onboardingDialog: document.getElementById("onboardingDialog"),
  onboardingDemo: document.getElementById("onboardingDemo"),
  onboardingStart: document.getElementById("onboardingStart"),
  onboardingClose: document.getElementById("onboardingClose"),

  tabs: Array.from(document.querySelectorAll(".tab")),
  pages: Array.from(document.querySelectorAll(".page")),

  btnToday: document.getElementById("btnToday"),
  datePick: document.getElementById("datePick"),
  search: document.getElementById("search"),
  daysList: document.getElementById("daysList"),
  daysCount: document.getElementById("daysCount"),
  daysView: Array.from(document.querySelectorAll("#daysView .pill")),
  tagIndex: document.getElementById("tagIndex"),

  dailyTitle: document.getElementById("dailyTitle"),
  entryForm: document.getElementById("entryForm"),
  kind: document.getElementById("kind"),
  time: document.getElementById("time"),
  tags: document.getElementById("tags"),
  projectId: document.getElementById("projectId"),
  taskDate: document.getElementById("taskDate"),
  text: document.getElementById("text"),
  btnEntrySubmit: document.getElementById("btnEntrySubmit"),
  btnCancelEdit: document.getElementById("btnCancelEdit"),
  btnClearDay: document.getElementById("btnClearDay"),
  btnExportDay: document.getElementById("btnExportDay"),
  btnExportWeek: document.getElementById("btnExportWeek"),
  btnExportMonth: document.getElementById("btnExportMonth"),
  btnFocus: document.getElementById("btnFocus"),
  filterOpenTasks: document.getElementById("filterOpenTasks"),
  dailyFilters: Array.from(document.querySelectorAll("#dailyFilters .pill")),
  emptyState: document.getElementById("emptyState"),
  entries: document.getElementById("entries"),
  weeklySummary: document.getElementById("weeklySummary"),
  dailyTasksToday: document.getElementById("dailyTasksToday"),
  dailyTasksUpcoming: document.getElementById("dailyTasksUpcoming"),
  dailyTasksBacklog: document.getElementById("dailyTasksBacklog"),
  dailyTasksDone: document.getElementById("dailyTasksDone"),
  dailyTasksDoneWrap: document.getElementById("dailyTasksDoneWrap"),
  dailyTaskCountToday: document.getElementById("dailyTaskCountToday"),
  dailyTaskCountUpcoming: document.getElementById("dailyTaskCountUpcoming"),
  dailyTaskCountBacklog: document.getElementById("dailyTaskCountBacklog"),
  dailyTaskCountDone: document.getElementById("dailyTaskCountDone"),

  // templates
  templateForm: document.getElementById("templateForm"),
  templateName: document.getElementById("templateName"),
  templateLines: document.getElementById("templateLines"),
  templateList: document.getElementById("templateList"),

  // mood (daily)
  moodText: document.getElementById("moodText"),
  moodSavedHint: document.getElementById("moodSavedHint"),
  moodPills: Array.from(document.querySelectorAll(".moodPill")),

  // monthly
  monthPrev: document.getElementById("monthPrev"),
  monthNext: document.getElementById("monthNext"),
  monthTitle: document.getElementById("monthTitle"),
  calendarGrid: document.getElementById("calendarGrid"),

  // habits
  habPrev: document.getElementById("habPrev"),
  habNext: document.getElementById("habNext"),
  habTitle: document.getElementById("habTitle"),
  habitForm: document.getElementById("habitForm"),
  habitName: document.getElementById("habitName"),
  habitColor: document.getElementById("habitColor"),
  habitTarget: document.getElementById("habitTarget"),
  habitTable: document.getElementById("habitTable"),
  habitStats: document.getElementById("habitStats"),
  habitClearMonth: document.getElementById("habitClearMonth"),

  // collections
  collectionForm: document.getElementById("collectionForm"),
  collectionName: document.getElementById("collectionName"),
  collectionsList: document.getElementById("collectionsList"),
  collectionTitle: document.getElementById("collectionTitle"),
  collectionMeta: document.getElementById("collectionMeta"),
  btnDeleteCollection: document.getElementById("btnDeleteCollection"),
  collectionItemForm: document.getElementById("collectionItemForm"),
  collectionItemTags: document.getElementById("collectionItemTags"),
  collectionItemDate: document.getElementById("collectionItemDate"),
  collectionItemText: document.getElementById("collectionItemText"),
  collectionItems: document.getElementById("collectionItems"),

  // projects
  projectForm: document.getElementById("projectForm"),
  projectName: document.getElementById("projectName"),
  projectColor: document.getElementById("projectColor"),
  projectsList: document.getElementById("projectsList"),
  projectTitle: document.getElementById("projectTitle"),
  projectMeta: document.getElementById("projectMeta"),
  btnPinProject: document.getElementById("btnPinProject"),
  btnArchiveProject: document.getElementById("btnArchiveProject"),
  btnDeleteProject: document.getElementById("btnDeleteProject"),
  projectSummary: document.getElementById("projectSummary"),
  projectNextAction: document.getElementById("projectNextAction"),
  projectNextForm: document.getElementById("projectNextForm"),
  projectNextSelect: document.getElementById("projectNextSelect"),
  projectTaskForm: document.getElementById("projectTaskForm"),
  projectTaskText: document.getElementById("projectTaskText"),
  projectTaskDate: document.getElementById("projectTaskDate"),
  projectMilestoneForm: document.getElementById("projectMilestoneForm"),
  projectMilestoneText: document.getElementById("projectMilestoneText"),
  projectMilestoneDate: document.getElementById("projectMilestoneDate"),
  projectMilestoneList: document.getElementById("projectMilestoneList"),
  projectTasks: document.getElementById("projectTasks"),

  // dashboard
  dashTodayChip: document.getElementById("dashTodayChip"),
  dashMonthChip: document.getElementById("dashMonthChip"),
  dashMood: document.getElementById("dashMood"),
  dashTodaySummary: document.getElementById("dashTodaySummary"),
  dashOpenTasks: document.getElementById("dashOpenTasks"),
  dashBacklog: document.getElementById("dashBacklog"),
  dashUpcomingEvents: document.getElementById("dashUpcomingEvents"),
  dashHabitsToday: document.getElementById("dashHabitsToday"),
  dashCollections: document.getElementById("dashCollections"),
  dashMoodChart: document.getElementById("dashMoodChart"),
  dashBestDays: document.getElementById("dashBestDays"),
  dashStableHabits: document.getElementById("dashStableHabits"),
  dashMoodWeekAvg: document.getElementById("dashMoodWeekAvg"),
  dashHabitAlerts: document.getElementById("dashHabitAlerts"),
  dashMoodHabitCorr: document.getElementById("dashMoodHabitCorr"),
  dashTrends: document.getElementById("dashTrends"),
  dashWidgetToggles: document.getElementById("dashWidgetToggles"),
  dashInsightToggles: document.getElementById("dashInsightToggles"),
  dashResetWidgets: document.getElementById("dashResetWidgets"),

  // review
  reviewPrev: document.getElementById("reviewPrev"),
  reviewNext: document.getElementById("reviewNext"),
  reviewTitle: document.getElementById("reviewTitle"),
  reviewSummary: document.getElementById("reviewSummary"),
  reviewMood: document.getElementById("reviewMood"),
  reviewHabits: document.getElementById("reviewHabits"),
  reviewFlowTabs: Array.from(document.querySelectorAll("#reviewFlowTabs .pill")),
  reviewFlowScope: document.getElementById("reviewFlowScope"),
  reviewFlowProgress: document.getElementById("reviewFlowProgress"),
  reviewAutoSummary: document.getElementById("reviewAutoSummary"),
  reviewChecklist: document.getElementById("reviewChecklist"),
  reviewQuestions: document.getElementById("reviewQuestions"),

  // year
  yearPrev: document.getElementById("yearPrev"),
  yearNext: document.getElementById("yearNext"),
  yearTitle: document.getElementById("yearTitle"),
  yearGrid: document.getElementById("yearGrid"),
};

const DASH_WIDGETS = [
  { id: "dashMood", label: "Résumé mental" },
  { id: "dashToday", label: "Résumé du jour" },
  { id: "dashOpenTasks", label: "Tâches ouvertes" },
  { id: "dashBacklog", label: "Backlog & retard" },
  { id: "dashUpcomingEvents", label: "Événements à venir" },
  { id: "dashHabitsToday", label: "Habits du jour" },
  { id: "dashCollections", label: "Collections récentes" },
  { id: "dashMoodChart", label: "Mood annuel" },
];

const DASH_INSIGHTS = [
  { id: "insightBestDays", label: "Meilleurs jours" },
  { id: "insightStableHabits", label: "Habitudes stables" },
  { id: "insightMoodWeekAvg", label: "Mood moyen semaine" },
  { id: "insightHabitAlerts", label: "Alertes habitudes" },
  { id: "insightMoodHabitCorr", label: "Mood x habitudes" },
  { id: "insightTrends", label: "Tendances (4 semaines)" },
];

const DASH_WIDGET_IDS = [...DASH_WIDGETS.map(w => w.id), ...DASH_INSIGHTS.map(w => w.id)];

let state = {
  theme: "light",
  route: "dashboard",
  daysView: "all", // all | week | month
  dailyFilter: "all", // all | note | event

  selectedDate: todayISO(),
  query: "",
  monthCursor: monthKeyFromDate(todayISO()),
  reviewCursor: todayISO(),
  reviewFlow: defaultReviewFlow(),
  viewPrefs: defaultViewPrefs(),
  lastLocalChangeAt: 0,
  lastSyncAt: 0,
  lastRemoteAt: 0,
  syncHistory: [],
  onboardingSeen: false,

  entries: [],

  templates: [],

  habits: [],
  habitChecks: {},

  projects: [],
  activeProjectId: null,
  projectMilestones: {},

  collections: [],
  collectionItems: {},
  activeCollectionId: null,

  // moods per day
  moods: {},

  // year cursor for year view + chart
  yearCursor: new Date().getFullYear(),
};

let editingEntryId = null;
let supabaseClient = null;
let currentUser = null;
let syncTimer = null;
let isSyncing = false;
let lastSyncAt = 0;
let storageMode = "idb";
let dbPromise = null;
let syncBootstrapInFlight = false;
let syncPromptedForUserId = "";
let pendingSyncChoice = null;
let pendingConflictChoice = null;
let suppressSync = false;

/* ---------------- Utils ---------------- */

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function openDb() {
  if (!("indexedDB" in window)) return Promise.reject(new Error("no-idb"));
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function idbGet(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key, value) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(value, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function initStorage() {
  try {
    await openDb();
    storageMode = "idb";
  } catch {
    storageMode = "local";
  }
}

function normalizeDailyFilter(filter) {
  const allowed = new Set(["all", "note", "event"]);
  return allowed.has(filter) ? filter : "all";
}

function defaultReviewFlow() {
  return {
    mode: "weekly",
    daily: {},
    weekly: {},
    monthly: {},
  };
}

function defaultViewPrefs() {
  const widgets = {};
  DASH_WIDGET_IDS.forEach(id => { widgets[id] = true; });
  return { dashboard: { widgets } };
}

function sanitizeViewPrefs(raw) {
  const defaults = defaultViewPrefs();
  if (!isPlainObject(raw)) return defaults;
  const dash = isPlainObject(raw.dashboard) ? raw.dashboard : {};
  const rawWidgets = isPlainObject(dash.widgets) ? dash.widgets : {};
  const widgets = {};
  DASH_WIDGET_IDS.forEach(id => { widgets[id] = rawWidgets[id] !== false; });
  return { dashboard: { widgets } };
}

function sanitizeReviewFlow(raw) {
  if (!isPlainObject(raw)) return defaultReviewFlow();
  const mode = ["daily", "weekly", "monthly"].includes(raw.mode) ? raw.mode : "weekly";
  return {
    mode,
    daily: isPlainObject(raw.daily) ? raw.daily : {},
    weekly: isPlainObject(raw.weekly) ? raw.weekly : {},
    monthly: isPlainObject(raw.monthly) ? raw.monthly : {},
  };
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateFR(iso) {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

function formatDateShortFR(iso) {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(d).replace(".", "");
}

function monthKeyFromDate(iso) {
  return iso.slice(0, 7);
}

function monthTitleFR(monthKey) {
  const [y, m] = monthKey.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(d);
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function clampName(name, max = 22) {
  return (name || "").trim().replace(/\s+/g, " ").slice(0, max);
}

function isHexColor(s) {
  return typeof s === "string" && /^#([0-9a-fA-F]{6})$/.test(s);
}

function parseTags(input) {
  const raw = String(input || "").trim();
  if (!raw) return [];
  const parts = raw
    .replace(/,/g, " ")
    .split(/\s+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => (s.startsWith("#") ? s : `#${s}`))
    .map(s => s.toLowerCase());
  return Array.from(new Set(parts)).slice(0, 10);
}

function extractTagsFromText(text) {
  const matches = String(text || "").match(/#[\w-]+/g) || [];
  const tags = matches.map(t => t.toLowerCase());
  return Array.from(new Set(tags)).slice(0, 10);
}

function stripTagsFromText(text) {
  return String(text || "")
    .replace(/#[\w-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function addMonths(monthKey, delta) {
  const [y, m] = monthKey.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yy}-${mm}`;
}

function addDaysISO(iso, delta) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + delta);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function daysInMonth(monthKey) {
  const [y, m] = monthKey.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

function monthDayLimit(monthKey) {
  const dim = daysInMonth(monthKey);
  const today = todayISO();
  if (monthKey === today.slice(0, 7)) return Math.min(dim, Number(today.slice(8, 10)));
  return dim;
}

function isoFromMonthDay(monthKey, day) {
  return `${monthKey}-${String(day).padStart(2, "0")}`;
}

function projectById(projectId) {
  if (!projectId) return null;
  return state.projects.find(p => p.id === projectId) || null;
}

function projectLabel(projectId) {
  return projectById(projectId)?.name || "";
}

function orderedProjects() {
  const pinned = state.projects.filter(p => p.pinned);
  const others = state.projects.filter(p => !p.pinned);
  return pinned.concat(others);
}

function buildDateIndex(entries) {
  const map = new Map();
  entries.forEach(e => {
    if (!e.date) return;
    const cur = map.get(e.date) || { notes: 0, events: 0, tasks: 0, tasksOpen: 0 };
    if (e.kind === "note") cur.notes += 1;
    if (e.kind === "event") cur.events += 1;
    if (e.kind === "task") {
      cur.tasks += 1;
      if (isTaskOpen(e)) cur.tasksOpen += 1;
    }
    map.set(e.date, cur);
  });
  return map;
}

function weekStartISO(iso) {
  const weekday = weekdayMonIndex(iso);
  return addDaysISO(iso, -weekday);
}

function weekDates(startIso) {
  return Array.from({ length: 7 }, (_, i) => addDaysISO(startIso, i));
}

function weekdayMonIndex(iso) {
  const d = new Date(iso + "T00:00:00");
  const js = d.getDay(); // Sun=0
  return (js + 6) % 7;   // Mon=0
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hexToRgba(hex, a) {
  try {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  } catch {
    return "rgba(0,0,0,0.06)";
  }
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isMonthKey(value) {
  return typeof value === "string" && /^\d{4}-\d{2}$/.test(value);
}

function clampWeeklyTarget(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 4;
  const rounded = Math.round(n);
  return Math.min(7, Math.max(1, rounded));
}

function hasUserData() {
  return (
    state.entries.length > 0 ||
    state.habits.length > 0 ||
    state.projects.length > 0 ||
    state.collections.length > 0 ||
    state.templates.length > 0 ||
    Object.keys(state.moods).length > 0
  );
}

function normalizeTagsArray(tags) {
  if (!Array.isArray(tags)) return [];
  const cleaned = tags
    .map(t => String(t || "").trim())
    .filter(Boolean)
    .map(t => (t.startsWith("#") ? t.toLowerCase() : `#${t.toLowerCase()}`));
  return Array.from(new Set(cleaned)).slice(0, 10);
}

/* ---- Mood chart helpers ---- */

function monthNameShortFR(monthIndex) {
  const d = new Date(2024, monthIndex, 1);
  return new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(d).replace(".", "");
}

function moodValue(level) {
  if (level === "green") return 3;
  if (level === "yellow") return 2;
  if (level === "red") return 1;
  return 0;
}

function moodLabel(level) {
  if (level === "green") return "Vert";
  if (level === "yellow") return "Jaune";
  if (level === "red") return "Rouge";
  return "—";
}

function pct(n, total) {
  if (!total) return 0;
  return Math.round((n / total) * 100);
}

function moodStatsForMonth(year, monthIndex) {
  const mk = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
  const dim = daysInMonth(mk);

  let g = 0, y = 0, r = 0, any = 0;

  for (let d = 1; d <= dim; d++) {
    const iso = isoFromMonthDay(mk, d);
    const level = getMood(iso).level;
    if (!level) continue;
    any++;
    if (level === "green") g++;
    else if (level === "yellow") y++;
    else if (level === "red") r++;
  }

  return { mk, dim, any, g, y, r };
}

/* ---------------- Storage ---------------- */

function sanitizeEntry(raw) {
  if (!isPlainObject(raw)) return null;
  const text = String(raw.text || "").trim();
  if (!text) return null;
  const kind = ["note", "event", "task"].includes(raw.kind) ? raw.kind : "note";
  const date = typeof raw.date === "string" ? raw.date : "";
  const time = typeof raw.time === "string" ? raw.time : "";
  const tags = normalizeTagsArray(raw.tags);
  const projectId = typeof raw.projectId === "string" ? raw.projectId : "";
  const createdAt = typeof raw.createdAt === "number" ? raw.createdAt : Date.now();
  let taskState;
  if (kind === "task") {
    taskState = ["open", "done", "migrated", "canceled"].includes(raw.taskState) ? raw.taskState : "open";
  }
  return {
    id: typeof raw.id === "string" ? raw.id : uid("entry"),
    date,
    kind,
    time,
    tags,
    text,
    projectId,
    taskState,
    createdAt,
  };
}

function sanitizeTemplate(raw) {
  if (!isPlainObject(raw)) return null;
  const name = clampName(raw.name, 24);
  const lines = String(raw.lines || "").trim();
  if (!name || !lines) return null;
  return {
    id: typeof raw.id === "string" ? raw.id : uid("tpl"),
    name,
    lines,
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function sanitizeHabit(raw) {
  if (!isPlainObject(raw)) return null;
  const name = clampName(raw.name, 22);
  if (!name) return null;
  return {
    id: typeof raw.id === "string" ? raw.id : uid("habit"),
    name,
    color: isHexColor(raw.color) ? raw.color : "#19500e",
    weeklyTarget: clampWeeklyTarget(raw.weeklyTarget),
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function sanitizeProject(raw) {
  if (!isPlainObject(raw)) return null;
  const name = clampName(raw.name, 22);
  if (!name) return null;
  return {
    id: typeof raw.id === "string" ? raw.id : uid("proj"),
    name,
    color: isHexColor(raw.color) ? raw.color : "#19500e",
    pinned: raw.pinned === true,
    archived: raw.archived === true,
    nextActionId: typeof raw.nextActionId === "string" ? raw.nextActionId : "",
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function sanitizeProjectMilestone(raw) {
  if (!isPlainObject(raw)) return null;
  const text = String(raw.text || "").trim();
  if (!text) return null;
  return {
    id: typeof raw.id === "string" ? raw.id : uid("ms"),
    text,
    date: typeof raw.date === "string" ? raw.date : "",
    done: raw.done === true,
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function sanitizeCollection(raw) {
  if (!isPlainObject(raw)) return null;
  const name = clampName(raw.name, 22);
  if (!name) return null;
  return {
    id: typeof raw.id === "string" ? raw.id : uid("col"),
    name,
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function sanitizeCollectionItem(raw) {
  if (!isPlainObject(raw)) return null;
  const text = String(raw.text || "").trim();
  if (!text) return null;
  return {
    id: typeof raw.id === "string" ? raw.id : uid("item"),
    text,
    tags: normalizeTagsArray(raw.tags),
    date: typeof raw.date === "string" ? raw.date : "",
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function save(opts = {}) {
  const skipSync = Boolean(opts.skipSync);
  const skipLocalStamp = Boolean(opts.skipLocalStamp) || suppressSync;
  if (!skipLocalStamp) state.lastLocalChangeAt = Date.now();
  const payload = JSON.stringify({ v: STORAGE_VERSION, ...state });
  if (storageMode === "idb") {
    idbSet(STORAGE_KEY, payload).catch(() => {
      storageMode = "local";
      safeSetItem(STORAGE_KEY, payload, { app: "bullet-journal" });
    });
  } else {
    safeSetItem(STORAGE_KEY, payload, { app: "bullet-journal" });
  }
  if (!skipSync && !suppressSync) queueSync();
}

async function load() {
  let raw = null;
  let fromLocal = false;
  if (storageMode === "idb") {
    try {
      raw = await idbGet(STORAGE_KEY);
    } catch {
      storageMode = "local";
    }
  }
  if (!raw) {
    raw = localStorage.getItem(STORAGE_KEY);
    fromLocal = Boolean(raw);
  }
  if (!raw) return;

  try {
    const p = JSON.parse(raw);
    if (!p) return;

    state.theme = p.theme === "dark" ? "dark" : "light";
    state.route = sanitizeRoute(p.route || "dashboard");
    state.daysView = p.daysView || "all";
    state.dailyFilter = normalizeDailyFilter(p.dailyFilter || "all");
    state.selectedDate = isIsoDate(p.selectedDate) ? p.selectedDate : todayISO();
    state.query = p.query || "";
    state.monthCursor = isMonthKey(p.monthCursor) ? p.monthCursor : monthKeyFromDate(todayISO());
    state.reviewCursor = isIsoDate(p.reviewCursor) ? p.reviewCursor : todayISO();
    state.reviewFlow = sanitizeReviewFlow(p.reviewFlow);
    state.viewPrefs = sanitizeViewPrefs(p.viewPrefs);
    state.lastLocalChangeAt = typeof p.lastLocalChangeAt === "number" ? p.lastLocalChangeAt : 0;
    state.lastSyncAt = typeof p.lastSyncAt === "number" ? p.lastSyncAt : 0;
    state.lastRemoteAt = typeof p.lastRemoteAt === "number" ? p.lastRemoteAt : 0;
    state.syncHistory = Array.isArray(p.syncHistory) ? p.syncHistory.slice(0, 12) : [];
    state.onboardingSeen = p.onboardingSeen === true;

    state.entries = Array.isArray(p.entries) ? p.entries.map(sanitizeEntry).filter(Boolean) : [];

    state.templates = Array.isArray(p.templates) ? p.templates.map(sanitizeTemplate).filter(Boolean) : [];

    state.habits = Array.isArray(p.habits) ? p.habits.map(sanitizeHabit).filter(Boolean) : [];
    state.habitChecks = isPlainObject(p.habitChecks) ? p.habitChecks : {};

    state.projects = Array.isArray(p.projects) ? p.projects.map(sanitizeProject).filter(Boolean) : [];
    state.activeProjectId = state.projects.some(proj => proj.id === p.activeProjectId) ? p.activeProjectId : (state.projects[0]?.id || null);
    const rawMilestones = isPlainObject(p.projectMilestones) ? p.projectMilestones : {};
    const allowedProjectIds = new Set(state.projects.map(pr => pr.id));
    state.projectMilestones = Object.fromEntries(
      Object.entries(rawMilestones)
        .filter(([id]) => allowedProjectIds.has(id))
        .map(([id, items]) => [id, Array.isArray(items) ? items.map(sanitizeProjectMilestone).filter(Boolean) : []])
    );

    state.collections = Array.isArray(p.collections) ? p.collections.map(sanitizeCollection).filter(Boolean) : [];
    const rawItems = isPlainObject(p.collectionItems) ? p.collectionItems : {};
    const allowedCollectionIds = new Set(state.collections.map(c => c.id));
    state.collectionItems = Object.fromEntries(
      Object.entries(rawItems)
        .filter(([id]) => allowedCollectionIds.has(id))
        .map(([id, items]) => [id, Array.isArray(items) ? items.map(sanitizeCollectionItem).filter(Boolean) : []])
    );
    state.activeCollectionId = state.collections.some(col => col.id === p.activeCollectionId) ? p.activeCollectionId : (state.collections[0]?.id || null);

    state.moods = isPlainObject(p.moods) ? p.moods : {};
    state.yearCursor = typeof p.yearCursor === "number" ? p.yearCursor : new Date().getFullYear();

    const projectIds = new Set(state.projects.map(pr => pr.id));
    state.entries.forEach(e => {
      if (e.projectId && !projectIds.has(e.projectId)) e.projectId = "";
    });
    cleanupProjectNextActions();

    if (storageMode === "idb" && fromLocal) {
      idbSet(STORAGE_KEY, raw).catch(() => {
        storageMode = "local";
      });
    }
  } catch {
    // ignore
  }
}

/* ---------------- Sync (Supabase) ---------------- */

function syncEnabled() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase);
}

function formatTimeShort(ts) {
  try {
    return new Date(ts).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function setSyncStatus(text, tone) {
  if (!el.syncStatus) return;
  el.syncStatus.textContent = text;
  el.syncStatus.classList.remove("syncStatus--ok", "syncStatus--warn", "syncStatus--err");
  if (tone === "ok") el.syncStatus.classList.add("syncStatus--ok");
  if (tone === "warn") el.syncStatus.classList.add("syncStatus--warn");
  if (tone === "err") el.syncStatus.classList.add("syncStatus--err");
}

function renderSyncHistory() {
  if (!el.syncHistory) return;
  el.syncHistory.innerHTML = "";
  const list = Array.isArray(state.syncHistory) ? state.syncHistory : [];
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.textContent = "Aucune synchro récente.";
    el.syncHistory.appendChild(empty);
    return;
  }
  list.slice(0, 6).forEach((entry) => {
    const row = document.createElement("div");
    row.className = `syncItem syncItem--${entry.status || "ok"}`;
    const left = document.createElement("span");
    left.textContent = entry.label || "Sync";
    const right = document.createElement("span");
    right.textContent = formatTimeShort(entry.ts);
    row.appendChild(left);
    row.appendChild(right);
    el.syncHistory.appendChild(row);
  });
}

function pushSyncHistory({ label, status = "ok" }) {
  if (!Array.isArray(state.syncHistory)) state.syncHistory = [];
  state.syncHistory.unshift({
    label,
    status,
    ts: Date.now(),
  });
  state.syncHistory = state.syncHistory.slice(0, 12);
  save({ skipSync: true, skipLocalStamp: true });
  renderSyncHistory();
}

function setAuthUi(isLoggedIn) {
  if (el.btnLogin) el.btnLogin.hidden = isLoggedIn;
  if (el.btnLogout) el.btnLogout.hidden = !isLoggedIn;
  if (el.btnSyncNow) el.btnSyncNow.hidden = !isLoggedIn;
}

function askSyncChoice() {
  if (!el.syncChoiceDialog || !el.syncChoiceLocal || !el.syncChoiceCloud) {
    return Promise.resolve("cloud");
  }
  if (pendingSyncChoice) return pendingSyncChoice;
  pendingSyncChoice = new Promise((resolve) => {
    const dialog = el.syncChoiceDialog;
    const cleanup = () => {
      el.syncChoiceLocal.removeEventListener("click", onLocal);
      el.syncChoiceCloud.removeEventListener("click", onCloud);
      dialog.removeEventListener("cancel", onCancel);
      pendingSyncChoice = null;
    };
    const onLocal = () => {
      cleanup();
      dialog.close();
      resolve("local");
    };
    const onCloud = () => {
      cleanup();
      dialog.close();
      resolve("cloud");
    };
    const onCancel = (event) => {
      event.preventDefault();
    };
    el.syncChoiceLocal.addEventListener("click", onLocal);
    el.syncChoiceCloud.addEventListener("click", onCloud);
    dialog.addEventListener("cancel", onCancel);
    dialog.showModal();
  });
  return pendingSyncChoice;
}

function askConflictChoice() {
  if (!el.syncConflictDialog || !el.syncConflictLocal || !el.syncConflictCloud || !el.syncConflictCancel) {
    return Promise.resolve("cancel");
  }
  if (pendingConflictChoice) return pendingConflictChoice;
  pendingConflictChoice = new Promise((resolve) => {
    const dialog = el.syncConflictDialog;
    const cleanup = () => {
      el.syncConflictLocal.removeEventListener("click", onLocal);
      el.syncConflictCloud.removeEventListener("click", onCloud);
      el.syncConflictCancel.removeEventListener("click", onCancelButton);
      dialog.removeEventListener("cancel", onCancel);
      pendingConflictChoice = null;
    };
    const onLocal = () => {
      cleanup();
      dialog.close();
      resolve("local");
    };
    const onCloud = () => {
      cleanup();
      dialog.close();
      resolve("cloud");
    };
    const onCancelButton = () => {
      cleanup();
      dialog.close();
      resolve("cancel");
    };
    const onCancel = (event) => {
      event.preventDefault();
    };
    el.syncConflictLocal.addEventListener("click", onLocal);
    el.syncConflictCloud.addEventListener("click", onCloud);
    el.syncConflictCancel.addEventListener("click", onCancelButton);
    dialog.addEventListener("cancel", onCancel);
    dialog.showModal();
  });
  return pendingConflictChoice;
}

function openOnboarding() {
  if (!el.onboardingDialog) return;
  el.onboardingDialog.showModal();
}

function finishOnboarding() {
  state.onboardingSeen = true;
  save({ skipSync: true });
  el.onboardingDialog?.close();
}

function applyDemoData() {
  const now = Date.now();
  const today = todayISO();
  const yesterday = addDaysISO(today, -1);
  const twoDays = addDaysISO(today, -2);
  const mk = monthKeyFromDate(today);
  const dayNum = String(Number(today.slice(8, 10)));
  const yNum = String(Number(yesterday.slice(8, 10)));

  const proj = {
    id: uid("proj"),
    name: "Refonte portfolio",
    color: "#1f8a3b",
    pinned: true,
    archived: false,
    nextActionId: "",
    createdAt: now,
  };
  const habit1 = {
    id: uid("habit"),
    name: "Sport 2x",
    color: "#f59e0b",
    weeklyTarget: 2,
    createdAt: now,
  };
  const habit2 = {
    id: uid("habit"),
    name: "Lecture",
    color: "#2563eb",
    weeklyTarget: 4,
    createdAt: now,
  };

  const task1Id = uid("entry");
  const task2Id = uid("entry");

  state = {
    theme: state.theme,
    route: "dashboard",
    daysView: "all",
    dailyFilter: "all",
    selectedDate: today,
    query: "",
    monthCursor: mk,
    reviewCursor: today,
    reviewFlow: defaultReviewFlow(),
    viewPrefs: defaultViewPrefs(),
    lastLocalChangeAt: now,
    lastSyncAt: 0,
    lastRemoteAt: 0,
    syncHistory: [],
    onboardingSeen: true,
    entries: [
      {
        id: uid("entry"),
        date: today,
        kind: "note",
        time: "08:45",
        tags: ["#journal"],
        text: "Matin calme, envie de prioriser la creation.",
        projectId: "",
        taskState: "open",
        createdAt: now,
      },
      {
        id: task1Id,
        date: today,
        kind: "task",
        time: "10:00",
        tags: ["#focus"],
        text: "Ecrire la page d'accueil",
        projectId: proj.id,
        taskState: "open",
        createdAt: now,
      },
      {
        id: task2Id,
        date: yesterday,
        kind: "task",
        time: "18:00",
        tags: [],
        text: "Configurer Github Pages",
        projectId: proj.id,
        taskState: "done",
        createdAt: now - 10000,
      },
      {
        id: uid("entry"),
        date: twoDays,
        kind: "event",
        time: "14:00",
        tags: ["#rdv"],
        text: "Appel client",
        projectId: "",
        taskState: "open",
        createdAt: now - 20000,
      },
    ],
    templates: [
      { id: uid("tpl"), name: "Morning", lines: "- Priorite 1\n- Priorite 2\n- Priorite 3", createdAt: now },
      { id: uid("tpl"), name: "Review rapide", lines: "- Ce qui a marche\n- Ce qui bloque\n- Next action", createdAt: now },
    ],
    habits: [habit1, habit2],
    habitChecks: {
      [mk]: {
        [habit1.id]: { [dayNum]: true, [yNum]: true },
        [habit2.id]: { [dayNum]: true },
      },
    },
    projects: [proj],
    activeProjectId: proj.id,
    projectMilestones: {
      [proj.id]: [
        { id: uid("ms"), text: "Structure page", date: yesterday, done: true, createdAt: now - 5000 },
        { id: uid("ms"), text: "Hero + CTA", date: today, done: false, createdAt: now },
      ],
    },
    collections: [{ id: uid("col"), name: "Lecture", createdAt: now }],
    collectionItems: {},
    activeCollectionId: null,
    moods: {
      [twoDays]: { level: "yellow", text: "Un peu dispersé." },
      [yesterday]: { level: "green", text: "Bonne energie." },
      [today]: { level: "green", text: "Clair et motive." },
    },
    yearCursor: new Date().getFullYear(),
  };

  const collectionId = state.collections[0]?.id;
  if (collectionId) {
    state.collectionItems[collectionId] = [
      { id: uid("item"), text: "Atomic Habits", tags: ["#livre"], date: today, createdAt: now },
      { id: uid("item"), text: "Deep Work", tags: ["#livre"], date: yesterday, createdAt: now },
    ];
    state.activeCollectionId = collectionId;
  }

  state.projects[0].nextActionId = task1Id;
  applyTheme(state.theme);
  save({ skipSync: true });
  syncAll();
}

function snapshotForSync() {
  return {
    theme: state.theme,
    daysView: state.daysView,
    dailyFilter: state.dailyFilter,
    selectedDate: state.selectedDate,
    query: state.query,
    monthCursor: state.monthCursor,
    reviewCursor: state.reviewCursor,
    reviewFlow: state.reviewFlow,
    viewPrefs: state.viewPrefs,
    entries: state.entries,
    templates: state.templates,
    habits: state.habits,
    habitChecks: state.habitChecks,
    projects: state.projects,
    activeProjectId: state.activeProjectId,
    projectMilestones: state.projectMilestones,
    collections: state.collections,
    collectionItems: state.collectionItems,
    activeCollectionId: state.activeCollectionId,
    moods: state.moods,
    yearCursor: state.yearCursor,
  };
}

function backupLocalState() {
  try {
    localStorage.setItem(SYNC_BACKUP_KEY, JSON.stringify({ app: APP_ID, v: STORAGE_VERSION, ...snapshotForSync() }));
  } catch {
    // ignore
  }
}

function applyRemoteState(remoteState, remoteAt) {
  if (!remoteState || !isPlainObject(remoteState)) return;
  suppressSync = true;
  const payload = { app: APP_ID, v: STORAGE_VERSION, ...remoteState };
  importJson(JSON.stringify(payload), { confirm: false });
  suppressSync = false;
  const stamp = Number.isFinite(remoteAt) ? remoteAt : Date.now();
  state.lastSyncAt = stamp;
  state.lastRemoteAt = stamp;
  save({ skipSync: true, skipLocalStamp: true });
}

async function fetchRemoteState() {
  if (!supabaseClient || !currentUser) return null;
  const { data, error } = await supabaseClient
    .from("user_state")
    .select("state, updated_at")
    .eq("user_id", currentUser.id)
    .maybeSingle();
  if (error) return null;
  if (!data) return null;
  const remoteAt = data.updated_at ? Date.parse(data.updated_at) : 0;
  if (Number.isFinite(remoteAt) && remoteAt > 0) {
    state.lastRemoteAt = remoteAt;
    save({ skipSync: true, skipLocalStamp: true });
  }
  return { state: data.state, updatedAt: remoteAt };
}

async function fetchRemoteUpdatedAt() {
  if (!supabaseClient || !currentUser) return 0;
  const { data, error } = await supabaseClient
    .from("user_state")
    .select("updated_at")
    .eq("user_id", currentUser.id)
    .maybeSingle();
  if (error || !data?.updated_at) return 0;
  const remoteAt = Date.parse(data.updated_at);
  if (Number.isFinite(remoteAt) && remoteAt > 0) {
    state.lastRemoteAt = remoteAt;
    save({ skipSync: true, skipLocalStamp: true });
    return remoteAt;
  }
  return 0;
}

async function pullRemoteState(source = "manuel") {
  const remote = await fetchRemoteState();
  if (!remote || !remote.state) {
    setSyncStatus("Erreur sync", "err");
    pushSyncHistory({ label: "Pull échouée", status: "err" });
    return false;
  }
  applyRemoteState(remote.state, remote.updatedAt);
  setSyncStatus(`Cloud chargé · ${formatTimeShort(remote.updatedAt || Date.now())}`, "ok");
  pushSyncHistory({ label: `Pull ${source}`, status: "ok" });
  return true;
}

async function pushState(reason = "manual", opts = {}) {
  if (!supabaseClient || !currentUser) return;
  if (isSyncing) return;
  const force = Boolean(opts.force);
  isSyncing = true;
  setSyncStatus(reason === "auto" ? "Synchro automatique…" : "Synchro en cours…", "warn");

  const lastSync = typeof state.lastSyncAt === "number" ? state.lastSyncAt : 0;
  const localChanged = (state.lastLocalChangeAt || 0) > lastSync;
  let remoteChanged = false;
  if (!force) {
    const remoteAt = await fetchRemoteUpdatedAt();
    remoteChanged = remoteAt > lastSync;
  }
  if (!force && localChanged && remoteChanged) {
    isSyncing = false;
    setSyncStatus("Conflit de sync", "err");
    pushSyncHistory({ label: "Conflit détecté", status: "warn" });
    const choice = await askConflictChoice();
    if (choice === "local") return pushState("override", { force: true });
    if (choice === "cloud") return pullRemoteState("conflit");
    return;
  }

  const payload = {
    user_id: currentUser.id,
    state: snapshotForSync(),
    version: STORAGE_VERSION,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabaseClient
    .from("user_state")
    .upsert(payload, { onConflict: "user_id" });
  isSyncing = false;
  if (error) {
    setSyncStatus("Erreur sync", "err");
    pushSyncHistory({ label: "Push échouée", status: "err" });
    return;
  }
  lastSyncAt = Date.now();
  state.lastSyncAt = lastSyncAt;
  state.lastRemoteAt = lastSyncAt;
  save({ skipSync: true, skipLocalStamp: true });
  setSyncStatus(`Synchro ok · ${formatTimeShort(lastSyncAt)}`, "ok");
  pushSyncHistory({ label: reason === "auto" ? "Push auto" : "Push manuel", status: "ok" });
}

function queueSync() {
  if (!supabaseClient || !currentUser) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    pushState("auto");
  }, 1200);
}

async function syncOnLogin() {
  if (!supabaseClient || !currentUser) return;
  if (syncBootstrapInFlight) return;
  syncBootstrapInFlight = true;
  setSyncStatus("Connexion…", "warn");
  const { data, error } = await supabaseClient
    .from("user_state")
    .select("state, version, updated_at")
    .eq("user_id", currentUser.id)
    .maybeSingle();
  if (error) {
    setSyncStatus("Erreur sync", "err");
    syncBootstrapInFlight = false;
    return;
  }
  if (!data || !data.state) {
    await pushState("init");
    syncBootstrapInFlight = false;
    return;
  }
  const remoteAt = data.updated_at ? Date.parse(data.updated_at) : 0;
  if (Number.isFinite(remoteAt) && remoteAt > 0) {
    state.lastRemoteAt = remoteAt;
    save({ skipSync: true, skipLocalStamp: true });
  }

  const lastSync = typeof state.lastSyncAt === "number" ? state.lastSyncAt : 0;
  const localChanged = (state.lastLocalChangeAt || 0) > lastSync;
  const remoteChanged = remoteAt > lastSync;

  if (!lastSync) {
    syncPromptedForUserId = currentUser.id;
    const choice = await askSyncChoice();
    backupLocalState();
    if (choice === "local") {
      await pushState("replace", { force: true });
    } else {
      applyRemoteState(data.state, remoteAt);
      setSyncStatus("Cloud chargé", "ok");
      pushSyncHistory({ label: "Pull login", status: "ok" });
    }
    syncBootstrapInFlight = false;
    return;
  }

  if (remoteChanged && !localChanged) {
    await pullRemoteState("auto");
    syncBootstrapInFlight = false;
    return;
  }

  if (!remoteChanged && localChanged) {
    await pushState("auto");
    syncBootstrapInFlight = false;
    return;
  }

  if (!remoteChanged && !localChanged) {
    setSyncStatus(`Sync à jour · ${formatTimeShort(lastSync)}`, "ok");
    syncBootstrapInFlight = false;
    return;
  }

  setSyncStatus("Conflit de sync", "err");
  pushSyncHistory({ label: "Conflit détecté", status: "warn" });
  const choice = await askConflictChoice();
  if (choice === "local") await pushState("override", { force: true });
  if (choice === "cloud") await pullRemoteState("conflit");
  syncBootstrapInFlight = false;
}

async function signInWithEmail() {
  if (!supabaseClient) return;
  const email = (el.authEmail?.value || "").trim();
  const password = el.authPassword?.value || "";
  if (!email || !password) {
    if (el.authError) el.authError.textContent = "Email et mot de passe requis.";
    return;
  }
  if (el.authError) el.authError.textContent = "";
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    if (el.authError) el.authError.textContent = "Connexion impossible. Vérifie tes identifiants.";
    return;
  }
  if (el.authDialog?.open) el.authDialog.close();
}

async function signUpWithEmail() {
  if (!supabaseClient) return;
  const email = (el.authEmail?.value || "").trim();
  const password = el.authPassword?.value || "";
  if (!email || !password) {
    if (el.authError) el.authError.textContent = "Email et mot de passe requis.";
    return;
  }
  if (el.authError) el.authError.textContent = "";
  const { error } = await supabaseClient.auth.signUp({ email, password });
  if (error) {
    if (el.authError) el.authError.textContent = "Création impossible. Vérifie l'email.";
    return;
  }
  if (el.authDialog?.open) el.authDialog.close();
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  currentUser = null;
  syncPromptedForUserId = "";
  syncBootstrapInFlight = false;
  setAuthUi(false);
  setSyncStatus("Déconnecté", "warn");
  renderSyncHistory();
}

function openAuthDialog() {
  if (!syncEnabled()) {
    alert("Sync non configurée. Ajoute SUPABASE_URL et SUPABASE_ANON_KEY.");
    return;
  }
  if (el.authError) el.authError.textContent = "";
  el.authDialog?.showModal();
}

function initSupabase() {
  if (!syncEnabled()) {
    setSyncStatus("Sync non configurée", "warn");
    return;
  }
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    setAuthUi(Boolean(currentUser));
    if (!currentUser) {
      setSyncStatus("Non connecté", "warn");
      renderSyncHistory();
      return;
    }
    const email = currentUser.email ? ` (${currentUser.email})` : "";
    setSyncStatus(`Connecté${email}`, "ok");
    syncOnLogin();
  });

  supabaseClient.auth.getSession().then(({ data }) => {
    currentUser = data?.session?.user || null;
    setAuthUi(Boolean(currentUser));
    if (currentUser) {
      const email = currentUser.email ? ` (${currentUser.email})` : "";
      setSyncStatus(`Connecté${email}`, "ok");
      syncOnLogin();
    } else {
      setSyncStatus("Non connecté", "warn");
    }
    renderSyncHistory();
  });
}

function applyTheme(theme) {
  state.theme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", state.theme);
  const isDark = state.theme === "dark";
  el.btnTheme.setAttribute("aria-pressed", isDark ? "true" : "false");
  el.btnTheme.textContent = isDark ? "☀️ Clair" : "🌙 Sombre";
  save();
}

/* ---------------- Routing ---------------- */

function sanitizeRoute(route) {
  const allowed = new Set(["dashboard", "daily", "review", "monthly", "habits", "projects", "collections", "year"]);
  return allowed.has(route) ? route : "dashboard";
}

function setRoute(route) {
  state.route = sanitizeRoute(route);
  location.hash = `#${state.route}`;
  closeDrawer();
  renderPages();
  save();
}

function renderPages() {
  for (const p of el.pages) p.classList.toggle("is-active", p.dataset.page === state.route);
  for (const t of el.tabs) t.classList.toggle("is-active", t.dataset.route === state.route);

  if (state.route === "daily") renderDaily();
  if (state.route === "review") renderReview();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "habits") renderHabits();
  if (state.route === "projects") renderProjects();
  if (state.route === "collections") renderCollections();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "year") renderYear();
}

/* ---------------- Sidebar (days list) ---------------- */

function uniqueDays() {
  const set = new Set(state.entries.map(e => e.date).filter(Boolean));
  Object.keys(state.moods).forEach(d => set.add(d));

  const days = Array.from(set).sort((a, b) => b.localeCompare(a));
  const t = todayISO();
  if (!days.includes(t)) days.unshift(t);
  return days;
}

function renderDaysList() {
  const days = uniqueDays();
  const filtered = filterDaysByView(days);
  if (el.daysCount) el.daysCount.textContent = String(filtered.length);
  if (!el.daysList) {
    renderTagIndex();
    return;
  }
  el.daysList.innerHTML = "";

  for (const d of filtered.slice(0, 70)) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "daybtn";
    b.textContent = d;
    b.classList.toggle("is-active", d === state.selectedDate);
    b.addEventListener("click", () => setSelectedDate(d, true));
    el.daysList.appendChild(b);
  }

  renderTagIndex();
}

function renderTagIndex() {
  if (!el.tagIndex) return;
  const tags = new Set();
  state.entries.forEach(e => (e.tags || []).forEach(t => tags.add(t)));
  const list = Array.from(tags).sort((a,b) => a.localeCompare(b, "fr")).slice(0, 30);
  el.tagIndex.innerHTML = "";
  if (!list.length) {
    el.tagIndex.innerHTML = `<span class="muted">Aucun tag</span>`;
    return;
  }
  list.forEach(tag => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pill";
    b.textContent = tag;
    b.addEventListener("click", () => {
      el.search.value = tag;
      state.query = tag;
      save();
      setRoute("daily");
      renderDaily();
    });
    el.tagIndex.appendChild(b);
  });
}

function filterDaysByView(days) {
  if (state.daysView === "all") return days;

  const base = state.selectedDate;
  const monthKey = monthKeyFromDate(base);
  if (state.daysView === "month") {
    return days.filter(d => d.startsWith(monthKey));
  }

  const weekday = weekdayMonIndex(base);
  const start = new Date(base + "T00:00:00");
  start.setDate(start.getDate() - weekday);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  return days.filter(d => {
    const dt = new Date(d + "T00:00:00");
    return dt >= start && dt <= end;
  });
}

function setSelectedDate(iso, goDaily = false) {
  state.selectedDate = iso;
  el.datePick.value = state.selectedDate;
  state.monthCursor = monthKeyFromDate(state.selectedDate);
  state.reviewCursor = state.selectedDate;
  save();

  renderDaysList();
  if (goDaily) setRoute("daily");
  if (state.route === "daily") renderDaily();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "review") renderReview();
}

function setDaysView(view) {
  state.daysView = view;
  el.daysView.forEach(b => b.classList.toggle("is-active", b.dataset.days === view));
  save();
  renderDaysList();
}

function openDrawer() {
  document.body.classList.add("drawer-open");
  if (el.btnDrawer) el.btnDrawer.setAttribute("aria-expanded", "true");
}

function closeDrawer() {
  document.body.classList.remove("drawer-open");
  if (el.btnDrawer) el.btnDrawer.setAttribute("aria-expanded", "false");
}

function toggleDrawer() {
  if (document.body.classList.contains("drawer-open")) closeDrawer();
  else openDrawer();
}

function setDailyFilter(filter) {
  state.dailyFilter = normalizeDailyFilter(filter || "all");
  el.dailyFilters.forEach(b => b.classList.toggle("is-active", b.dataset.filter === state.dailyFilter));
  save();
  if (state.route === "daily") renderDaily();
}

function ensureViewPrefs() {
  if (!state.viewPrefs) state.viewPrefs = defaultViewPrefs();
  if (!isPlainObject(state.viewPrefs.dashboard)) state.viewPrefs.dashboard = {};
  if (!isPlainObject(state.viewPrefs.dashboard.widgets)) state.viewPrefs.dashboard.widgets = defaultViewPrefs().dashboard.widgets;
}

function dashboardWidgetPrefs() {
  ensureViewPrefs();
  return state.viewPrefs.dashboard.widgets;
}

function setDashboardWidgetVisibility(widgetId, visible) {
  if (!DASH_WIDGET_IDS.includes(widgetId)) return;
  const prefs = dashboardWidgetPrefs();
  prefs[widgetId] = Boolean(visible);
  save();
  applyDashboardPreferences();
}

function applyDashboardPreferences() {
  const prefs = dashboardWidgetPrefs();
  DASH_WIDGET_IDS.forEach(id => {
    const node = document.querySelector(`[data-widget="${id}"]`);
    if (!node) return;
    const isVisible = prefs[id] !== false;
    node.toggleAttribute("hidden", !isVisible);
    node.style.display = isVisible ? "" : "none";
  });

  const insightsGroup = document.querySelector("[data-widget-group='insights']");
  if (insightsGroup) {
    const allHidden = DASH_INSIGHTS.every(({ id }) => prefs[id] === false);
    insightsGroup.toggleAttribute("hidden", allHidden);
    insightsGroup.style.display = allHidden ? "none" : "";
  }
}

function renderToggleList(container, items) {
  if (!container) return;
  const prefs = dashboardWidgetPrefs();
  container.innerHTML = "";
  items.forEach(item => {
    const label = document.createElement("label");
    label.className = "toggleItem";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.widgetId = item.id;
    input.checked = prefs[item.id] !== false;
    const text = document.createElement("span");
    text.textContent = item.label;
    label.appendChild(input);
    label.appendChild(text);
    container.appendChild(label);
  });
}

function renderDashboardToggles() {
  renderToggleList(el.dashWidgetToggles, DASH_WIDGETS);
  renderToggleList(el.dashInsightToggles, DASH_INSIGHTS);
}

function resetDashboardWidgets() {
  state.viewPrefs = defaultViewPrefs();
  save();
  renderDashboardToggles();
  applyDashboardPreferences();
}

function setReviewFlowMode(mode) {
  ensureReviewFlowState();
  const next = ["daily", "weekly", "monthly"].includes(mode) ? mode : "weekly";
  state.reviewFlow.mode = next;
  save();
  if (state.route === "review") renderReviewFlow();
}

function setEntryFormMode(isEditing) {
  if (!el.btnEntrySubmit || !el.btnCancelEdit) return;
  el.btnEntrySubmit.textContent = isEditing ? "Enregistrer" : "Ajouter";
  el.btnCancelEdit.hidden = !isEditing;
}

function resetEntryForm() {
  el.kind.value = "note";
  el.time.value = "";
  el.tags.value = "";
  el.projectId.value = "";
  el.taskDate.value = "";
  el.text.value = "";
  setEntryFormMode(false);
}

/* ---------------- Mood ---------------- */

function getMood(dateIso) {
  const m = state.moods[dateIso];
  if (!m) return { level: "", text: "" };
  return { level: m.level || "", text: m.text || "" };
}

function setMood(dateIso, level) {
  const cur = getMood(dateIso);
  const next = { level: level === "none" ? "" : level, text: cur.text || "" };

  if (!next.level && !next.text) delete state.moods[dateIso];
  else state.moods[dateIso] = next;

  save();
  renderDaysList();
  if (state.route === "daily") renderMoodUI();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "year") renderYear();
}

function setMoodText(dateIso, text) {
  const cur = getMood(dateIso);
  const clean = String(text || "").trim();
  const next = { level: cur.level || "", text: clean };

  if (!next.level && !next.text) delete state.moods[dateIso];
  else state.moods[dateIso] = next;

  save();
  renderDaysList();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "year") renderYear();
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function entriesForDate(iso) {
  return state.entries.filter(e => e.date === iso);
}

function markdownForDay(iso) {
  const m = getMood(iso);
  const entries = entriesForDate(iso).concat(state.entries.filter(e => e.kind === "task" && !e.date));
  const header = `# ${formatDateFR(iso)}\n`;
  const moodLine = m.level || m.text ? `\n## Mood\n- Niveau: ${m.level || "—"}\n${m.text ? `- Notes: ${m.text}\n` : ""}` : "";
  const list = entries.length ? entries.map(e => {
    const time = e.time ? ` ${e.time}` : "";
    const tags = (e.tags || []).length ? ` ${e.tags.join(" ")}` : "";
    const projName = e.projectId ? projectLabel(e.projectId) : "";
    const proj = projName ? ` [${projName}]` : "";
    const stateLabel = e.kind === "task" ? ` (${taskStateLabel(e.taskState).text})` : "";
    return `- ${kindGlyph(e.kind)}${time} ${e.text}${tags}${proj}${stateLabel}`;
  }).join("\n") : "- (Aucune entree)";
  return `${header}${moodLine}\n## Entrees\n${list}\n`;
}

function markdownForWeek(iso) {
  const weekday = weekdayMonIndex(iso);
  const start = new Date(iso + "T00:00:00");
  start.setDate(start.getDate() - weekday);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const title = `# Semaine du ${formatDateFR(days[0])}\n\n`;
  return title + days.map(d => markdownForDay(d)).join("\n");
}

function markdownForMonth(monthKey) {
  const dim = daysInMonth(monthKey);
  let out = `# Mois ${capitalize(monthTitleFR(monthKey))}\n\n`;
  const floating = state.entries.filter(e => e.kind === "task" && !e.date);
  if (floating.length) {
    out += "## Taches quotidiennes\n";
    floating.forEach(t => {
      out += `- □ ${t.text}\n`;
    });
    out += "\n";
  }
  for (let d = 1; d <= dim; d++) {
    const iso = `${monthKey}-${String(d).padStart(2, "0")}`;
    out += markdownForDay(iso) + "\n";
  }
  return out;
}

function renderMoodUI() {
  const { level, text } = getMood(state.selectedDate);

  el.moodPills.forEach(p => p.classList.toggle("is-active", p.dataset.mood === level));
  if (el.moodText.value !== (text || "")) el.moodText.value = text || "";
}

function moodDotEl(level) {
  const d = document.createElement("span");
  d.className = "dayMood";
  if (level === "green") d.style.background = "var(--mood-green)";
  if (level === "yellow") d.style.background = "var(--mood-yellow)";
  if (level === "red") d.style.background = "var(--mood-red)";
  if (!level) d.style.background = "transparent";
  return d;
}

/* ---------------- Daily ---------------- */

function kindGlyph(kind) {
  if (kind === "event") return "○";
  if (kind === "task") return "□";
  return "•";
}

function kindLabel(kind) {
  if (kind === "event") return "Événement";
  if (kind === "task") return "Tâche";
  return "Note";
}

function badgeClass(kind) {
  if (kind === "event") return "badge--event";
  if (kind === "task") return "badge--task";
  return "badge--note";
}

function taskStateLabel(s) {
  if (s === "done") return { text: "✓ Fait", cls: "state state--done" };
  if (s === "migrated") return { text: "→ Migré", cls: "state state--migrated" };
  if (s === "canceled") return { text: "✕ Annulé", cls: "state state--canceled" };
  return { text: "Ouvert", cls: "state" };
}

function isTaskOpen(entry) {
  return entry.kind === "task" && (entry.taskState === "open" || !entry.taskState);
}

function entryMatchesQuery(entry) {
  const q = normalize(state.query);
  if (!q) return true;
  const proj = projectLabel(entry.projectId || "");
  const hay = normalize(`${entry.kind} ${entry.time || ""} ${(entry.tags || []).join(" ")} ${proj} ${entry.text}`);
  return hay.includes(q);
}

function visibleDailyLogEntries() {
  let list = state.entries.filter(e => e.date === state.selectedDate && (e.kind === "note" || e.kind === "event"));

  if (state.dailyFilter === "note") list = list.filter(e => e.kind === "note");
  if (state.dailyFilter === "event") list = list.filter(e => e.kind === "event");

  list.sort((a, b) => {
    const ta = a.time || "";
    const tb = b.time || "";
    if (ta && tb && ta !== tb) return ta.localeCompare(tb);
    return (a.createdAt || 0) - (b.createdAt || 0);
  });

  return list.filter(entryMatchesQuery);
}

function renderDaily() {
  el.dailyTitle.textContent = formatDateFR(state.selectedDate);
  renderMoodUI();

  const list = visibleDailyLogEntries();
  el.entries.innerHTML = "";
  el.emptyState.hidden = list.length !== 0;

  for (const e of list) el.entries.appendChild(renderDailyEntry(e));
  renderDailyTasksBoard();
  renderWeeklySummary();
}

function renderDailyEntry(entry) {
  const card = document.createElement("article");
  card.className = `entry entry--${entry.kind}`;

  const top = document.createElement("div");
  top.className = "entry__top";

  const meta = document.createElement("div");
  meta.className = "entry__meta";

  const kind = document.createElement("span");
  kind.className = "kind";
  kind.textContent = kindGlyph(entry.kind);

  const badge = document.createElement("span");
  badge.className = `badge ${badgeClass(entry.kind)}`;
  badge.textContent = kindLabel(entry.kind);

  meta.appendChild(kind);
  meta.appendChild(badge);

  if (entry.time) {
    const t = document.createElement("span");
    t.className = "badge";
    t.textContent = entry.time;
    meta.appendChild(t);
  }

  if (entry.kind === "task" && entry.date && entry.date !== state.selectedDate) {
    const d = document.createElement("span");
    d.className = "badge";
    d.textContent = formatDateShortFR(entry.date);
    meta.appendChild(d);
  }

  if (entry.projectId) {
    const proj = projectById(entry.projectId);
    if (proj) {
      const p = document.createElement("span");
      p.className = "badge badge--project badge--link";
      p.textContent = proj.name;
      if (isHexColor(proj.color)) {
        p.style.color = proj.color;
        p.style.borderColor = proj.color;
        p.style.boxShadow = `inset 0 0 0 999px ${hexToRgba(proj.color, 0.16)}`;
      }
      const openProject = () => {
        state.activeProjectId = proj.id;
        save();
        setRoute("projects");
      };
      p.setAttribute("role", "button");
      p.setAttribute("tabindex", "0");
      p.setAttribute("title", "Ouvrir le projet");
      p.addEventListener("click", openProject);
      p.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject();
        }
      });
      meta.appendChild(p);
    }
  }

  if (entry.kind === "task") {
    const st = taskStateLabel(entry.taskState);
    const s = document.createElement("span");
    s.className = `badge ${st.cls}`;
    s.textContent = st.text;
    meta.appendChild(s);

    if (!entry.date) {
      const s2 = document.createElement("span");
      s2.className = "badge";
      s2.textContent = "Quotidien";
      meta.appendChild(s2);
    }
  }

  top.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "entry__actions";

  if (entry.kind === "task") {
    actions.appendChild(mkAction("✓", "Fait", () => setTaskState(entry.id, "done")));
    actions.appendChild(mkAction("→", "Migrer", () => setTaskState(entry.id, "migrated")));
    actions.appendChild(mkAction("✕", "Annuler", () => setTaskState(entry.id, "canceled")));
  }

  actions.appendChild(mkAction("✏️", "Modifier", () => editDailyEntry(entry.id)));
  actions.appendChild(mkAction("🗑️", "Supprimer", () => deleteDailyEntry(entry.id)));

  top.appendChild(actions);

  const text = document.createElement("div");
  text.className = "entry__text";
  text.textContent = entry.text;

  const tags = document.createElement("div");
  tags.className = "tags";
  tags.textContent = (entry.tags || []).join(" ");

  card.appendChild(top);
  card.appendChild(text);
  if ((entry.tags || []).length) card.appendChild(tags);

  return card;
}

function renderTaskList(container, list, emptyText) {
  if (!container) return;
  container.innerHTML = "";
  if (!list.length) {
    container.appendChild(mutedBox(emptyText));
    return;
  }
  list.forEach(task => container.appendChild(renderDailyEntry(task)));
}

function sortTasksByDate(list) {
  return list.sort((a, b) => {
    const da = a.date || "9999-99-99";
    const db = b.date || "9999-99-99";
    if (da !== db) return da.localeCompare(db);
    const ta = a.time || "";
    const tb = b.time || "";
    if (ta !== tb) return ta.localeCompare(tb);
    return (a.createdAt || 0) - (b.createdAt || 0);
  });
}

function renderDailyTasksBoard() {
  if (!el.dailyTasksToday) return;
  const today = state.selectedDate;
  const tasks = state.entries
    .filter(e => e.kind === "task")
    .filter(entryMatchesQuery);

  const open = tasks.filter(isTaskOpen);
  const closed = tasks.filter(e => !isTaskOpen(e));

  const todayOpen = sortTasksByDate(open.filter(e => e.date === today));
  const upcomingOpen = sortTasksByDate(open.filter(e => e.date && e.date > today));
  const backlogOpen = sortTasksByDate(open.filter(e => !e.date || e.date < today));
  const doneToday = sortTasksByDate(closed.filter(e => e.date === today));

  if (el.dailyTaskCountToday) el.dailyTaskCountToday.textContent = String(todayOpen.length);
  if (el.dailyTaskCountUpcoming) el.dailyTaskCountUpcoming.textContent = String(upcomingOpen.length);
  if (el.dailyTaskCountBacklog) el.dailyTaskCountBacklog.textContent = String(backlogOpen.length);
  if (el.dailyTaskCountDone) el.dailyTaskCountDone.textContent = String(doneToday.length);

  renderTaskList(el.dailyTasksToday, todayOpen, "Aucune tâche pour aujourd’hui.");
  renderTaskList(el.dailyTasksUpcoming, upcomingOpen, "Rien de planifié.");
  renderTaskList(el.dailyTasksBacklog, backlogOpen, "Backlog vide.");
  renderTaskList(el.dailyTasksDone, doneToday, "Aucune tâche terminée.");

  if (el.dailyTasksDoneWrap) {
    const hideDone = Boolean(el.filterOpenTasks?.checked);
    el.dailyTasksDoneWrap.hidden = hideDone;
    if (!hideDone) el.dailyTasksDoneWrap.open = doneToday.length > 0;
  }
}

function renderWeeklySummary() {
  if (!el.weeklySummary) return;
  el.weeklySummary.innerHTML = "";
  const start = weekStartISO(state.selectedDate);
  const days = weekDates(start);
  const index = buildDateIndex(state.entries);
  days.forEach(iso => {
    const stats = index.get(iso) || { events: 0, tasksOpen: 0 };
    const label = formatDateFR(iso);
    const meta = `□ ${stats.tasksOpen} • ○ ${stats.events}`;
    const row = clickableLine(label, meta, () => setSelectedDate(iso, true));
    el.weeklySummary.appendChild(row);
  });
}

function renderDailyFloatingTasks() {
  if (!el.dailyFloatingTasks) return;
  el.dailyFloatingTasks.innerHTML = "";
  const tasks = state.entries
    .filter(e => e.kind === "task" && !e.date && (e.taskState === "open" || !e.taskState));

  if (!tasks.length) {
    const line = mutedBox("Aucune tâche quotidienne.");
    el.dailyFloatingTasks.appendChild(line);
    return;
  }

  tasks.forEach(t => {
    const row = clickableLine(`□ ${t.text}`, "Quotidien", () => editDailyEntry(t.id));
    el.dailyFloatingTasks.appendChild(row);
  });
}

function mkAction(label, title, onClick) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "smallbtn";
  b.textContent = label;
  b.title = title;
  b.addEventListener("click", onClick);
  return b;
}

function makeEntry({ date, kind, time, tags, text, projectId }) {
  const cleanText = String(text || "").trim();
  if (!cleanText) return null;
  return {
    id: uid("entry"),
    date,
    kind,
    time: time || "",
    tags: tags || [],
    text: cleanText,
    projectId: projectId || "",
    taskState: kind === "task" ? "open" : undefined,
    createdAt: Date.now(),
  };
}

function miniBtn(label, title, onClick) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "miniBtn";
  b.textContent = label;
  b.title = title;
  b.addEventListener("click", onClick);
  return b;
}

function addEntriesBulk(list) {
  if (!list.length) return;
  state.entries.push(...list);
  save();
  renderDaysList();

  if (state.route === "daily") renderDaily();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "projects") renderProjects();
}

function addDailyEntry({ date, kind, time, tags, text, projectId }) {
  const entry = makeEntry({ date, kind, time, tags, text, projectId });
  if (!entry) return;
  addEntriesBulk([entry]);
}

function updateDailyEntry(id, { date, kind, time, tags, text, projectId }) {
  const entry = state.entries.find(e => e.id === id);
  if (!entry) return false;
  const cleanText = String(text || "").trim();
  if (!cleanText) return false;

  entry.kind = kind;
  entry.date = date;
  entry.time = time || "";
  entry.tags = tags || [];
  entry.text = cleanText;
  entry.projectId = projectId || "";

  if (kind === "task") {
    entry.taskState = entry.taskState || "open";
  } else {
    delete entry.taskState;
  }

  cleanupProjectNextActions();
  save();
  renderDaysList();
  if (state.route === "daily") renderDaily();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "projects") renderProjects();
  if (state.route === "review") renderReview();
  return true;
}

function deleteDailyEntry(id) {
  const ok = confirm("Supprimer cette entrée ?");
  if (!ok) return;
  state.entries = state.entries.filter(e => e.id !== id);
  cleanupProjectNextActions();
  save();
  renderDaysList();

  if (state.route === "daily") renderDaily();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "projects") renderProjects();
  if (editingEntryId === id) {
    editingEntryId = null;
    resetEntryForm();
  }
}

function setTaskState(id, next) {
  const entry = state.entries.find(e => e.id === id);
  if (!entry || entry.kind !== "task") return;
  entry.taskState = next;
  save();
  if (state.route === "daily") renderDaily();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "review") renderReview();
  if (state.route === "projects") renderProjects();
}

function rescheduleTask(id, dateIso) {
  const entry = state.entries.find(e => e.id === id);
  if (!entry || entry.kind !== "task") return;
  entry.date = dateIso || "";
  if (!entry.taskState) entry.taskState = "open";
  save();
  renderDaysList();
  if (state.route === "daily") renderDaily();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "review") renderReview();
  if (state.route === "projects") renderProjects();
}

function editDailyEntry(id) {
  const entry = state.entries.find(e => e.id === id);
  if (!entry) return;

  editingEntryId = entry.id;
  setEntryFormMode(true);

  el.kind.value = entry.kind;
  el.time.value = entry.time || "";
  el.tags.value = (entry.tags || []).join(" ");
  el.projectId.value = entry.projectId || "";
  el.text.value = entry.text;
  el.taskDate.value = entry.kind === "task" ? (entry.date || "") : "";

  el.text.focus();
}

function clearDay(iso) {
  const count = state.entries.filter(e => e.date === iso).length;
  const ok = confirm(`Vider ${count} entrée(s) du ${iso} ?`);
  if (!ok) return;
  state.entries = state.entries.filter(e => e.date !== iso);
  save();
  renderDaysList();
  if (state.route === "daily") renderDaily();
  if (state.route === "monthly") renderMonthly();
  if (state.route === "dashboard") renderDashboard();
  if (state.route === "projects") renderProjects();
}

/* ---------------- Templates ---------------- */

function parseTemplateLine(raw) {
  let line = String(raw || "").trim();
  if (!line) return null;

  let kind = "note";
  let noDate = false;

  if (/^-\s*\[\s*\]/.test(line) || /^\[\s*\]/.test(line)) {
    kind = "task";
    line = line.replace(/^-\s*\[\s*\]\s*/, "").replace(/^\[\s*\]\s*/, "");
  } else if (line.startsWith("□∞")) {
    kind = "task";
    noDate = true;
    line = line.slice(2).trim();
  } else if (line.startsWith("□")) {
    kind = "task";
    line = line.slice(1).trim();
  } else if (line.startsWith("○")) {
    kind = "event";
    line = line.slice(1).trim();
  } else if (line.startsWith("•")) {
    kind = "note";
    line = line.slice(1).trim();
  }

  let time = "";
  const timeMatch = line.match(/^(\d{1,2}:\d{2})\s+/);
  if (timeMatch) {
    time = timeMatch[1];
    line = line.slice(timeMatch[0].length);
  }

  const tags = extractTagsFromText(line);
  const text = stripTagsFromText(line);
  if (!text) return null;

  return { kind, time, text, tags, noDate };
}

function addTemplate(name, lines) {
  const cleanName = clampName(name, 24);
  const cleanLines = String(lines || "").trim();
  if (!cleanName || !cleanLines) return alert("Nom + lignes requis.");

  const exists = state.templates.some(t => normalize(t.name) === normalize(cleanName));
  if (exists) return alert("Ce template existe déjà.");

  state.templates.unshift({
    id: uid("tpl"),
    name: cleanName,
    lines: cleanLines,
    createdAt: Date.now(),
  });
  save();
  renderTemplates();
}

function deleteTemplate(id) {
  const ok = confirm("Supprimer ce template ?");
  if (!ok) return;
  state.templates = state.templates.filter(t => t.id !== id);
  save();
  renderTemplates();
}

function applyTemplate(id) {
  const tpl = state.templates.find(t => t.id === id);
  if (!tpl) return;
  const lines = tpl.lines.split("\n").map(l => parseTemplateLine(l)).filter(Boolean);
  const entries = lines.map(l => makeEntry({
    date: l.noDate ? "" : state.selectedDate,
    kind: l.kind,
    time: l.time,
    tags: l.tags,
    text: l.text,
    projectId: "",
  })).filter(Boolean);
  addEntriesBulk(entries);
}

function renderTemplates() {
  if (!el.templateList) return;
  el.templateList.innerHTML = "";

  if (!state.templates.length) {
    const empty = document.createElement("div");
    empty.className = "entry";
    empty.textContent = "Aucun template. Crée une première routine.";
    el.templateList.appendChild(empty);
    return;
  }

  state.templates.forEach(t => {
    const card = document.createElement("article");
    card.className = "entry";

    const top = document.createElement("div");
    top.className = "entry__top";

    const meta = document.createElement("div");
    meta.className = "entry__meta";

    const badge = document.createElement("span");
    badge.className = "badge badge--note";
    badge.textContent = t.name;
    meta.appendChild(badge);
    top.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "entry__actions";
    actions.appendChild(mkAction("+", "Appliquer", () => applyTemplate(t.id)));
    actions.appendChild(mkAction("🗑️", "Supprimer", () => deleteTemplate(t.id)));
    top.appendChild(actions);

    const preview = document.createElement("div");
    preview.className = "templatePreview";
    preview.textContent = t.lines.split("\n").slice(0, 4).join("\n");

    card.appendChild(top);
    card.appendChild(preview);
    el.templateList.appendChild(card);
  });
}

/* ---------------- Monthly ---------------- */

function entriesInMonth(monthKey) {
  return state.entries.filter(e => e.date && e.date.startsWith(monthKey));
}

function renderMonthly() {
  el.monthTitle.textContent = capitalize(monthTitleFR(state.monthCursor));

  const firstIso = `${state.monthCursor}-01`;
  const firstWeekday = weekdayMonIndex(firstIso);
  const dim = daysInMonth(state.monthCursor);

  const prevKey = addMonths(state.monthCursor, -1);
  const prevDim = daysInMonth(prevKey);

  const totalCells = 42;
  const dateIndex = buildDateIndex(state.entries);

  el.calendarGrid.innerHTML = "";

  for (let i = 0; i < totalCells; i++) {
    let dayNum, cellIso, isOut = false, isInMonth = true;

    if (i < firstWeekday) {
      dayNum = prevDim - (firstWeekday - 1 - i);
      cellIso = isoFromMonthDay(prevKey, dayNum);
      isOut = true;
      isInMonth = false;
    } else if (i >= firstWeekday + dim) {
      dayNum = i - (firstWeekday + dim) + 1;
      const nextKey = addMonths(state.monthCursor, 1);
      cellIso = isoFromMonthDay(nextKey, dayNum);
      isOut = true;
      isInMonth = false;
    } else {
      dayNum = i - firstWeekday + 1;
      cellIso = isoFromMonthDay(state.monthCursor, dayNum);
    }

    const cell = document.createElement("div");
    cell.className = "dayCell";
    if (isOut) cell.classList.add("is-out");
    if (cellIso === todayISO()) cell.classList.add("is-today");

    const top = document.createElement("div");
    top.className = "dayNum";

    const left = document.createElement("span");
    left.textContent = String(dayNum);

    const stats = dateIndex.get(cellIso) || { events: 0, tasksOpen: 0, notes: 0 };
    const evCount = isInMonth ? stats.events : 0;

    const dot = moodDotEl(getMood(cellIso).level);
    dot.title = getMood(cellIso).level ? `Mood: ${getMood(cellIso).level}` : "Mood: none";

    const right = document.createElement("small");
    right.textContent = evCount ? `○ ${evCount}` : "";

    top.appendChild(left);
    top.appendChild(dot);
    top.appendChild(right);

    const badges = document.createElement("div");
    badges.className = "dayBadges";

    if (isInMonth) {
      if (stats.events) badges.appendChild(miniBadge(`Events: ${stats.events}`));
      if (stats.tasksOpen) badges.appendChild(miniBadge(`Tasks: ${stats.tasksOpen}`));
      if (stats.notes) badges.appendChild(miniBadge(`Notes: ${stats.notes}`));
    }

    cell.appendChild(top);
    if (badges.childNodes.length) cell.appendChild(badges);

    cell.addEventListener("click", () => setSelectedDate(cellIso, true));
    el.calendarGrid.appendChild(cell);
  }
}

function miniBadge(text) {
  const b = document.createElement("span");
  b.className = "miniBadge";
  b.textContent = text;
  return b;
}

/* ---------------- Habits ---------------- */

function monthChecks(monthKey) {
  if (!state.habitChecks[monthKey]) state.habitChecks[monthKey] = {};
  return state.habitChecks[monthKey];
}

function habitCheck(monthKey, habitId) {
  const m = monthChecks(monthKey);
  if (!m[habitId]) m[habitId] = {};
  return m[habitId];
}

function habitStreak(habitId, endIso = todayISO()) {
  let streak = 0;
  let cursor = endIso;
  while (true) {
    const mk = monthKeyFromDate(cursor);
    const checks = state.habitChecks[mk]?.[habitId] || {};
    const dayNum = String(Number(cursor.slice(8, 10)));
    if (!checks[dayNum]) break;
    streak += 1;
    cursor = addDaysISO(cursor, -1);
  }
  return streak;
}

function addHabit(name, color, weeklyTarget) {
  const clean = clampName(name, 22);
  if (!clean) return alert("Nom d’habitude requis.");

  const exists = state.habits.some(h => normalize(h.name) === normalize(clean));
  if (exists) return alert("Cette habitude existe déjà.");

  state.habits.push({
    id: uid("habit"),
    name: clean,
    color: isHexColor(color) ? color : "#19500e",
    weeklyTarget: clampWeeklyTarget(weeklyTarget),
    createdAt: Date.now(),
  });

  save();
  if (state.route === "habits") renderHabits();
  if (state.route === "dashboard") renderDashboard();
}

function setHabitTarget(habitId, target) {
  const habit = state.habits.find(h => h.id === habitId);
  if (!habit) return;
  habit.weeklyTarget = clampWeeklyTarget(target);
  save();
  if (state.route === "habits") renderHabits();
  if (state.route === "dashboard") renderDashboard();
}

function deleteHabit(habitId) {
  const habit = state.habits.find(h => h.id === habitId);
  if (!habit) return;
  const ok = confirm(`Supprimer l’habitude "${habit.name}" ?`);
  if (!ok) return;

  state.habits = state.habits.filter(h => h.id !== habitId);

  for (const mk of Object.keys(state.habitChecks)) {
    if (state.habitChecks[mk] && state.habitChecks[mk][habitId]) delete state.habitChecks[mk][habitId];
  }

  save();
  if (state.route === "habits") renderHabits();
  if (state.route === "dashboard") renderDashboard();
}

function toggleHabitDay(monthKey, habitId, day, enabled) {
  const dim = daysInMonth(monthKey);
  if (day < 1 || day > dim) return;

  const hc = habitCheck(monthKey, habitId);
  if (!enabled) delete hc[String(day)];
  else hc[String(day)] = true;

  save();
  if (state.route === "habits") renderHabits();
  if (state.route === "dashboard") renderDashboard();
}

function clearHabitsMonth(monthKey) {
  const ok = confirm(`Réinitialiser toutes les cases du mois ${capitalize(monthTitleFR(monthKey))} ?`);
  if (!ok) return;

  state.habitChecks[monthKey] = {};
  save();
  if (state.route === "habits") renderHabits();
  if (state.route === "dashboard") renderDashboard();
}

function renderHabits() {
  el.habTitle.textContent = capitalize(monthTitleFR(state.monthCursor));
  const dim = daysInMonth(state.monthCursor);
  const today = todayISO();
  const isCurrentMonth = state.monthCursor === today.slice(0, 7);
  const todayDay = isCurrentMonth ? Number(today.slice(8, 10)) : null;
  const weekStart = weekStartISO(today);
  const weekIndex = weekdayMonIndex(today) + 1;
  el.habitStats.textContent = `${state.habits.length} habitude(s)`;

  el.habitTable.innerHTML = "";

  const header = document.createElement("div");
  header.className = "hHeaderRow";

  const left = document.createElement("div");
  left.className = "hName";
  left.textContent = "Habitude";

  const days = document.createElement("div");
  days.className = "hDays";
  for (let d = 1; d <= 31; d++) {
    const hd = document.createElement("div");
    hd.className = "hDay";
    hd.textContent = String(d);
    if (d > dim) hd.style.opacity = "0.3";
    if (todayDay && d === todayDay) hd.classList.add("is-today");
    days.appendChild(hd);
  }

  header.appendChild(left);
  header.appendChild(days);
  el.habitTable.appendChild(header);

  if (state.habits.length === 0) {
    const empty = document.createElement("div");
    empty.className = "entry";
    empty.textContent = "Ajoute ta première habitude ci-dessus (ex: Lire 10 min).";
    el.habitTable.appendChild(empty);
    return;
  }

  for (const h of state.habits) {
    const row = document.createElement("div");
    row.className = "hRow";

    const nameCell = document.createElement("div");
    nameCell.className = "hName";

    const main = document.createElement("div");
    main.className = "hName__main";

    const top = document.createElement("div");
    top.className = "hName__top";

    const dot = document.createElement("span");
    dot.className = "hDot";
    dot.style.background = h.color;

    const label = document.createElement("span");
    label.className = "hName__label";
    label.textContent = h.name;

    const actions = document.createElement("div");
    actions.className = "hActions";
    const goalSelect = document.createElement("select");
    goalSelect.className = "select habitGoalSelect";
    for (let i = 1; i <= 7; i++) {
      const opt = document.createElement("option");
      opt.value = String(i);
      opt.textContent = String(i);
      goalSelect.appendChild(opt);
    }
    goalSelect.value = String(clampWeeklyTarget(h.weeklyTarget));
    goalSelect.title = "Objectif hebdo (1-7)";
    goalSelect.addEventListener("change", () => setHabitTarget(h.id, goalSelect.value));
    actions.appendChild(goalSelect);
    actions.appendChild(mkAction("🗑️", "Supprimer", () => deleteHabit(h.id)));

    top.appendChild(dot);
    top.appendChild(label);
    top.appendChild(actions);

    const meta = document.createElement("div");
    meta.className = "hName__meta";

    const weeklyTarget = clampWeeklyTarget(h.weeklyTarget);
    const weekDone = habitDoneCountForWeek(h.id, weekStart);
    const streak = habitStreak(h.id, today);
    const pctDone = weeklyTarget ? Math.min(100, Math.round((weekDone / weeklyTarget) * 100)) : 0;

    const progress = stackBar([
      { cls: "progressSeg--done", pct: pctDone },
      { cls: "progressSeg--rest", pct: Math.max(0, 100 - pctDone) },
    ], "progressBar habitProgress");

    const metaLine = document.createElement("div");
    metaLine.className = "hMetaLine";

    const goalBadge = document.createElement("span");
    goalBadge.className = "habitBadge";
    goalBadge.textContent = `${weekDone}/${weeklyTarget} sem.`;

    const streakBadge = document.createElement("span");
    streakBadge.className = "habitBadge";
    streakBadge.textContent = `Streak ${streak}j`;

    metaLine.appendChild(goalBadge);
    metaLine.appendChild(streakBadge);

    const expected = Math.ceil((weeklyTarget * weekIndex) / 7);
    const remaining = Math.max(0, weeklyTarget - weekDone);
    const isBehind = remaining > 0 && weekDone < expected;
    if (isBehind) {
      const hint = document.createElement("span");
      hint.className = "habitHint";
      hint.textContent = `Reste ${remaining}`;
      metaLine.appendChild(hint);
    }

    meta.appendChild(progress);
    meta.appendChild(metaLine);

    main.appendChild(top);
    main.appendChild(meta);
    nameCell.appendChild(main);

    const cells = document.createElement("div");
    cells.className = "hCells";

    const hc = habitCheck(state.monthCursor, h.id);
    for (let d = 1; d <= 31; d++) {
      const c = document.createElement("div");
      c.className = "hCell";
      const disabled = d > dim;
      if (disabled) c.classList.add("is-disabled");
      if (todayDay && d === todayDay) c.classList.add("is-today");

      const on = Boolean(hc[String(d)]);
      if (on) c.classList.add("is-on");

      c.textContent = on ? "✓" : "";
      if (on) c.style.boxShadow = `inset 0 0 0 999px ${hexToRgba(h.color, 0.18)}`;

      c.addEventListener("click", () => {
        if (disabled) return;
        toggleHabitDay(state.monthCursor, h.id, d, !on);
      });

      cells.appendChild(c);
    }

    if (isBehind) row.classList.add("is-behind");
    row.appendChild(nameCell);
    row.appendChild(cells);
    el.habitTable.appendChild(row);
  }
}

/* ---------------- Collections ---------------- */

function addCollection(name) {
  const clean = clampName(name, 22);
  if (!clean) return alert("Nom de collection requis.");

  const exists = state.collections.some(c => normalize(c.name) === normalize(clean));
  if (exists) return alert("Cette collection existe déjà.");

  const c = { id: uid("col"), name: clean, createdAt: Date.now() };
  state.collections.unshift(c);
  state.collectionItems[c.id] = state.collectionItems[c.id] || [];
  state.activeCollectionId = c.id;

  save();
  renderCollections();
  if (state.route === "dashboard") renderDashboard();
}

function deleteCollection(collectionId) {
  const col = state.collections.find(c => c.id === collectionId);
  if (!col) return;

  const count = (state.collectionItems[collectionId] || []).length;
  const ok = confirm(`Supprimer la collection "${col.name}" ?\nItems: ${count}\n\nIrréversible.`);
  if (!ok) return;

  state.collections = state.collections.filter(c => c.id !== collectionId);
  delete state.collectionItems[collectionId];

  if (state.activeCollectionId === collectionId) state.activeCollectionId = state.collections[0]?.id || null;

  save();
  renderCollections();
  if (state.route === "dashboard") renderDashboard();
}

function addCollectionItem(collectionId, { text, tags, date }) {
  if (!collectionId) return;
  const cleanText = String(text || "").trim();
  if (!cleanText) return;

  const item = { id: uid("item"), text: cleanText, tags: tags || [], date: date || "", createdAt: Date.now() };

  state.collectionItems[collectionId] = state.collectionItems[collectionId] || [];
  state.collectionItems[collectionId].unshift(item);

  save();
  renderCollections();
  if (state.route === "dashboard") renderDashboard();
}

function deleteCollectionItem(collectionId, itemId) {
  const ok = confirm("Supprimer cet item ?");
  if (!ok) return;

  state.collectionItems[collectionId] = (state.collectionItems[collectionId] || []).filter(i => i.id !== itemId);
  save();
  renderCollections();
  if (state.route === "dashboard") renderDashboard();
}

function renderCollections() {
  el.collectionsList.innerHTML = "";

  if (state.collections.length === 0) {
    const empty = document.createElement("div");
    empty.className = "entry";
    empty.textContent = "Crée ta première collection (ex: Projets, Études, Idées…).";
    el.collectionsList.appendChild(empty);

    el.collectionTitle.textContent = "Aucune collection";
    el.collectionMeta.textContent = "Crée une collection à gauche.";
    el.btnDeleteCollection.disabled = true;
    el.collectionItemForm.hidden = true;
    el.collectionItems.innerHTML = "";
    return;
  }

  for (const c of state.collections) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "collectionBtn";
    btn.classList.toggle("is-active", c.id === state.activeCollectionId);

    const left = document.createElement("div");
    left.textContent = c.name;

    const right = document.createElement("small");
    right.textContent = `${(state.collectionItems[c.id] || []).length} item(s)`;

    btn.appendChild(left);
    btn.appendChild(right);

    btn.addEventListener("click", () => {
      state.activeCollectionId = c.id;
      save();
      renderCollections();
    });

    el.collectionsList.appendChild(btn);
  }

  const active = state.collections.find(c => c.id === state.activeCollectionId) || state.collections[0];
  state.activeCollectionId = active.id;

  el.collectionTitle.textContent = active.name;
  const count = (state.collectionItems[active.id] || []).length;
  el.collectionMeta.textContent = `${count} item(s) — Ajoute des notes liées à ce thème.`;

  el.btnDeleteCollection.disabled = false;
  el.btnDeleteCollection.onclick = () => deleteCollection(active.id);

  el.collectionItemForm.hidden = false;

  el.collectionItems.innerHTML = "";
  const items = state.collectionItems[active.id] || [];

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "entry";
    empty.textContent = "Aucun item. Ajoute le premier juste au-dessus 👆";
    el.collectionItems.appendChild(empty);
  } else {
    for (const it of items) el.collectionItems.appendChild(renderCollectionItem(active.id, it));
  }
}

function renderCollectionItem(collectionId, it) {
  const card = document.createElement("article");
  card.className = "entry";

  const top = document.createElement("div");
  top.className = "entry__top";

  const meta = document.createElement("div");
  meta.className = "entry__meta";

  const badge = document.createElement("span");
  badge.className = "badge badge--note";
  badge.textContent = "Collection";

  meta.appendChild(badge);

  if (it.date) {
    const d = document.createElement("span");
    d.className = "badge";
    d.textContent = it.date;
    meta.appendChild(d);
  }

  top.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "entry__actions";
  actions.appendChild(mkAction("🗑️", "Supprimer", () => deleteCollectionItem(collectionId, it.id)));
  top.appendChild(actions);

  const text = document.createElement("div");
  text.className = "entry__text";
  text.textContent = it.text;

  card.appendChild(top);
  card.appendChild(text);

  if (it.tags && it.tags.length) {
    const tags = document.createElement("div");
    tags.className = "tags";
    tags.textContent = it.tags.join(" ");
    card.appendChild(tags);
  }

  return card;
}

/* ---------------- Projects ---------------- */

function renderProjectOptions() {
  if (!el.projectId) return;
  const current = el.projectId.value;
  el.projectId.innerHTML = "";

  const optNone = document.createElement("option");
  optNone.value = "";
  optNone.textContent = "Aucun";
  el.projectId.appendChild(optNone);

  orderedProjects().forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.archived ? `${p.name} (archivé)` : p.name;
    if (p.archived) opt.disabled = true;
    el.projectId.appendChild(opt);
  });

  el.projectId.value = state.projects.some(p => p.id === current) ? current : "";
}

function addProject(name, color) {
  const clean = clampName(name, 22);
  if (!clean) return alert("Nom de projet requis.");
  const exists = state.projects.some(p => normalize(p.name) === normalize(clean));
  if (exists) return alert("Ce projet existe déjà.");

  const p = {
    id: uid("proj"),
    name: clean,
    color: isHexColor(color) ? color : "#19500e",
    pinned: false,
    archived: false,
    nextActionId: "",
    createdAt: Date.now(),
  };
  state.projects.unshift(p);
  state.activeProjectId = p.id;
  state.projectMilestones[p.id] = state.projectMilestones[p.id] || [];
  save();
  renderProjectOptions();
  if (state.route === "projects") renderProjects();
  if (state.route === "dashboard") renderDashboard();
}

function toggleProjectPin(projectId) {
  const proj = state.projects.find(p => p.id === projectId);
  if (!proj) return;
  proj.pinned = !proj.pinned;
  save();
  renderProjectOptions();
  if (state.route === "projects") renderProjects();
}

function toggleProjectArchive(projectId) {
  const proj = state.projects.find(p => p.id === projectId);
  if (!proj) return;
  proj.archived = !proj.archived;
  if (proj.archived) proj.pinned = false;

  if (proj.archived && state.activeProjectId === proj.id) {
    const next = state.projects.find(p => !p.archived) || proj;
    state.activeProjectId = next?.id || null;
  }

  save();
  renderProjectOptions();
  if (state.route === "projects") renderProjects();
  if (state.route === "dashboard") renderDashboard();
}

function deleteProject(projectId) {
  const proj = state.projects.find(p => p.id === projectId);
  if (!proj) return;
  const ok = confirm(`Supprimer le projet "${proj.name}" ?`);
  if (!ok) return;

  state.projects = state.projects.filter(p => p.id !== projectId);
  delete state.projectMilestones[projectId];
  state.entries.forEach(e => {
    if (e.projectId === projectId) e.projectId = "";
  });

  if (state.activeProjectId === projectId) state.activeProjectId = state.projects[0]?.id || null;

  save();
  renderProjectOptions();
  if (state.route === "projects") renderProjects();
  if (state.route === "dashboard") renderDashboard();
}

function projectEntries(projectId) {
  return state.entries.filter(e => e.projectId === projectId);
}

function projectMilestones(projectId) {
  if (!state.projectMilestones[projectId]) state.projectMilestones[projectId] = [];
  return state.projectMilestones[projectId];
}

function cleanupProjectNextActions() {
  let changed = false;
  state.projects.forEach(p => {
    if (!p.nextActionId) return;
    const entry = state.entries.find(e => e.id === p.nextActionId);
    if (!entry || entry.projectId !== p.id || entry.kind !== "task") {
      p.nextActionId = "";
      changed = true;
    }
  });
  return changed;
}

function projectNextActionEntry(project) {
  if (!project || !project.nextActionId) return null;
  const entry = state.entries.find(e => e.id === project.nextActionId);
  if (!entry || entry.projectId !== project.id || entry.kind !== "task") return null;
  return entry;
}

function setProjectNextAction(projectId, entryId) {
  const project = projectById(projectId);
  if (!project) return;
  const entry = state.entries.find(e => e.id === entryId);
  if (!entry || entry.projectId !== projectId || entry.kind !== "task") return;
  project.nextActionId = entry.id;
  save();
  if (state.route === "projects") renderProjects();
}

function toggleProjectNextAction(projectId, entryId) {
  const project = projectById(projectId);
  if (!project) return;
  if (project.nextActionId === entryId) {
    project.nextActionId = "";
    save();
    if (state.route === "projects") renderProjects();
    return;
  }
  setProjectNextAction(projectId, entryId);
}

function clearProjectNextAction(projectId) {
  const project = projectById(projectId);
  if (!project) return;
  if (!project.nextActionId) return;
  project.nextActionId = "";
  save();
  if (state.route === "projects") renderProjects();
}

function setProjectFormsDisabled(disabled) {
  const inputs = [
    el.projectTaskText,
    el.projectTaskDate,
    el.projectMilestoneText,
    el.projectMilestoneDate,
  ];
  inputs.forEach(input => {
    if (!input) return;
    input.disabled = disabled;
  });
  if (el.projectTaskForm) {
    const btn = el.projectTaskForm.querySelector("button[type='submit']");
    if (btn) btn.disabled = disabled;
  }
  if (el.projectMilestoneForm) {
    const btn = el.projectMilestoneForm.querySelector("button[type='submit']");
    if (btn) btn.disabled = disabled;
  }
}

function addProjectMilestone(projectId, text, date) {
  if (!projectId) return;
  const cleanText = String(text || "").trim();
  if (!cleanText) return;
  const item = {
    id: uid("ms"),
    text: cleanText,
    date: typeof date === "string" ? date : "",
    done: false,
    createdAt: Date.now(),
  };
  projectMilestones(projectId).push(item);
  save();
  if (state.route === "projects") renderProjects();
}

function toggleProjectMilestone(projectId, milestoneId) {
  const items = projectMilestones(projectId);
  const item = items.find(m => m.id === milestoneId);
  if (!item) return;
  item.done = !item.done;
  save();
  if (state.route === "projects") renderProjects();
}

function renderProjectMilestones(projectId, archived = false) {
  if (!el.projectMilestoneList) return;
  el.projectMilestoneList.innerHTML = "";

  const items = projectMilestones(projectId);
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "itemLine itemLine--compact";
    empty.style.color = "var(--muted)";
    empty.textContent = "Aucun jalon pour l’instant.";
    el.projectMilestoneList.appendChild(empty);
    return;
  }

  const sorted = items.slice().sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (a.date || "9999-99-99").localeCompare(b.date || "9999-99-99");
  });

  sorted.forEach(ms => {
    const row = document.createElement("div");
    row.className = "itemLine itemLine--actions itemLine--compact milestoneRow";
    if (ms.done) row.classList.add("is-done");

    const main = document.createElement("div");
    main.className = "itemLine__main";

    const title = document.createElement("div");
    title.className = "milestoneTitle";
    title.textContent = ms.text;

    const meta = document.createElement("small");
    meta.className = "milestoneMeta";
    meta.textContent = ms.date ? formatDateShortFR(ms.date) : "Sans date";

    main.appendChild(title);
    main.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "miniActions";
    const toggleBtn = mkAction(ms.done ? "R" : "✓", ms.done ? "Rouvrir" : "Terminer", () => toggleProjectMilestone(projectId, ms.id));
    const delBtn = mkAction("🗑️", "Supprimer", () => deleteProjectMilestone(projectId, ms.id));
    if (archived) {
      toggleBtn.disabled = true;
      delBtn.disabled = true;
    }
    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    row.appendChild(main);
    row.appendChild(actions);
    el.projectMilestoneList.appendChild(row);
  });
}

function deleteProjectMilestone(projectId, milestoneId) {
  const items = projectMilestones(projectId);
  const next = items.filter(m => m.id !== milestoneId);
  state.projectMilestones[projectId] = next;
  save();
  if (state.route === "projects") renderProjects();
}

function renderProjectEntry(entry) {
  const card = document.createElement("article");
  card.className = "entry";
  const proj = entry.projectId ? projectById(entry.projectId) : null;
  const isNext = proj && proj.nextActionId === entry.id;
  if (isNext) card.classList.add("is-next");

  const top = document.createElement("div");
  top.className = "entry__top";

  const meta = document.createElement("div");
  meta.className = "entry__meta";

  const badge = document.createElement("span");
  badge.className = `badge ${badgeClass(entry.kind)}`;
  badge.textContent = kindLabel(entry.kind);
  meta.appendChild(badge);

  if (entry.date) {
    const d = document.createElement("span");
    d.className = "badge";
    d.textContent = entry.date;
    meta.appendChild(d);
  } else if (entry.kind === "task") {
    const d = document.createElement("span");
    d.className = "badge";
    d.textContent = "Sans date";
    meta.appendChild(d);
  }

  if (entry.time) {
    const t = document.createElement("span");
    t.className = "badge";
    t.textContent = entry.time;
    meta.appendChild(t);
  }

  if (entry.kind === "task") {
    const st = taskStateLabel(entry.taskState);
    const s = document.createElement("span");
    s.className = `badge ${st.cls}`;
    s.textContent = st.text;
    meta.appendChild(s);
    if (isNext) {
      const next = document.createElement("span");
      next.className = "badge badge--next";
      next.textContent = "Next";
      meta.appendChild(next);
    }
  }

  top.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "entry__actions";
  if (entry.kind === "task") {
    actions.appendChild(mkAction("✓", "Fait", () => setTaskState(entry.id, "done")));
    actions.appendChild(mkAction("→", "Migrer", () => setTaskState(entry.id, "migrated")));
    actions.appendChild(mkAction("✕", "Annuler", () => setTaskState(entry.id, "canceled")));
    if (entry.projectId && (isTaskOpen(entry) || isNext)) {
      actions.appendChild(mkAction(isNext ? "NA✓" : "NA", isNext ? "Effacer next action" : "Définir next action", () => toggleProjectNextAction(entry.projectId, entry.id)));
    }
  }
  actions.appendChild(mkAction("↗", "Ouvrir la date", () => setSelectedDate(entry.date || todayISO(), true)));
  actions.appendChild(mkAction("🗑️", "Supprimer", () => deleteDailyEntry(entry.id)));
  top.appendChild(actions);

  const text = document.createElement("div");
  text.className = "entry__text";
  text.textContent = entry.text;

  card.appendChild(top);
  card.appendChild(text);

  if (entry.tags && entry.tags.length) {
    const tags = document.createElement("div");
    tags.className = "tags";
    tags.textContent = entry.tags.join(" ");
    card.appendChild(tags);
  }

  return card;
}

function renderProjectNextAction(project, items) {
  if (!el.projectNextAction || !el.projectNextSelect) return;
  el.projectNextAction.innerHTML = "";

  const nextEntry = projectNextActionEntry(project);
  if (!nextEntry) {
    el.projectNextAction.appendChild(mutedBox("Aucune next action. Choisis une tâche ouverte."));
  } else {
    const row = document.createElement("div");
    row.className = "itemLine itemLine--actions itemLine--compact";

    const main = document.createElement("div");
    main.className = "itemLine__main";

    const title = document.createElement("div");
    title.textContent = nextEntry.text;

    const meta = document.createElement("small");
    const metaParts = [];
    metaParts.push(nextEntry.date ? formatDateShortFR(nextEntry.date) : "Sans date");
    if (nextEntry.time) metaParts.push(nextEntry.time);
    metaParts.push(taskStateLabel(nextEntry.taskState).text);
    meta.textContent = metaParts.join(" · ");

    main.appendChild(title);
    main.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "miniActions";
    actions.appendChild(mkAction("↗", "Ouvrir la date", () => setSelectedDate(nextEntry.date || todayISO(), true)));
    if (isTaskOpen(nextEntry)) {
      actions.appendChild(mkAction("✓", "Fait", () => setTaskState(nextEntry.id, "done")));
    }
    actions.appendChild(mkAction("✕", "Effacer", () => clearProjectNextAction(project.id)));

    row.appendChild(main);
    row.appendChild(actions);
    el.projectNextAction.appendChild(row);
  }

  const openTasks = items.filter(e => e.kind === "task" && isTaskOpen(e));
  const sorted = sortTasksByDate(openTasks.slice());
  el.projectNextSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = sorted.length ? "Sélectionner une tâche" : "Aucune tâche ouverte";
  placeholder.disabled = sorted.length > 0;
  placeholder.selected = true;
  el.projectNextSelect.appendChild(placeholder);

  sorted.forEach(task => {
    const opt = document.createElement("option");
    opt.value = task.id;
    const dateLabel = task.date ? formatDateShortFR(task.date) : "Sans date";
    opt.textContent = `${task.text} — ${dateLabel}`;
    el.projectNextSelect.appendChild(opt);
  });

  if (nextEntry && sorted.some(task => task.id === nextEntry.id)) {
    el.projectNextSelect.value = nextEntry.id;
  } else {
    el.projectNextSelect.value = "";
  }

  const disabled = project.archived || !sorted.length;
  el.projectNextSelect.disabled = disabled;
  if (el.projectNextForm) {
    const btn = el.projectNextForm.querySelector("button[type='submit']");
    if (btn) btn.disabled = disabled;
  }
}

function renderProjects() {
  if (!el.projectsList) return;
  el.projectsList.innerHTML = "";

  if (!state.projects.length) {
    const empty = document.createElement("div");
    empty.className = "entry";
    empty.textContent = "Crée ton premier projet (ex: Refonte portfolio).";
    el.projectsList.appendChild(empty);

    el.projectTitle.textContent = "Aucun projet";
    el.projectMeta.textContent = "Crée un projet à gauche.";
    if (el.btnPinProject) {
      el.btnPinProject.disabled = true;
      el.btnPinProject.textContent = "Épingler";
    }
    if (el.btnArchiveProject) {
      el.btnArchiveProject.disabled = true;
      el.btnArchiveProject.textContent = "Archiver";
    }
    el.btnDeleteProject.disabled = true;
    el.projectSummary.innerHTML = "";
    if (el.projectNextAction) el.projectNextAction.innerHTML = "";
    if (el.projectNextSelect) el.projectNextSelect.innerHTML = "";
    if (el.projectNextSelect) el.projectNextSelect.disabled = true;
    if (el.projectNextForm) {
      const btn = el.projectNextForm.querySelector("button[type='submit']");
      if (btn) btn.disabled = true;
    }
    el.projectTasks.innerHTML = "";
    if (el.projectMilestoneList) el.projectMilestoneList.innerHTML = "";
    setProjectFormsDisabled(true);
    return;
  }

  const ordered = orderedProjects();
  const activeProjects = ordered.filter(p => !p.archived);
  const archivedProjects = ordered.filter(p => p.archived);

  const buildButton = (p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "collectionBtn projectBtn";
    btn.classList.toggle("is-active", p.id === state.activeProjectId);
    btn.classList.toggle("is-pinned", p.pinned);
    btn.classList.toggle("is-archived", p.archived);

    const left = document.createElement("div");
    left.className = "projectBtn__left";

    const title = document.createElement("div");
    title.className = "projectBtn__title";

    const dot = document.createElement("span");
    dot.className = "projectDot";
    dot.style.background = p.color;

    const label = document.createElement("span");
    label.className = "projectName";
    label.textContent = p.name;

    title.appendChild(dot);
    title.appendChild(label);

    if (p.pinned) {
      const pin = document.createElement("span");
      pin.className = "pinBadge is-active";
      pin.textContent = "★";
      title.appendChild(pin);
    }

    const entries = projectEntries(p.id);
    const done = entries.filter(e => e.kind === "task" && e.taskState === "done").length;
    const totalTasks = entries.filter(e => e.kind === "task").length;
    const progressPct = totalTasks ? Math.round((done / totalTasks) * 100) : 0;

    const progress = document.createElement("div");
    progress.className = "projectProgress";

    const fill = document.createElement("div");
    fill.className = "projectProgress__fill";
    fill.style.width = `${progressPct}%`;
    fill.style.background = p.color;
    progress.appendChild(fill);

    left.appendChild(title);
    left.appendChild(progress);

    const right = document.createElement("small");
    right.textContent = totalTasks ? `${done}/${totalTasks} · ${progressPct}%` : "0/0";

    btn.appendChild(left);
    btn.appendChild(right);
    btn.addEventListener("click", () => {
      state.activeProjectId = p.id;
      save();
      renderProjects();
    });
    return btn;
  };

  activeProjects.forEach(p => el.projectsList.appendChild(buildButton(p)));

  if (archivedProjects.length) {
    const details = document.createElement("details");
    details.className = "projectsArchived";

    const summary = document.createElement("summary");
    summary.textContent = `Archivés (${archivedProjects.length})`;

    const list = document.createElement("div");
    list.className = "projectsArchived__list";
    archivedProjects.forEach(p => list.appendChild(buildButton(p)));

    details.appendChild(summary);
    details.appendChild(list);
    if (archivedProjects.some(p => p.id === state.activeProjectId)) details.open = true;
    el.projectsList.appendChild(details);
  }

  const active = state.projects.find(p => p.id === state.activeProjectId) || activeProjects[0] || archivedProjects[0];
  state.activeProjectId = active.id;

  const items = projectEntries(active.id);
  const open = items.filter(isTaskOpen).length;
  const done = items.filter(e => e.kind === "task" && e.taskState === "done").length;
  const totalTasks = items.filter(e => e.kind === "task").length;
  const progressPct = totalTasks ? Math.round((done / totalTasks) * 100) : 0;
  const milestones = projectMilestones(active.id);
  const milestonesDone = milestones.filter(m => m.done).length;

  el.projectTitle.textContent = active.name;
  el.projectMeta.textContent = `${totalTasks} tâche(s) — progression: ${done}/${totalTasks} (${progressPct}%) — ouvertes: ${open}${active.archived ? " — archivé" : ""}`;

  if (el.btnPinProject) {
    el.btnPinProject.disabled = active.archived;
    el.btnPinProject.textContent = active.pinned ? "Désépingler" : "Épingler";
    el.btnPinProject.onclick = () => toggleProjectPin(active.id);
  }
  if (el.btnArchiveProject) {
    el.btnArchiveProject.disabled = false;
    el.btnArchiveProject.textContent = active.archived ? "Restaurer" : "Archiver";
    el.btnArchiveProject.onclick = () => toggleProjectArchive(active.id);
  }

  el.btnDeleteProject.disabled = false;
  el.btnDeleteProject.onclick = () => deleteProject(active.id);

  el.projectSummary.innerHTML = "";
  el.projectSummary.appendChild(statGrid([
    { label: "Progression", value: totalTasks ? `${done}/${totalTasks} (${progressPct}%)` : "0/0" },
    { label: "Ouvertes", value: String(open) },
    { label: "Jalons", value: `${milestonesDone}/${milestones.length}` },
    { label: "Total", value: String(totalTasks) },
  ]));

  const summaryProgress = document.createElement("div");
  summaryProgress.className = "projectProgress";
  const summaryFill = document.createElement("div");
  summaryFill.className = "projectProgress__fill";
  summaryFill.style.width = totalTasks ? `${Math.round((done / totalTasks) * 100)}%` : "0%";
  summaryFill.style.background = active.color;
  summaryProgress.appendChild(summaryFill);
  el.projectSummary.appendChild(summaryProgress);

  renderProjectNextAction(active, items);
  renderProjectMilestones(active.id, active.archived);
  setProjectFormsDisabled(active.archived);

  el.projectTasks.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "entry";
    empty.textContent = "Aucune tâche liée à ce projet.";
    el.projectTasks.appendChild(empty);
    return;
  }

  const nextId = active.nextActionId;
  const sorted = items.slice().sort((a, b) => {
    if (a.id === nextId && b.id !== nextId) return -1;
    if (b.id === nextId && a.id !== nextId) return 1;
    const aOpen = isTaskOpen(a) ? 0 : 1;
    const bOpen = isTaskOpen(b) ? 0 : 1;
    if (aOpen !== bOpen) return aOpen - bOpen;
    return (a.date || "9999-99-99").localeCompare(b.date || "9999-99-99");
  });
  sorted.forEach(e => el.projectTasks.appendChild(renderProjectEntry(e)));
}

/* ---------------- Dashboard + Mood Chart ---------------- */

function backlogTasks() {
  const today = todayISO();
  return state.entries
    .filter(isTaskOpen)
    .filter(e => !e.date || e.date < today)
    .sort((a, b) => (a.date || "9999-99-99").localeCompare(b.date || "9999-99-99"));
}

function habitDoneCountForMonth(habitId, monthKey, dayLimit) {
  const checks = state.habitChecks[monthKey]?.[habitId] || {};
  let done = 0;
  for (let d = 1; d <= dayLimit; d++) {
    if (checks[String(d)]) done += 1;
  }
  return done;
}

function habitDoneCountForWeek(habitId, startIso) {
  let done = 0;
  weekDates(startIso).forEach(dayIso => {
    const mk = monthKeyFromDate(dayIso);
    const checks = state.habitChecks[mk]?.[habitId] || {};
    const dayNum = String(Number(dayIso.slice(8, 10)));
    if (checks[dayNum]) done += 1;
  });
  return done;
}

function average(list) {
  if (!list.length) return 0;
  return list.reduce((sum, val) => sum + val, 0) / list.length;
}

function formatNumber(value, decimals = 0) {
  if (!Number.isFinite(value)) return "n/a";
  if (!decimals) return String(Math.round(value));
  return value.toFixed(decimals).replace(".", ",");
}

function habitMoodCorrelations(monthKey, dayLimit) {
  const moodByDay = {};
  for (let d = 1; d <= dayLimit; d++) {
    const iso = isoFromMonthDay(monthKey, d);
    const score = moodValue(getMood(iso).level);
    if (score) moodByDay[String(d)] = score;
  }
  const moodDays = Object.keys(moodByDay);
  if (!moodDays.length) return [];

  return state.habits.map(h => {
    const checks = state.habitChecks[monthKey]?.[h.id] || {};
    const doneScores = [];
    const missScores = [];
    moodDays.forEach(dayNum => {
      const score = moodByDay[dayNum];
      if (checks[dayNum]) doneScores.push(score);
      else missScores.push(score);
    });
    if (doneScores.length < 2 || missScores.length < 2) return null;
    const avgDone = average(doneScores);
    const avgMiss = average(missScores);
    return {
      habit: h,
      avgDone,
      avgMiss,
      delta: avgDone - avgMiss,
      doneCount: doneScores.length,
      missCount: missScores.length,
    };
  }).filter(Boolean);
}

function sparkline(values, options = {}) {
  const wrap = document.createElement("div");
  wrap.className = "sparkline";
  const max = Math.max(...values.map(v => (typeof v === "number" ? v : 0)), 1);

  values.forEach((value, idx) => {
    const bar = document.createElement("span");
    bar.className = "sparkBar";
    const numeric = typeof value === "number" ? value : 0;
    const heightPct = max ? Math.max(8, Math.round((numeric / max) * 100)) : 8;
    bar.style.height = `${heightPct}%`;

    if (value == null) bar.classList.add("sparkBar--empty");
    if (options.baseClass) bar.classList.add(options.baseClass);
    if (options.kind === "mood") {
      if (numeric >= 2.5) bar.classList.add("sparkBar--mood-green");
      else if (numeric >= 1.7) bar.classList.add("sparkBar--mood-yellow");
      else if (numeric > 0) bar.classList.add("sparkBar--mood-red");
      else bar.classList.add("sparkBar--empty");
    }

    const label = options.labels && options.labels[idx] ? options.labels[idx] : "";
    if (label) {
      const valLabel = value == null ? "n/a" : formatNumber(value, options.decimals || 0);
      bar.title = `${label}: ${valLabel}`;
    }
    wrap.appendChild(bar);
  });

  return wrap;
}

function renderTrendRow(label, values, options = {}) {
  const row = document.createElement("div");
  row.className = "trendRow";

  const left = document.createElement("div");
  left.className = "trendLabel";
  left.textContent = label;

  const spark = sparkline(values, options);

  const meta = document.createElement("div");
  meta.className = "trendMeta";
  const last = values[values.length - 1];
  const prev = values.length > 1 ? values[values.length - 2] : null;
  const decimals = options.decimals || 0;
  if (last == null) {
    meta.textContent = "Derniere: n/a";
  } else if (prev == null) {
    meta.textContent = `Derniere: ${formatNumber(last, decimals)}`;
  } else {
    meta.textContent = `Derniere: ${formatNumber(last, decimals)} (${formatDelta(last - prev, decimals)})`;
  }

  row.appendChild(left);
  row.appendChild(spark);
  row.appendChild(meta);
  return row;
}

function buildWeeklyTrends() {
  const base = weekStartISO(state.selectedDate);
  const starts = [3, 2, 1, 0].map(i => addDaysISO(base, -7 * i));
  const labels = starts.map(s => formatDateShortFR(s));
  const tasks = [];
  const habits = [];
  const moods = [];
  let moodCount = 0;

  starts.forEach(start => {
    const end = addDaysISO(start, 6);
    const entries = entriesInRange(start, end);
    tasks.push(entries.filter(e => e.kind === "task" && e.taskState === "done").length);
    const mood = moodAverageForRange(start, end);
    if (mood.count) {
      moods.push(mood.avg);
      moodCount += mood.count;
    } else {
      moods.push(null);
    }
    habits.push(state.habits.reduce((sum, h) => sum + habitDoneCountForWeek(h.id, start), 0));
  });

  const hasData = tasks.some(v => v > 0) || habits.some(v => v > 0) || moodCount > 0;
  return { labels, tasks, habits, moods, hasData };
}

function renderDashboard() {
  el.dashTodayChip.textContent = formatDateFR(state.selectedDate);
  el.dashMonthChip.textContent = capitalize(monthTitleFR(state.monthCursor));

  // mood (today)
  el.dashMood.innerHTML = "";
  const m = getMood(state.selectedDate);

  if (!m.level && !m.text) {
    el.dashMood.appendChild(mutedBox("Pas de résumé mental pour ce jour."));
  } else {
    const label = m.level ? (m.level === "green" ? "Vert" : m.level === "yellow" ? "Jaune" : "Rouge") : "—";
    const line1 = document.createElement("div");
    line1.className = "itemLine";
    line1.innerHTML = `<span>${m.level ? `<span class="mDot mDot--${m.level}"></span> ` : ""}<strong>${label}</strong></span><small>${state.selectedDate}</small>`;
    el.dashMood.appendChild(line1);

    if (m.text) {
      const line2 = document.createElement("div");
      line2.className = "itemLine";
      line2.textContent = m.text;
      el.dashMood.appendChild(line2);
    }

    const go = document.createElement("div");
    go.className = "itemLine";
    go.style.cursor = "pointer";
    go.innerHTML = `<span>Modifier le résumé</span><small>→ Daily</small>`;
    go.addEventListener("click", () => setRoute("daily"));
    el.dashMood.appendChild(go);
  }

  // today counts
  const todayEntries = state.entries.filter(e => e.date === state.selectedDate);
  const notes = todayEntries.filter(e => e.kind === "note").length;
  const events = todayEntries.filter(e => e.kind === "event").length;
  const openTasks = todayEntries.filter(e => e.kind === "task" && (e.taskState === "open" || !e.taskState)).length;

  el.dashTodaySummary.innerHTML = "";
  el.dashTodaySummary.appendChild(statGrid([
    { label: "Notes", value: String(notes) },
    { label: "Événements", value: String(events) },
    { label: "Tâches ouvertes", value: String(openTasks) },
  ]));

  // open tasks global
  const globalOpen = state.entries
    .filter(isTaskOpen)
    .sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")))
    .slice(0, 3);
  const openTotal = state.entries.filter(isTaskOpen).length;

  el.dashOpenTasks.innerHTML = "";
  if (openTotal === 0) {
    el.dashOpenTasks.appendChild(mutedBox("Aucune tâche ouverte 🎉"));
  } else {
    el.dashOpenTasks.appendChild(statGrid([
      { label: "Total", value: String(openTotal) },
    ]));
    globalOpen.forEach(t => {
      el.dashOpenTasks.appendChild(
        compactLine(`□ ${t.text}`, `${t.date || "Sans date"}`, () => setSelectedDate(t.date || todayISO(), true))
      );
    });
  }

  // backlog & overdue
  const today = todayISO();
  const backlog = backlogTasks();
  const overdueCount = backlog.filter(e => e.date && e.date < today).length;
  const noDateCount = backlog.filter(e => !e.date).length;
  el.dashBacklog.innerHTML = "";
  if (!backlog.length) {
    el.dashBacklog.appendChild(mutedBox("Backlog vide."));
  } else {
    el.dashBacklog.appendChild(statGrid([
      { label: "Sans date", value: String(noDateCount) },
      { label: "En retard", value: String(overdueCount) },
    ]));
    el.dashBacklog.appendChild(
      compactLine("Revoir le backlog", "→ Daily", () => setRoute("daily"))
    );
  }

  // upcoming events (next 7 days)
  const upcoming = nextEvents(7);
  const upcomingList = upcoming.slice(0, 2);
  el.dashUpcomingEvents.innerHTML = "";
  if (upcoming.length === 0) {
    el.dashUpcomingEvents.appendChild(mutedBox("Pas d’événement à venir."));
  } else {
    el.dashUpcomingEvents.appendChild(statGrid([
      { label: "7 prochains jours", value: String(upcoming.length) },
    ]));
    upcomingList.forEach(ev => {
      el.dashUpcomingEvents.appendChild(
        compactLine(`○ ${ev.text}`, `${ev.date}`, () => setSelectedDate(ev.date, true))
      );
    });
  }

  // habits today
  el.dashHabitsToday.innerHTML = "";
  const day = Number(state.selectedDate.slice(8, 10));
  const mk = monthKeyFromDate(state.selectedDate);

  if (state.habits.length === 0) {
    el.dashHabitsToday.appendChild(mutedBox("Aucune habitude. Va dans Habits pour en créer."));
  } else {
    const checks = monthChecks(mk);
    let doneCount = 0;
    state.habits.forEach(h => {
      const hc = checks[h.id] || {};
      if (hc[String(day)]) doneCount += 1;
    });
    el.dashHabitsToday.appendChild(statGrid([
      { label: "Faites", value: String(doneCount) },
      { label: "Total", value: String(state.habits.length) },
    ]));
    state.habits.slice(0, 3).forEach(h => {
      const hc = checks[h.id] || {};
      const done = Boolean(hc[String(day)]);
      el.dashHabitsToday.appendChild(
        compactLine(h.name, done ? "✓" : "·", () => setRoute("habits"))
      );
    });
  }

  // collections
  el.dashCollections.innerHTML = "";
  if (state.collections.length === 0) {
    el.dashCollections.appendChild(mutedBox("Aucune collection. Va dans Collections pour en créer."));
  } else {
    const totalItems = state.collections.reduce((acc, c) => acc + (state.collectionItems[c.id] || []).length, 0);
    el.dashCollections.appendChild(statGrid([
      { label: "Collections", value: String(state.collections.length) },
      { label: "Items", value: String(totalItems) },
    ]));
    state.collections.slice(0, 3).forEach(c => {
      const count = (state.collectionItems[c.id] || []).length;
      el.dashCollections.appendChild(
        compactLine(c.name, String(count), () => {
          state.activeCollectionId = c.id;
          save();
          setRoute("collections");
        })
      );
    });
  }

  // NEW: mood chart (year)
  renderDashboardInsights();
  renderMoodChart();
  renderDashboardToggles();
  applyDashboardPreferences();
}

function renderDashboardInsights() {
  if (!el.dashBestDays || !el.dashStableHabits || !el.dashMoodWeekAvg || !el.dashHabitAlerts || !el.dashMoodHabitCorr || !el.dashTrends) return;

  const monthKey = state.monthCursor;
  const dayLimit = monthDayLimit(monthKey);
  const doneByDate = new Map();

  state.entries.forEach(e => {
    if (!e.date || e.kind !== "task" || e.taskState !== "done") return;
    if (e.date.slice(0, 7) !== monthKey) return;
    doneByDate.set(e.date, (doneByDate.get(e.date) || 0) + 1);
  });

  // Best days (month)
  el.dashBestDays.innerHTML = "";
  const bestDays = [];
  for (let d = 1; d <= dayLimit; d++) {
    const iso = isoFromMonthDay(monthKey, d);
    const mood = getMood(iso).level;
    const moodScore = moodValue(mood);
    const doneTasks = doneByDate.get(iso) || 0;
    if (!doneTasks && !mood) continue;
    bestDays.push({ iso, doneTasks, mood, score: doneTasks + moodScore });
  }
  bestDays.sort((a, b) => b.score - a.score || b.doneTasks - a.doneTasks || a.iso.localeCompare(b.iso));
  const topDays = bestDays.slice(0, 3);
  if (!topDays.length) {
    el.dashBestDays.appendChild(mutedBox("Pas encore assez de données ce mois-ci."));
  } else {
    topDays.forEach(day => {
      const row = document.createElement("div");
      row.className = "itemLine itemLine--compact";
      row.style.cursor = "pointer";

      const left = document.createElement("span");
      left.className = "insightRow__left";
      const dot = document.createElement("span");
      dot.className = `mDot ${day.mood ? `mDot--${day.mood}` : "mDot--none"}`;
      left.appendChild(dot);
      left.appendChild(document.createTextNode(formatDateShortFR(day.iso)));

      const right = document.createElement("small");
      right.textContent = `${day.doneTasks} tâche(s) · ${moodLabel(day.mood)}`;

      row.appendChild(left);
      row.appendChild(right);
      row.addEventListener("click", () => setSelectedDate(day.iso, true));
      el.dashBestDays.appendChild(row);
    });
  }

  // Stable habits (month)
  el.dashStableHabits.innerHTML = "";
  if (!state.habits.length) {
    el.dashStableHabits.appendChild(mutedBox("Aucune habitude configurée."));
  } else {
    const ranked = state.habits.map(h => {
      const done = habitDoneCountForMonth(h.id, monthKey, dayLimit);
      const pctDone = dayLimit ? Math.round((done / dayLimit) * 100) : 0;
      return { habit: h, done, pct: pctDone };
    }).sort((a, b) => b.pct - a.pct || b.done - a.done);

    if (!ranked.some(r => r.done > 0)) {
      el.dashStableHabits.appendChild(mutedBox("Aucune case cochée ce mois-ci."));
    } else {
      ranked.slice(0, 3).forEach(({ habit, done, pct }) => {
        const row = document.createElement("div");
        row.className = "itemLine itemLine--compact";
        row.style.cursor = "pointer";

        const left = document.createElement("span");
        left.className = "insightRow__left";
        const dot = document.createElement("span");
        dot.className = "insightDot";
        dot.style.background = habit.color;
        left.appendChild(dot);
        left.appendChild(document.createTextNode(habit.name));

        const right = document.createElement("small");
        right.textContent = `${done}/${dayLimit} (${pct}%)`;

        row.appendChild(left);
        row.appendChild(right);
        row.addEventListener("click", () => setRoute("habits"));
        el.dashStableHabits.appendChild(row);
      });
    }
  }

  // Mood average (week)
  el.dashMoodWeekAvg.innerHTML = "";
  const weekStart = weekStartISO(state.selectedDate);
  let moodCount = 0;
  let moodSum = 0;
  weekDates(weekStart).forEach(dayIso => {
    const score = moodValue(getMood(dayIso).level);
    if (!score) return;
    moodSum += score;
    moodCount += 1;
  });
  if (!moodCount) {
    el.dashMoodWeekAvg.appendChild(mutedBox("Aucun mood noté cette semaine."));
  } else {
    const avg = moodSum / moodCount;
    const level = avg >= 2.5 ? "green" : avg >= 1.7 ? "yellow" : "red";
    const box = document.createElement("div");
    box.className = `moodAvg moodAvg--${level}`;
    box.innerHTML = `
      <div class="moodAvg__value">${avg.toFixed(1)}/3</div>
      <div class="moodAvg__meta">${moodCount}/7 jours notés</div>
    `;
    el.dashMoodWeekAvg.appendChild(box);
  }

  // Habit drop alerts (week vs previous week)
  el.dashHabitAlerts.innerHTML = "";
  if (!state.habits.length) {
    el.dashHabitAlerts.appendChild(mutedBox("Aucune habitude configurée."));
  } else {
    const prevStart = addDaysISO(weekStart, -7);
    const alerts = state.habits.map(h => {
      const current = habitDoneCountForWeek(h.id, weekStart);
      const prev = habitDoneCountForWeek(h.id, prevStart);
      return { habit: h, current, prev, delta: current - prev };
    }).filter(item => item.prev >= 3 && item.delta <= -2)
      .sort((a, b) => a.delta - b.delta);

    if (!alerts.length) {
      el.dashHabitAlerts.appendChild(mutedBox("Aucune alerte cette semaine."));
    } else {
      alerts.slice(0, 3).forEach(item => {
        const row = document.createElement("div");
        row.className = "itemLine itemLine--compact";
        row.style.cursor = "pointer";

        const left = document.createElement("span");
        left.className = "insightRow__left";
        const dot = document.createElement("span");
        dot.className = "insightDot";
        dot.style.background = item.habit.color;
        left.appendChild(dot);
        left.appendChild(document.createTextNode(item.habit.name));

        const right = document.createElement("small");
        right.textContent = `${item.current}/7 (↓${Math.abs(item.delta)})`;

        row.appendChild(left);
        row.appendChild(right);
        row.addEventListener("click", () => setRoute("habits"));
        el.dashHabitAlerts.appendChild(row);
      });
    }
  }

  // Mood x habits correlation (month)
  el.dashMoodHabitCorr.innerHTML = "";
  if (!state.habits.length) {
    el.dashMoodHabitCorr.appendChild(mutedBox("Aucune habitude configurée."));
  } else {
    const correlations = habitMoodCorrelations(monthKey, dayLimit);
    if (!correlations.length) {
      el.dashMoodHabitCorr.appendChild(mutedBox("Pas assez de donnees pour relier mood et habitudes."));
    } else {
      const ranked = correlations
        .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
        .slice(0, 3);

      ranked.forEach(item => {
        const row = document.createElement("div");
        row.className = "itemLine itemLine--compact";
        row.style.cursor = "pointer";

        const left = document.createElement("span");
        left.className = "insightRow__left";
        const dot = document.createElement("span");
        dot.className = "insightDot";
        dot.style.background = item.habit.color;
        left.appendChild(dot);
        left.appendChild(document.createTextNode(item.habit.name));

        const right = document.createElement("small");
        const deltaLabel = `${item.delta >= 0 ? "+" : ""}${item.delta.toFixed(1).replace(".", ",")}`;
        right.className = `deltaTag ${item.delta >= 0 ? "deltaTag--pos" : "deltaTag--neg"}`;
        right.textContent = `${deltaLabel} · ${item.doneCount}j/${item.missCount}j`;

        row.appendChild(left);
        row.appendChild(right);
        row.addEventListener("click", () => setRoute("habits"));
        el.dashMoodHabitCorr.appendChild(row);
      });

      const hint = document.createElement("div");
      hint.className = "muted";
      hint.textContent = "Delta mood = fait vs pas fait";
      el.dashMoodHabitCorr.appendChild(hint);
    }
  }

  // Trends (last 4 weeks)
  el.dashTrends.innerHTML = "";
  const trends = buildWeeklyTrends();
  if (!trends.hasData) {
    el.dashTrends.appendChild(mutedBox("Pas encore assez de donnees."));
  } else {
    el.dashTrends.appendChild(renderTrendRow("Taches faites", trends.tasks, {
      labels: trends.labels,
      baseClass: "sparkBar--task",
    }));
    if (state.habits.length) {
      el.dashTrends.appendChild(renderTrendRow("Habitudes", trends.habits, {
        labels: trends.labels,
        baseClass: "sparkBar--habit",
      }));
    }
    el.dashTrends.appendChild(renderTrendRow("Mood moyen", trends.moods, {
      labels: trends.labels,
      kind: "mood",
      decimals: 1,
    }));
  }
}

function renderMoodChart() {
  if (!el.dashMoodChart) return;

  const year = state.yearCursor || new Date().getFullYear();
  el.dashMoodChart.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "moodChart";

  for (let m = 0; m < 12; m++) {
    const s = moodStatsForMonth(year, m);
    const total = s.any;

    const gPct = pct(s.g, total);
    const yPct = pct(s.y, total);
    const rPct = total ? Math.max(0, 100 - gPct - yPct) : 0;

    const row = document.createElement("div");
    row.className = "moodRow";
    row.style.cursor = "pointer";

    const label = document.createElement("div");
    label.className = "moodRow__label";
    label.textContent = monthNameShortFR(m);

    const bar = document.createElement("div");
    bar.className = "moodBar";
    bar.title = `${s.mk} — ${s.any} jour(s) noté(s)`;

    const segG = document.createElement("div");
    segG.className = "moodSeg moodSeg--green";
    segG.style.width = total ? `${gPct}%` : "0%";

    const segY = document.createElement("div");
    segY.className = "moodSeg moodSeg--yellow";
    segY.style.width = total ? `${yPct}%` : "0%";

    const segR = document.createElement("div");
    segR.className = "moodSeg moodSeg--red";
    segR.style.width = total ? `${rPct}%` : "0%";

    bar.appendChild(segG);
    bar.appendChild(segY);
    bar.appendChild(segR);

    const right = document.createElement("div");
    right.className = "moodRow__pct";
    right.textContent = total ? `V ${gPct}% · J ${yPct}% · R ${rPct}%` : "—";

    row.addEventListener("click", () => {
      state.monthCursor = `${year}-${String(m + 1).padStart(2, "0")}`;
      save();
      setRoute("monthly");
    });

    row.appendChild(label);
    row.appendChild(bar);
    row.appendChild(right);

    wrap.appendChild(row);
  }

  const legend = document.createElement("div");
  legend.className = "moodLegendInline";
  legend.innerHTML = `
    <span><span class="mDot mDot--green"></span> Vert</span>
    <span><span class="mDot mDot--yellow"></span> Jaune</span>
    <span><span class="mDot mDot--red"></span> Rouge</span>
    <span>Base : jours notés</span>
  `;

  el.dashMoodChart.appendChild(wrap);
  el.dashMoodChart.appendChild(legend);
}

function nextEvents(daysAhead) {
  const start = new Date(state.selectedDate + "T00:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + daysAhead);

  return state.entries
    .filter(e => e.kind === "event")
    .filter(e => {
      const d = new Date(e.date + "T00:00:00");
      return d >= start && d <= end;
    })
    .sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")));
}

function line(left, right) {
  const d = document.createElement("div");
  d.className = "itemLine";
  d.innerHTML = `<span>${escapeHtml(left)}</span><small>${escapeHtml(right)}</small>`;
  return d;
}

function statGrid(items) {
  const grid = document.createElement("div");
  grid.className = "statGrid";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "statItem";
    card.innerHTML = `
      <div class="statItem__value">${escapeHtml(item.value)}</div>
      <div class="statItem__label">${escapeHtml(item.label)}</div>
    `;
    grid.appendChild(card);
  });
  return grid;
}

function compactLine(left, right, onClick) {
  const d = line(left, right);
  d.classList.add("itemLine--compact");
  if (onClick) {
    d.style.cursor = "pointer";
    d.addEventListener("click", onClick);
  }
  return d;
}

function clickableLine(left, right, onClick) {
  const d = line(left, right);
  d.style.cursor = "pointer";
  d.addEventListener("click", onClick);
  return d;
}

function mutedBox(text) {
  const d = document.createElement("div");
  d.className = "itemLine";
  d.style.color = "var(--muted)";
  d.textContent = text;
  return d;
}

const REVIEW_FLOW_CONFIG = {
  daily: {
    label: "Quotidien",
    checklist: [
      { id: "inbox", text: "Vider les captures rapides" },
      { id: "done", text: "Marquer les tâches terminées" },
      { id: "focus", text: "Choisir 1-3 priorités" },
      { id: "plan", text: "Caler les moments clés" },
      { id: "mood", text: "Mettre à jour le mood" },
    ],
    questions: [
      { id: "highlight", text: "Quel a été le point fort du jour ?" },
      { id: "blocker", text: "Qu'est-ce qui a ralenti ?" },
      { id: "next", text: "Quelle est la priorité pour demain ?" },
    ],
  },
  weekly: {
    label: "Hebdo",
    checklist: [
      { id: "projects", text: "Faire le point sur les projets actifs" },
      { id: "plan", text: "Planifier la semaine (3 objectifs)" },
      { id: "habits", text: "Revue des habitudes" },
      { id: "backlog", text: "Nettoyer / migrer le backlog" },
      { id: "calendar", text: "Bloquer les rendez-vous importants" },
    ],
    questions: [
      { id: "wins", text: "Quelles victoires cette semaine ?" },
      { id: "hard", text: "Qu'est-ce qui a été difficile ?" },
      { id: "learn", text: "Quel ajustement pour la semaine prochaine ?" },
    ],
  },
  monthly: {
    label: "Mensuel",
    checklist: [
      { id: "goals", text: "Bilan des objectifs du mois" },
      { id: "archive", text: "Archiver les projets terminés" },
      { id: "priorities", text: "Définir les priorités du mois" },
      { id: "habits", text: "Ajuster les habitudes" },
      { id: "milestones", text: "Planifier les gros jalons" },
    ],
    questions: [
      { id: "impact", text: "Quel progrès a eu le plus d’impact ?" },
      { id: "focus", text: "Où se concentre l’énergie ?" },
      { id: "next", text: "Quel focus pour le mois prochain ?" },
    ],
  },
};

function ensureReviewFlowState() {
  if (!isPlainObject(state.reviewFlow)) state.reviewFlow = defaultReviewFlow();
  if (!["daily", "weekly", "monthly"].includes(state.reviewFlow.mode)) state.reviewFlow.mode = "weekly";
  ["daily", "weekly", "monthly"].forEach(mode => {
    if (!isPlainObject(state.reviewFlow[mode])) state.reviewFlow[mode] = {};
  });
}

function reviewScopeInfo(mode) {
  if (mode === "daily") {
    const date = state.selectedDate;
    return {
      key: date,
      label: `Quotidien · ${formatDateFR(date)}`,
      start: date,
      end: date,
      prevStart: addDaysISO(date, -1),
      prevEnd: addDaysISO(date, -1),
    };
  }
  if (mode === "weekly") {
    const start = weekStartISO(state.reviewCursor || state.selectedDate);
    const end = addDaysISO(start, 6);
    const prevStart = addDaysISO(start, -7);
    const prevEnd = addDaysISO(prevStart, 6);
    return {
      key: start,
      label: `Hebdo · du ${formatDateFR(start)} au ${formatDateFR(end)}`,
      start,
      end,
      prevStart,
      prevEnd,
    };
  }
  const monthKey = monthKeyFromDate(state.reviewCursor || state.selectedDate);
  const dim = daysInMonth(monthKey);
  const start = isoFromMonthDay(monthKey, 1);
  const end = isoFromMonthDay(monthKey, dim);
  const prevKey = addMonths(monthKey, -1);
  return {
    key: monthKey,
    label: `Mensuel · ${capitalize(monthTitleFR(monthKey))}`,
    start,
    end,
    prevStart: isoFromMonthDay(prevKey, 1),
    prevEnd: isoFromMonthDay(prevKey, daysInMonth(prevKey)),
  };
}

function reviewDataFor(mode, key) {
  ensureReviewFlowState();
  if (!state.reviewFlow[mode][key]) {
    state.reviewFlow[mode][key] = { checks: {}, answers: {} };
  }
  const bucket = state.reviewFlow[mode][key];
  if (!isPlainObject(bucket.checks)) bucket.checks = {};
  if (!isPlainObject(bucket.answers)) bucket.answers = {};
  return bucket;
}

function dateRange(startIso, endIso) {
  const out = [];
  let cur = startIso;
  while (cur <= endIso) {
    out.push(cur);
    cur = addDaysISO(cur, 1);
  }
  return out;
}

function entriesInRange(startIso, endIso) {
  return state.entries.filter(e => e.date && e.date >= startIso && e.date <= endIso);
}

function moodAverageForRange(startIso, endIso) {
  let sum = 0;
  let count = 0;
  dateRange(startIso, endIso).forEach(d => {
    const val = moodValue(getMood(d).level);
    if (!val) return;
    sum += val;
    count += 1;
  });
  return { avg: count ? sum / count : 0, count };
}

function habitDoneCountForDay(iso) {
  const mk = monthKeyFromDate(iso);
  const dayNum = String(Number(iso.slice(8, 10)));
  let done = 0;
  state.habits.forEach(h => {
    const checks = state.habitChecks[mk]?.[h.id] || {};
    if (checks[dayNum]) done += 1;
  });
  return done;
}

function habitDoneTotalForWeek(startIso) {
  return state.habits.reduce((sum, h) => sum + habitDoneCountForWeek(h.id, startIso), 0);
}

function habitDoneTotalForMonth(monthKey) {
  const dim = daysInMonth(monthKey);
  return state.habits.reduce((sum, h) => sum + habitDoneCountForMonth(h.id, monthKey, dim), 0);
}

function periodEntryStats(startIso, endIso) {
  const entries = entriesInRange(startIso, endIso);
  return {
    tasksDone: entries.filter(e => e.kind === "task" && e.taskState === "done").length,
    events: entries.filter(e => e.kind === "event").length,
  };
}

function formatDelta(delta, decimals = 0) {
  const factor = 10 ** decimals;
  const rounded = Math.round(delta * factor) / factor;
  if (rounded === 0) return "0";
  const text = decimals ? rounded.toFixed(decimals).replace(".", ",") : String(rounded);
  return rounded > 0 ? `+${text}` : text;
}

function withDelta(value, delta, decimals = 0) {
  return `${value} (${formatDelta(delta, decimals)})`;
}

function formatMoodAverage(avg) {
  if (!avg) return "—";
  const label = avg >= 2.5 ? "Vert" : avg >= 1.5 ? "Jaune" : "Rouge";
  const score = avg.toFixed(1).replace(".", ",");
  return `${score}/3 (${label})`;
}

function buildReviewAutoSummary(mode, scope) {
  const current = periodEntryStats(scope.start, scope.end);
  const prev = periodEntryStats(scope.prevStart, scope.prevEnd);
  const lines = [];

  lines.push({ left: "Tâches faites", right: withDelta(current.tasksDone, current.tasksDone - prev.tasksDone) });
  lines.push({ left: "Événements", right: withDelta(current.events, current.events - prev.events) });

  if (mode === "daily") {
    const habitsTotal = state.habits.length;
    if (habitsTotal) {
      const curHabits = habitDoneCountForDay(scope.start);
      const prevHabits = habitDoneCountForDay(scope.prevStart);
      lines.push({
        left: "Habitudes",
        right: withDelta(`${curHabits}/${habitsTotal}`, curHabits - prevHabits),
      });
    } else {
      lines.push({ left: "Habitudes", right: "—" });
    }

    const todayMood = getMood(scope.start).level;
    const prevMood = getMood(scope.prevStart).level;
    const moodRight = todayMood ? moodLabel(todayMood) : "—";
    const prevLabel = prevMood ? moodLabel(prevMood) : "";
    lines.push({
      left: "Mood",
      right: prevLabel && moodRight !== "—" ? `${moodRight} (hier : ${prevLabel})` : moodRight,
    });
    return lines;
  }

  const curMood = moodAverageForRange(scope.start, scope.end);
  const prevMood = moodAverageForRange(scope.prevStart, scope.prevEnd);
  const moodBase = formatMoodAverage(curMood.avg);
  const moodRight = curMood.count && prevMood.count ? withDelta(moodBase, curMood.avg - prevMood.avg, 1) : moodBase;
  lines.push({ left: "Mood moyen", right: moodRight });

  const habitsTotal = state.habits.length;
  if (habitsTotal) {
    const curHabits = mode === "weekly"
      ? habitDoneTotalForWeek(scope.start)
      : habitDoneTotalForMonth(scope.key);
    const prevHabits = mode === "weekly"
      ? habitDoneTotalForWeek(scope.prevStart)
      : habitDoneTotalForMonth(monthKeyFromDate(scope.prevStart));
    const totalPossible = mode === "weekly"
      ? habitsTotal * 7
      : habitsTotal * daysInMonth(scope.key);
    lines.push({
      left: "Habitudes",
      right: withDelta(`${curHabits}/${totalPossible}`, curHabits - prevHabits),
    });
  } else {
    lines.push({ left: "Habitudes", right: "—" });
  }

  return lines;
}

function updateReviewFlowProgress(mode, bucket) {
  const config = REVIEW_FLOW_CONFIG[mode];
  if (!config || !el.reviewFlowProgress) return;
  const doneCount = config.checklist.filter(item => bucket.checks[item.id]).length;
  const totalCount = config.checklist.length;
  el.reviewFlowProgress.textContent = totalCount ? `${doneCount}/${totalCount} complété` : "Aucune checklist";
}

function renderReviewFlow() {
  if (!el.reviewChecklist || !el.reviewQuestions || !el.reviewFlowScope || !el.reviewAutoSummary || !el.reviewFlowProgress) return;
  ensureReviewFlowState();

  const mode = state.reviewFlow.mode;
  const config = REVIEW_FLOW_CONFIG[mode];
  if (!config) return;

  const scope = reviewScopeInfo(mode);
  const bucket = reviewDataFor(mode, scope.key);

  el.reviewFlowTabs.forEach(btn => {
    const active = btn.dataset.flow === mode;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
  el.reviewFlowScope.textContent = scope.label;

  updateReviewFlowProgress(mode, bucket);

  el.reviewAutoSummary.innerHTML = "";
  const lines = buildReviewAutoSummary(mode, scope);
  if (!lines.length) {
    el.reviewAutoSummary.appendChild(mutedBox("Aucune donnée pour cette période."));
  } else {
    lines.forEach(item => el.reviewAutoSummary.appendChild(line(item.left, item.right)));
  }

  el.reviewChecklist.innerHTML = "";
  if (!config.checklist.length) {
    el.reviewChecklist.appendChild(mutedBox("Aucune checklist configurée."));
  } else {
    config.checklist.forEach(item => {
      const label = document.createElement("label");
      label.className = "checkItem";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.dataset.checkId = item.id;
      input.checked = Boolean(bucket.checks[item.id]);
      if (input.checked) label.classList.add("is-done");
      const text = document.createElement("span");
      text.textContent = item.text;
      label.appendChild(input);
      label.appendChild(text);
      el.reviewChecklist.appendChild(label);
    });
  }

  el.reviewQuestions.innerHTML = "";
  if (!config.questions.length) {
    el.reviewQuestions.appendChild(mutedBox("Aucune question configurée."));
  } else {
    config.questions.forEach(q => {
      const field = document.createElement("div");
      field.className = "field";
      const label = document.createElement("label");
      label.className = "label";
      const id = `review_${mode}_${q.id}`;
      label.setAttribute("for", id);
      label.textContent = q.text;
      const area = document.createElement("textarea");
      area.className = "textarea textarea--sm";
      area.id = id;
      area.dataset.questionId = q.id;
      area.value = bucket.answers[q.id] || "";
      field.appendChild(label);
      field.appendChild(area);
      el.reviewQuestions.appendChild(field);
    });
  }
}

/* ---------------- Review ---------------- */

function stackBar(segments, className = "stackBar") {
  const bar = document.createElement("div");
  bar.className = className;
  segments.forEach(seg => {
    const s = document.createElement("div");
    s.className = `stackSeg ${seg.cls}`;
    s.style.width = `${seg.pct}%`;
    bar.appendChild(s);
  });
  return bar;
}

function entriesInWeek(startIso) {
  const days = weekDates(startIso);
  const set = new Set(days);
  return state.entries.filter(e => e.date && set.has(e.date));
}

function renderReview() {
  if (!el.reviewSummary) return;

  const start = weekStartISO(state.reviewCursor || state.selectedDate);
  const end = addDaysISO(start, 6);
  el.reviewTitle.textContent = `Semaine du ${formatDateFR(start)} au ${formatDateFR(end)}`;

  const weekEntries = entriesInWeek(start);
  const events = weekEntries.filter(e => e.kind === "event").length;
  const tasksOpen = weekEntries.filter(e => isTaskOpen(e)).length;
  const tasksDone = weekEntries.filter(e => e.kind === "task" && e.taskState === "done").length;

  el.reviewSummary.innerHTML = "";
  el.reviewSummary.appendChild(statGrid([
    { label: "Tâches faites", value: String(tasksDone) },
    { label: "Tâches ouvertes", value: String(tasksOpen) },
    { label: "Événements", value: String(events) },
  ]));

  const moodCount = { green: 0, yellow: 0, red: 0 };
  weekDates(start).forEach(d => {
    const m = getMood(d).level;
    if (moodCount[m] !== undefined) moodCount[m] += 1;
  });
  el.reviewMood.innerHTML = "";
  const moodTotal = moodCount.green + moodCount.yellow + moodCount.red;
  if (!moodTotal) {
    el.reviewMood.appendChild(mutedBox("Aucun mood noté cette semaine."));
  } else {
    const gPct = Math.round((moodCount.green / moodTotal) * 100);
    const yPct = Math.round((moodCount.yellow / moodTotal) * 100);
    const rPct = Math.max(0, 100 - gPct - yPct);
    const bar = stackBar([
      { cls: "stackSeg--green", pct: gPct },
      { cls: "stackSeg--yellow", pct: yPct },
      { cls: "stackSeg--red", pct: rPct },
    ], "stackBar stackBar--lg");
    el.reviewMood.appendChild(bar);
    const legend = document.createElement("div");
    legend.className = "progressLegend";
    legend.textContent = `Vert ${moodCount.green} · Jaune ${moodCount.yellow} · Rouge ${moodCount.red}`;
    el.reviewMood.appendChild(legend);
  }


  el.reviewHabits.innerHTML = "";
  if (!state.habits.length) {
    el.reviewHabits.appendChild(mutedBox("Aucune habitude configurée."));
  } else {
    const week = weekDates(start);
    const ranked = state.habits.map(h => {
      let done = 0;
      week.forEach(dayIso => {
        const mk = monthKeyFromDate(dayIso);
        const hc = habitCheck(mk, h.id);
        if (hc[String(Number(dayIso.slice(8, 10)))]) done += 1;
      });
      return { habit: h, done };
    }).sort((a, b) => b.done - a.done);

    ranked.forEach(({ habit: h, done }) => {
      const pct = Math.round((done / 7) * 100);
      const row = document.createElement("div");
      row.className = "habitRow";

      const head = document.createElement("div");
      head.className = "habitRow__head";
      head.innerHTML = `<span>${escapeHtml(h.name)}</span>`;

      const score = document.createElement("span");
      score.className = "habitScore";
      let levelClass = "habitSeg--green";
      if (done <= 2) {
        score.classList.add("habitScore--red");
        levelClass = "habitSeg--red";
      } else if (done <= 4) {
        score.classList.add("habitScore--orange");
        levelClass = "habitSeg--orange";
      } else {
        score.classList.add("habitScore--green");
        levelClass = "habitSeg--green";
      }
      score.textContent = `${done}/7`;

      head.appendChild(score);

      const bar = stackBar([
        { cls: levelClass, pct },
        { cls: "habitSeg--rest", pct: Math.max(0, 100 - pct) },
      ], "habitBar");

      row.appendChild(head);
      row.appendChild(bar);
      el.reviewHabits.appendChild(row);
    });
  }

  renderReviewFlow();
}

/* ---------------- Year view ---------------- */

function renderYear() {
  el.yearTitle.textContent = String(state.yearCursor);
  el.yearGrid.innerHTML = "";

  for (let month = 1; month <= 12; month++) {
    const mk = `${state.yearCursor}-${String(month).padStart(2, "0")}`;
    const dim = daysInMonth(mk);

    const box = document.createElement("div");
    box.className = "yearMonth";

    const title = document.createElement("div");
    title.className = "yearMonth__title";
    title.innerHTML = `<span>${capitalize(monthTitleFR(mk))}</span><small class="muted">${mk}</small>`;

    const dots = document.createElement("div");
    dots.className = "yearDots";

    for (let d = 1; d <= 31; d++) {
      const iso = isoFromMonthDay(mk, d);
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "yDot";

      if (d > dim) {
        dot.classList.add("is-disabled");
        dot.disabled = true;
      } else {
        const mood = getMood(iso);
        if (mood.level === "green") dot.classList.add("is-green");
        if (mood.level === "yellow") dot.classList.add("is-yellow");
        if (mood.level === "red") dot.classList.add("is-red");
        dot.title = mood.text ? `${iso} — ${mood.level || "none"} — ${mood.text}` : `${iso} — ${mood.level || "none"}`;

        dot.addEventListener("click", () => setSelectedDate(iso, true));
      }

      dots.appendChild(dot);
    }

    box.appendChild(title);
    box.appendChild(dots);
    el.yearGrid.appendChild(box);
  }
}

/* ---------------- Export / Import / Reset ---------------- */

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importJson(text, opts = {}) {
  let parsed;
  try { parsed = JSON.parse(text); } catch { alert("JSON invalide."); return; }
  if (!isPlainObject(parsed)) return alert("JSON invalide.");

  if (parsed.app && parsed.app !== APP_ID) {
    return alert("Fichier incompatible avec cette application.");
  }
  const incomingVersion = typeof parsed.v === "number" ? parsed.v : STORAGE_VERSION;
  if (incomingVersion > STORAGE_VERSION) {
    return alert("Version plus récente détectée. Mets à jour l’app avant d’importer.");
  }

  const confirmImport = opts.confirm !== false;
  if (confirmImport) {
    const ok = confirm("Importer les données ?\nOK = remplacer tes données actuelles");
    if (!ok) return;
  }

  state.theme = parsed.theme === "dark" ? "dark" : "light";
  state.route = sanitizeRoute(parsed.route || "dashboard");
  state.daysView = parsed.daysView || "all";
  state.dailyFilter = normalizeDailyFilter(parsed.dailyFilter || "all");
  state.selectedDate = isIsoDate(parsed.selectedDate) ? parsed.selectedDate : todayISO();
  state.query = parsed.query || "";
  state.monthCursor = isMonthKey(parsed.monthCursor) ? parsed.monthCursor : monthKeyFromDate(todayISO());
  state.reviewCursor = isIsoDate(parsed.reviewCursor) ? parsed.reviewCursor : todayISO();
  state.reviewFlow = sanitizeReviewFlow(parsed.reviewFlow);
  state.viewPrefs = sanitizeViewPrefs(parsed.viewPrefs);
  state.lastLocalChangeAt = typeof parsed.lastLocalChangeAt === "number" ? parsed.lastLocalChangeAt : 0;
  state.lastSyncAt = typeof parsed.lastSyncAt === "number" ? parsed.lastSyncAt : 0;
  state.lastRemoteAt = typeof parsed.lastRemoteAt === "number" ? parsed.lastRemoteAt : 0;
  state.syncHistory = Array.isArray(parsed.syncHistory) ? parsed.syncHistory.slice(0, 12) : [];
  state.onboardingSeen = parsed.onboardingSeen === true;

  state.entries = Array.isArray(parsed.entries) ? parsed.entries.map(sanitizeEntry).filter(Boolean) : [];

  state.templates = Array.isArray(parsed.templates) ? parsed.templates.map(sanitizeTemplate).filter(Boolean) : [];

  state.habits = Array.isArray(parsed.habits) ? parsed.habits.map(sanitizeHabit).filter(Boolean) : [];
  state.habitChecks = isPlainObject(parsed.habitChecks) ? parsed.habitChecks : {};

  state.projects = Array.isArray(parsed.projects) ? parsed.projects.map(sanitizeProject).filter(Boolean) : [];
  state.activeProjectId = state.projects.some(proj => proj.id === parsed.activeProjectId) ? parsed.activeProjectId : (state.projects[0]?.id || null);
  const rawMilestones = isPlainObject(parsed.projectMilestones) ? parsed.projectMilestones : {};
  const allowedProjectIds = new Set(state.projects.map(pr => pr.id));
  state.projectMilestones = Object.fromEntries(
    Object.entries(rawMilestones)
      .filter(([id]) => allowedProjectIds.has(id))
      .map(([id, items]) => [id, Array.isArray(items) ? items.map(sanitizeProjectMilestone).filter(Boolean) : []])
  );

  state.collections = Array.isArray(parsed.collections) ? parsed.collections.map(sanitizeCollection).filter(Boolean) : [];
  const rawItems = isPlainObject(parsed.collectionItems) ? parsed.collectionItems : {};
  const allowedCollectionIds = new Set(state.collections.map(c => c.id));
  state.collectionItems = Object.fromEntries(
    Object.entries(rawItems)
      .filter(([id]) => allowedCollectionIds.has(id))
      .map(([id, items]) => [id, Array.isArray(items) ? items.map(sanitizeCollectionItem).filter(Boolean) : []])
  );
  state.activeCollectionId = state.collections.some(col => col.id === parsed.activeCollectionId) ? parsed.activeCollectionId : (state.collections[0]?.id || null);

  state.moods = isPlainObject(parsed.moods) ? parsed.moods : {};
  state.yearCursor = typeof parsed.yearCursor === "number" ? parsed.yearCursor : new Date().getFullYear();

  const projectIds = new Set(state.projects.map(pr => pr.id));
  state.entries.forEach(e => {
    if (e.projectId && !projectIds.has(e.projectId)) e.projectId = "";
  });
  cleanupProjectNextActions();

  applyTheme(state.theme);
  save();
  syncAll();
}

function resetAll() {
  const ok = confirm("Reset total ? (supprime tout)");
  if (!ok) return;

  state = {
    theme: state.theme,
    route: "dashboard",
    daysView: "all",
    dailyFilter: "all",
    selectedDate: todayISO(),
    query: "",
    monthCursor: monthKeyFromDate(todayISO()),
    reviewCursor: todayISO(),
    reviewFlow: defaultReviewFlow(),
    viewPrefs: defaultViewPrefs(),
    lastLocalChangeAt: 0,
    lastSyncAt: 0,
    lastRemoteAt: 0,
    syncHistory: [],
    onboardingSeen: false,
    entries: [],
    templates: [],
    habits: [],
    habitChecks: {},
    projects: [],
    activeProjectId: null,
    projectMilestones: {},
    collections: [],
    collectionItems: {},
    activeCollectionId: null,
    moods: {},
    yearCursor: new Date().getFullYear(),
  };

  save();
  syncAll();
}

/* ---------------- Sync all UI ---------------- */

function syncAll() {
  el.datePick.value = state.selectedDate;
  el.search.value = state.query;
  el.btnFocus.setAttribute("aria-pressed", "false");
  el.btnFocus.textContent = "Focus";
  editingEntryId = null;
  resetEntryForm();
  setDaysView(state.daysView || "all");
  setDailyFilter(state.dailyFilter || "all");
  renderProjectOptions();
  renderTemplates();
  renderDaysList();
  renderPages();
  renderDashboardToggles();
  applyDashboardPreferences();
  renderSyncHistory();
}

/* ---------------- INIT ---------------- */

async function init() {
  await initStorage();
  await load();
  applyTheme(state.theme);

  const hashRoute = (location.hash || "").replace("#", "");
  if (hashRoute) state.route = sanitizeRoute(hashRoute);

  el.datePick.value = state.selectedDate;
  el.search.value = state.query;

  // Theme
  el.btnTheme.addEventListener("click", () => applyTheme(state.theme === "dark" ? "light" : "dark"));
  el.btnDrawer?.addEventListener("click", toggleDrawer);
  el.drawerOverlay?.addEventListener("click", closeDrawer);
  el.btnDrawerClose?.addEventListener("click", closeDrawer);
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-menu-close]");
    if (!btn) return;
    const details = btn.closest("details");
    if (details) details.removeAttribute("open");
  });

  // Auth / Sync
  el.btnLogin?.addEventListener("click", openAuthDialog);
  el.authClose?.addEventListener("click", () => el.authDialog?.close());
  el.authSignIn?.addEventListener("click", signInWithEmail);
  el.authSignUp?.addEventListener("click", signUpWithEmail);
  el.btnLogout?.addEventListener("click", signOut);
  el.btnSyncNow?.addEventListener("click", () => pushState("manual"));
  el.btnOnboarding?.addEventListener("click", openOnboarding);
  el.onboardingClose?.addEventListener("click", () => el.onboardingDialog?.close());
  el.onboardingStart?.addEventListener("click", finishOnboarding);
  el.onboardingDemo?.addEventListener("click", () => {
    if (hasUserData()) {
      const ok = confirm("Charger la demo va remplacer tes donnees actuelles. Continuer ?");
      if (!ok) return;
    }
    applyDemoData();
  });

  // Tabs
  el.tabs.forEach(t => t.addEventListener("click", (e) => {
    e.preventDefault();
    setRoute(t.dataset.route);
  }));

  window.addEventListener("hashchange", () => {
    const next = sanitizeRoute((location.hash || "").replace("#", "") || "dashboard");
    if (next !== state.route) {
      state.route = next;
      closeDrawer();
      renderPages();
      save();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeDrawer();
  });

  // Sidebar nav
  el.btnToday.addEventListener("click", () => setSelectedDate(todayISO(), true));
  el.datePick.addEventListener("change", (e) => setSelectedDate(e.target.value || todayISO(), state.route === "daily"));

  el.search.addEventListener("input", (e) => {
    state.query = e.target.value || "";
    save();
    if (state.route === "daily") renderDaily();
  });
  el.filterOpenTasks?.addEventListener("change", () => {
    if (state.route === "daily") renderDaily();
  });

  document.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (["input", "textarea", "select"].includes(tag)) return;
    if (e.key === "b") setRoute("dashboard");
    if (e.key === "d") setRoute("daily");
    if (e.key === "r") setRoute("review");
    if (state.route !== "daily") return;
    if (e.key === "t") el.kind.value = "task";
    if (e.key === "n") el.kind.value = "note";
    if (e.key === "e") el.kind.value = "event";
    if (e.key === "/") {
      e.preventDefault();
      el.search.focus();
    }
  });

  el.daysView.forEach(btn => {
    btn.addEventListener("click", () => setDaysView(btn.dataset.days || "all"));
  });

  el.dailyFilters.forEach(btn => {
    btn.addEventListener("click", () => setDailyFilter(btn.dataset.filter || "all"));
  });

  // Mood pills
  el.moodPills.forEach(p => p.addEventListener("click", () => {
    setMood(state.selectedDate, p.dataset.mood);
  }));

  // Mood text autosave (debounced)
  let moodTimer = null;
  el.moodText.addEventListener("input", () => {
    clearTimeout(moodTimer);
    el.moodSavedHint.textContent = "En cours…";
    moodTimer = setTimeout(() => {
      setMoodText(state.selectedDate, el.moodText.value);
      el.moodSavedHint.textContent = "Sauvegardé";
      setTimeout(() => (el.moodSavedHint.textContent = "Auto-sauvegarde"), 900);
    }, 350);
  });

  // Daily form
  el.entryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const txt = el.text.value.trim();
    if (!txt) return el.text.focus();

    const isTask = el.kind.value === "task";
    const dateForTask = (el.taskDate.value || "").trim();
    const dateForEntry = isTask ? (dateForTask || "") : state.selectedDate;
    const payload = {
      date: dateForEntry,
      kind: el.kind.value,
      time: el.time.value,
      tags: parseTags(el.tags.value),
      projectId: el.projectId.value,
      text: el.text.value,
    };

    if (editingEntryId) {
      const ok = updateDailyEntry(editingEntryId, payload);
      if (!ok) return;
      editingEntryId = null;
      resetEntryForm();
    } else {
      addDailyEntry(payload);
      resetEntryForm();
    }

    el.text.focus();
  });

  el.btnCancelEdit?.addEventListener("click", () => {
    editingEntryId = null;
    resetEntryForm();
  });

  // Templates
  el.templateForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    addTemplate(el.templateName.value, el.templateLines.value);
    el.templateName.value = "";
    el.templateLines.value = "";
    el.templateName.focus();
  });

  el.btnClearDay.addEventListener("click", () => clearDay(state.selectedDate));
  el.btnExportDay.addEventListener("click", () => {
    const md = markdownForDay(state.selectedDate);
    downloadText(`bujo-${state.selectedDate}.md`, md);
  });
  el.btnExportWeek.addEventListener("click", () => {
    const md = markdownForWeek(state.selectedDate);
    downloadText(`bujo-semaine-${state.selectedDate}.md`, md);
  });
  el.btnExportMonth.addEventListener("click", () => {
    const md = markdownForMonth(state.monthCursor);
    downloadText(`bujo-mois-${state.monthCursor}.md`, md);
  });
  el.btnFocus.addEventListener("click", () => {
    const on = document.body.classList.toggle("focus-mode");
    el.btnFocus.textContent = on ? "Quitter focus" : "Focus";
    el.btnFocus.setAttribute("aria-pressed", on ? "true" : "false");
  });

  // Monthly nav
  el.monthPrev.addEventListener("click", () => {
    state.monthCursor = addMonths(state.monthCursor, -1);
    save();
    renderMonthly();
    if (state.route === "dashboard") renderDashboard();
  });
  el.monthNext.addEventListener("click", () => {
    state.monthCursor = addMonths(state.monthCursor, 1);
    save();
    renderMonthly();
    if (state.route === "dashboard") renderDashboard();
  });

  // Habits nav
  el.habPrev.addEventListener("click", () => {
    state.monthCursor = addMonths(state.monthCursor, -1);
    save();
    renderHabits();
    if (state.route === "dashboard") renderDashboard();
  });
  el.habNext.addEventListener("click", () => {
    state.monthCursor = addMonths(state.monthCursor, 1);
    save();
    renderHabits();
    if (state.route === "dashboard") renderDashboard();
  });

  // Habit form
  el.habitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addHabit(el.habitName.value, el.habitColor.value, el.habitTarget.value);
    el.habitName.value = "";
    if (el.habitTarget) el.habitTarget.value = "4";
    el.habitName.focus();
  });
  el.habitClearMonth.addEventListener("click", () => clearHabitsMonth(state.monthCursor));

  // Collections
  el.collectionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addCollection(el.collectionName.value);
    el.collectionName.value = "";
    el.collectionName.focus();
  });

  el.collectionItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!state.activeCollectionId) return;

    addCollectionItem(state.activeCollectionId, {
      text: el.collectionItemText.value,
      tags: parseTags(el.collectionItemTags.value),
      date: el.collectionItemDate.value || "",
    });

    el.collectionItemText.value = "";
    el.collectionItemTags.value = "";
    el.collectionItemDate.value = "";
    el.collectionItemText.focus();
  });

  // Projects
  el.projectForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    addProject(el.projectName.value, el.projectColor.value);
    el.projectName.value = "";
    el.projectName.focus();
  });
  el.projectTaskForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!state.activeProjectId) return;
    const text = el.projectTaskText.value.trim();
    if (!text) return el.projectTaskText.focus();
    addDailyEntry({
      date: el.projectTaskDate.value || "",
      kind: "task",
      time: "",
      tags: [],
      text,
      projectId: state.activeProjectId,
    });
    el.projectTaskText.value = "";
    el.projectTaskDate.value = "";
    el.projectTaskText.focus();
  });
  el.projectMilestoneForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!state.activeProjectId) return;
    const text = el.projectMilestoneText.value.trim();
    if (!text) return el.projectMilestoneText.focus();
    addProjectMilestone(state.activeProjectId, text, el.projectMilestoneDate.value || "");
    el.projectMilestoneText.value = "";
    el.projectMilestoneDate.value = "";
    el.projectMilestoneText.focus();
  });
  el.projectNextForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!state.activeProjectId) return;
    if (!el.projectNextSelect) return;
    const entryId = el.projectNextSelect.value;
    if (!entryId) return el.projectNextSelect.focus();
    setProjectNextAction(state.activeProjectId, entryId);
  });

  // Year nav
  el.yearPrev.addEventListener("click", () => {
    state.yearCursor -= 1;
    save();
    renderYear();
    if (state.route === "dashboard") renderDashboard();
  });
  el.yearNext.addEventListener("click", () => {
    state.yearCursor += 1;
    save();
    renderYear();
    if (state.route === "dashboard") renderDashboard();
  });

  // Review nav
  el.reviewPrev?.addEventListener("click", () => {
    state.reviewCursor = addDaysISO(state.reviewCursor, -7);
    save();
    renderReview();
  });
  el.reviewNext?.addEventListener("click", () => {
    state.reviewCursor = addDaysISO(state.reviewCursor, 7);
    save();
    renderReview();
  });

  // Dashboard personalization
  el.dashWidgetToggles?.addEventListener("change", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    const id = input.dataset.widgetId;
    if (!id) return;
    setDashboardWidgetVisibility(id, input.checked);
  });
  el.dashInsightToggles?.addEventListener("change", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    const id = input.dataset.widgetId;
    if (!id) return;
    setDashboardWidgetVisibility(id, input.checked);
  });
  el.dashResetWidgets?.addEventListener("click", resetDashboardWidgets);

  // Review workflow
  let reviewSaveTimer = null;
  el.reviewFlowTabs.forEach(btn => {
    btn.addEventListener("click", () => setReviewFlowMode(btn.dataset.flow));
  });
  el.reviewChecklist?.addEventListener("change", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    const id = input.dataset.checkId;
    if (!id) return;
    ensureReviewFlowState();
    const mode = state.reviewFlow.mode;
    const scope = reviewScopeInfo(mode);
    const bucket = reviewDataFor(mode, scope.key);
    bucket.checks[id] = input.checked;
    input.closest(".checkItem")?.classList.toggle("is-done", input.checked);
    updateReviewFlowProgress(mode, bucket);
    save();
  });
  el.reviewQuestions?.addEventListener("input", (e) => {
    const area = e.target;
    if (!(area instanceof HTMLTextAreaElement)) return;
    const id = area.dataset.questionId;
    if (!id) return;
    ensureReviewFlowState();
    const mode = state.reviewFlow.mode;
    const scope = reviewScopeInfo(mode);
    const bucket = reviewDataFor(mode, scope.key);
    bucket.answers[id] = area.value || "";
    clearTimeout(reviewSaveTimer);
    reviewSaveTimer = setTimeout(save, 300);
  });

  // Export / Import / Reset
  el.btnExport.addEventListener("click", () => {
    downloadJson(`bujo-backup-${new Date().toISOString().slice(0,10)}.json`, {
      app: APP_ID,
      v: STORAGE_VERSION,
      exportedAt: Date.now(),
      ...state,
    });
  });

  el.importFile.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    importJson(text);
    e.target.value = "";
  });

  el.btnReset.addEventListener("click", resetAll);

  // initial render
  initSupabase();
  syncAll();
  if (!state.onboardingSeen && !hasUserData()) {
    setTimeout(openOnboarding, 200);
  }
}

init().catch(() => {});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
