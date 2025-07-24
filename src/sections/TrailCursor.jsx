import React, { useEffect, useRef } from "react";

const TrailCursor = () => {
  const blobRef = useRef(null);
  const dotRef = useRef(null);
  // Cursor state
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let anim;
    function animate() {
      // Lerp for smooth trailing
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${pos.current.x - 18}px, ${pos.current.y - 18}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 3}px, ${mouse.current.y - 3}px, 0)`;
      }
      anim = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(anim);
    };
  }, []);

  // Hide the default cursor
  useEffect(() => {
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = prev;
    };
  }, []);

  return (
    <>
      {/* Main trailing blob */}
      <div
        ref={blobRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(191, 174, 58, 0.45)", // even darker yellow, more opaque
          boxShadow: "0 0 22px 8px #bfae3acc, 0 0 0 2px #bfae3aee",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "background 0.2s",
          mixBlendMode: "lighten",
          willChange: "transform",
        }}
      />
      {/* Sharp pointer dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#bfae3a",
          boxShadow: "0 0 16px 4px #fde047cc",
          pointerEvents: "none",
          zIndex: 10000,
          willChange: "transform",
        }}
      />
    </>
  );
};

export default TrailCursor;
