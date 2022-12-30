import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Nazish",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Nazish Cheema",
      email: "user@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Butter croissant",
      slug: "butter_croissant",
      category: "Baking",
      image: "/Images/butter.jpg",
      price: "100",
      brand: "The Coffee House",
      rating: "4.5",
      numReviews: "8",
      countInstock: 12,
      description:
        "Viennese pastry with a good taste of butter, both flaky and soft",
    },

    {
      name: "Breakfast-Cookie",
      slug: "Breakfast-Cookie",
      category: "Baking",
      image: "/Images/Breakfast-Cookie.jpg",
      price: "60",
      brand: "The Coffee House",
      rating: "4.5",
      numReviews: "8",
      countInstock: 10,
      description:
        "Classic chocolate chip cookie topped with a pinch of sea salt for added flavor.",
    },

    {
      name: "Carrot-Muffin",
      slug: "Carrot-Muffin",
      category: "Baking",
      image: "/Images/Carrot-Muffin.jpg",
      price: "80",
      brand: "The Coffee House",
      rating: "4.5",
      numReviews: "8",
      countInstock: 15,
      description:
        "Light and fluffy muffin made with buttermilk and red wheat bran.",
    },

    {
      name: "Sesame-Bagel",
      slug: "Sesame-Bagel",
      category: " Baking ",
      image: "/Images/Sesame-Bagel.jpg",
      price: "120",
      brand: "The Coffee House",
      rating: "4.5",
      numReviews: "8",
      countInstock: 20,
      description:
        "Local bagels topped with your choice of light cream cheese or premium butter.",
    },

    {
      name: "Butter-Tart",
      slug: "Butter-Tart",
      category: " Beverage ",
      image: "/Images/Butter-Tart.jpg",
      price: "120",
      brand: "The Coffee House",
      rating: "4.5",
      numReviews: "8",
      countInstock: 25,
      description:
        "Tartlet prepared with puff pastry filled with a tasty sweet filling.",
    },

    {
      name: "Banana-Loaf",
      slug: "Banana-Loaf",
      category: " Baking ",
      image: "/Images/Banana-Loaf.jpg",
      price: "120",
      brand: "The Coffee House",
      rating: "4.5",
      numReviews: "8",
      countInstock: 25,
      description: "Gourmet bread prepared with ripe bananas.",
    },
  ],
};
export default data;
