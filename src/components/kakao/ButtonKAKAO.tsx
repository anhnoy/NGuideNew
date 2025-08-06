import React from 'react'

interface ButtonKAKAOProps {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

const ButtonKAKAO: React.FC<ButtonKAKAOProps> = ({ 
  className = '', 
  children, 
  onClick 
}) => {
  return (
    <button
      className={`
        bg-yellow-400 
        hover:bg-yellow-500 
        text-black 
        font-semibold 
        py-3 
        px-6 
        rounded-lg 
        flex 
        items-center 
        gap-2 
        transition-colors 
        duration-200
        ${className}
      `}
      onClick={onClick}
    >
      <svg 
        className="w-5 h-5" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 5.64 2 10.13c0 2.87 1.91 5.41 4.77 7.04-.2-.73-.38-1.86.09-2.68.42-.73 2.73-11.54 2.73-11.54s-.69 1.4-.69 3.47c0 2.14 1.21 3.74 2.71 3.74 1.28 0 1.9-.96 1.9-2.11 0-1.28-.82-3.21-.82-5.01 0-1.39.7-2.52 2.15-2.52 1.7 0 2.85 1.79 2.85 4.17 0 3.1-1.97 5.59-4.7 5.59-3.2 0-5.08-2.4-5.08-4.87 0-.96.37-1.99.83-2.55.09-.11.1-.2.08-.31-.09-.36-.29-1.16-.33-1.32-.05-.22-.18-.27-.41-.16-1.52-.71-2.47-2.93-2.47-4.72 0-3.84 2.79-7.37 8.05-7.37 4.23 0 7.51 3.01 7.51 7.03 0 4.19-2.64 7.56-6.31 7.56-1.23 0-2.39-.64-2.78-1.4l-.75 2.87c-.27 1.05-1.01 2.37-1.51 3.17 1.14.35 2.34.54 3.59.54 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
      {children || 'KAKAO 문의'}
    </button>
  )
}

export default ButtonKAKAO
