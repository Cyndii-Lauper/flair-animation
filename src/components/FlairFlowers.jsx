import React, { useEffect } from 'react';
import './Styles.css';
import { gsap } from 'gsap';

const FlairFlowers = () => {
  const images = [
    "https://assets.codepen.io/16327/Revised+Flair.png",
    "https://assets.codepen.io/16327/Revised+Flair-1.png",
    "https://assets.codepen.io/16327/Revised+Flair-2.png",
    "https://assets.codepen.io/16327/Revised+Flair-3.png",
    "https://assets.codepen.io/16327/Revised+Flair-4.png",
    "https://assets.codepen.io/16327/Revised+Flair-5.png",
    "https://assets.codepen.io/16327/Revised+Flair-6.png",
    "https://assets.codepen.io/16327/Revised+Flair-7.png",
    "https://assets.codepen.io/16327/Revised+Flair-8.png"
  ];

  useEffect(() => {
    const flair = gsap.utils.toArray('.flair');
    const gap = 150;
    let index = 0;
    const wrapper = gsap.utils.wrap(0, flair.length);
    gsap.defaults({ duration: 1 });

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = mousePos;
    let cachedMousePos = mousePos;

    const handleMouseMove = (e) => {
      mousePos = {
        x: e.x,
        y: e.y
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const ImageTrail = () => {
      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y
      );

      cachedMousePos.x = gsap.utils.interpolate(
        cachedMousePos.x || mousePos.x,
        mousePos.x,
        0.1
      );
      cachedMousePos.y = gsap.utils.interpolate(
        cachedMousePos.y || mousePos.y,
        mousePos.y,
        0.1
      );

      if (travelDistance > gap) {
        animateImage();
        lastMousePos = mousePos;
      }
    };

    const animateImage = () => {
      const wrappedIndex = wrapper(index);
      const img = flair[wrappedIndex];
      gsap.killTweensOf(img);

      gsap.set(img, {
        clearProps: 'all'
      });

      gsap.set(img, {
        opacity: 1,
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50
      });

      playAnimation(img);
      index++;
    };

    const playAnimation = (shape) => {
      let tl = gsap.timeline();
      tl.from(shape, {
        opacity: 0,
        scale: 0,
        ease: 'elastic.out(1, 0.3)'
      })
      .to(shape, {
        rotation: 'random([-360, 360])'
      }, '<')
      .to(shape, {
        y: '120vh',
        ease: 'back.in(1.7)',
        duration: 1.75
      }, 0);
    };

    gsap.ticker.add(ImageTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ImageTrail);
    };
  }, []);

  return (
    <div className="content">
      {images.map((src, index) => (
        <img key={index} className="flair" src={src} alt="" />
      ))}
    </div>
  );
};

export default FlairFlowers;
