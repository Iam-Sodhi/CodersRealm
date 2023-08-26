"use client"
import React,{useState} from 'react';
import Split from 'react-split';
import Description from './Description';
import Playground from './Playground';
import { Problem } from '../../lib/Problems/types/Problem';
type CodeEditorProps = {
    problem: Problem
};

const CodeEditor:React.FC<CodeEditorProps> = ({problem}) => {
    const [solved, setSolved] = useState(false);
    return <> <Split className='split' minSize={0}>
        <Description  problem={problem} _solved={solved}/>
        <Playground problem={problem}/>
    </Split>
    </>
}
export default CodeEditor;