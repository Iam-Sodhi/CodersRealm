"use client"
import React,{useState} from 'react';
import Split from 'react-split';
import Description from './Description';
import Playground from './Playground';
import { Problem } from '../../lib/Problems/types/Problem';
import Confetti from 'react-confetti';
import useWindowSize from '../Hooks/useWindowSize';
type CodeEditorProps = {
    problem: Problem
};

const CodeEditor:React.FC<CodeEditorProps> = ({problem}) => {
    const [solved, setSolved] = useState(false);
    const {width,height}=useWindowSize();
    const [success,setSuccess]=useState(false);
    return  <Split className='split' minSize={0}>
        <Description  problem={problem} _solved={solved}/>
        <div>
        <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />
       {success && <Confetti gravity={0.3}
         tweenDuration={4000}
         width={width-1} height={height-1}
         />  }
        </div>
    </Split>
    
}
export default CodeEditor;