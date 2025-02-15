import React, { useState } from 'react';
import { Container, Title, Table, Button, TextInput, Select, Group, Stack, Paper } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import useExerciseStore from '../store/exerciseStore';
import useAuthStore from '../store/authStore';
import Logo from './Logo';

export default function ExerciseTracker() {
  const { user } = useAuthStore();
  const { exercises, addExercise, updateExercise } = useExerciseStore();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [error, setError] = useState('');

  const userExercises = exercises
    .filter(ex => user.isAdmin || ex.userId === user.username)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!title || !date) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    addExercise({
      title,
      date: date.toISOString(),
      userId: user.username,
      status: 'Iniciado'
    });
    setTitle('');
    setDate(null);
  };

  return (
    <Container size="lg">
      <Logo size="md" />
      <Stack gap="xl">
        <Paper shadow="xs" p="md">
          <Title order={2} mb="lg">Mis Ejercicios</Title>
          <form onSubmit={handleSubmit}>
            <Group mb="md">
              <TextInput
                label="Ejercicio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Nombre del ejercicio"
                error={error ? ' ' : null}
              />
              <DateInput
                label="Fecha"
                value={date}
                onChange={setDate}
                required
                placeholder="Selecciona una fecha"
                error={error}
              />
              <Button type="submit" mt={24}>Agregar Ejercicio</Button>
            </Group>
          </form>
        </Paper>

        <Paper shadow="xs" p="md">
          <Title order={3} mb="md">Ejercicios Registrados</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Ejercicio</Table.Th>
                <Table.Th>Fecha</Table.Th>
                {user.isAdmin && <Table.Th>Usuario</Table.Th>}
                <Table.Th>Estado</Table.Th>
                <Table.Th>Acción</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {userExercises.map((exercise) => (
                <Table.Tr key={exercise.id}>
                  <Table.Td>{exercise.title}</Table.Td>
                  <Table.Td>{new Date(exercise.date).toLocaleDateString()}</Table.Td>
                  {user.isAdmin && <Table.Td>{exercise.userId}</Table.Td>}
                  <Table.Td>{exercise.status}</Table.Td>
                  <Table.Td>
                    <Select
                      value={exercise.status}
                      onChange={(value) => updateExercise(exercise.id, value)}
                      data={['Iniciado', 'En proceso', 'Finalizado']}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
}
