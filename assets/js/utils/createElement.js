/**
 * @param {string} tag
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {string[]} options.src
 * @param {string[]} options.alt
 * @param {...(Node | string)} children
 */
function createElement(tag, options, ...children) {
  const { classNames, src, alt, href } = options;
  const elem = document.createElement(tag);
  elem.classList.add(...classNames);

  if (tag === "img") {
    elem.src = src;
    elem.alt = alt;    
  }

  if (tag === "a") {
    elem.href = href;    
  }

  elem.append(...children);
  return elem;
}
