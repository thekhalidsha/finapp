import React from 'react'
import { useParams } from 'react-router-dom'

const RemoveFinance = () => {
  const props = useParams();
  return (
    <div>
      {props.id}
    </div>
  )
}

export default RemoveFinance