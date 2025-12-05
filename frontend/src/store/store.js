import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import propertyReducer from './propertySlice'
import adminReducer from './adminSlice'
import { loadAuthState, saveAuthState, clearAuthState,loadAdminState, saveAdminState, clearAdminState,loadPropertyState, savePropertyState, clearPropertyState } from './persist'
import { property } from 'zod'

const preloadedAuth = loadAuthState()
const preloadedAdmin = loadAdminState()
const preloadedProperty = loadPropertyState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property :propertyReducer ,
    admin: adminReducer,  
  },
  preloadedState: {
    auth: preloadedAuth ?? { user: null, token: null },
    admin: preloadedAdmin ?? { users: [], usersLoading: false, usersError: null },
    property: preloadedProperty ?? { properties: [], owner: {} }
  }
})

// Persist auth slice changes
let currentAuthSnapshot
store.subscribe(() => {
  const nextAuth = store.getState().auth
  if (nextAuth !== currentAuthSnapshot) {
    currentAuthSnapshot = nextAuth
    if (nextAuth && (nextAuth.user || nextAuth.token)) {
      saveAuthState(nextAuth)
    } else {
      clearAuthState()
    }
  }
})


// -------------------------------
// Persist ADMIN slice
// -------------------------------
let currentAdminSnapshot
store.subscribe(() => {
  const nextAdmin = store.getState().admin
  if (nextAdmin !== currentAdminSnapshot) {
    currentAdminSnapshot = nextAdmin

    if (nextAdmin && Array.isArray(nextAdmin.users)) {
      saveAdminState(nextAdmin)
    } else {
      clearAdminState()
    }
  }
})

let currentPropertySnapshot;

store.subscribe(() => {
  const nextProperty = store.getState().property;

  if (nextProperty !== currentPropertySnapshot) {
    currentPropertySnapshot = nextProperty;

    if (nextProperty && Array.isArray(nextProperty.properties)) {
      savePropertyState(nextProperty);
    } else {
      clearPropertyState();
    }
  }
});