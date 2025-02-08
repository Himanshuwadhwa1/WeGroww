import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex items-center justify-center flex-col gap-4 bg-black-100 text-white min-h-screen'>
      <h2 className='text-4xl font-extrabold'>Not Found</h2>
      <p className=''>Could not find requested resource</p>
      <button className='px-3 rounded-xl border-red-800 border-4 bg-white-100 text-black-100 hover:bg-pink-200'>
      <Link href="/">Return Home</Link>
      </button>
    </div>
  )
}