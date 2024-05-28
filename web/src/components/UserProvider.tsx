import {ReactElement, useEffect, useState} from "react";
import AuthRepository from "../repository/AuthRepository.ts";
import {SetUserContext, UserContext} from "../UserContext.ts";
import {User} from "../model/User.ts";

export default function UserProvider(
    props: {
        children: ReactElement[]
        authRepository: AuthRepository
    }
) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        props.authRepository.getUser()
            .then(user => setUser(user))
    }, [props.authRepository]);

    return (
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {props.children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}