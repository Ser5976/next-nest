import styles from './Slider.module.css';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { SliderProps } from './Slider.props';
import SliderItem from './Slider-Item/SliderItem';

const Slider: FC<SliderProps> = ({ sliders }): JSX.Element => {
  return (
    <Carousel infiniteLoop autoPlay showThumbs={false}>
      {sliders.map((img) => {
        return <SliderItem slider={img} key={img._id} />;
      })}
    </Carousel>
  );
};

export default Slider;
