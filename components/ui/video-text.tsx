"use client"

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

export interface VideoTextProps {
  /** Video URL. Files in /public are served from the root: "/hero-video.mp4" */
  src: string
  /** Put the font, size and line-height here (e.g. "font-display text-7xl") */
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: "auto" | "metadata" | "none"
  children: ReactNode
  /** Element to render, e.g. "h1" */
  as?: ElementType
  /**
   * Extra room around the text (in em) so script-font swashes and
   * ascenders/descenders aren't clipped. Raise it if edges still get cut.
   */
  bleedX?: number
  bleedY?: number
}

type Mask = { url: string; padX: number; padY: number }

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  as: Component = "div",
  bleedX = 0.3,
  bleedY = 0.35,
}: VideoTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mask, setMask] = useState<Mask | null>(null)

  const content = React.Children.toArray(children).join("")
  const videoSrc =
    src.startsWith("/") || src.startsWith("http") ? src : `/${src}`

  // Draw the text on a canvas using the element's real font, with extra
  // padding around it, then use that image as the mask.
  const buildMask = useCallback(() => {
    const el = textRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    if (!width || !height) return

    const style = getComputedStyle(el)
    const fontPx = parseFloat(style.fontSize) || 16
    const padX = Math.ceil(fontPx * bleedX)
    const padY = Math.ceil(fontPx * bleedY)
    const totalW = width + padX * 2
    const totalH = height + padY * 2
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const canvas = document.createElement("canvas")
    canvas.width = Math.ceil(totalW * dpr)
    canvas.height = Math.ceil(totalH * dpr)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.scale(dpr, dpr)
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#000"
    ctx.fillText(content, totalW / 2, totalH / 2)

    setMask({ url: `url(${canvas.toDataURL("image/png")})`, padX, padY })
  }, [content, bleedX, bleedY])

  useEffect(() => {
    let cancelled = false
    const run = () => {
      if (!cancelled) buildMask()
    }

    // wait for the web font, then rebuild on any size change
    document.fonts.ready.then(run)
    const ro = new ResizeObserver(run)
    if (textRef.current) ro.observe(textRef.current)

    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [buildMask])

  // React's `muted` prop doesn't always set the attribute, which blocks
  // autoplay on mobile. Force it.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = muted
    if (autoPlay) video.play().catch(() => {})
  }, [muted, autoPlay, videoSrc])

  return (
    <Component className={cn("relative", className)}>
      {/* invisible copy of the text: gives the box its real size/font */}
      <span
        ref={textRef}
        aria-hidden
        className="invisible block whitespace-nowrap"
      >
        {content}
      </span>

      {/* the video, visible only through the letters.
          It extends past the text box by the padding so nothing is cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute transition-opacity duration-300"
        style={{
          left: mask ? -mask.padX : 0,
          right: mask ? -mask.padX : 0,
          top: mask ? -mask.padY : 0,
          bottom: mask ? -mask.padY : 0,
          opacity: mask ? 1 : 0,
          maskImage: mask?.url,
          WebkitMaskImage: mask?.url,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <span className="sr-only">{content}</span>
    </Component>
  )
}