import Chat from "../model/chat";
import Purchased from "../model/purchased";
import Userbuy from "../model/userbuy";

export const CHAT   = [
    new Chat("1", "Folk", "https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top", "My name is Folk", "20", "10"),
    new Chat("2", "BlackDog", "https://picsum.photos/id/237/200/300", "My name is BlackDog", "15", "30"),
    new Chat("3", "Mountains", "https://picsum.photos/seed/picsum/200/300", "My name is Mountains", "5", "15"),
    new Chat("4", "Gray", "https://picsum.photos/200/300?grayscale", "My name is Gray", "20", "10"),
    new Chat("5", "Cat", "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", "My name is Cat", "25", "20"),
    new Chat("6", "Popeye", "https://static.wikia.nocookie.net/deathbattle/images/3/3f/Portrait.popeye.png/revision/latest/thumbnail/width/360/height/450?cb=20211216064418", "My name is Popeye", "20", "10"),
    new Chat("7", "Shark", "https://t3.ftcdn.net/jpg/00/80/09/38/360_F_80093845_aYB5ErmGYK7g9EUY0HQoPqeb9nnAwFjN.jpg", "My name is Shark", "15", "10"),
    new Chat("8", "Toy", "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2022/7/1658826428_Toy_Story.jpg", "My name is Toy", "20", "10"),
];


export const PURCHASED = [
    new Purchased(1, "2023-10-23", "นาฬิกา g shock", 4000, "", {uri : "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png"}, 4000, 5 ),
    new Purchased(2, "2023-10-26", "Nike Killshot 2", 3600, "", {uri : "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png"}, 3600, 2 ),
    new Purchased(3, "2023-10-28", "โกโก้อาม่า", 55, "", {uri : "https://i.ytimg.com/vi/NZ9hyMaAsLc/maxresdefault.jpg"}, 55, 6 ),
    new Purchased(4, "2023-10-29", "BAOJIxTREASURE", 500, "", {uri : "https://baoji.co.th/wp-content/uploads/2023/08/AW-OPEN-BOX-white_0-1.jpg"}, 500, 2 ),
]


export const USERBUY = [
    new Userbuy(1, "Folk", "084-652-3035", {uri : "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png"}, 16000, 4, 1),
    new Userbuy(1, "Fern", "084-652-3035", {uri : "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png"}, 4000, 1, 1),
    new Userbuy(1, "Boss", "084-652-3035", {uri : "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png"}, 3600, 1, 2),
    new Userbuy(1, "Aom", "084-652-3035", {uri : "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png"}, 3600, 1, 2),
]








