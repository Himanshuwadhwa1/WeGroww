import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_SLUG_QUERY, PROJECT_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as React  from 'react';
import markdownit from 'markdown-it'
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/view';
import { ProjectCard, ProjectTypeCard } from '@/components/ProjectCard';
const md = markdownit()

export interface IHomeProps {
    params : Promise<{id : string}>
}
export const experimental_ppr = true;
export default async function Home({params}: IHomeProps) {
    const id = (await params).id;
    const [post,data] = await Promise.all([  // parallel data fetching for faster data fetching
        client.fetch(PROJECT_BY_ID_QUERY,{id}),
        client.fetch(PLAYLIST_SLUG_QUERY,{slug:'editor-s-pick'})
    ])
    const editorPosts = data?.select;
    if(!post){
        return notFound();
    }
    const parsed = md.render(post?.pitch || '');
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
    </section>
    <section className='section_container'>
        {post.image ? (
        <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-lg' />
    ) : (<img src='https://placehold.co/600x400' alt='NoImage' className='w-full h-auto rounded-lg'/>)}
        <div className='space=y-5 mt-10 max-w-6xl mx-auto'>
            <div className='flex flex-between gap-5'>
                <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                    {post.author?.image ?(
                        <Image src={post.author?.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg'/>
                    ) : (<Image src={'https://placehold.co/64x64'} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg'/>)}
                    <div>
                        <p className='text-20-medium'>{post.author?.name}</p>
                        <p className='text-16-medium !text-black-300'>@{post.author?.username}</p>
                    </div>
                </Link>
                <p className='category-tag'>{post.category}</p>
            </div>
            <hr  className='divider'/>
            <h3 className='text-30-bold mb-5'>Project Details :</h3>
            {parsed? (
                <article className='prose max-w-4xl font-work-sans break-all'
                dangerouslySetInnerHTML={{__html:parsed}}
                />
            ) : (
                <p className='no-result'>
                    No Details provided
                </p>
            )}
        </div>
            <hr  className='divider'/>
            {editorPosts && editorPosts?.length >0 && (
                <div className='max-w-4xl mx-auto'>
                    <p className='text-30-semibold'>Projects you may find interesting</p>
                    <ul className='mt-7 card_grid-sm'>
                        {editorPosts?.map((post:ProjectTypeCard,index:number)=>{
                            return <ProjectCard key={index} post={post}/>
                        })}
                    </ul>
                </div>
            )}
            
            <Suspense fallback={<Skeleton className='view_skeleton' />}>
                <View id={id}/>
            </Suspense>

        </section>
    </>
  );
}
