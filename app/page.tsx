"use client"
import { useState } from "react"
import ProblemTable from "../components/ProblemTable"
import Topbar from "../components/Topbar"
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase";
import LoadingSkeleton from "../components/CodeEditor/Skeletons/LoadingSkeleton";
export default function Home() {
	// const [inputs,setInputs]=useState({
	// 	id:'', title:'',difficulty:'',
	// 	category:'',videoId:'',link:'',
	// 	order:0,likes:0, dislikes:0,
	// })

	// const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    //   setInputs({
	// 	...inputs,
	// 	[e.target.name]: e.target.value,
	//   })
	// }
	// const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
	// 	e.preventDefault();
	// 	//convert inputs.order to integer as input will be string by default
	// 	const newProblem={
	// 		...inputs,
	// 		order:Number(inputs.order),
	// 	}
	// 	await setDoc(doc(db,"problems",inputs.id),newProblem);
	// 	alert("saved to db");
	// }

	const [loading,setLoading]=useState(true);
  return (
    <main className="bg-dark-layer-2 min-h-screen" >
      <Topbar />
      <h1
					className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
				>
					&ldquo; QUALITY OVER QUANTITY &rdquo; 👇
				</h1>
				<div className='relative overflow-x-auto mx-auto px-6 pb-10'>
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
						
						</div>
					{loading &&(
						 	<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
							 {[...Array(10)].map((_, idx) => (
								 <LoadingSkeleton key={idx} />
							 ))}
						 </div>
					)}	
					<table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
					{!loading && (
							<thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
								<tr>
									<th scope='col' className='px-1 py-3 w-0 font-medium'>
										Status
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Title
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Difficulty
									</th>

									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Solution
									</th>
								</tr>
							</thead>
							
							)}
              <ProblemTable setLoading={setLoading} />
					</table>
				</div>


		{/* temp form	
		<form className="p-6 flex flex-col max-w-sm gap-3" onSubmit={handleSubmit}>
			<input onChange={handleInputChange} type="text" placeholder="problem id" name="id" />
			<input onChange={handleInputChange} type="text" placeholder="title" name="title" />
			<input onChange={handleInputChange} type="text" placeholder="difficulty" name="difficulty" />
			<input onChange={handleInputChange} type="text" placeholder="category" name="category" />
			<input onChange={handleInputChange} type="text" placeholder="order" name="order" />
			<input onChange={handleInputChange} type="text" placeholder="videoId?" name="videoId" />
			<input onChange={handleInputChange} type="text" placeholder="link?" name="link" />
			<button className="bg-white ">Save to DB</button>
		</form> */}
		 
    </main>
  )
}

