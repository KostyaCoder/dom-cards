"use strict";

const root = document.getElementById("root");
const loading = createElement("div", { classNames: ["loading"] }, "Loading...");
root.append(loading);

function fetchData() {
  fetch("./data.json")
    .then((resp) => resp.json())
    .then((data) => createArticles(data))
    .catch((err) => alert(err))
    .finally(() => loading.remove());
}

setTimeout(fetchData, 3000);

function createArticles(data) {
  const mapingHostIcon = new Map();
  mapingHostIcon.set("www.facebook.com", "assets/img/facebook.svg");
  mapingHostIcon.set("facebook.com", "assets/img/facebook.svg");
  mapingHostIcon.set("twitter.com", "assets/img/twitter.svg");
  mapingHostIcon.set("www.instagram.com", "assets/img/instagram.svg");
  mapingHostIcon.set("instagram.com", "assets/img/instagram.svg");

  const ActorsCards = data.map((actor) => createActorCard(actor));
  root.append(...ActorsCards);

  function createActorCard(actor) {
    const { firstName, lastName, profilePicture, aboutMe, contacts } = actor;

    //cardHeader
    const cardHeader = createElement("div", { classNames: ["cardHeader"] });

    //cardInfo
    const fullName =
      firstName || lastName
        ? `${firstName} ${lastName}`.trim()
        : "Unknown Actor";

    const imgWrapper = createImage({ profilePicture, fullName });

    const actorName = createElement(
      "h1",
      { classNames: ["actorName"] },
      fullName
    );

    const cardText = createElement(
      "p",
      { classNames: ["cardText"] },
      aboutMe ? aboutMe : "Actor didn`t write about self"
    );

    const cardInfo = createElement(
      "div",
      { classNames: ["cardInfo"] },
      imgWrapper,
      actorName,
      cardText
    );

    //socialNetwork
    const socialNetwork = createSocialNetwork(contacts, mapingHostIcon);

    //article
    const card = createElement(
      "article",
      { classNames: ["cardContainer"] },
      cardHeader,
      cardInfo,
      socialNetwork
    );

    return card;
  }
}

function createImage({ profilePicture, fullName }) {

  const img = createElement("img", {
    classNames: ["img"],
    src: profilePicture,
    alt: fullName,
  });

  img.addEventListener("error", handleImageError);

  const initials = createElement(
    "p",
    { classNames: ["initials"] },
    generateInitials(fullName)
  );

  const imgWrapper = createElement(
    "div",
    { classNames: ["imgWrapper"] },
    img,
    initials
  );

  return imgWrapper;
}

function createSocialNetwork(contacts, mapingHostIcon) {
  let socialLinks = [];

  for (const contact of contacts) {
    const url = new URL(contact);

    const imgIcon = createElement("img", {
      classNames: "",
      src: mapingHostIcon.get(url.hostname),
      alt: `${url.hostname} link`,
    });
    const socialLink = createElement(
      "a",
      { classNames: ["refWrapper"], href: contact },
      imgIcon
    );
    socialLinks.push(socialLink);
  }

  const socialNetwork = createElement(
    "div",
    { classNames: ["socialNetwork"] },
    ...socialLinks
  );

  return socialNetwork;
}
