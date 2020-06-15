import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { disableBodyScroll } from "body-scroll-lock";
import Items from "./items";
import Checkout from "./checkout_button";

const Mobile = ({ items, rfc }) => {
  const [opened, set_opened] = useState(false);

  const topLimit = -1 * (window.innerHeight - 170);
  const [{ y }, set] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(
    ({ down, offset: [x, y] }) => {
      if (!down) {
        if (!opened) {
          if (y < -100) {
            set_opened(true);
            set({ y: topLimit });
          } else {
            set({ y: 0 });
          }
        } else {
          if (y - topLimit >= 100) {
            set_opened(false);
            set({ y: 0 });
          } else {
            set({ y: topLimit });
          }
        }
      } else {
        set({ y: y });
      }
    },
    { bounds: { top: topLimit, bottom: 0 }, rubberband: true, filterTaps: true }
  );

  useEffect(() => {
    if (items.length === 0) {
      set_opened(false);
    }
    set({ y: 0 });
  }, [items, set]);

  return items.length !== 0 ? (
    <animated.span
      className="cart d-flex d-md-none mobile-cart flex-column"
      style={{
        y,
      }}
    >
      <div
        {...bind()}
        onMouseDown={() => disableBodyScroll(document)}
        id="swipe_row"
        className="swipe_row flex-column"
      >
        <span className="swipe_button"></span>
        <div className="checkout_button">
          <Checkout />
        </div>
      </div>

      <div className="body">
        <Items items={items} remove_from_cart={rfc} />
      </div>
    </animated.span>
  ) : (
    ""
  );
};

export default Mobile;
