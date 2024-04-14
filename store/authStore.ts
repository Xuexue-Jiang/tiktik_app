import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'  
import { BASE_URL } from '@/utils'
import { IUser } from '../types'

interface IAuthStore {
  userProfile: IUser | null;
  allUsers: IUser[];
  addUser: (user: IUser) => void;
  removeUser: () => void;
  fetchAllUsers: () => Promise<void>;
}

const useAuthStore = create<IAuthStore>((set) => ({
  userProfile: null,
  allUsers: [],
  addUser: (user: IUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: response.data });
  },
}))

export default useAuthStore