'use client';

import { useState } from 'react';

export type GalleryImage = { src: string; alt: string };

export default function Gallery({ images, ratio = 'wide' }: { images: GalleryImage[]; ratio?: 'wide' | 'tall' }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  const current = images[Math.min(active, images.length - 1)];
  return (
    <div>
      <div className={ratio === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/3]'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          className="shot h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={img.alt}
              onClick={() => setActive(i)}
              className={`thumb h-14 w-20 ${i === active ? 'thumb-active' : ''}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
