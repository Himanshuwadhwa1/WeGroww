import { auth , signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export interface INavbarProps {
}

export async function Navbar (props: INavbarProps) {
    const session = await auth()
  return (
    <header className='px-5 py-2 bg-[#F5F5F5] shadow-sm font-sans'>
      <nav className='flex justify-between items-center'>
        <Link href={'/'}>
            <Image src={'/logo.png'} alt='logo' width={144} height={30} style={{"mixBlendMode":'multiply'}}/>
        </Link>
        <div className='flex gap-5 items-center text-black'>
            {session && session?.user ? (
                <>
                    <Link href='/projects/create'>
                        <span>Create</span>
                    </Link>
                    <form action={async()=>{
                        "use server"
                        await signOut({redirectTo:'/'});
                    }}>
                        <button type='submit'>Sign out</button>
                    </form>
                    <Link href={`/user/${session?.id}`}>
                        {session?.user?.name}
                    </Link>
                </>
            ):(
                <form action={async()=>{
                    "use server"
                    await signIn('github')
                }}>
                    <button>
                        <span>Sign in</span>
                    </button>
                </form>
            )}
        </div>
      </nav>
    </header>
  );
}
