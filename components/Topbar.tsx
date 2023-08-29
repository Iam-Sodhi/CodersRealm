"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import Logout from './Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
import Timer from './Timer';
import { Problem } from '../lib/Problems/types/Problem';
import { problems } from '../lib/Problems/problems';
import { useRouter } from 'next/navigation';

type TopbarProps = {
    problemPage?:boolean,
    problem:Problem
};

const Topbar:React.FC<TopbarProps> = ({problemPage,problem}) => {
    const [user]=useAuthState(auth);
    const router=useRouter();
    const setAuthModalState=  useSetRecoilState(authModalState);
    const handlerProblemChange=(isForward:boolean)=>{
        const {order}=problem;
        const direction= isForward? 1:-1;
        const nextproblemOrder=order+direction;
        const nextProblemKey=Object.keys(problems).find(key=> problems[key].order===nextproblemOrder);
        if(isForward && !nextProblemKey){
                 const firstProblemKey=Object.keys(problems).find(key=>problems[key].order===1)
                 router.push(`/problems/${firstProblemKey}`);
        }
        else if(!isForward && !nextProblemKey){
            const lastProblemKey=Object.keys(problems).find(key=>problems[key].order===Object.keys(problems).length);
            router.push(`/problems/${lastProblemKey}`);
        }
        else{
            router.push(`/problems/${nextProblemKey}`);
        }
    } 

    return <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
    <div className={`flex w-full items-center justify-between ${!problemPage?"max-w-[1200px] mx-auto":"" }`}>
        <Link href='/' className='h-[22px] flex-1'>
            <Image src='/logo-full.png' alt='Logo' height={100} width={100} />
        </Link>

         {problemPage&& (
            
         
            <div className='flex items-center gap-4 flex-1 justify-center'>
                <div
                    className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
                    onClick={()=>handlerProblemChange(false)}
               >
                    <FaChevronLeft />
                </div>
                <Link
                    href='/'
                    className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'
                >
                    <div>
                        <BsList />
                    </div>
                    <p>Problem List</p>
                </Link>
                <div
                    className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
                    onClick={()=>handlerProblemChange(true)}
                >
                    <FaChevronRight />
                </div>
            </div>
)}
        <div className='flex items-center space-x-4 flex-1 justify-end'>
            <div>
                <a
                    href='https://www.buymeacoffee.com/burakorkmezz'
                    target='_blank'
                    rel='noreferrer'
                    className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
                >
                    Premium
                </a>
            </div>

            {!user && ( <Link
                    href='/auth'
                    onClick={()=>{
                        setAuthModalState((prev)=>({...prev,isOpen:true,type:"login"}));
                    }}
                >
                    <button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button>
                </Link>)}

             {user && problemPage&& <Timer /> }   
            {user && (<div className='cursor-pointer group relative'>
            <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                    <div
                        className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
                        z-40 group-hover:scale-90 scale-0 
                        transition-all duration-300 ease-in-out'
                    >
                        <p className='text-sm'>{user.email}</p>
                    </div>
            </div> )}
            {user && 
             <Logout />
            }
            
            
        </div>
    </div>
</nav>
}
export default Topbar;