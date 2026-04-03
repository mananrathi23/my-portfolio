import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth
    const H = mount.clientHeight

    // Scene
    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    camera.position.z = 60

    // ── Floating particles ──
    const particleCount = 1800
    const positions  = new Float32Array(particleCount * 3)
    const colors     = new Float32Array(particleCount * 3)
    const sizes      = new Float32Array(particleCount)

    const palette = [
      new THREE.Color('#7c6af7'), // accent purple
      new THREE.Color('#f06595'), // accent pink
      new THREE.Color('#22d3ee'), // cyan
      new THREE.Color('#4ade80'), // green
    ]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() * 1.5 + 0.3
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // ── Wireframe torus knot ──
    const torusGeo = new THREE.TorusKnotGeometry(18, 4, 120, 18)
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x7c6af7,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    scene.add(torus)

    // ── Icosahedron ──
    const icoGeo = new THREE.IcosahedronGeometry(10, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xf06595,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(-40, 20, -30)
    scene.add(ico)

    // Mouse interaction
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize handler
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    let animId
    const clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      particles.rotation.y = t * 0.02
      particles.rotation.x = t * 0.01

      torus.rotation.x = t * 0.15
      torus.rotation.y = t * 0.10

      ico.rotation.y = t * 0.12
      ico.rotation.z = t * 0.08

      // Smooth camera follow mouse
      camera.position.x += (mouseX * 30 - camera.position.x) * 0.04
      camera.position.y += (-mouseY * 20 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
