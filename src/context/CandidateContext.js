// src/context/CandidateContext.js
// Global state management for the Candidate Management Dashboard
// Uses React Context + useReducer. Fetches live data on mount with mock fallback.

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { fetchCandidatesFromAPI } from "../utils/api";
import mockCandidates from "../data/mockCandidates";

// ---------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------

export const ACTIONS = {
  SET_CANDIDATES:    "SET_CANDIDATES",
  ADD_CANDIDATE:     "ADD_CANDIDATE",
  SET_LOADING:       "SET_LOADING",
  SET_ERROR:         "SET_ERROR",
  SET_SEARCH:        "SET_SEARCH",
  SET_FILTER:        "SET_FILTER",
  TOGGLE_DARK_MODE:  "TOGGLE_DARK_MODE",
};

// ---------------------------------------------------------------------------
// Initial State
// Read darkMode from localStorage so preference survives page reloads
// ---------------------------------------------------------------------------

const storedDarkMode = localStorage.getItem("darkMode");

const initialState = {
  candidates:    [],
  loading:       false,
  error:         "",
  searchQuery:   "",
  statusFilter:  "All",
  darkMode:      storedDarkMode !== null ? JSON.parse(storedDarkMode) : false,
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function candidateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CANDIDATES:
      return {
        ...state,
        candidates: action.payload,
        loading: false,
        error: "",
      };

    case ACTIONS.ADD_CANDIDATE:
      return {
        ...state,
        // Prepend so the newest candidate always appears first in the list
        candidates: [action.payload, ...state.candidates],
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        // Clear any previous error when a new fetch starts
        error: action.payload ? "" : state.error,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        statusFilter: action.payload,
      };

    case ACTIONS.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CandidateContext = createContext(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

/**
 * Wraps the app and provides global candidate state + dispatch to all children.
 * Fetches live data from the DummyJSON API on mount; falls back to local
 * mockCandidates if the network request fails.
 */
export function CandidateProvider({ children }) {
  const [state, dispatch] = useReducer(candidateReducer, initialState);

  // ---- Persist darkMode to localStorage whenever it changes ---------------
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));

    // Also toggle the `dark` class on <html> for Tailwind's dark-mode support
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  // ---- Fetch candidates on mount ------------------------------------------
  const loadCandidates = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    try {
      const apiCandidates = await fetchCandidatesFromAPI();
      dispatch({ type: ACTIONS.SET_CANDIDATES, payload: apiCandidates });
    } catch (err) {
      console.warn(
        "[CandidateContext] API fetch failed — falling back to mock data.",
        err.message
      );
      // Graceful fallback: use local mock data so the UI is never empty
      dispatch({ type: ACTIONS.SET_CANDIDATES, payload: mockCandidates });
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Could not reach the server. Showing offline demo data.",
      });
    }
  }, []);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  // ---- Derived / filtered candidates (memoised on state changes) ----------
  const filteredCandidates = state.candidates.filter((candidate) => {
    const query = state.searchQuery.toLowerCase();

    const matchesSearch =
      !query ||
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.college.toLowerCase().includes(query) ||
      candidate.skills.some((s) => s.toLowerCase().includes(query));

    const matchesFilter =
      state.statusFilter === "All" || candidate.status === state.statusFilter;

    return matchesSearch && matchesFilter;
  });

  // ---- Action creators exposed to consumers --------------------------------
  const actions = {
    setSearch:      (query)     => dispatch({ type: ACTIONS.SET_SEARCH,     payload: query }),
    setFilter:      (filter)    => dispatch({ type: ACTIONS.SET_FILTER,     payload: filter }),
    addCandidate:   (candidate) => dispatch({ type: ACTIONS.ADD_CANDIDATE,  payload: candidate }),
    toggleDarkMode: ()          => dispatch({ type: ACTIONS.TOGGLE_DARK_MODE }),
    reload:         loadCandidates,
  };

  const value = {
    ...state,          // candidates, loading, error, searchQuery, statusFilter, darkMode
    filteredCandidates,
    dispatch,
    ...actions,
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// useCandidates — custom hook for clean context consumption
// ---------------------------------------------------------------------------

/**
 * Returns the full candidate context value.
 * Must be used inside a <CandidateProvider>.
 *
 * @example
 * const { filteredCandidates, loading, addCandidate } = useCandidates();
 */
export function useCandidates() {
  const context = useContext(CandidateContext);

  if (context === null) {
    throw new Error(
      "useCandidates must be used within a <CandidateProvider>.\n" +
      "Make sure your component tree is wrapped with <CandidateProvider>."
    );
  }

  return context;
}

export default CandidateContext;
