import * as React from 'react';
import { Ping } from './ping';
import { client } from '@/sanity/lib/client';
import { VIEWS_BY_ID } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';

export interface IViewProps {
    id:string
}

export  async function View ({id}: IViewProps) {
    const {views : totalViews} = await client.withConfig({useCdn:false}).fetch(VIEWS_BY_ID,{id});
    after(async()=>{
        await writeClient.patch(id).set({views : totalViews+1}).commit();
    })
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p className='view-text'>
            <span className='font-black'>Views: {totalViews? totalViews:0}</span>
        </p>
    </div>
  );
}
