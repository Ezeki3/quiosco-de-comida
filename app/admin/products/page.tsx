import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount(){
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
 
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
 
  return products;
}
 
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;
 
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Espera el objeto searchParams para extraer los parámetros
  const { page = "1" } = await searchParams;
 
  // Aseguramos que la página sea al menos 1 para evitar skip negativo
  const parsedPage = parseInt(page as string, 10);
  const currentPage = Math.max(1, parsedPage); // Garatiza que no puede ser 0 o negativo
  const pageSize = 10;

  if ( Number(page) < 0) {
    redirect('/admin/products'); 
  }
 
  // Obtén los productos desde la base de datos
  const productsData =  getProducts(currentPage, pageSize);
  const totalProductsData =  productCount();
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])  
  const totalPages = Math.ceil(totalProducts / pageSize)

  if ( Number(page) > totalPages) {
    redirect('/admin/products'); 
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        
        <Link
          href={'/admin/products/new'}
          className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
        >Crear Producto</Link>
        
        <ProductSearchForm/>

      </div>
 
      <ProductTable products={products} />

      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />

    </>
  );
}