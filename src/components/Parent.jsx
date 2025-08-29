import { useRef } from 'react'
import Child from './child'

export default function(){
  const inputRef = useRef(null)

  return (
    <>
      <input type="text" ref={inputRef} style={{
        border: "1px solid black"
      }}/>
      <Child inputEle={inputRef}/>
    </>
  )
}