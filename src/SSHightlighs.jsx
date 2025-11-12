import React from 'react'
import highlights from '../src/assets/highlights.png'
import './SSHighlighs.css'

export default function SSHightlighs({isLoggedIn}) {
  return (
    <div className={isLoggedIn ? "highlight mt-28" : ""}>
    <img src={highlights} alt="hl" />
  </div>
  )
}
