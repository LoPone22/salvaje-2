import { create } from 'zustand';
import { hashPassword } from '../utils/hash';

const useAuthStore = create((set) => ({
  user: null,
  users: [], // Los usuarios se cargarán y guardarán en localStorage

  init: () => {
    const storedUsers = localStorage.getItem('users');
    const storedUser = localStorage.getItem('user');
    set({
      users: storedUsers ? JSON.parse(storedUsers) : [
        { username: 'salvaje', password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', name: 'Administrador', email: 'admin@example.com', isAdmin: true }, // Contraseña "1234" hasheada
      ],
      user: storedUser ? JSON.parse(storedUser) : null,
    });
  },

  login: async (username, password) => {
    const hashedPassword = await hashPassword(password);
    const user = useAuthStore.getState().users.find(
      u => u.username === username && u.password === hashedPassword
    );
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return { user };
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },

  register: async (username, password, name, email) => {
    const hashedPassword = await hashPassword(password);
    set((state) => {
      const newUser = { username, password: hashedPassword, name, email, isAdmin: false };
      const updatedUsers = [...state.users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    });
  },

  resetPassword: (email) => {
    // Simulación de envío de correo.  En una app real, esto generaría un token y enviaría un correo.
    console.log(`Password reset email sent to ${email}`);
  }
}));

export default useAuthStore;
