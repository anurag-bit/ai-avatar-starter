import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import  React, { useEffect, useState } from "react";

const Home = () => {
  const [input, setInput] = useState('');
  const onChange = (event) => {
    setInput(event.target.value);
  };
  // Add generateAction
  const generateAction = async () => {
    console.log('Generating...');	
  }
  
  return (
    <div className="root">
      <Head>
        <title>AI Avatar Generator | Anurag</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>The Cool image Generator!📈🗿</h1>
          </div>
          <div className="header-subtitle">
            <h2> Turn me into anyone you want! Make sure you refer to me as "Anurag" in the prompt</h2>
          </div>
          <div className="prompt-container">
        <input className="prompt-box" value={input} onChange={onChange} />
      </div>
        </div>
        <div className="prompt-buttons">
    <a className="generate-button" onClick={generateAction}>
      <div className="generate">
        <p>Generate</p>
      </div>
    </a>
      </div>
      <div className="badge-container grow">
        <a
          href="https://huggingface.co/anurag-bit/Ai-avatar-Generator"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>built by Anurag📈🗿</p>
          </div>
        </a>
      </div>
    </div>
    </div>
  );
};

export default Home;
