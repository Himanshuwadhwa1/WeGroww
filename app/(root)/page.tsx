import { ProjectCard } from "@/components/ProjectCard";
import SearchForm from "../../components/searchForm";
interface iQueryprops{
  searchParams: Promise<{ search?:string }>
}

export default async function Home({searchParams} : iQueryprops ) {
  const search = (await searchParams).search;
  const posts = [{
    createdAt : new Date(),
    views : "10",
    author : {_id : 1, name:'Himanshu'},
    _id :1,
    description : "Description",
    image : "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
    category : "Animals",
    title : "Animal Lives"
  }]
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
        {posts.length >0 ? (
          posts.map((post : StartupCardType) =>(
          <ProjectCard key={post?._id} post={post}/>
        ))
        ) : ( <p className="no_result">No results</p>
        )}
      </ul>
    </section>
    </>
  );
}
