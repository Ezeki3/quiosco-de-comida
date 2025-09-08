import { create } from "zustand";
import { OrederItem } from "./types";

interface Store {
    order: OrederItem[]
}

export const useStore = create<Store>(() => ({
    order: []
}))