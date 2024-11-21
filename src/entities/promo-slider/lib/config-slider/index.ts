import Autoplay from 'embla-carousel-autoplay';

export const configSlider = {
  sliderOptions: {
    loop: true,
  },
  sliderPlugins: [
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    }),
  ],
};
