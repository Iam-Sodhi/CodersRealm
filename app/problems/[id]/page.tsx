"use client"
import React from "react";
import { Problem } from "../../../lib/Problems/types/Problem";
import Topbar from "../../../components/Topbar";
import CodeEditor from "../../../components/CodeEditor/CodeEditor";
import { problems } from "../../../lib/Problems/problems";

type ProblemPageProps={
    params: Problem;
}

export default function ProblemPage({params:{id} }:ProblemPageProps) {
    const problem=problems[id];
    return (
      <main>
      <Topbar problemPage problem={problem} />
	  <CodeEditor problem={problem} />
      </main>
    );
  }

