import { ProjectCard, ProjectTypeCard } from "@/components/ProjectCard";
import SearchForm from "../../components/searchForm";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERIES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
interface iQueryprops{
  searchParams: Promise<{ search?:string }>
}

export default async function Home({searchParams} : iQueryprops ) {
  const search = (await searchParams).search;
  const params = {search : search || null}
  const {data : posts} = await sanityFetch({query:PROJECT_QUERIES,params});
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Flex Your Projects,<br /> Fuel Your Growth</h1>
      <p className="sub-heading !max-w-md">Showcase Your Projects, Connect with Innovators, and Grow Together</p>
      <SearchForm search={search}/>
    </section>
    
    <section className="section_container">
      <p className="text-30-semibold">
        {search ? `Search results for "${search}" ` : 'All Projects'}
      </p>
      <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ProjectTypeCard) => (
              <ProjectCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
    </section>
    <SanityLive />
    </>
  );
}
