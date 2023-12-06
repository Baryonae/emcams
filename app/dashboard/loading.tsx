import React from 'react'
import { Spinner } from '@nextui-org/react'
function loading() {
  return (
    <div><div className = 'h-full flex justify-center items-center'><Spinner /></div></div>
  )
}

export default loading