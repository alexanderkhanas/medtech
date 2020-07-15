import uuid from "react-uuid";

const initialState = {
  featured: [
    {
      title: "thermostat",
      gallery: ["https://www.randomlists.com/img/things/thermostat.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "eraser",
      gallery: ["https://www.randomlists.com/img/things/eraser.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
  ],
  popular: [
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
  ],
  bestRating: [
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
  ],
  new: [
    {
      title: "thermostat",
      gallery: ["https://www.randomlists.com/img/things/thermostat.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "eraser",
      gallery: ["https://www.randomlists.com/img/things/eraser.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
      id: uuid(),
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
