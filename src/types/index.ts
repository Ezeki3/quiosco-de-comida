import { Product } from "@prisma/client";

export type OrederItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}