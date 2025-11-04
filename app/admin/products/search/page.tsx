import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(seachTerm: string){
    const products = await prisma.product.findMany({
        where:{
            name:{
                contains:seachTerm,
                mode: 'insensitive'
            }
        }, 
        include:{
            category: true
        }
    })
    return products
}

export default async function SearchPage({searchParams}: {searchParams: Promise<{ [key: string]: string }>}) {

    // Usamos await para resolver la promesa de searchParams
    const { search = '' } = await searchParams;
    const products = await searchProducts(search);
    
  return (
    <>
        <Heading>Resultados de búsqueda: {search} </Heading>

        <div className="flex flex-col lg:flex-row lg:justify-end gap-5">            
            <ProductSearchForm/>
        </div>


        {products.length ? (

            <ProductTable
                products={products}
            />

        ) : <p className="text-center text-lg mt-5">No hay resultados</p>}
    </>
  )
}
