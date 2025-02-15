import React, { useState } from 'react';
import { Container, Title, Table, Paper, SegmentedControl, Stack } from '@mantine/core';
import useExerciseStore from '../store/exerciseStore';
import { startOfDay, startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';
import Logo from './Logo';

export default function Rankings() {
  const exercises = useExerciseStore(state => state.exercises);
  const [period, setPeriod] = useState('daily');

  const getPeriodStart = () => {
    const now = new Date();
    switch (period) {
      case 'daily': return startOfDay(now);
      case 'weekly': return startOfWeek(now);
      case 'monthly': return startOfMonth(now);
      default: return startOfDay(now);
    }
  };

  const getRankings = () => {
    const periodStart = getPeriodStart();
    const now = new Date();

    const stats = exercises.reduce((acc, ex) => {
      const exerciseDate = new Date(ex.date);
      if (!isWithinInterval(exerciseDate, { start: periodStart, end: now })) {
        return acc;
      }

      if (!acc[ex.userId]) {
        acc[ex.userId] = { total: 0, completed: 0 };
      }

      acc[ex.userId].total++;
      if (ex.status === 'Finalizado') {
        acc[ex.userId].completed++;
      }

      return acc;
    }, {});

    return Object.entries(stats)
      .map(([userId, { total, completed }]) => ({
        userId,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  return (
    <Container size="lg">
      <Logo size="md" />
      <Stack gap="xl">
        <Paper shadow="xs" p="md">
          <Title order={2} mb="lg">Ranking Global</Title>

          <SegmentedControl
            value={period}
            onChange={setPeriod}
            data={[
              { label: 'Diario', value: 'daily' },
              { label: 'Semanal', value: 'weekly' },
              { label: 'Mensual', value: 'monthly' }
            ]}
            mb="md"
          />

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Usuario</Table.Th>
                <Table.Th>Porcentaje Completado</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {getRankings().map(({ userId, percentage }) => (
                <Table.Tr key={userId}>
                  <Table.Td>{userId}</Table.Td>
                  <Table.Td>{percentage}%</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
}
