import { useGSAP } from '@gsap/react';
import React from 'react'
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Highlights = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1024px)'});

  useGSAP(() => {
    gsap.to(['.left-column', '.right-column'], {
      scrollTrigger: {
        trigger: '#highlights',
        start: isMobile ? 'bottom bottom' : 'top center',
      },
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.5,
      ease: 'power1.inOut',
    })
  })

  return (
    <section id='highlights'>
      <h2>Why not UPGRADE now?</h2>
      <h3>Here's the perks that come with the new MacBook Pro.</h3>

      <div className='masonry'>
        <div className='left-column'>
          <div>
            <img src='/laptop.png' alt='laptop' />
            <p>Breeze through demanding tasks up to 10X faster.</p>
          </div>
          <div>
            <img src='/sun.png' alt='sun' />
            <p>A Stunning <br /> 
              Liquid Retina XDR<br /> 
              Display.</p>
          </div>
        </div>
        
        <div className='right-column'>
          <div className='apple-gradient'>
            <img src='/ai.png' alt='AI' />
            <p>Built for <br />
            <span> Apple Intelligence </span>
            </p>
          </div>
          <div>
            <img src='/battery.png' alt='battery' />
            <p>Up to <span className='green-gradient'>{' '}14 more hours{' '}</span> 
            battery life. 
            <span className='text-dark-100'>{' '}(Up to 24 hours total.)</span></p>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Highlights