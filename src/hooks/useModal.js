/**
 * useModal Hook
 * Custom hook untuk modal state management
 */

'use client';

import { useState } from 'react';

export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState(null);

  const open = (modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    // Clear data after animation
    setTimeout(() => setData(null), 300);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  };
}