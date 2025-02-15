import React, { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { theme } from './theme';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import ExerciseTracker from './components/ExerciseTracker';
import Rankings from './components/Rankings';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import useAuthStore from './store/authStore';
import useExerciseStore from './store/exerciseStore';

export default function App() {
  const authInit = useAuthStore(state => state.init);
  const exerciseInit = useExerciseStore(state => state.init);

  useEffect(() => {
    authInit();
    exerciseInit();
  }, [authInit, exerciseInit]);

  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="rankings" element={<Rankings />} />
            <Route
              path="exercises"
              element={
                <PrivateRoute>
                  <ExerciseTracker />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
