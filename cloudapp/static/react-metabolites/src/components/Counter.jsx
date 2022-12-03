import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SET_COUNTER } from '../model/actions'

export function Counter() {
  const count = useSelector((state) => state.counter.cnt)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          className="btn btn-primary"
          aria-label="Increment value"
          onClick={() => dispatch({ type: SET_COUNTER, count: count + 1 })}
        >
          +
        </button>
        <span>{count}</span>
        <button
          className="btn btn-danger"
          aria-label="Decrement value"
          onClick={() => dispatch({ type: SET_COUNTER, count: count - 1 })}
        >
          -
        </button>
      </div>
      {/* omit additional rendering output here */}
    </div>
  )
}
