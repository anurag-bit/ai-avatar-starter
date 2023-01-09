import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import  React, { useEffect, useState } from "react";

const Home = () => {
  const maxRetries = 20;
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');
  // Numbers of retries 
  const [retry, setRetry] = useState(0);
  // Number of retries left
  const [retryCount, setRetryCount] = useState(maxRetries);
  // rest of code


  const onChange = (event) => {
    setInput(event.target.value);
  };
  // Add generateAction
  const generateAction = async () => {
    console.log('Generating...');	
     // Add useEffect here-
     useEffect(() => {}, [])
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(`Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`);
        setRetryCount(maxRetries);
        return;
        }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);

      await generateAction();
    };

    if (retry === 0) {
      return;
    }

    runRetry();
  }, [retry]);
      // If this is a retry request, take away retryCount
    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
        }
      });

      setRetry(0);
    }
    
    // Add the fetch request
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
    },
    body: JSON.stringify({ input }),
  });


  const data = await response.json();
  if (response.status === 503) {

    console.log('Model is loading still :(.')
    
    return;
  }

  // If another error, drop error
  if (!response.ok) {
    console.log(`Error: ${data.error}`);
    return;
  }
    // Set image data into state property
    setImg(data.image);

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
  <div className="prompt-buttons">
    {/* Add onClick property here */}
    <a className="generate-button" onClick={generateAction}>
      <div className="generate">
        <p>Generate</p>
      </div>
    </a>
  </div>
</div>
      
        </div>
      
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
   
  );
};

export default Home;
