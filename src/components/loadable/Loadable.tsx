import {Suspense} from "react";
import Spinner from "../spinner/Spinner.tsx";

// project imports

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<Spinner/>}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
