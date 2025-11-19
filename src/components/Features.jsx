import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import StudioLights from './three/StudioLights'
import { features, featureSequence } from '../constants'
import { Html } from '@react-three/drei'
import MacbookModel from './models/Macbook'
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx'
import useMacbookStore from '../store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({query: '(max-width: 1024px)'});
  const {setTexture} = useMacbookStore();

  //This is the point where we preload all feature videos during component mount
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement('video');

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: 'auto',
        crossOrigin: 'anonymous',
      });
      v.load();
    })
  
  }, [])
  
  useGSAP(() =>{
    // 3D Model scroll animation
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas',  
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      }
    });

    //Synchronize feature video changes with scroll position
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas',
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
    }
    });

    // Spin the 3D model
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {y: Math.PI * 2, ease: 'power1.inOut'});
    }

    // COntent and texture sync
    featureSequence.forEach((feature, index) => {
      timeline
        .call(() => setTexture(feature.videoPath), undefined, index === 0 ? 0 : undefined)
        .to(feature.boxClass, {opacity: 1, y: 0}, index === 0 ? `<${feature.delay}` : undefined)
    })
  }, [])

  return (
    <group ref={groupRef}>
      {/* Add 3D models or features here */}
      <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  )
}

const Features = () => {
  return (
    <section id='features'>
      <h2>See It In A Different Perspective.</h2>

      <Canvas id='f-canvas'>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />

        {/* Add 3D models or features here */}
      </Canvas>

      <div className='absolute inset-0'>
        {features.map((feature, index) => (
         <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles)}>
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className='text-white'>{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
          ))}
      </div>
    </section>
  )
}

export default Features