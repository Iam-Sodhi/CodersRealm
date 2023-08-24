"use client"
import React, { useState,useEffect } from 'react';
import { problems } from '../lib/practiceProblems';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillYoutube } from "react-icons/ai";
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube'

type ProblemTableProps = {
    
};

const ProblemTable:React.FC<ProblemTableProps> = () => {
     const [youtubePlayer,setYouTubePlayer]=useState({
        isOpen:false,
        videoId:"",
     })
     const  closeModal=()=>{
        setYouTubePlayer({isOpen:false,videoId:""});
     }
     // close modal for pressing keydown 'Esx'
     useEffect(()=>{
        const handleEsc=(e:KeyboardEvent)=>{
            if(e.key==="Escape") closeModal();
        }
        window.addEventListener("keydown",handleEsc)
        return ()=>window.removeEventListener("keydown",handleEsc)
     },[])
    return (
        <>
        <tbody className='text-white'>
                 {problems.map((problem,idx)=>{
                         const difficulyColor =
                         problem.difficulty === "Easy"
                             ? "text-dark-green-s"
                             : problem.difficulty === "Medium"
                             ? "text-dark-yellow"
                             : "text-dark-pink";
                    return (
                        <tr className={`${idx%2==1?'bg-dark-layer-1':''}`} key={problem.id}>
                            <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                <BsCheckCircle  fontSize={"18"} width="18" />
                            </th>
                            <td className='px-6 py-4'>
                                <Link className='hover:text-blue-600 cursor-pointer'
                                href={`problems/${problem.id}`}> {problem.title}
                                </Link>
                            </td>
                            <td className={`px-6 py-4 ${difficulyColor}`}>
                            {problem.difficulty}
                            </td>
                            <td className={`px-6 py-4 `}>
                            {problem.category}
                            </td>
                            <td className={`px-6 py-4 `}>
                            {problem.videoId? <AiFillYoutube fontSize={"18"} className="cursor-pointer hover:text-red-600"
                            onClick={() =>
                                setYouTubePlayer({ isOpen: true, videoId: problem.videoId as string })
                            } />: <p className='text-gray-400'>Coming Soon</p>}
                            </td>
                        </tr>
                    )
                 })}
        </tbody>
        {youtubePlayer.isOpen && (
				<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
					<div
						className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
						onClick={closeModal}
					></div>
					<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
						<div className='w-full h-full flex items-center justify-center relative'>
							<div className='w-full relative'>
								<IoClose
									fontSize={"35"}
									className='cursor-pointer absolute -top-16 right-0'
									onClick={closeModal}
								/>
								<YouTube
									videoId={youtubePlayer.videoId}
									loading='lazy'
									iframeClassName='w-full min-h-[500px]'
								/>
							</div>
						</div>
					</div>
				</tfoot>
			)}
        </>
    )
}
export default ProblemTable;