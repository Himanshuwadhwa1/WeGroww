import * as React from 'react';
import ProjectForm from '@/components/projectForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
export interface IHomeProps {
}

export default async function Home (props: IHomeProps) {
    const session = await auth();
  if(!session){
    redirect('/')
  }
  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>
            Submit Your Project
        </h1>
      </section>
      <ProjectForm />
    </>
  );
}
