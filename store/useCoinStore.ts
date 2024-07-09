
import { create } from 'zustand';

// Definimos el tipo de nuestro store

const coinValue = 0.01

type CoinStore = {
    coins: number,
    inc: (amount?: number) => void,
    setCoins: (coins: number) => void,
}

export const useCoinStore = create<CoinStore>()((set) => ({
    coins: 0.001,
    inc: (amount: number = coinValue) => set((state) => ({ coins: state.coins + amount })),
    setCoins: (coins: number) => set({ coins }),
}))
