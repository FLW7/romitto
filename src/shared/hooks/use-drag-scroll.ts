/* eslint-disable unicorn/no-invalid-remove-event-listener */
import { useCallback, useEffect, useState } from 'react';

export const useDragScroll = () => {
  const [node, setNode] = useState<HTMLElement | null>(null);

  const ref = useCallback((nodeEle: HTMLElement | null) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!node) {
        return;
      }
      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x;
        // const dy = e.clientY - startPos.y;

        // node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [node],
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!node) {
        return;
      }
      const touch = e.touches[0];
      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: touch.clientX,
        y: touch.clientY,
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        // const dy = touch.clientY - startPos.y;

        // node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;
      };

      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [node],
  );

  useEffect(() => {
    if (!node) {
      return;
    }
    node.addEventListener('mousedown', (e: MouseEvent) => {
      handleMouseDown(e as any);
    });
    node.addEventListener('touchstart', (e: TouchEvent) => {
      handleTouchStart(e as any);
    });

    return () => {
      node.removeEventListener('mousedown', (e: MouseEvent) => {
        handleMouseDown(e as any);
      });
      node.removeEventListener('touchstart', (e: TouchEvent) => {
        handleTouchStart(e as any);
      });
    };
  }, [node, handleMouseDown, handleTouchStart]);

  return { ref, node };
};
