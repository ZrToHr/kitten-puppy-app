/* eslint-disable no-param-reassign */
import React from 'react';

interface Props {
  flickOnSwipe: boolean;
  className: string;
  preventSwipe?: boolean;
  children: React.ReactNode;
}

const SwipeSetting = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 300, // px/s
};

// eslint-disable-next-line no-promise-executor-return
const Sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

type CurrentDiv = HTMLDivElement;

type Coordinates = { x: number; y: number };

type SwipeSpeed = Coordinates;

type SwipeOffset = Coordinates;

type SwipeLocation = Coordinates & { time: number };

const getBodySize = (body: HTMLElement): Coordinates => {
  const elementStyles = window.getComputedStyle(body);
  const widthString = elementStyles.getPropertyPriority('width');
  const width = Number(widthString.split('px')[0]);
  const heightString = elementStyles.getPropertyValue('height');
  const height = Number(heightString.split('px')[0]);
  return { x: width, y: height };
};

const translationString = (x: number, y: number): string => `translate(${x}px, ${y}px)`;

const getTranslate = (currentDiv: CurrentDiv) => {
  const style = window.getComputedStyle(currentDiv);
  const matrix = new WebKitCSSMatrix(style.transform);
  return { x: matrix.m41, y: matrix.m42 };
};

const rotationString = (rot: number): string => `rotate(${rot}deg)`;

const getRotation = (currentDiv: CurrentDiv) => {
  const style = window.getComputedStyle(currentDiv);
  const matrix = new WebKitCSSMatrix(style.transform);
  return (-Math.asin(matrix.m21) / (2 * Math.PI)) * 360;
};

const calcSpeed = (oldLocation: SwipeLocation, newLocation: SwipeLocation): SwipeSpeed => {
  const dx = newLocation.x - oldLocation.x;
  const dy = oldLocation.y - newLocation.y;
  const dt = (newLocation.time - oldLocation.time) / 1000;
  return { x: dx / dt, y: dy / dt };
};

const pythagoras = (x: number, y: number): number => Math.sqrt(x ** 2 + y ** 2);

const draggableTouchmove = (
  coordinates: Coordinates,
  currentDiv: CurrentDiv,
  offset: SwipeOffset,
  lastLocation: SwipeLocation,
) => {
  const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y };
  const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() };
  const translation = translationString(pos.x, pos.y);
  const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000;
  const rotation = rotationString(rotCalc * SwipeSetting.maxTilt);
  currentDiv.style.transform = translation + rotation;
  return newLocation;
};

const touchCoordinatesFromEvent = (event: TouchEvent): Coordinates => {
  const touchLocation = event.targetTouches[0];
  return { x: touchLocation.clientX, y: touchLocation.clientY };
};

const mouseCoordinatesFromEvent = (event: MouseEvent): Coordinates => ({ x: event.clientX, y: event.clientY });

const animateOut = async (currentDiv: CurrentDiv, speed: SwipeSpeed, easeIn = false) => {
  const startPos = getTranslate(currentDiv);
  const bodySize = getBodySize(document.body);
  const diagonal = pythagoras(bodySize.x, bodySize.y);

  const velocity = pythagoras(speed.x, speed.y);
  const time = diagonal / velocity;
  const multiplier = diagonal / velocity;

  const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y);
  let rotateString: string;

  const rotationPower = 200;

  if (easeIn) {
    currentDiv.style.transition = `ease ${time}s`;
  } else {
    currentDiv.style.transition = `ease-out ${time}s`;
  }

  if (getRotation(currentDiv) === 0) {
    rotateString = rotationString((Math.random() - 0.5) * rotationPower);
  } else if (getRotation(currentDiv) > 0) {
    rotateString = rotationString((Math.random() * rotationPower) / 2 + getRotation(currentDiv));
  } else {
    rotateString = rotationString(((Math.random() - 1) * rotationPower) / 2 + getRotation(currentDiv));
  }

  currentDiv.style.transform = translateString + rotateString;
  await Sleep(time * 1000);
};

const animateBack = async (currentDiv: CurrentDiv) => {
  currentDiv.style.transition = `${SwipeSetting.snapBackDuration} ms`;
  const startingPoint = getTranslate(currentDiv);
  const translation = translationString(
    startingPoint.x * -SwipeSetting.bouncePower,
    startingPoint.y * -SwipeSetting.bouncePower,
  );
  const rotation = rotationString(getRotation(currentDiv) * -SwipeSetting.bouncePower);
  currentDiv.style.transform = translation + rotation;

  await Sleep(SwipeSetting.snapBackDuration * 0.75);
  currentDiv.style.transform = 'none';

  await Sleep(SwipeSetting.snapBackDuration);
  currentDiv.style.transition = '10ms';
};

