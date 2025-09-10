import { create } from "zustand";
import { OrederItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrederItem[]
    addToOrder: (product: Product) => void
}

export const useStore = create<Store>(() => ({
    order: [],
    addToOrder: (product) => {
        console.log('agregando', product);
        
    }
}))