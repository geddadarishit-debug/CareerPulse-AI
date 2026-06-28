import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { authAPI, usersAPI } from '../api';

const AppContext = createContext();

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  theme: 'dark',
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ACCESS_TOKEN':
      return { ...state, accessToken: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, accessToken: null };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('theme') || 'dark';

    if (storedToken) {
      dispatch({ type: 'SET_ACCESS_TOKEN', payload: storedToken });
    }
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
    }

    dispatch({ type: 'SET_THEME', payload: storedTheme });
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    return authAPI.login(credentials)
      .then(data => {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'SET_ACCESS_TOKEN', payload: data.access_token });
        dispatch({ type: 'SET_USER', payload: data.user });
        return data;
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    return authAPI.register(userData)
      .then(data => {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'SET_ACCESS_TOKEN', payload: data.access_token });
        dispatch({ type: 'SET_USER', payload: data.user });
        return data;
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const fetchUser = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    return usersAPI.getMe()
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'SET_USER', payload: user });
        return user;
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    dispatch({ type: 'SET_THEME', payload: newTheme });
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const value = {
    state,
    dispatch,
    login,
    register,
    logout,
    fetchUser,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
