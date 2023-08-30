import React, { useState } from "react";
import PreferenceNav from "./PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
//import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import EditorFooter from "./EditorFooter";
import { Problem } from "../../lib/Problems/types/Problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-hot-toast";
import { problems } from "../../lib/Problems/problems";
import { cppCompiler } from "../../actions/cppCompiler";


type PlaygroundProps = {
  problem: Problem;
  setSuccess:React.Dispatch<React.SetStateAction<boolean>>
};

const Playground: React.FC<PlaygroundProps> = ({ problem ,setSuccess}) => {
  const user=useAuthState(auth);
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [userCode,setUserCode]=useState<string>(problem.starterCode)



   const handleSubmit=async()=>{
      if(!user) {
        toast.error("Please login to start submitting your code.")
        return;
      }
      try{
        //const db=new Function(`return ${userCode}`)(); // to convert string to a function
        //const success=problems[problem.id].handlerFunction(cb);
        let success : boolean | {
          error: string;
      };
        if(problem.testCases&&problem.targets&&problem.answers){

           success=await cppCompiler(userCode,problem.testCases,problem.targets,problem.answers);
        }
        else {
           success=await cppCompiler(userCode,problem.testCases,undefined,problem.answers);
        }
    
 
        if (typeof success === 'boolean') {
          console.log(success);
          if (success) {
            toast.success('Congrats! All tests passed!');
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 4000);
          } else {
            toast.error('Oops! One or more test cases failed.');
          }
        } else if(success.error){
          toast.error(success.error); // Display the error message
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred.');
      }
   };
   const onChange=(value:string)=>{
    setUserCode(value);
   }
  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={problem.starterCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
            onChange={onChange}
          />
        </div>

        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 "
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${activeTestCaseId === index ? "text-white" : "text-gray-500"}
                `}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='font-semibold my-4'>
						<p className='text-sm font-medium mt-4 text-white'>Input:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem.examples[activeTestCaseId].inputText}
						</div>
						<p className='text-sm font-medium mt-4 text-white'>Output:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem.examples[activeTestCaseId].outputText}
						</div>
					</div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};
export default Playground;
