import React, { useState, useReducer } from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import { Domain } from '../types';

// Initialize state
const initialState = {
  currentTab: 'dashboard',
  members: [
    { id: 1, name: 'Alice Johnson', domain: Domain.Frontend, email: 'alice@example.com', role: 'member' },
    { id: 2, name: 'Bob Smith', domain: Domain.Backend, email: 'bob@example.com', role: 'lead' },
    { id: 3, name: 'Carol White', domain: Domain.AI_ML, email: 'carol@example.com', role: 'member' },
  ],
  attendance: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, currentTab: action.payload };
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };
    case 'REMOVE_MEMBER':
      return { ...state, members: state.members.filter(m => m.id !== action.payload) };
    case 'MARK_ATTENDANCE':
      return { ...state, attendance: [...state.attendance, action.payload] };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default function DashboardPage() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleNavigate = (tab) => {
    dispatch({ type: 'SET_TAB', payload: tab });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="flex gap-8 p-8" style={{ background: 'var(--bg)' }}>
      <Sidebar currentTab={state.currentTab} onNavigate={handleNavigate} />
      <div className="flex-1">
        {state.currentTab === 'dashboard' && (
          <Dashboard state={state} onNavigate={handleNavigate} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}