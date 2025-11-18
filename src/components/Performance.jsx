import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { performanceImages, performanceImgPositions } from '../constants/index.js'

gsap.registerPlugin(ScrollTrigger)

const Performance = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

     useGSAP(
     () => {
       // Text animation - fade in and move up
       gsap.fromTo(
         contentRef.current?.querySelector('p'),
         { opacity: 0, y: 30 },
         {
           opacity: 1,
           y: 0,
           duration: 1,
           scrollTrigger: {
             trigger: contentRef.current,
             start: 'top 90%',
             end: 'top 64%',
             scrub: 1,
             markers: false,
           },
         }
       )

       // Image timeline - only on desktop
      if (window.innerWidth > 1024) {
      ScrollTrigger.matchMedia({
        "(min-width: 1025px)": () => {
         const timeline = gsap.timeline({
           scrollTrigger: {
             trigger: sectionRef.current,
             start: 'top center',
             end: 'bottom center',
             scrub: 1,
             markers: false,
             onUpdate: (self) => {
               // Timeline updates smoothly with scroll
             },
           },
         })

         // Animate all images at time 0
         performanceImgPositions.forEach(({ id, left, right, bottom, transform }) => {
           // Skip p5
           if (id === 'p5') return

           const img = sectionRef.current?.querySelector(`.${id}`)
           if (!img) return

           timeline.fromTo(
             img,
             { opacity: 0, y: 50 },
             { opacity: 1, y: 0, duration: 1 },
             0
           )

           // Animate to final position
           timeline.to(
             img,
             {
               ...(left !== undefined && { left: `${left}%` }),
               ...(right !== undefined && { right: `${right}%` }),
               ...(bottom !== undefined && { bottom: `${bottom}%` }),
               ...(transform && { transform }),
             },
             0
           )
         })
        }
      })
      }
     },
     { scope: sectionRef }
   )

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="performance" ref={sectionRef}>
        <h2>Next-level graphics performance. Game on!</h2>

        <div className="wrapper">
            {performanceImages.map(({id, src}) => (
                    <img key={id} className={id} src={src} alt={id} />
            ))}
        </div>

        <div className='content' ref={contentRef}>
            <p>Experience unparalleled graphics performance with our cutting-edge technology, delivering stunning visuals and smooth gameplay for an immersive gaming experience.
            {" "} <span className='text-white'>
                Gaming feels more immersive and realistic than ever!
                </span>{" "}
            And with optimized power consumption, you can game longer without worrying about battery life.
            </p>
        </div>
    </section>
  )
}

export default Performance