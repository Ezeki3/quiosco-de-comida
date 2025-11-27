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
  // // Espera el objeto searchParams para extraer los parámetros
  // const { page = "1" } = await searchParams;
 
  // // Aseguramos que la página sea al menos 1 para evitar skip negativo
  // const parsedPage = parseInt(page as string, 10);
  // const currentPage = Math.max(1, parsedPage); // Garatiza que no puede ser 0 o negativo
  // const pageSize = 10;

  // if ( Number(page) < 0) {
  //   redirect('/admin/products'); 
  // }
 
  // // Obtén los productos desde la base de datos
  // const productsData =  getProducts(currentPage, pageSize);
  // const totalProductsData =  productCount();
  // const [products, totalProducts] = await Promise.all([productsData, totalProductsData])  
  // const totalPages = Math.ceil(totalProducts / pageSize)

  // if ( Number(page) > totalPages) {
  //   redirect('/admin/products'); 
  // }

  const params = await searchParams;

  // 1. GARANTIZAR TIPO: Aseguramos que 'page' sea un string único o '1'.
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const page = pageParam || "1"; // 'page' es ahora el string que pasaremos al Link

  const pageSize = 10;
  const totalProducts = await productCount(); // Obtenemos el total ANTES de validar
  const totalPages = Math.ceil(totalProducts / pageSize);

  // 2. VALIDACIÓN: Convertimos el string a un número para la lógica de redirección.
  const parsedPage = parseInt(page as string, 10);
  
  // ==========================================================
  // LÓGICA DE REDIRECCIÓN (ANTES de la consulta a la DB)
  // ==========================================================
  
  // A. Redirección si es Negativo o Cero (debe ser >= 1)
  if (parsedPage < 1) {
    // Redirige a la URL base, que es la página 1
    redirect('/admin/products'); 
  }
  
  // B. Redirección si es mayor al total de páginas
  if (totalProducts > 0 && parsedPage > totalPages) {
    // Redirige a la última página válida
    redirect(`/admin/products?page=${totalPages}`); 
  }
  
  // 3. CÁLCULO FINAL: Si pasó las validaciones, usamos el valor para la DB.
  // Como ya validamos arriba, solo necesitamos asegurarnos de usar el valor
  // correcto (que es parsedPage, ya que es >= 1 y <= totalPages).
  const currentPage = parsedPage;
    
  const products = await getProducts(currentPage, pageSize);

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