import Link from "next/link";

type ProductsPaginationProps = {
    page: string
}

export default function ProductsPagination( {page}: ProductsPaginationProps ) {
  const currentPageNumber = Number(page);

  return (
    <nav className="flex justify-center py-10">
        <Link
            href={`/admin/products?page=${currentPageNumber + 1}`}
        >Siguiente &raquo;</Link>
    </nav>
  )
}
