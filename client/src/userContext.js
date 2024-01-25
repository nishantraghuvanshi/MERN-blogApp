import React,{createContext} from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = React.useState(null);
    return (
        <UserContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
} 