import { FC } from "react";
import "./spinner.css";

const Spinner: FC = () => (
  <div className="loading component-loader">
    <div className="effect-1 effects" />
    <div className="effect-2 effects" />
    <div className="effect-3 effects" />
  </div>
);
export default Spinner;
