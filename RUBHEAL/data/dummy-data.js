
import product from "../model/product";
import comment from "../model/comment";

export const PRODUCT = [
  new product("p01", "Nike Killshot 2 Leather", 3600, `Nike Killshot 2 ได้แรงบันดาลใจจากรองเท้าเทนนิสพื้นกว้างบางรุ่นออริจินัล พร้อมปรับโฉมส่วนบนด้วยหนังที่มีเท็กซ์เจอร์หลากหลายเพื่อสร้างลุคที่ดูสดใหม่ โดยมีสไตล์ขอบสนามและลูกเล่นแบบโมเดิร์น ตั้งแต่หนังกลับเนื้อนุ่มไปจนถึงหนังเรียบลื่นพร้อมความมันวาวที่ลงตัว และพื้นรองเท้ายางกัมรับเบอร์ก็เพิ่มความลงตัวที่ด้านล่างเพื่อพิสูจน์ว่าคุณนั้นโดดเด่นเหนือใคร

  สีที่แสดง: Sail/Gum Yellow/Oil Grey
  สไตล์: 432997-121`, 3, 5, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, `https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png`, "clothes")
  , new product("p02", "นาฬิกา g shock", 4000, `รับหิ้ว G Shock จากช้อปเนบิวด้า ค่าหิ้วเป็นกันเอง คุยกันได้ ฝากเยอะมีส่วนลด1`, 3, 5, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, `https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png`, 'accessories')
  , new product("p03", "โมเดล การ์ตูน ชินจัง ชุด ของกิน", 400, `โมเดล การ์ตูน ชินจัง  ของสะสม ของตกแต่งบ้าน งานสวย เกรด A โมเดล ตั้งโต๊ะ Naruto Figure Model งานสวย เกรด A สีไม่ตก น่ารักมากๆ เหมาะสำหรับ ให้เป็นของขวัญ หรือสะสมก็ได้จ้า 
  วัสดุ PVC , ABS มี 8 แบบ ให้สะสมขนาดประมาณ 5-7.5 ซม. (ประมาณ 2.5 นิ้ว) พร้อม ฐานทรงกลม 3.5 ซม สามารถหมุนตัวได้ เหมาะสำหรับการสะสมหรือเป็นของขวัญ ในโอกาสพิเศษ งานพิมพ์ล็อตใหม่ คุณภาพสูง สีไม่ตก ไม่ซีด งานสวย เหมาะสำหรับ ประดับห้องนอน ตู้โชว์ ห้องนอน ห้องนั่งเล่น ฯลฯ โมเดล จำลอง เครยอน ชินจัง รูปร่างสวยงาม เสมือนจริง ติดตั้งง่าย 
  `, 10, 5, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, `https://lzd-img-global.slatic.net/g/p/384d0f0f5998af6fea5053945702b98e.jpg_960x960q80.jpg_.webp`, 'model')
  ,
  new product("p04", "โกโก้อาม่า", 55, `#โกโก้อาม่า ปากน้ำ เข้มข้นจนหยดสุดท้าย ตัวโกโก้ที่ราดบนนมมีความหนืดข้น ตอนกินได้ความกรุบเล็กๆจากผงโกโก้ที่ยังละลายไม่หมด ยิ่งกินคู่กับปังปิ้งเตาถ่าน หน้าเนยนมน้ำตาล หน้าเนยน้ำตาล และแบบราดโกโก้ข้นๆ อร่อยยยยย!!!`, 10, 4, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`,'https://i.ytimg.com/vi/NZ9hyMaAsLc/maxresdefault.jpg', 'food')
  ,
  new product("p05", "BAOJIxTREASURE", 4000,
    `ครั้งแรก! ของศิลปิน TREASURE ที่ร่วมออกแบบรองเท้าโดยใช้ความเป็นเอกลักษณ์ของแต่ละคนมารวมกันไว้ในรองเท้าสุด Exclusive โดยใช้วัสดุที่มีคุณภาพเกรดพรีเมี่ยมและผลิตมาในจำนวนจำกัด
  นอกจากหนุ่มๆ TREASURE จะได้เป็นพรีเซ็นเตอร์ให้กับแบรนด์แบบยกกลุ่ม ในคอลเล็กชั่นพิเศษรุ่น Limited Edition ของรองเท้าบาโอจิยังได้หนุ่มๆ TREASURE มาร่วมออกแบบให้อีกด้วย ชาว Treasure Make หรือชาวทึเม่ไทยต้องรีบจับจองกันก่อน sold out โดยมีให้เลือกทั้งแบบสีขาว และสีดำ`, 5, 4, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, "https://baoji.co.th/wp-content/uploads/2023/08/AW-OPEN-BOX-white_0-1.jpg", 'clothes'),
  new product("p06", "Bearbrick McQueen ", 35000, `BE@RBRICK LIGHTNING McQUEEN 1000%

  ยี่ห้อ : MEDICOM TOY
  
  ซีรีย์ : BE@RBRICK
  
  ขนาด : H 70 CM
  
  วัสดุ : PLASTIC
  
   
   ● LIGHTNING McQUEEN from "CARS"
  
  
  
   (C) Disney/Pixar
   BE@RBRICKTM & (C) 2001-2021
   MEDICOM TOY CORPORATION.`, 3, 4, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, `https://down-th.img.susercontent.com/file/sg-11134201-22120-js6gnns1ntkv26`, 'model'),
  new product("p07", "Nike Dunk Low LX NBHD", 4700, `ไอคอนแห่งวงการบาสยุค 80 กลับมาอีกครั้งพร้อมรายละเอียดคลาสสิกและเสน่ห์บาสเก็ตบอลแบบย้อนยุค คู่นี้ดึงเอาความวินเทจของรองเท้าบาสกลับมาเจอความเป็นสตรีทอีกครั้ง ขณะที่ส่วนหุ้มข้อบุนวมทรงโลว์คัทให้คุณอวดสไตล์พร้อมความสบายได้ทุกที่

  สีที่แสดง: ขาว/ดำ/Siren Red/Coconut Milk
  สไตล์: DZ2710-100`, 3, 5, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, `https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c3c98d91-de62-4d9b-90c3-e855e726a471/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-dunk-low-60-nbhd-ZB5nnh.png`, 'cothes'),
  new product("p08", "MNP-XH06 Weiyuan Cadet Machine", 800, `Preorder (Motor Nuclear) MNP-XH06 Weiyuan - Cadet Machine
  ข้อมูลเบื่องต้น 
  - หุ่นสูง 19 CM.
  - งานประกอบพลาสติกคิท
  - มีชิ้นส่วนโลหะ 
  
  สินค้าปิดจอง ยังไม่กำหนด
  ราคา Preorder  780 บาท
  มัดจำสินค้า 100 บาท
  
  ต้องการชำระเต็มจำนวนสามารถชำระได้เลยนะครับ 
  
  ต้องการชำระมัดจำสินค้า ให้แจ้งชำระยอด 100 บาท และก่อนสินค้าเข้ามา ร้านจะทำบิลชำระรอบ2ก่อนสินค้าเข้านะครับ`, 3, 5, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, `https://cx.lnwfile.com/_/cx/_raw/1b/ob/6f.jpg`, 'model'),
  new product("p09", "Star Wars The Black Series 40th Anniversary Darth Vader", 1190, `THE FORCE WIL BE STRONG IN YOUR HOME - with this Star Wars The Black Series 40th Anniversary Darth Vader 6 Inch Figure, your child can have the power of the dark side added to their toy battles with the rest of the Star Wars gang pictured behind
  CLASSIC DETAILING - this movie-like 40th Anniversary replica of Darth Vader from Star Wars: A New Hope is sure to make your child’s playtime out of this world
  POSABLE FIGURE - unlike a stiff collectible, this toy is an action figure. Your child can move Darth Vader’s arms, legs, and head to position him during his most intense battles
  ALL INCLUDED - your purchase comes with one carded figure, Darth Vader’s lightsaber, a decorative backcard, and a display stand
  AN IDEAL HOLIDAY SURPRISE FOR CHILDREN - makes a perfect holiday idea for the kids this holiday season`, 3, 5, `ไม่สามารถยกเลิกสินค้าได้ทุกกรณีหลังการสั่งซื้อ ต้องมีการจ่ายค่ามัดจำอย่างน้อยครึ่งหนึ่งของราคา หากเป็นการนัดรับกรุณารับโทรศัพท์ เพื่อความสะดวกในการนัดรับของ`, `https://i.ebayimg.com/images/g/D9wAAOSwWUZk6f-V/s-l500.jpg`, 'model'),

];
export const COMMENT = [
  new comment("c1", "ACCOUNT 1", "Lorem ipsum dolor sit amet.", 5, '1-Jan-2023 09:00'),
  new comment("c2", "acount 2", "Lorem ipsum dolor sit amet.", 4, '2-Fab-2023 09:20'),
  new comment("c3", "acountttt", "Lorem ipsum dolor sit amet.", 5, '3-Mar-2023 20:30'),
];