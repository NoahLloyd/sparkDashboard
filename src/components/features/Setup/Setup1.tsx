import React from "react";
import logo from "../../../assets/logo/logotext.png";

interface Props {}

const Setup1 = (props: Props) => {
  return (
    <div className="flex justify-between mt-6">
      <div className="w-5/12">
        <img className="w-full mx-auto mb-4" src={logo} alt="Spark Dashboard" />
          <div className="">
            <a
              className="hover:underline text-xl m-2 text-primary font-semibold"
              href="https://sparkdashboard.com"
              target="_blank"
            >
              sparkdashboard.com
            </a>
            <a
              className="hover:underline font-light font-lg m-2 text-primary"
              href="https://contact@sparkdashboard.com"
              target="_blank"
            >
              contact@sparkdashboard.com
            </a>
          </div>
          <div className="absolute bottom-0 left-0 m-4">
            <a
              className="hover:underline text-xl m-2 text-primary"
              href="https://twitter.com"
              target="_blank"
            >
              Twitter
            </a>
            <a
              className="hover:underline text-xl m-2 text-primary"
              href="https://instagram.com"
              target="_blank"
            >
              Instagram
            </a>
        </div>
      </div>
      <h2 className="w-6/12 font-regular text-3xl text-black text-opacity-70">
        Spark dashboard replaces your new tab and allows you to quickly access
        and use everything you may need right from your New Tab page. A page
        that usually is not used will be transformed to your personal and
        centralized space for productivity and concentration. Developed by Noah
        Lloyd Robson, feel free to contact me if you have issues.
      </h2>
    </div>
  );
};

export default Setup1;
