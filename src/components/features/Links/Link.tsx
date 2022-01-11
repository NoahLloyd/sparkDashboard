import React from "react";

interface Props {
  title: string;
  icon: string;
  link: string;
}

const Link = (props: Props) => {
  return (
    <a href={props.link}>
      <article className="shadow-lg rounded-lg mb-6 bg-secondaryTransparent2 transition-colors hover:bg-secondaryTransparent p-4 w-28 h-28">
        <img src={props.icon} alt="" className="m-auto mb-2 h-12 w-12" />
        <h3 className="text-white text-lg font-light text-center">{props.title}</h3>
      </article>
    </a>
  );
};

export default Link;
