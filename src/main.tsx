import {Suspense} from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {store} from "./store/Store";
import Spinner from "./components/spinner/Spinner";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"}/>
        <Provider store={store}>
            <Suspense fallback={<Spinner/>}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Suspense>
        </Provider>
    </QueryClientProvider>
);

