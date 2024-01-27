
import { useCallback, useEffect, useState ,useRef } from "react";
import Button from "./Component/Button";

function App() {
  const [NumberAllow, setNumallow] = useState(false);
  const [CharAllow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");
  const [range, setrange] = useState(8);
  
  const passwordRef = useRef(null)


  // copy password to Clipboard
  const copyPassword = useCallback(()=>{
   
    window.navigator.clipboard.writeText(password)
    inputRef.current.focus()

  },[password])




  function strSelector() {
    const alpha_string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number_string = "0123456789";
    const symbol_string = "!@#$%^&*()-_=+[{]};:'\",<.>/?";

    let data = alpha_string;

    if (NumberAllow) data += number_string;
    if (CharAllow) data += symbol_string;

    // console.log(data);
    return data;
  }

  function randomNum(n) {
    const num = Math.floor(Math.random() * n);
    // console.log(num);
    return num;
  }
  
 const gen= useCallback(()=> {
    let data = strSelector();
    // console.log(data);
    const digi = data.length;
    let pass = "";
    for (let i = 0; i < range; i++) {
      let val = randomNum(digi);
      // console.log(val);
      pass += data[val];
    }
    // console.log(pass);

    setPassword(pass);
  }, [NumberAllow , setPassword,CharAllow ,strSelector,range , setrange ])


    //   const gen=()=>{ let data = strSelector();
    //   // console.log(data);
    //   const digi = data.length;
    //   let pass = "";
    //   for (let i = 0; i < range; i++) {
    //     let val = randomNum(digi);
    //     // console.log(val);
    //     pass += data[val];
    //   }
    //   // console.log(pass);
  
    //   setPassword(pass);
    // }

  useEffect(() => {
    gen();
  }, [range, CharAllow, NumberAllow, setPassword]);

  
  const toggleNumber = () => {
    setNumallow((prev) => !prev);
  };
  const toggleChar = () => {
    setCharallow((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl   text-white p-4 pt-5 m-8 ">asslamualikum</h1>

        <div className=" text-center pt-10 max-w-md w-full bg-white p-4 rounded-md shadow-md">
          {/* <h1 className=" text-2xl bg-slate-200 m-4 p-1 rounded-md  "
          ref={passwordRef}
          >
            {password}
          </h1> */}

          <input type="text" value={password} readOnly
           ref={passwordRef}/>

          {/* butotn */}
          <button className="text-white bg-black p-2 m-2 px-6 rounded-md font-mono font-light"
          onClick={copyPassword}
          >
            copy
          </button>

          <div>
            <figure className=" bg-gray-200 font-mono inline-block m-2 p-2 rounded-full hover:before:bg-slate-400 cursor-pointer">
            {range}
            </figure>
            
            <input
              type="range"
              min={8}
              max={20}
              value={range}
              className=" cursor-nesw-resize m-2"
              onChange={(e) => setrange(e.target.value)}
              name=""
              id=""
            />
            
            <Button title="Number" callback={toggleNumber} />

            <Button title="Char" callback={toggleChar} value={NumberAllow} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
