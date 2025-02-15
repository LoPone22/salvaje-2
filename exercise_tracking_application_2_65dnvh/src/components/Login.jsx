import React from 'react';
import { TextInput, Button, Paper, Title, Container, Stack, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Logo from './Logo';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetear el error
    const result = await login(username, password);
    if (result.user) {
      navigate('/exercises');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <Container size="xs">
      <Logo size="md" />
      <Paper shadow="xs" p="md" mt="xl">
        <Stack>
          <Title order={2} mb="lg">Iniciar Sesión</Title>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              mb="md"
              error={error ? ' ' : null} // Mostrar un espacio en blanco si hay error para mantener el layout
            />
            <TextInput
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mb="md"
              error={error}
            />
            <Button type="submit" fullWidth mb="md">
              Iniciar Sesión
            </Button>
          </form>

          <Group justify="space-between" mt="md">
            <Button variant="subtle" onClick={() => navigate('/reset-password')}>
              ¿Olvidaste tu contraseña?
            </Button>
          </Group>

          <Stack align="center" mt="md" spacing="xs">
            <Text size="sm">¿No tienes una cuenta?</Text>
            <Button variant="light" fullWidth onClick={() => navigate('/register')}>
              Registrarse
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
