"use server";
const fs = require("fs");

import { spawnSync } from "child_process";

export const cppCompiler = async (
  code: string,
  testCases: any[] | undefined,
  targets: any[] | undefined,
  answers: any[] | undefined
) => {
  //const code=new Function(`return ${userCode}`)();
  // Save the user's C++ code to a file (e.g., userCode.cpp)
  // Save the user's C++ code to a file (e.g., userCode.cpp)
  fs.writeFileSync("userCode.cpp", code);

  try {
    if (fs.existsSync("userCode.exe")) {
        fs.unlinkSync("userCode.exe");
        console.log("Deleted previously compiled binary: userCode.exe");
      }
    // Compile the user's C++ code using g++
    spawnSync("g++", ["-o", "userCode", "userCode.cpp"]);

    
    if (testCases) {
        let success = true;
        for (let i = 0; i < testCases.length; i++) {
          const currentTestCases = testCases[i];
          const currentTarget = targets && targets[i];
          const currentAnswer = answers && answers[i];
          console.log("testcases: ",testCases);
          console.log("answers: ",answers);
          const spawnArguments = [
            ...(currentTarget ? [currentTarget.toString()] : []),
            ...currentTestCases.map((num: any) => num.toString()),
          ];
          
          // Execute the compiled binary
          const result = spawnSync('userCode.exe', spawnArguments, {
            shell: true,
          }).stdout.toString().trim();
  
             
          const expected = typeof currentAnswer === 'boolean'
          ? currentAnswer.toString()
          : currentAnswer.toString().replace(/,/g, ' ');
        
          const resultTrimmed = result.trim();
          const expectedTrimmed = expected.trim();
          console.log('Result:', resultTrimmed);
          console.log('Expected:', expectedTrimmed);
          if (resultTrimmed !== expectedTrimmed) {
            console.log('Test case failed:', resultTrimmed, expectedTrimmed);
            success = false;
            break;
          }
        }
        return success;
      } else {
        console.log('No test cases provided.');
        return false;
      }
  
  } catch (error: any) {
    console.error(error);
    return {error: error.message as string};
    // res.status(500).json({ error: 'An error occurred' });
  } finally {
    // Clean up by deleting the temporary files
    fs.unlinkSync("userCode.cpp");
    //fs.unlinkSync('userCode');
  }
};
