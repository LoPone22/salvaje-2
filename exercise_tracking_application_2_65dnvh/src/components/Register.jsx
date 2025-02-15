import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Container, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Logo from './Logo';

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore(state => state.register);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password || !name || !email) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    // Validación de correo electrónico básica
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Introduce un correo electrónico válido.');
      return;
    }

    await register(username, password, name, email);
    navigate('/login');
  };

  return (
    <Container size="xs">
      <Logo size="md" />
      <Paper shadow="xs" p="md" mt="xl">
        <Title order={2} mb="lg">Registrarse</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            mb="md"
            error={error ? ' ' : null}
          />
          <TextInput
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mb="md"
            error={error ? ' ' : null}
          />
          <TextInput
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            mb="md"
            error={error ? ' ' : null}
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
          <Button type="submit" fullWidth>
            Registrarse
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
