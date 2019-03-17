export default function() {
  const audio = [
    new Audio("/audio/max_cat_1.mp3"),
    new Audio("/audio/max_cat_2.mp3"),
    new Audio("/audio/max_cat_3.mp3"),
    new Audio("/audio/max_cat_4.mp3")
  ];

  const randomSound = Math.floor(Math.random() * (audio.length - 1));
  return audio[randomSound];
}
