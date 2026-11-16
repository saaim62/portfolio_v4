'use client';

import { useEffect, useRef } from 'react';

export default function BackdropFX() {
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, sy = 0, csy = 0, raf = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { sy = Math.min(window.scrollY, 1400); };
    const loop = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      csy += (sy - csy) * 0.08;
      if (farRef.current) {
        farRef.current.style.transform = `translate3d(${(-cx * 8).toFixed(2)}px, ${(-cy * 6 + csy * 0.05).toFixed(2)}px, 0)`;
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translate3d(${(-cx * 20).toFixed(2)}px, ${(-cy * 13 + csy * 0.13).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className="plate-wrap" aria-hidden>
        <div ref={farRef} className="plate-layer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/showroom-plate.webp" alt="" className="plate-img-far" />
        </div>
        <div ref={nearRef} className="plate-layer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/showroom-plate.webp" alt="" className="plate-img-near" />
        </div>
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="sweep" />
      </div>
      <div className="plate-shade" aria-hidden />
    </>
  );
}
