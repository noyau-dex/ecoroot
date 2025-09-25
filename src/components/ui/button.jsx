import React from "react"

export function Button({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition ${className}`}
    >
      {children}
    </button>
  )
}
