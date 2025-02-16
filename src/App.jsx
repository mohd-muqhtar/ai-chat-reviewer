import React, { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "./App.css";
import axios from 'axios'
import Markdown from 'react-markdown'

const App = () => {
  const [code, setCode] = useState(`function sum(){ return 1+1 }`);

  const [review, setReview] = useState('')

  useEffect(() => {
    Prism.highlightAll();
  }, [code]); // Run only when `code` changes

   async function reviewCode(){

    const response=await  axios.post('http://localhost:3000/ai/get-review' , {code})
    
    setReview(response.data)


  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode} > Review </div>
        </div>
        <div className="right">
        <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default App;
