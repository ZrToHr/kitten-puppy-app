import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
  id: string;
  name: string;
  children: React.ReactNode;
  className: string;
}

export const ImageCard = ({ id, name, children, className }: Props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'image',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={className} ref={dragRef}>
      {children}
    </div>
  );
};
