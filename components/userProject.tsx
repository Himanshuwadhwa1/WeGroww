import { client } from '@/sanity/lib/client';
import { PROJECT_BY_USER_QUERY } from '@/sanity/lib/queries';
import * as React from 'react';
import { ProjectCard, ProjectTypeCard } from './ProjectCard';

export interface IUserProjectsProps {
}

export default async function UserProjects ({id}: {id:string}) {
    const projects = await client.fetch(PROJECT_BY_USER_QUERY,{id});
    
  return (
    <>
      {(projects.length > 0) ? (projects.map((project:ProjectTypeCard)=>{
        return <ProjectCard key={project._id} post={project}/>
      }) ): (
        <p className='no-results'>No posts yet</p>
      )}
    </>
  );
}
