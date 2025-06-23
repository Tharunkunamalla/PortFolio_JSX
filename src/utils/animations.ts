import { gsap } from 'gsap';

export const revealFromBottom = (element: HTMLElement, delay = 0) => {
  gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out'
  });
};

export const fadeIn = (element: HTMLElement, delay = 0) => {
  gsap.from(element, {
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power2.inOut'
  });
};

export const staggerFromBottom = (elements: HTMLElement[], staggerTime = 0.2) => {
  gsap.from(elements, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: staggerTime,
    ease: 'power3.out'
  });
};

export const pulseAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
};

export const animateText = (element: HTMLElement) => {
  const text = element.innerText;
  const splitText = text.split('');
  
  // Clear the element
  element.innerText = '';
  
  // Add spans for each character
  splitText.forEach((char) => {
    const span = document.createElement('span');
    span.innerText = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
  
  // Animate each character
  gsap.to(element.children, {
    opacity: 1,
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    ease: 'power3.out'
  });
};