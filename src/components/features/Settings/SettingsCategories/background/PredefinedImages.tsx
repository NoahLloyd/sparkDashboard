import React from "react";
import Checkbox from "../../../../UI/Checkbox";

interface Props {
  enabled: boolean;
  onClick: (checked: boolean) => void;
}

const PredefinedImages = (props: Props) => {
  const images = [
    "https://images.unsplash.com/photo-1641665082704-640259addd94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1641157141085-8454fbc33f3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1641390920661-09a6e6c76669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  ];

  return (
    <section className="w-1/2 m-4">
      <div className="flex justify-between border-b-4 border-solid border-secondary pb-4 mb-4">
        <h2 className="text-2xl inline-block font-light align-top">
          Use predefined background images
        </h2>
        <Checkbox
          enabled={props.enabled}
          onClick={(checked: boolean) => props.onClick(checked)}
        />
      </div>
      {images.map((image) => (
        <div className="mb-4">
          <img
            src={image}
            alt=""
            className="w-full mb-4 object-cover object-center h-24"
          />
        </div>
      ))}
      <p className="text-lg text-gray-600">
        Predefined images are selected from Unsplash
      </p>
    </section>
  );
};

export default PredefinedImages;