const SwipeCard = React.forwardRef(({ flickOnSwipe = true, children, preventSwipe = false, className }: Props, ref) => {
  const swipeAlreadyReleased = React.useRef(false);
  const element = React.useRef<CurrentDiv>();

  React.useImperativeHandle(ref, () => ({
    async swipe(dir = 'right') {
      if (!element.current) return;

      const currentDiv = element.current;
      const power = 1000;
      const disturbance = (Math.random() - 0.5) * 1000;

      if (dir === 'right') {
        await animateOut(currentDiv, { x: power, y: disturbance }, true);
      } else if (dir === 'left') {
        await animateOut(currentDiv, { x: -power, y: disturbance }, true);
      } else if (dir === 'up') {
        await animateOut(currentDiv, { x: disturbance, y: power }, true);
      } else if (dir === 'down') {
        await animateOut(currentDiv, { x: disturbance, y: -power }, true);
      }
      currentDiv.style.display = 'none';
    },
    async restoreCard() {
      if (element.current !== null && element.current !== undefined) {
        element.current.style.display = 'block';
        await animateBack(element.current);
      }
    },
  }));

  const handleSwipeReleased = React.useCallback(
    async (currentDiv: CurrentDiv, speed: SwipeSpeed) => {
      if (swipeAlreadyReleased.current) {
        return;
      }
      swipeAlreadyReleased.current = true;

      // Check if this is a swipe
      if (Math.abs(speed.x) > SwipeSetting.swipeThreshold || Math.abs(speed.y) > SwipeSetting.swipeThreshold) {
        if (flickOnSwipe && !preventSwipe) {
          await animateOut(currentDiv, speed);
          currentDiv.style.display = 'none';
          return;
        }
      }

      // Card was not flicked away, animate back to start
      await animateBack(currentDiv);
    },
    [swipeAlreadyReleased, flickOnSwipe, preventSwipe],
  );

  const handleSwipeStart = React.useCallback(() => {
    swipeAlreadyReleased.current = false;
  }, [swipeAlreadyReleased]);

  React.useLayoutEffect(() => {
    let offset: SwipeOffset = { x: 0, y: 0 };
    let speed: SwipeSpeed = { x: 0, y: 0 };
    let lastLocation: SwipeLocation = { x: 0, y: 0, time: new Date().getTime() };
    let mouseIsClicked = false;

    if (!element.current) return;

    const currentDiv: CurrentDiv = element.current;

    currentDiv.addEventListener('touchstart', (ev) => {
      ev.preventDefault();
      handleSwipeStart();
      offset = { x: -touchCoordinatesFromEvent(ev).x, y: -touchCoordinatesFromEvent(ev).y };
    });

    currentDiv.addEventListener('mousedown', (ev) => {
      ev.preventDefault();
      mouseIsClicked = true;
      handleSwipeStart();
      offset = { x: -mouseCoordinatesFromEvent(ev).x, y: -mouseCoordinatesFromEvent(ev).y };
    });

    currentDiv.addEventListener('touchmove', (ev) => {
      ev.preventDefault();
      const newLocation = draggableTouchmove(touchCoordinatesFromEvent(ev), currentDiv, offset, lastLocation);
      speed = calcSpeed(lastLocation, newLocation);
      lastLocation = newLocation;
    });

    element.current.addEventListener('mousemove', (ev) => {
      ev.preventDefault();
      if (mouseIsClicked) {
        const newLocation = draggableTouchmove(mouseCoordinatesFromEvent(ev), currentDiv, offset, lastLocation);
        speed = calcSpeed(lastLocation, newLocation);
        lastLocation = newLocation;
      }
    });

    currentDiv.addEventListener('touchend', (ev) => {
      ev.preventDefault();
      handleSwipeReleased(currentDiv, speed);
    });

    currentDiv.addEventListener('mouseup', (ev) => {
      if (mouseIsClicked) {
        ev.preventDefault();
        mouseIsClicked = false;
        handleSwipeReleased(currentDiv, speed);
      }
    });

    element.current.addEventListener('mouseleave', (ev) => {
      if (mouseIsClicked) {
        ev.preventDefault();
        mouseIsClicked = false;
        handleSwipeReleased(currentDiv, speed);
      }
    });
  }, []);

  return React.createElement('div', { ref: element, className }, children);
});

export default SwipeCard;
