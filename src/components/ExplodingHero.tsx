import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ExplodingHero() {
  const trackRef = useRef<HTMLDivElement>(null)
  
  // Hook into the parent track for scroll progress
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end']
  })

  // The Main Card Animation (Centers and scales up slightly)
  const mainScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  // Helper to generate outward transform values mapped to scroll
  const useExplosion = (targetX: number, targetY: number, targetRotate: number) => {
    const x = useTransform(scrollYProgress, [0, 1], [0, targetX])
    const y = useTransform(scrollYProgress, [0, 1], [0, targetY])
    const rotate = useTransform(scrollYProgress, [0, 1], [0, targetRotate])
    return { x, y, rotate }
  }

  // Define each explosion profile
  const cpu = useExplosion(-450, -300, -12)
  const cooler = useExplosion(0, -360, 6)
  const motherboard = useExplosion(450, -300, 14)
  const gpu = useExplosion(-500, -20, -8)
  const ram = useExplosion(500, -20, 10)
  const ssd = useExplosion(-420, 260, -15)
  const psu = useExplosion(-120, 340, -5)
  const pcCase = useExplosion(420, 280, 12)
  const monitorMain = useExplosion(-240, -400, -6)
  const monitorSecondary = useExplosion(240, -400, 8)

  // Subcomponent to keep code clean and modular
  const Card = ({ style, src, alt }: { style: any; src: string; alt: string }) => (
    <motion.div
      style={style}
      className="absolute inset-0 w-[280px] h-[280px] rounded-2xl overflow-hidden shadow-2xl"
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  )

  return (
    <section ref={trackRef} className="w-full h-[400vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black">
        {/* The Card Container */}
        <div className="relative w-[280px] h-[280px]">
          {/* Exploding Parts (Background layer) */}
          <Card style={cpu} src={`${import.meta.env.BASE_URL}tedy/cpu.png`} alt="CPU" />
          <Card style={cooler} src={`${import.meta.env.BASE_URL}tedy/cooler.png`} alt="Cooler" />
          <Card style={motherboard} src={`${import.meta.env.BASE_URL}tedy/motherboard.png`} alt="Motherboard" />
          <Card style={gpu} src={`${import.meta.env.BASE_URL}tedy/gpu.png`} alt="GPU" />
          <Card style={ram} src={`${import.meta.env.BASE_URL}tedy/ram.png`} alt="RAM" />
          <Card style={ssd} src={`${import.meta.env.BASE_URL}tedy/ssd.png`} alt="SSD" />
          <Card style={psu} src={`${import.meta.env.BASE_URL}tedy/psu.png`} alt="PSU" />
          <Card style={pcCase} src={`${import.meta.env.BASE_URL}tedy/case.png`} alt="Case" />
          <Card style={monitorMain} src={`${import.meta.env.BASE_URL}tedy/monitor-main.png`} alt="Main Monitor" />
          <Card style={monitorSecondary} src={`${import.meta.env.BASE_URL}tedy/monitor-secondary.png`} alt="Secondary Monitor" />

          {/* Main Anchor Card (Foreground) */}
          <motion.div
            style={{ scale: mainScale }}
            className="absolute inset-0 w-[280px] h-[280px] rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            <img
              src={`${import.meta.env.BASE_URL}tedy/assembled_pc.png`}
              alt="Assembled PC"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
