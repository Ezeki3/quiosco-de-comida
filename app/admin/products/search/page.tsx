import Heading from "@/components/ui/Heading";

export default async function SearchPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {

    // Usamos await para resolver la promesa de searchParams
    const { search = '' } = await searchParams;
    console.log(search);
    
  return (
    <>
        <Heading>Resultados de búsqueda</Heading>
    </>
  )
}
