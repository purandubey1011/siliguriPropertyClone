export const AUTH_PERSIST_KEY = 'authState'

export function loadAuthState() {
  try {
    if (typeof window === 'undefined') return null
    const serialized = window.localStorage.getItem(AUTH_PERSIST_KEY)
    if (!serialized) return null
    const parsed = JSON.parse(serialized)
    if (typeof parsed !== 'object' || parsed === null) return null
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null
    }
  } catch (_err) {
    return null
  }
}

export function saveAuthState(authState) {
  try {
    if (typeof window === 'undefined') return
    const toStore = JSON.stringify({ user: authState.user, token: authState.token })
    window.localStorage.setItem(AUTH_PERSIST_KEY, toStore)
  } catch (_err) {
    // ignore
  }
}

export function clearAuthState() {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(AUTH_PERSIST_KEY)
  } catch (_err) {
    // ignore
  }
}

// persist.js

export const loadAdminState = () => {
  try {
    const serialized = localStorage.getItem("adminState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

export const saveAdminState = (state) => {
  try {
    localStorage.setItem("adminState", JSON.stringify(state));
  } catch {}
};

export const clearAdminState = () => {
  try {
    localStorage.removeItem("adminState");
  } catch {}
};

// PROPERTY STATE PERSIST
export const loadPropertyState = () => {
  try {
    const serialized = localStorage.getItem("propertyState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

export const savePropertyState = (state) => {
  try {
    localStorage.setItem("propertyState", JSON.stringify(state));
  } catch {}
};

export const clearPropertyState = () => {
  try {
    localStorage.removeItem("propertyState");
  } catch {}
};

