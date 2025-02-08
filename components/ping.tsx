import * as React from 'react';

export interface IPingProps {
}

export function Ping (props: IPingProps) {
  return (
    <div className='relative'>
      <div className='absolute -left-6 top-2'>
        <span className='flex size-[14px]'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c527aa]'></span>
            <span className='relative inline-flex size-[14px] rounded-full bg-[#c527aa]'></span>
        </span>
      </div>
    </div>
  );
}
