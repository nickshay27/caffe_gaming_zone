import React from "react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { GALLERY_IMAGES } from "../../data";

export default function GallerySection() {
  const sizeClasses = { tall: "row-span-2", wide: "col-span-2", small: "" };
  return (
    <section id="gallery" className="relative bg-[#0a0a0f] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <Reveal><Eyebrow tone="neutral">EXPERIENCE GALLERY</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            MOMENTS FROM THE FLOOR.
          </h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:gap-4 sm:grid-cols-4">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.caption} delay={(i % 4) * 0.06} className={sizeClasses[img.size]}>
              <div className="group relative h-full w-full overflow-hidden rounded-xl border border-white/10">
                <img src={img.src} alt={img.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300">{img.tag}</span>
                  <span className="font-display text-sm font-bold text-white">{img.caption}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}