import EditProductForm from "@/components/products/EditProductsForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
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
    
  return (
    <>
        <Heading>Editar Producto: {product.name}</Heading>

        <EditProductForm>
            <ProductForm 
                product={product}
            />
        </EditProductForm>
    </>
  )
}
