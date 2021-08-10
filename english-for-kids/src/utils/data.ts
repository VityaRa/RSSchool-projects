import { IDataCard, IRef } from "../types/entities";

export const refs: IRef[] = [
  {
    title: "Main Page",
    endpoint: "/",
  },
  {
    title: "Action (set A)",
    endpoint: "/cards/1",
    imageSrc: "img/cry.jpg",
  },
  {
    title: "Action (set B)",
    endpoint: "/cards/2",
    imageSrc: "img/open.jpg",
  },
  {
    title: "Animal (set A)",
    endpoint: "/cards/3",
    imageSrc: "img/cat.jpg",
  },
  {
    title: "Animal (set B)",
    endpoint: "/cards/4",
    imageSrc: "img/bird.jpg",
  },
  {
    title: "Clothes",
    endpoint: "/cards/5",
    imageSrc: "img/skirt.jpg",
  },
  {
    title: "Emotions",
    endpoint: "/cards/6",
    imageSrc: "img/sad.jpg",
  },
  {
    title: "Statistics",
    endpoint: "/stats",
  },
];

export const cards: Array<IDataCard[]> = [
  [
    {
      word: "cry",
      translation: "плакать",
      image: "img/cry.jpg",
      audioSrc: "audio/cry.mp3",
      category: "Action (set A)",
      correct: 0,
      wrong: 0,
    },
    {
      word: "dance",
      translation: "танцевать",
      image: "img/dance.jpg",
      audioSrc: "audio/dance.mp3",
      category: "Action (set A)",
      correct: 0,
      wrong: 0,
    },
    {
      word: "dive",
      translation: "нырять",
      image: "img/dive.jpg",
      audioSrc: "audio/dive.mp3",
      category: "Action (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "draw",
      translation: "рисовать",
      image: "img/draw.jpg",
      audioSrc: "audio/draw.mp3",
      category: "Action (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "fish",
      translation: "ловить рыбу",
      image: "img/fish.jpg",
      audioSrc: "audio/fish.mp3",
      category: "Action (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "fly",
      translation: "летать",
      image: "img/fly.jpg",
      audioSrc: "audio/fly.mp3",
      category: "Action (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "hug",
      translation: "обнимать",
      image: "img/hug.jpg",
      audioSrc: "audio/hug.mp3",
      category: "Action (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "jump",
      translation: "прыгать",
      image: "img/jump.jpg",
      audioSrc: "audio/jump.mp3",
      category: "Action (set A)",

      correct: 0,
      wrong: 0,
    },
  ],
  [
    {
      word: "open",
      translation: "открывать",
      image: "img/open.jpg",
      audioSrc: "audio/open.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "play",
      translation: "играть",
      image: "img/play.jpg",
      audioSrc: "audio/play.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "point",
      translation: "указывать",
      image: "img/point.jpg",
      audioSrc: "audio/point.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "ride",
      translation: "ездить",
      image: "img/ride.jpg",
      audioSrc: "audio/ride.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "run",
      translation: "бегать",
      image: "img/run.jpg",
      audioSrc: "audio/run.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "sing",
      translation: "петь",
      image: "img/sing.jpg",
      audioSrc: "audio/sing.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "skip",
      translation: "пропускать, прыгать",
      image: "img/skip.jpg",
      audioSrc: "audio/skip.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "swim",
      translation: "плавать",
      image: "img/swim.jpg",
      audioSrc: "audio/swim.mp3",
      category: "Action (set B)",

      correct: 0,
      wrong: 0,
    },
  ],
  // [
  //   {
  //     word: "small",
  //     translation: "маленький",
  //     image: "img/cry.jpg",
  //     audioSrc: "audio/cry.mp3",
  //   },
  //   {
  //     word: "big",
  //     translation: "большой",
  //     image: "img/dance.jpg",
  //     audioSrc: "audio/dance.mp3",
  //   },
  //   {
  //     word: "beautiful",
  //     translation: "прекрасный",
  //     image: "img/dive.jpg",
  //     audioSrc: "audio/dive.mp3",
  //   },
  //   {
  //     word: "ugly",
  //     translation: "уродливый",
  //     image: "img/draw.jpg",
  //     audioSrc: "audio/draw.mp3",
  //   },
  //   {
  //     word: "slow",
  //     translation: "медленный",
  //     image: "img/fish.jpg",
  //     audioSrc: "audio/fish.mp3",
  //   },
  //   {
  //     word: "fast",
  //     translation: "быстрый",
  //     image: "img/fly.jpg",
  //     audioSrc: "audio/fly.mp3",
  //   },
  //   {
  //     word: "kind",
  //     translation: "добрый",
  //     image: "img/hug.jpg",
  //     audioSrc: "audio/hug.mp3",
  //   },
  //   {
  //     word: "evil",
  //     translation: "злой",
  //     image: "img/jump.jpg",
  //     audioSrc: "audio/jump.mp3",
  //   },
  // ],
  [
    {
      word: "cat",
      translation: "кот",
      image: "img/cat.jpg",
      audioSrc: "audio/cat.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "chick",
      translation: "цыплёнок",
      image: "img/chick.jpg",
      audioSrc: "audio/chick.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "chicken",
      translation: "курица",
      image: "img/chicken.jpg",
      audioSrc: "audio/chicken.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "dog",
      translation: "собака",
      image: "img/dog.jpg",
      audioSrc: "audio/dog.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "horse",
      translation: "лошадь",
      image: "img/horse.jpg",
      audioSrc: "audio/horse.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "pig",
      translation: "свинья",
      image: "img/pig.jpg",
      audioSrc: "audio/pig.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "rabbit",
      translation: "кролик",
      image: "img/rabbit.jpg",
      audioSrc: "audio/rabbit.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "sheep",
      translation: "овца",
      image: "img/sheep.jpg",
      audioSrc: "audio/sheep.mp3",
      category: "Animal (set A)",

      correct: 0,
      wrong: 0,
    },
  ],
  [
    {
      word: "bird",
      translation: "птица",
      image: "img/bird.jpg",
      audioSrc: "audio/bird.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "fish",
      translation: "рыба",
      image: "img/fish1.jpg",
      audioSrc: "audio/fish.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "frog",
      translation: "жаба",
      image: "img/frog.jpg",
      audioSrc: "audio/frog.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "giraffe",
      translation: "жирафа",
      image: "img/giraffe.jpg",
      audioSrc: "audio/giraffe.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "lion",
      translation: "лев",
      image: "img/lion.jpg",
      audioSrc: "audio/lion.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "mouse",
      translation: "мышь",
      image: "img/mouse.jpg",
      audioSrc: "audio/mouse.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "turtle",
      translation: "черепаха",
      image: "img/turtle.jpg",
      audioSrc: "audio/turtle.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
    {
      word: "dolphin",
      translation: "дельфин",
      image: "img/dolphin.jpg",
      audioSrc: "audio/dolphin.mp3",
      category: "Animal (set B)",

      correct: 0,
      wrong: 0,
    },
  ],
  [
    {
      word: "skirt",
      translation: "юбка",
      image: "img/skirt.jpg",
      audioSrc: "audio/skirt.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
    {
      word: "pants",
      translation: "брюки",
      image: "img/pants.jpg",
      audioSrc: "audio/pants.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
    {
      word: "blouse",
      translation: "блузка",
      image: "img/blouse.jpg",
      audioSrc: "audio/blouse.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
    {
      word: "dress",
      translation: "платье",
      image: "img/dress.jpg",
      audioSrc: "audio/dress.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
    {
      word: "boot",
      translation: "ботинок",
      image: "img/boot.jpg",
      audioSrc: "audio/boot.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
    {
      word: "shirt",
      translation: "рубашка",
      image: "img/shirt.jpg",
      audioSrc: "audio/shirt.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
    {
      word: "coat",
      translation: "пальто",
      image: "img/coat.jpg",
      audioSrc: "audio/coat.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
    {
      word: "shoe",
      translation: "туфли",
      image: "img/shoe.jpg",
      audioSrc: "audio/shoe.mp3",
      category: "Clothes",

      correct: 0,
      wrong: 0,
    },
  ],
  [
    {
      word: "sad",
      translation: "грустный",
      image: "img/sad.jpg",
      audioSrc: "audio/sad.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
    {
      word: "angry",
      translation: "сердитый",
      image: "img/angry.jpg",
      audioSrc: "audio/angry.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
    {
      word: "happy",
      translation: "счастливый",
      image: "img/happy.jpg",
      audioSrc: "audio/happy.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
    {
      word: "tired",
      translation: "уставший",
      image: "img/tired.jpg",
      audioSrc: "audio/tired.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
    {
      word: "surprised",
      translation: "удивлённый",
      image: "img/surprised.jpg",
      audioSrc: "audio/surprised.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
    {
      word: "scared",
      translation: "испуганный",
      image: "img/scared.jpg",
      audioSrc: "audio/scared.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
    {
      word: "smile",
      translation: "улыбка",
      image: "img/smile.jpg",
      audioSrc: "audio/smile.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
    {
      word: "laugh",
      translation: "смех",
      image: "img/laugh.jpg",
      audioSrc: "audio/laugh.mp3",
      category: "Emotions",

      correct: 0,
      wrong: 0,
    },
  ],
];
