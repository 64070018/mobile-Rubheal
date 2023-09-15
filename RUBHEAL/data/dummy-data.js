import product from "../model/product";
import comment from "../model/comment";

export const PRODUCT = [
  new product("c1", "Italian", "#f5428d", 500, 5),
  new product("c2", "Quick & Easy", "#f54242", 100, 5),
  new product("c3", "Hamburgers", "#f5a442", 100, 5),
  new product("c4", "German", "#f5d142", 100, 5),
  new product("c5", "Light & Lovely", "#368dff", 100, 5),
  new product("c6", "Exotic", "#41d95d", 100, 5),
  new product("c7", "Breakfast", "#9eecff", 100, 5),
  new product("c8", "Asian", "#b9ffb0", 100, 5),
  new product("c9", "French", "#ffc7ff", 100, 5),
  new product("c10", "Summer", "#47fced", 100, 5),
];
export const COMMENT = [
  new comment("c1", "ACCOUNT 1", "Lorem ipsum dolor sit amet.", 5, '1-Jan-2023 09:00'),
  new comment("c2", "acount 2", "Lorem ipsum dolor sit amet.", 4, '2-Fab-2023 09:20'),
  new comment("c3", "acountttt", "Lorem ipsum dolor sit amet.", 5, '3-Mar-2023 20:30'),
];