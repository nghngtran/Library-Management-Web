'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      "id":1,
      "title":"Giáo trình Kỹ thuật lập trình C căn bản và nâng cao",
      "description":"Cuốn sách giải thích khái niệm ngôn ngữ C một cách dễ dàng và bao gồm mọi khái niệm chi tiết. Cuốn sách này sẽ thực sự hữu ích cho những người muốn nghiên cứu các khái niệm máy tính và lập trình C.",
      "kindid":1,
      "author":"Phạm Văn Ất, Nguyễn Hiếu Cường, Đỗ Văn Tuấn, Lê Trường Thông",
      "quantity":2,
      "available":2,
      "ratings":3.7,
      "imgID":"../images/book1.png",
      "language":"vn",
      "BookId":1
    },
    {
      "id":2,
      "title":"Computer Programming For Beginners 1",
      "description":"Learning to write computer programs can be fun if you take up the right approach and this shall be the objective of this book. We attempt to provide you a simple, easy to follow and practically sound approach to computer programming.",
      "kindid":1,
      "author":"Cooper Alvin",
      "quantity":2,
      "available":2,
      "ratings":4.7,
      "imgID":"../images/book2.png",
      "language":"en",
      "BookId":2
    },
    {
      "id":3,
      "title":"Lịch sử thế giới",
      "description":"“… Một chuyện đáng ghi là vì bộ sử này mà năm 1956 chúng tôi bị một độc giả mạt sát là đầu ốc đầy “rác rưởi” chỉ vì chúng tôi có nhắc qua đến thuyết Darwin về nguồn gốc loài ngoài.",
      "kindid":2,
      "author":"Nguyễn Hiến Lê",
      "quantity":2,
      "available":2,
      "ratings":4.5,
      "imgID":"../images/book3.png",
      "language":"vn",
      "BookId":3
    },
    {
      "id":4,
      "title":"Địa chất công trình",
      "description":"“Một cuốn sách giúp bạn hiểu rõ bản chất của trái đất",
      "kindid":3,
      "author":"Bùi Trường Sơn",
      "quantity":2,
      "available":2,
      "ratings":4.1,
      "imgID":"../images/book4.png",
      "language":"vn",
      "BookId":4
    },
    {
      "id":5,
      "title":"Tôi thấy hoa vàng trên cỏ xanh",
      "description":"Một vé về tuổi thơ",
      "kindid":4,
      "author":"Nguyễn Nhật Ánh",
      "quantity":2,
      "available":2,
      "ratings":4.5,
      "imgID":"../images/book5.png",
      "language":"vn",
      "BookId":5
    },
    {
      "id":6,
      "title":"Cho tôi xin một vé về tuổi thơ",
      "description":"Một vé về tuổi thơ",
      "kindid":4,
      "author":"Nguyễn Nhật Ánh",
      "quantity":2,
      "available":2,
      "ratings":4.5,
      "imgID":"../images/book6.png",
      "language":"vn",
      "BookId":6
    },
    {
      "id":7,
      "title":"Giáo trình địa chất cơ sở",
      "description":"Kiến thức cơ sở về Trái Đất",
      "kindid":3,
      "author":"Nguyễn Hiến Lê",
      "quantity":2,
      "available":2,
      "ratings":4.1,
      "imgID":"../images/book7.png",
      "language":"vn",
      "BookId":7
    },
    {
      "id":8,
      "title":"Lịch sử Việt Nam Truyền thống và Hiện Đại",
      "description":"Tập hợp các công trình khoa học dưới dạng chuyên khảo, những bài báo cáo trong các hội nghị về một số vấn đề lịch sử Việt Nam: mối quan hệ giữa lịch sử truyền thống và hiện đại",
      "kindid":2,
      "author":"Văn Giang",
      "quantity":2,
      "available":2,
      "ratings":4.1,
      "imgID":"../images/book8.png",
      "language":"vn",
      "BookId":8
    },
    {
      "id":9,
      "title":"Vật lí đại cương",
      "description":"Vật lí đại cương",
      "kindid":2,
      "author":"Lương Duyên Bình",
      "quantity":2,
      "available":2,
      "ratings":4.1,
      "imgID":"../images/book9.png",
      "language":"vn",
      "BookId":9
    },
    {
      "id":17,
      "title":"The Accident: A chilling psychological thriller",
      "description":"Katherine knew she’d had too many drinks, but they were only going a short distance. And as Eve pointed out, it was late, there was no traffic anyway…",
      "kindid":4,
      "author":"Natalie Barelli",
      "quantity":2,
      "available":2,
      "ratings":4.8,
      "imgID":"https://images-na.ssl-images-amazon.com/images/I/41zO9vLf3-L.jpg",
      "language":"en",
      "BookId":17
    },
    {
      "id":14,
      "title":"The Housekeeper: A twisted psychological thriller",
      "description":"When Claire sees Hannah Wilson at an exclusive Manhattan hair salon, it's like a knife slicing through barely healed scars.",
      "kindid":4,
      "author":"Natalie Barelli",
      "quantity":2,
      "available":2,
      "ratings":4.8,
      "imgID":"../images/book14.png",
      "language":"en",
      "BookId":14
    }
    ]
    data.map(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
      return item;
    });
    return queryInterface.bulkInsert('Books', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
