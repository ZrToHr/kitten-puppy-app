import React from 'react';
import styled from '@emotion/styled';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import bgimg from '../../assets/highlight_background.jpg';
import lege from '../../assets/lege.jpeg';
import SwipeCard from '../../common/swipecard/SwipeCard';
import { ImageCard } from '../../common/imagecard/ImageCard';

export default function GalleryView() {
  const GalleryBackground = styled.div`
    height: 100%;
    max-height: 100%;
    background: url(${bgimg});
    background-repeat: no-repeat;
    background-size: cover;
  `;

  const GalleryBackdrop = styled.div`
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(14px);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const ImageWrapper = styled.div`
    height: 90%;
  `;

  const Image = styled.img`
    height: 100%;
    object-fit: contain;
    border: 10px solid #fff;
    box-shadow: 0px 8px 16px 8px rgba(0, 0, 0, 0.4);
  `;

  const isMobile = window.innerWidth < 600;

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <GalleryBackground>
        <GalleryBackdrop>
          {/* <SwipeCard flickOnSwipe className="swipe-card"> */}
          {/*   <Image src={lege} alt="lege" /> */}
          {/* </SwipeCard> */}
          <ImageCard id="12" name="sfsdf" className="swipe-card">
            <Image src={lege} alt="lege" />
          </ImageCard>
        </GalleryBackdrop>
      </GalleryBackground>
    </DndProvider>
  );
}
