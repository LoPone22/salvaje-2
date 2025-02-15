import { create } from 'zustand';

const useExerciseStore = create((set) => ({
  exercises: [],

  init: () => {
    const storedExercises = localStorage.getItem('exercises');
    set({ exercises: storedExercises ? JSON.parse(storedExercises) : [] });
  },

  addExercise: (exercise) => set((state) => {
    const newExercise = { ...exercise, id: Date.now() };
    const updatedExercises = [...state.exercises, newExercise];
    localStorage.setItem('exercises', JSON.stringify(updatedExercises));
    return { exercises: updatedExercises };
  }),

  updateExercise: (id, status) => set((state) => {
    const updatedExercises = state.exercises.map(ex =>
      ex.id === id ? { ...ex, status } : ex
    );
    localStorage.setItem('exercises', JSON.stringify(updatedExercises));
    return { exercises: updatedExercises };
  }),
}));

export default useExerciseStore;
