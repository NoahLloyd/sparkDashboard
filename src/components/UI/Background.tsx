import React, { useState, useEffect } from "react";
import "./Background.css";

// import image0 from "../../assets/backgroundImages/0.jpg";
// import image1 from "../../assets/backgroundImages/1.jpg";
// import image2 from "../../assets/backgroundImages/2.jpg";
// import image3 from "../../assets/backgroundImages/3.jpg";

export default function Background() {
  const [image, setImage] = useState("");

  const getRandomChosenImage = () => {
    chrome.storage.sync.get(["backgroundImages"], (storage) => {
      if (storage.backgroundImages) {
        const randomIndex = Math.floor(
          Math.random() * storage.backgroundImages.length
        );
        const randomImage = storage.backgroundImages[randomIndex];
        setImage(randomImage);
      } else {
        getRandomPredefinedImage();
      }
    });
  };

  //* Old method used. Here the images are downloaded, but the waiting time was really high
  // const getRandomPredefinedImage = () => {
  //   const imageRandomizer = Math.floor(Math.random() * 4);

  //   switch (imageRandomizer) {
  //     case 0:
  //       setImage(image0);
  //       break;
  //     case 1:
  //       setImage(image1);
  //       break;
  //     case 2:
  //       setImage(image2);
  //       break;
  //     case 3:
  //       setImage(image3);
  //       break;
  //     default:
  //       setImage(
  //         "https://images.unsplash.com/photo-1634713446438-324cd41693ec"
  //       );
  //       break;
  //   }
  // };

  const getRandomPredefinedImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1509838174235-432f709c7bfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1620018015286-f06bedb5190b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1636071657036-e6f66402f3c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1635810305256-76a18a902f00?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1752&q=80",
      "https://images.unsplash.com/photo-1636050481878-024faff83664?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1584&q=80",
      "https://images.unsplash.com/photo-1425736317462-a103b1303a35?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    ];

    setImage(images[Math.floor(Math.random() * images.length)]);
  };

  useEffect(() => {
    chrome.storage.sync.get(["backgroundSetting"], (storage) => {
      if (storage.backgroundSetting) {
        getRandomPredefinedImage();
      } else {
        getRandomChosenImage();
      }
    });
  }, []);

  return (
    <>
      <img
        src={image}
        className="select-none absolute top-0 left-0 h-screen w-screen object-cover"
        style={{ zIndex: -1 }}
        alt=""
      />
      <div
        className="absolute top-0 left-0 h-screen w-screen opacity-80"
        style={{ backgroundColor: "#211901" }}
      ></div>
    </>
  );
}
