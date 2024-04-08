import React, {useEffect} from "react";
import {useNavigate} from "react-router";

import Spinner from "../../components/spinner/Spinner.tsx";

type Props = {
    children?: React.ReactNode;
};
const ProtectedAuth = ({children}: Props) => {
    const isLoading = false;
    const user = null;
    const navigate = useNavigate();
    useEffect(() => {
        if (user && !isLoading) {
            navigate("/");
        }
    }, [user, isLoading, navigate]);

    if (isLoading) return <Spinner/>;

    return <>{children}</>;
};

export default ProtectedAuth;
