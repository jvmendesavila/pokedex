export const typeColor = (type) => {
  let color = "black";
  switch (type) {
    case "Fire":
      color = "#ff5252";
      break;
    case "Flying":
      color = "cornflowerblue";
      break;
    case "Water":
      color = "#437ca1";
      break;
    case "Ice":
      color = "#45c6d7";
      break;
    case "Poison":
      color = "#9d48be";
      break;
    case "Grass":
      color = "#51c246";
      break;
    case "Bug":
      color = "darkseagreen";
      break;
    case "Electric":
      color = "#d9d906";
      break;
    case "Ground":
      color = "#a76d50";
      break;
    case "Fairy":
      color = "pink";
      break;
    case "Normal":
      color = "#bababa";
      break;
    case "Rock":
      color = "#474747";
      break;
    case "Psychic":
      color = "#7ac7cc";
      break;
    case "Fighting":
      color = "#302121";
      break;
    case "Dragon":
      color = "#329d81";
      break;
    default:
      break;
  }
  return color;
};
