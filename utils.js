(() => {
  const warnedApps = new Set();

  function safeSetItem(key, value, opts = {}) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      const app = opts.app || "app";
      if (!warnedApps.has(app)) {
        warnedApps.add(app);
        alert("Sauvegarde impossible (localStorage plein). Pense a exporter ou supprimer des donnees.");
      }
      console.warn(`[${app}] localStorage error`, err);
      return false;
    }
  }

  function uid(prefix = "id") {
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function normalize(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function clampName(name, max = 22) {
    return (name || "").trim().replace(/\s+/g, " ").slice(0, max);
  }

  function isHexColor(s) {
    return typeof s === "string" && /^#([0-9a-fA-F]{6})$/.test(s);
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

  function parseTags(input) {
    const raw = String(input || "").trim();
    if (!raw) return [];
    const parts = raw
      .replace(/,/g, " ")
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (s.startsWith("#") ? s : `#${s}`))
      .map((s) => s.toLowerCase());
    return Array.from(new Set(parts)).slice(0, 10);
  }

  function safeUrl(u) {
    const s = String(u || "").trim();
    if (!s) return "";
    try {
      return new URL(s).toString();
    } catch {
      return "";
    }
  }

  window.SharedUtils = {
    safeSetItem,
    uid,
    normalize,
    clampName,
    isHexColor,
    hexToRgba,
    parseTags,
    safeUrl,
  };
})();
