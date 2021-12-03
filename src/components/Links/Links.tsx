import React, { useState, useEffect } from "react";
import Link from "./Link";

interface Props {}

const Links = (props: Props) => {
  //   const links = [
  //     {
  //       url: "https://gmail.com",
  //       title: "Gmail",
  //       icon: "https://www.google.com/s2/favicons?sz=64&domain_url=gmail.com/",
  //     },
  //     {
  //       url: "https://chess.com",
  //       title: "Chess",
  //       icon: "https://www.google.com/s2/favicons?sz=64&domain_url=chess.com",
  //     },
  //     {
  //       url: "https://classroom.google.com",
  //       title: "Classroom",
  //       icon: "https://www.google.com/s2/favicons?sz=64&domain_url=classroom.google.com",
  //     },
  //     {
  //       url: "https://docs.google.com",
  //       title: "Docs",
  //       icon: "https://www.google.com/s2/favicons?sz=64&domain_url=docs.google.com",
  //     },
  //   ];
  const [links, setLinks] =
    useState<{ title: string; url: string; favicon: string }[]>();
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["linksSetting"], (storage) => {
      setShowLinks(storage.linksSetting);
    });

    chrome.storage.sync.get(["topSitesEnabled"], (storage) => {
      if (storage.topSitesEnabled === undefined || storage.topSitesEnabled) {
        chrome.topSites.get((sites) => {
          const amountOfSites = Math.floor(window.innerWidth / 250)
          sites = sites.slice(0,amountOfSites)
          const formattedSites: {
            title: string;
            url: string;
            favicon: string;
          }[] = [];
          // Typescript didn't let me map for some reason.
          sites.forEach((site) => {
            const hostname = new URL(site.url).hostname;
            let title = hostname.split(".")[0];
            title = title[0].toUpperCase() + title.slice(1);
            if (title.length > 8) {
              title = title.slice(0,8)
            }
            // The correct format for my sites
            formattedSites.push({
              title,
              url: site.url,
              // Gets the domain, and puts it in the google api
              favicon: `https://www.google.com/s2/favicons?sz=64&domain_url=${hostname}`,
            });
          });
          setLinks(formattedSites);
        });
      } else {
        chrome.storage.sync.get(["chosenLinksEnabled"], (storage) => {
          if (storage.chosenLinksEnabled) {
            chrome.storage.sync.get(["chosenLinks"], (storage) => {
              setLinks(storage.chosenLinks);
            });
          }
        });
      }
    });
  }, []);

  if (showLinks) {
    // Width of one link is 7rem
    const linksWidth = links ? links.length * 10 : 0;

    return (
      <section
        style={{ width: linksWidth + "rem" }}
        className="flex justify-around"
      >
        {links?.map((link) => (
          <Link link={link.url} title={link.title} icon={link.favicon} />
        ))}
      </section>
    );
  } else {
    return <div></div>;
  }
};

export default Links;
