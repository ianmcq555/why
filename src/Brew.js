import React from 'react'

export default function Brew({brew}) {
    const getItems = () => {
        return Object.keys(brew).map(key => key==='size'?<></>:<div key = {key}>
            {brew[key].name} x {brew[key].qty}
        </div>)
    }
  return (
    <div>
        {getItems()}
    </div>
  )
}