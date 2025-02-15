import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Container, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Logo from './Logo';

export default function ResetPassword() {
  const navigate = useNavigate();
  const resetPassword = useAuthStore(state => state.resetPassword);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container size="xs">
        <Logo size="md" />
        <Paper shadow="xs" p="md" mt="xl">
          <Title order={2} mb="lg">Correo Enviado</Title>
          <Text mb="md">
            Se ha enviado un correo a {email} con las instrucciones para restablecer tu contraseña.
          </Text>
          <Button onClick={() => navigate('/login')} fullWidth>
            Volver al Inicio de Sesión
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="xs">
      <Logo size="md" />
      <Paper shadow="xs" p="md" mt="xl">
        <Title order={2} mb="lg">Restablecer Contraseña</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mb="md"
          />
          <Button type="submit" fullWidth>
            Enviar Instrucciones
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
