// src/Context/context.jsx
import React, { useState, createContext } from 'react'; // ✅ Correct source

export let Result = createContext();

export default function Context({ children }) {
  let [verbalResult, setVerbalresult] = useState([]);
  let [quantResult, setQuantresult] = useState([]);
  let [dataResult, setDataresult] = useState([]);


  let obj = { verbalResult, setVerbalresult,quantResult, setQuantresult ,dataResult, setDataresult};

  return (
    <Result.Provider value={obj}>
      {children}
    </Result.Provider>
  );
}
