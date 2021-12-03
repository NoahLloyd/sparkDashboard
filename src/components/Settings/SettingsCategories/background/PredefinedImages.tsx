import React from "react";
import image0 from "../../../../assets/backgroundImages/0.jpg";
import image1 from "../../../../assets/backgroundImages/1.jpg";
import image2 from "../../../../assets/backgroundImages/2.jpg";
import Checkbox from "../../../UI/Checkbox";

interface Props {
  enabled: boolean;
  onClick: (checked: boolean) => void;
}

const PredefinedImages = (props: Props) => {
  const images = [image0, image1, image2]

    return (
      <section className="w-1/2 m-4">
        <div className="flex justify-between border-b-4 border-solid border-secondary pb-4 mb-4">
          <h2 className="text-2xl inline-block font-light align-top">
            Use predefined background images
          </h2>
          <Checkbox enabled={props.enabled} onClick={(checked: boolean) => props.onClick(checked)} />
        </div>
            {images.map((image) => <div className="mb-4">
                <img src={image} alt="" className="w-full mb-4 object-cover object-center h-24"/>
            </div>)}
            <p className="text-lg text-gray-600">Predefined images are selected from Unsplash</p>
      </section>
    );
};

export default PredefinedImages;
