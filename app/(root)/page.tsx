import SearchForm from "../../components/searchForm";
interface iQueryprops{
  searchParams: Promise<{ search?:string }>
}

export default async function Home({searchParams} : iQueryprops ) {
  const search = (await searchParams).search
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Flex Your Projects,<br /> Fuel Your Growth</h1>
      <p className="sub-heading !max-w-md">Showcase Your Projects, Connect with Innovators, and Grow Together</p>
      <SearchForm search={search}/>
    </section>
    
    </>
  );
}
