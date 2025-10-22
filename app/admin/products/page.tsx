import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

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
 
  // Convierte 'page' a número y asigna un valor predeterminado si es inválido
  const currentPage = parseInt(page as string, 10) || 1;
  const pageSize = 10;
 
  // Obtén los productos desde la base de datos
  const products = await getProducts(currentPage, pageSize);
 
  return (
    <>
      <Heading>Manage Products</Heading>
 
      <ProductTable products={products} />
    </>
  );
}