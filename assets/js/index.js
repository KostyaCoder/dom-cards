"use strict";

const mapingHostIcon = new Map();
mapingHostIcon.set("www.facebook.com", "assets/img/facebook.svg");
mapingHostIcon.set("twitter.com", "assets/img/twitter.svg");
mapingHostIcon.set("www.instagram.com", "assets/img/instagram.svg");

const root = document.getElementById("root");

const ActorsCards = responseData.map((actor) => createActorCard(actor));
root.append(...ActorsCards);

function createActorCard(actor) {
  const { firstName, lastName, profilePicture, aboutMe, contacts } = actor;

  //cardHeader
  const cardHeader = createElement("div", { classNames: ["cardHeader"] });

  //cardInfo
  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : "Unknown Actor";

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
  const socialNetwork = createSocialNetwork(contacts);

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

function createImage({ profilePicture, fullName }) {
  // const imgWrapper = document.createElement('div');
  // imgWrapper.classList.add('imgWrapper');

  // const img = document.createElement('img');
  // img.classList.add('img');
  // img.src = profilePicture;
  // img.alt = fullName;
  // img.addEventListener('error', handleImageError);

  // const initials = document.createElement('p');
  // initials.classList.add('initials');
  // initials.textContent = generateInitials(fullName);

  // imgWrapper.append(img, initials);

  const img = createElement("img", {
    classNames: ["img"],
    src: profilePicture,
    alt: fullName,
  });
  // img.src = profilePicture;
  // img.alt = fullName;
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

function createSocialNetwork(contacts) {
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
