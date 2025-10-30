import Link from "next/link";

type ProductsPaginationProps = {
  page: string
  totalPages: number

}

export default function ProductsPagination( {page, totalPages}: ProductsPaginationProps ) {
  const currentPageNumber = Number(page);

  const pages = Array.from({length: totalPages}, (_, i) => i + 1)  

  return (
    <nav className="flex justify-center py-10">

      {currentPageNumber > 1 && (
        <Link
          href={`/admin/products?page=${currentPageNumber - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >
          Anterior &laquo;
        </Link>
      )}

      {pages.map(page => (
        <Link
          href={`/admin/products?page=${page}`}
          className={`${currentPageNumber === page && 'font-black'} bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
        >{page}</Link>
      ))}

      { currentPageNumber < totalPages && (
        <Link
          href={`/admin/products?page=${currentPageNumber + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >
          Siguiente &raquo;
        </Link>
      )}
    </nav>
  )
}
