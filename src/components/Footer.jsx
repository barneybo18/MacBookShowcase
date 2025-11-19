import React from 'react'
import { footerLinks } from '../constants/index.js'

const Footer = () => {
  return (
    <footer>
      <div className='info'>
        <p>More Ways to shop: Find an Apple Store or other retailer near you. Or call +123456789.</p>
        <img src="/apple.svg" alt="apple logo" />
      </div>

        <hr />

        <div className='links'>
          <p>Copyright © 2025 Apple Inc. All rights reserved.</p>

          <ul>
            {
              footerLinks.map(({label, link}) => (
                <li key={label}>
                  <a href={link}>{label}</a>
                </li>
              ))
            }
          </ul>
      </div>
    </footer>
  )
}

export default Footer