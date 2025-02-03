import * as React from 'react';
import Form from 'next/form';
import { SearchFormReset } from './searchFormReset';
export interface ISearchFormProps {
    query?:string
}

export default function SearchForm ({query}: ISearchFormProps) {
    
  return (
    <>
        <Form action={'/'} scroll={false} className='search-form' >
            <input type="text" name="query" defaultValue={query} className='search-input' placeholder='Search Projects' />

            <div className='flex gap-2'>
                {query && <SearchFormReset query={query}/>}
                <button type='submit' className='search-btn text-white'>S</button>

            </div>
            
        </Form>
    </>
  );
}
