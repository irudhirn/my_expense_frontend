import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserStore = {
  user: User | null,
  setUser: (user: User) => void
}
type User = {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  role: { _id: string, name: string }
}

const useAuthStore = create<UserStore>()(persist(((set) => ({
  user: null,
  setUser: (user: User) => set({ user })
})),
  {
    name: 'userData', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage)
  }
));

export default useAuthStore;