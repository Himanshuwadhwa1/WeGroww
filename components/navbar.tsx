import { auth , signIn, signOut } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { BadgePlus, LogOut } from 'lucide-react';
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
                    <Link href='/create'>
                        <span className='max-sm:hidden'>Create</span>
                        <BadgePlus className='size-6 sm:hidden'/>
                    </Link>
                    <form action={async()=>{
                        "use server"
                        await signOut({redirectTo:'/'});
                    }}>
                        <button type='submit'>
                            <span className='max-sm:hidden'>Sign Out</span>
                            <LogOut className='size-6 sm:hidden'/>
                        </button>
                    </form>
                    <Link href={`/user/${session?.id}`}>
                        <span className='max-sm:hidden'>{session?.user.name}</span>
                        <Avatar className='sm:hidden'>
                            <AvatarImage src={session?.user?.image || ''} alt={session?.user.name || ''} className='size-10'/>
                            <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
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
