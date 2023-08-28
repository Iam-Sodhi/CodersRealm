import React from 'react';

type LoadingSkeletonProps = {
    
};

const LoadingSkeleton:React.FC<LoadingSkeletonProps> = () => {
    
    return <div className='flex items-center space-x-12 mt-4 px-6'>
    <div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
    <div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
    <div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
    <div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
    <span className='sr-only'>Loading...</span>
</div>
}
export default LoadingSkeleton;