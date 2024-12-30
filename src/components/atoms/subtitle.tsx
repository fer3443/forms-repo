import React from 'react'

interface Props {
  children:React.ReactNode
}
export const Subtitle = ({children}:Props) => {
  return (
    <h2 className="font-semibold text-lg">{children}</h2>
  )
}
