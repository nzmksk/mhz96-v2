import React from 'react'

interface SectionContainerProps {
    children: React.ReactNode
    className?: string
    id?: string
}

function SectionContainer({children, className, id}: SectionContainerProps) {
  return (
    <div className={`min-h-screen ${className}`} id={id}>
        {children}
    </div>
  )
}

export default SectionContainer
