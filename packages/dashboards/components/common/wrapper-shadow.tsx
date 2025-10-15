import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';

export const SHADOW_HEIGHT = 55;
export const SHADOW_WIDTH = 47;

export const ScrollableWrapper = styled.div<{ $horizontalScroll?: boolean }>`
  position: relative;
  overflow-y: auto;
  overflow-x: ${({ $horizontalScroll }) => ($horizontalScroll ? 'scroll' : 'auto')};

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    overflow-x: ${({ $horizontalScroll }) => $horizontalScroll && 'scroll'};
    padding-right: 0px;
    scrollbar-width: ${({ $horizontalScroll }) => $horizontalScroll && 'none'};
  }
  &::-webkit-scrollbar {
    display: ${({ $horizontalScroll }) => $horizontalScroll && 'none'};
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: Theme }) => theme.colors.grey};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Shadow = styled.div<{ $horizontalScroll?: boolean }>`
  position: sticky;
  left: ${({ $horizontalScroll }) => !$horizontalScroll && '0px'};
  top: ${({ $horizontalScroll }) => $horizontalScroll && '0px'};
  bottom: ${({ $horizontalScroll }) => $horizontalScroll && '0px'};
  width: ${({ $horizontalScroll }) => ($horizontalScroll ? '0px' : '100%')};
  height: ${({ $horizontalScroll }) => ($horizontalScroll ? '18px' : '0px')};
  z-index: 100;
  overflow: visible;
  right: 0;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  &[data-active='true'] {
    opacity: 1;
    z-index: 1;
  }
  &::after {
    height: ${({ $horizontalScroll }) => ($horizontalScroll ? '18px' : `${SHADOW_HEIGHT}px`)};
    width: ${({ $horizontalScroll }) => ($horizontalScroll ? `${SHADOW_WIDTH}px` : '100%')};
    content: '';
    display: block;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  }
`;

// top y left
export const FirstShadow = styled(Shadow)`
  left: ${({ $horizontalScroll }) => $horizontalScroll && '-1px'};
  top: ${({ $horizontalScroll }) => !$horizontalScroll && `${SHADOW_HEIGHT}px`};
  transform: ${({ $horizontalScroll }) => !$horizontalScroll && `rotate(180deg)`};
  transform-origin: ${({ $horizontalScroll }) => !$horizontalScroll && 'top center'};
  &::after {
    background: ${({ $horizontalScroll }) =>
      $horizontalScroll
        ? `linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%)`
        : `linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%)`};
  }
`;

// bottom y right
export const SecondShadow = styled(Shadow)`
  top: 100%;
  left: ${({ $horizontalScroll }) => $horizontalScroll && '101%'};
  transform: ${({ $horizontalScroll }) =>
    $horizontalScroll ? `translateX(-${SHADOW_WIDTH}px)` : `translateY(-${SHADOW_HEIGHT}px)`};
  &::after {
    background: ${({ $horizontalScroll }) =>
      $horizontalScroll
        ? `linear-gradient(to left, #fff 0%, rgba(255, 255, 255, 0) 100%)`
        : `linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%)`};
  }
`;

type Props = {
  children: ReactNode;
  className?: string;
  defaultActive?: boolean;
  horizontalScroll?: boolean;
};

type ShadowState = {
  showLeftShadow: boolean;
  showRightShadow: boolean;
  showTopShadow: boolean;
  showBottomShadow: boolean;
};

const WrapperShadow = ({ children, className, horizontalScroll, defaultActive = false }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [shadowState, setShadowState] = useState<ShadowState>({
    showLeftShadow: defaultActive,
    showRightShadow: defaultActive,
    showTopShadow: defaultActive,
    showBottomShadow: defaultActive,
  });

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    const objDiv = wrapperRef.current;

    if (objDiv) {
      let debounceTimer: ReturnType<typeof setTimeout>;

      const handleScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight, scrollLeft, scrollWidth, clientWidth } = objDiv;

        const thresholdInPixels = horizontalScroll ? SHADOW_WIDTH : SHADOW_HEIGHT;

        const newShadowState: ShadowState = {
          showTopShadow: scrollTop !== 0 && scrollTop >= thresholdInPixels,
          showBottomShadow: scrollHeight - (offsetHeight + scrollTop) >= thresholdInPixels,
          showLeftShadow: scrollLeft !== 0 && scrollLeft >= thresholdInPixels,
          showRightShadow: scrollWidth - (clientWidth + scrollLeft) >= thresholdInPixels,
        };

        setShadowState(newShadowState);
      };

      const handleScrollDebounced = () => {
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(handleScroll, 16);
      };

      // Call on first render.
      handleScroll();
      // Update on scroll
      objDiv.addEventListener('scroll', handleScrollDebounced);

      return () => {
        objDiv.removeEventListener('scroll', handleScrollDebounced);

        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
      };
    }
  }, [horizontalScroll]);

  return (
    <ScrollableWrapper ref={wrapperRef} className={className} $horizontalScroll={horizontalScroll}>
      <FirstShadow
        data-active={horizontalScroll ? shadowState.showLeftShadow : shadowState.showTopShadow}
        $horizontalScroll={horizontalScroll}
      />
      <SecondShadow
        data-active={horizontalScroll ? shadowState.showRightShadow : shadowState.showBottomShadow}
        $horizontalScroll={horizontalScroll}
      />
      {children}
    </ScrollableWrapper>
  );
};
export default WrapperShadow;
