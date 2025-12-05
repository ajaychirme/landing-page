// TiltedHeader.jsx

export default function TiltedHeader({
  text,
  className = "",
  rotate = -1,           // default rotation same as your design
}) {
  return (
    <div
      className="inline-block mb-4"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="bg-black px-6 md:px-12 lg:px-16 py-3 md:py-4">
        <h2
          className={`
            text-white
            text-2xl md:text-3xl lg:text-4xl
            font-black
            tracking-wide
            leading-tight sm:leading-snug md:leading-normal
            break-words
            inline-flex
            ${className}
          `}
        >
          {text}
        </h2>
      </div>
    </div>
  );
}
