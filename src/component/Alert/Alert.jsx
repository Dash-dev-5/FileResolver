import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Alert = () => {
  const dispatch = useDispatch();
  const { visible, message, type, duration } = useSelector((state) => state.alert);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_ALERT' });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, dispatch]);

  if (!visible) return null;

  const typeStyles = {
    success: { backgroundColor: '#34c759', color: '#fff' },
    failed: { backgroundColor: '#ff3b30', color: '#fff' },
    warning: { backgroundColor: '#f7c948', color: '#000' },
  };

  return (
    <div
      style={{
        ...typeStyles[type],
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        zIndex: 100000000,
      }}
    >
      {message}
    </div>
  );
};

export default Alert;
