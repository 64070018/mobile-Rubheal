
import product from "../model/product";
import comment from "../model/comment";

export const PRODUCT = [
  new product("c0", "title", "price", "detail", "amount", "rating", "policy", "https://picsum.photos/850"),
  new product("c1", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/630"),
  new product("c2", "รองเท้า treasure baoji", 4000, "ครั้งแรก! ของศิลปิน TREASURE ที่ร่วมออกแบบรองเท้าโดยใช้ความเป็นเอกลักษณ์ของแต่ละคนมารวมกันไว้ในรองเท้าสุด Exclusive โดยใช้วัสดุที่มีคุณภาพเกรดพรีเมี่ยมและผลิตมาในจำนวนจำกัด", 5, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/720"),
  new product("c3", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/300"),
  new product("c4", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/200"),
  new product("c5", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/500"),
  new product("c6", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/700"),
  new product("c7", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/600"),
  new product("c8","pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/800"),
  new product("c9", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/450"),
  new product("c10", "pop corn major", 50, "POP CORN MAJOR CHEAPER THAN WALK-IN", 30, 5, "นัดรับเท่านั้น จ่ายมัดจำก่อน ครึ่งหนึ่งของราคา สั่งแล้วยกเลิกไม่คืนมัดจำทุกกรณี", "https://picsum.photos/550"),
];
export const COMMENT = [
  new comment("c1", "ACCOUNT 1", "Lorem ipsum dolor sit amet.", 5, '1-Jan-2023 09:00'),
  new comment("c2", "acount 2", "Lorem ipsum dolor sit amet.", 4, '2-Fab-2023 09:20'),
  new comment("c3", "acountttt", "Lorem ipsum dolor sit amet.", 5, '3-Mar-2023 20:30'),
];