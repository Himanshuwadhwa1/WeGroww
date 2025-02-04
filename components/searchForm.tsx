import * as React from 'react';
import Form from 'next/form';
import { SearchFormReset } from './searchFormReset';
import { Search } from 'lucide-react';
export interface ISearchFormProps {
    search?:string
}

export default function SearchForm ({search}: ISearchFormProps) {
    
  return (
    <>
        <Form action={'/'} scroll={false} className='search-form' >
            <input type="text" name="search" defaultValue={search} className='search-input' placeholder='Search Projects' />

            <div className='flex gap-2'>
                {search && <SearchFormReset query={search}/>}
                <button type='submit' className='search-btn text-white'>
                    <Search className='size-6'/>
                </button>

            </div>
            
        </Form>
    </>
  );
}
