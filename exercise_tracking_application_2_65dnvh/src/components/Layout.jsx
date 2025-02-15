import React from 'react';
import { AppShell, Group, Button } from '@mantine/core';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            {!isLoginPage && (
              <Button variant="subtle" onClick={() => navigate('/rankings')}>
                Rankings
              </Button>
            )}
            {user && (
              <Button variant="subtle" onClick={() => navigate('/exercises')}>
                Mis Ejercicios
              </Button>
            )}
          </Group>
          <Group>
            {user ? (
              <>
                <span>Bienvenido, {user.name}</span>
                <Button onClick={() => {
                  logout();
                  navigate('/login');
                }}>Cerrar Sesión</Button>
              </>
            ) : (
              !isLoginPage && (
                <>
                  <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                  <Button onClick={() => navigate('/register')}>Registrarse</Button>
                </>
              )
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
