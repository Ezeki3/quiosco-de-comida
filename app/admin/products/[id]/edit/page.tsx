import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number){
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if (!product) {
        notFound()
    }

    return product
}

export default async function EditProductsPage( {params}: { params: Promise<{id:string}> }) {

    const {id } = await params
    const product = await getProductById( Number(id) )
    console.log(product);
    
  return (
    <div>page</div>
  )
}
