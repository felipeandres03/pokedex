import { useRef, useState, useEffect, useCallback } from "react";

type Props = {
  children: React.ReactNode;
  trackClassName?: string;
};

function ScrollableFilterRow({ children, trackClassName = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [thumb, setThumb] = useState({ width: 100, left: 0 });

  const updateThumb = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const scrollable = maxScroll > 4;
    setCanScroll(scrollable);

    if (!scrollable) return;

    const widthPercent = (el.clientWidth / el.scrollWidth) * 100;
    const leftPercent = (el.scrollLeft / maxScroll) * (100 - widthPercent);

    setThumb({ width: widthPercent, left: leftPercent });
  }, []);

  useEffect(() => {
    updateThumb();

    const el = trackRef.current;
    if (!el) return;

    // Recalcula si el contenido cambia de tamaño (ej. iconos que aún cargan)
    const resizeObserver = new ResizeObserver(updateThumb);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateThumb);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateThumb);
    };
  }, [updateThumb, children]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;

    // Avanza aprox el ancho visible del track, con un margen para dejar ver
    // el siguiente botón parcialmente (indica que hay más contenido)
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-row">
      <div className="scroll-row__controls">
        {canScroll && (
          <button
            type="button"
            className="scroll-row__arrow scroll-row__arrow--left"
            onClick={() => scroll("left")}
            aria-label="Desplazar a la izquierda"
          >
            <span aria-hidden="true">&#8249;</span>
          </button>
        )}

        <div
          className={`scroll-row__track ${trackClassName}`}
          ref={trackRef}
          onScroll={updateThumb}
        >
          {children}
        </div>

        {canScroll && (
          <button
            type="button"
            className="scroll-row__arrow scroll-row__arrow--right"
            onClick={() => scroll("right")}
            aria-label="Desplazar a la derecha"
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        )}
      </div>

      {canScroll && (
        <div className="scroll-row__progress">
          <div
            className="scroll-row__progress-bar"
            style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default ScrollableFilterRow;
