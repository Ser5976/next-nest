import { useState } from 'react';
//кастомный хук для сортировке(по рейтингу,цене) c херовой тучей условий,зато работает
export const useSortCustom = () => {
  const [rating, setRating] = useState(false);
  const [priceUp, setPriceUp] = useState(false);
  const [priceDown, setPriceDown] = useState(false);

  const toggleRating = () => {
    setPriceUp(false);
    setPriceDown(false);
    setRating(true);
  };
  const toogglePrice = () => {
    setRating(false);
    if (!priceUp && !priceDown) {
      setPriceUp(true);
      return;
    }
    if (priceUp) {
      setPriceUp(false);
      setPriceDown(true);
      return;
    }
    if (priceDown) {
      setPriceDown(false);
      setPriceUp(true);
      return;
    }
  };

  return { rating, priceUp, priceDown, toggleRating, toogglePrice };
};
