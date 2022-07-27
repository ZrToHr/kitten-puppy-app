import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import bgimg from '../../assets/highlight_background.jpg';
import lege from '../../assets/lege.jpeg';

const cards = [
  'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start((i) => {
      if (index !== i) return; // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      // eslint-disable-next-line no-nested-ternary
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
      const scale = active ? 1.1 : 1; // Active cards lift up a bit
      // eslint-disable-next-line consistent-return
      return {
        x,
        rot,
        scale,
        delay: undefined,
        // eslint-disable-next-line no-nested-ternary
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      };
    });
    if (!active && gone.size === cards.length)
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
      }, 600);
  });
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <animated.div className="deck" key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </>
  );
}

export default function GalleryView() {
  // const GalleryBackground = styled.div`
  //   height: 100%;
  //   max-height: 100%;
  //   background: url(${bgimg});
  //   background-repeat: no-repeat;
  //   background-size: cover;
  // `;
  //
  // const GalleryBackdrop = styled.div`
  //   height: 100%;
  //   background: rgba(0, 0, 0, 0.2);
  //   backdrop-filter: blur(14px);
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // `;
  //
  // const ImageWrapper = styled.div`
  //   height: 90%;
  // `;
  //
  // const Image = styled.img`
  //   height: 100%;
  //   object-fit: contain;
  //   border: 10px solid #fff;
  //   box-shadow: 0px 8px 16px 8px rgba(0, 0, 0, 0.4);
  // `;

  return (
    // <GalleryBackground>
    //   <GalleryBackdrop>
    //     <ImageWrapper>
    //       <Image src={lege} alt="lege" />
    //     </ImageWrapper>
    //   </GalleryBackdrop>
    // </GalleryBackground>
    <div className="flex fill center container">
      <Deck />
    </div>
  );
}
