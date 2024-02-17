import { createContext , useContext } from "react";

export const ThemeContext = createContext({
    themeMode : "dark",
    darkTheme : ()=>{},
    lightTheme:()=>{},
    toggleChar:()=>{},
    toggleNumber:()=>{},
})
 
export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
}
