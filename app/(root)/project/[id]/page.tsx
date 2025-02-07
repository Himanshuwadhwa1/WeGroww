import { client } from '@/sanity/lib/client';
import { PROJECT_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import * as React from 'react';

export interface IHomeProps {
    params : Promise<{id : string}>
}
export const experimental_ppr = true;
export default async function Home({params}: IHomeProps) {
    const id = (await params).id;
    const post = await client.fetch(PROJECT_BY_ID_QUERY,{id});
    if(!post){
        return notFound();
    }
  return (
    <>
      <div className='text-1xl'>{post[0].title} </div>
    </>
  );
}
