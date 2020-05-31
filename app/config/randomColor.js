export const getRandomColor = () => {
  // Using the lighter colors of the spectrum so we can see text inside component
  var letters = "ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)];
  }
  return color;
};
