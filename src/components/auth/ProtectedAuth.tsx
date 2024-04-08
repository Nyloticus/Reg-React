import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import Spinner from "../../components/spinner/Spinner.tsx";

type Props = {
    children?: React.ReactNode;
};
const ProtectedAuth = ({children}: Props) => {
    const isLoading = false;
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("auth-data");
        console.log("user", user);
        if (!user) {
            navigate("/auth/login");
        }
    }, [navigate]);

    if (isLoading) return <Spinner/>;

    return <>{children}</>;
};

export default ProtectedAuth;
