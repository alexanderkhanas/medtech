const initialState = {
  featured: [
    {
      title: "thermostat",
      gallery: ["https://www.randomlists.com/img/things/thermostat.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "eraser",
      gallery: ["https://www.randomlists.com/img/things/eraser.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
  ],
  popular: [
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
  ],
  bestRating: [
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "vase",
      gallery: ["https://www.randomlists.com/img/things/vase.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "pencil",
      gallery: ["https://www.randomlists.com/img/things/pencil.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "fridge",
      gallery: ["https://www.randomlists.com/img/things/fridge.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "toothbrush",
      gallery: ["https://www.randomlists.com/img/things/toothbrush.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
    {
      title: "glow stick",
      gallery: ["https://www.randomlists.com/img/things/glow_stick.webp"],
      price: Math.floor(Math.random() * 10000) + 1,
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
