/**
 *
 * @param {string} name
 * @returns {string}
 */
const generateInitials = (name) =>
  name
    .trim()
    .split(' ')
    .map((word) => word[0])
    .join(' ');

// function generateInitials (name) {
//   const trimmedString = name.trim();
//   const words = trimmedString.split(' ');
//   const initialsArray = words.map((word) => word[0]);
//   return initialsArray.join(' ');
// }


function handleImageError (event) {
  const { target } = event;
  target.remove();
}