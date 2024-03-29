import { useCallback, useEffect, useState, useRef } from "react";
import Button from "./Component/Button";
import ThemeBtn from "./Component/ThemeBtn";
// import useTheme from '../Context/theme';
import { ThemeProvider } from "./contexts/theme";

function App() {
  const [NumberAllow, setNumllow] = useState(false);
  const [CharAllow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");
  const [range, setrange] = useState(8);

  const passwordRef = useRef(null);

  const [themeMode, setThemeMode] = useState("dark");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  // copy password to Clipboard
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  function strSelector() {
    const alpha_string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number_string = "0123456789";
    const symbol_string = "!@#$%^&*()-_=+[{]};:'\",<.>/?";

    let data = alpha_string;

    if (NumberAllow) data += number_string;
    if (CharAllow) data += symbol_string;

    return data;
  }

  function randomNum(n) {
    const num = Math.floor(Math.random() * n);
    // console.log(num);
    return num;
  }

  const gen = useCallback(() => {
    let data = strSelector();

    const digi = data.length;
    let pass = "";
    for (let i = 0; i < range; i++) {
      let val = randomNum(digi);

      pass += data[val];
    }

    setPassword(pass);
  }, [NumberAllow, setPassword, CharAllow, strSelector, range, setrange]);

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

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const toggleNumber = () => {
    setNumllow((prev) => !prev);
  };
  const toggleChar = () => {
    setCharallow((prev) => !prev);
  };

  return (
    <ThemeProvider
      value={{ themeMode, darkTheme, lightTheme, toggleNumber, toggleChar }}
    >
      <div className="p-4 bg-white h-screen dark:bg-black">
        <div className=" grid justify-items-end">
          <ThemeBtn />
        </div>

        <div className="flex flex-col mt-8 justify-center items-center bg-white  dark:bg-black">
          <h1 className="text-5xl  text-black p-8 pt-8 m-8  dark:text-white ">
            Strong passwords, made easy.
          </h1>

          <div className=" text-center pt-10 max-w-lg w-full bg-black p-4 rounded-md shadow-md dark:bg-white ">
            <input
              className=" rounded-md  bg-black text-white text-lg border-black px-4 py-1 mx-2"
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
            />

            {/* butotn */}
            <button
              className="text-black bg-white p-2 m-2 px-6 rounded-md font-mono font-light dark:bg-black dark:text-white"
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
                className=" px-1 m-2"
                onChange={(e) => setrange(e.target.value)}
                name=""
                id=""
              />

              <Button title="Number" isNum={true} />

              <Button title="Char" />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
