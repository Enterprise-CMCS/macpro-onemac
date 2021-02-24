import { useContext, createContext } from "react";

export const AppContext = createContext(null);
export const LoginTypeContext = createContext(null);

export function useAppContext() {
    return useContext(AppContext);
}
export function useLoginTypeContext () {
    return useContext(LoginTypeContext);
}