"use client";

import { useEffect, useRef } from "react";
import type * as THREE_NS from "three";

type Three = typeof THREE_NS;

function makePetal(THREE: Three) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.55, 0.55, 0.62, 1.55, 0, 2.15);
  shape.bezierCurveTo(-0.62, 1.55, -0.55, 0.55, 0, 0);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    bevelSegments: 3,
    curveSegments: 16,
  });
  geometry.translate(0, 0, -0.025);
  return geometry;
}

function makeLeaf(THREE: Three) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.35, 0.5, 0.35, 1.3, 0, 1.8);
  shape.bezierCurveTo(-0.35, 1.3, -0.35, 0.5, 0, 0);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.03,
    bevelEnabled: true,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    bevelSegments: 2,
    curveSegments: 12,
  });
  geometry.translate(0, 0, -0.015);
  return geometry;
}

export function Flower3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup = () => {};

    import("three")
      .then((THREE) => {
        if (disposed) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        renderer.domElement.style.touchAction = "pan-y";
        host.appendChild(renderer.domElement);

        const pivot = new THREE.Group();
        scene.add(pivot);
        const flower = new THREE.Group();
        pivot.add(flower);

        const petalGeo = makePetal(THREE);
        const leafGeo = makeLeaf(THREE);

        const outerMat = new THREE.MeshStandardMaterial({
          color: 0xefaca5,
          roughness: 0.48,
          metalness: 0.05,
          emissive: 0xca7067,
          emissiveIntensity: 0.42,
          side: THREE.DoubleSide,
        });
        const innerMat = new THREE.MeshStandardMaterial({
          color: 0xf8cbc5,
          roughness: 0.42,
          metalness: 0.06,
          emissive: 0xd96f64,
          emissiveIntensity: 0.48,
          side: THREE.DoubleSide,
        });

        function ring(
          count: number,
          radius: number,
          scale: number,
          tilt: number,
          mat: THREE_NS.Material,
          phase = 0,
        ) {
          for (let i = 0; i < count; i += 1) {
            const petalPivot = new THREE.Group();
            petalPivot.rotation.z = (i / count) * Math.PI * 2 + phase;
            const petal = new THREE.Mesh(petalGeo, mat);
            petal.scale.setScalar(scale);
            petal.position.set(0, radius, 0);
            petal.rotation.x = -tilt;
            petalPivot.add(petal);
            flower.add(petalPivot);
          }
        }

        ring(8, 0.55, 1.0, 0.55, outerMat);
        ring(6, 0.42, 0.72, 0.85, innerMat, Math.PI / 6);
        ring(5, 0.3, 0.5, 1.15, outerMat, Math.PI / 5);

        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.42, 2),
          new THREE.MeshStandardMaterial({
            color: 0xf7efda,
            roughness: 0.35,
            metalness: 0.15,
            emissive: 0xd4a84e,
            emissiveIntensity: 0.5,
          }),
        );
        core.position.z = 0.35;
        flower.add(core);

        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.07, 3.2, 16),
          new THREE.MeshStandardMaterial({ color: 0x3e8440, roughness: 0.6 }),
        );
        stem.position.set(0, -1.95, -0.05);
        flower.add(stem);

        for (const [dir, angle] of [
          [1, 0.9],
          [-1, -0.9],
        ] as const) {
          const leaf = new THREE.Mesh(leafGeo, outerMat.clone());
          (leaf.material as THREE_NS.MeshStandardMaterial).color.set(0xbadd7f);
          (leaf.material as THREE_NS.MeshStandardMaterial).emissive.set(0x486b1c);
          (leaf.material as THREE_NS.MeshStandardMaterial).emissiveIntensity = 0.35;
          leaf.position.set(dir * 0.1, -1.7, 0);
          leaf.rotation.z = angle;
          leaf.scale.setScalar(0.85);
          flower.add(leaf);
        }

        flower.rotation.x = -0.15;

        const box = new THREE.Box3().setFromObject(flower);
        const center = box.getCenter(new THREE.Vector3());
        flower.position.sub(center);

        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const radius = Math.max(sphere.radius, 0.001);

        const fit = () => {
          const vFov = (camera.fov * Math.PI) / 180;
          const distV = radius / Math.sin(vFov / 2);
          const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
          const distH = radius / Math.sin(hFov / 2);
          const distance = Math.max(distV, distH) * 1.28;
          camera.position.set(0, 0, distance);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        };

        scene.add(new THREE.HemisphereLight(0xf7efda, 0x275a2a, 1.4));
        scene.add(new THREE.AmbientLight(0xffffff, 1.1));

        const key = new THREE.DirectionalLight(0xffffff, 2.8);
        key.position.set(3, 4, 5);
        scene.add(key);

        const pinkLight = new THREE.PointLight(0xefaca5, 50, 30, 2);
        pinkLight.position.set(3.4, 1.6, 3.2);
        scene.add(pinkLight);

        const greenLight = new THREE.PointLight(0xbadd7f, 35, 30, 2);
        greenLight.position.set(-3.4, -1.4, 2.6);
        scene.add(greenLight);

        const pointer = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const onPointerMove = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect();
          target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });

        const resize = () => {
          const w = Math.max(1, host.clientWidth);
          const h = Math.max(1, host.clientHeight);
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          fit();
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(host);

        let visible = true;
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        io.observe(host);

        let frame = 0;
        let last = performance.now();
        const render = () => {
          frame = requestAnimationFrame(render);
          const now = performance.now();
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          if (!visible) return;

          pointer.x += (target.x - pointer.x) * 0.06;
          pointer.y += (target.y - pointer.y) * 0.06;

          pivot.rotation.y += dt * 0.32;
          pivot.rotation.x = pointer.y * 0.28;
          pivot.position.x = pointer.x * 0.18;

          pinkLight.position.x = Math.sin(now * 0.0006) * 3.6;
          pinkLight.position.z = Math.cos(now * 0.0006) * 3.2;

          renderer.render(scene, camera);
        };
        frame = requestAnimationFrame(render);

        cleanup = () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("pointermove", onPointerMove);
          observer.disconnect();
          io.disconnect();
          renderer.dispose();
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const material = object.material;
              if (Array.isArray(material)) material.forEach((m) => m.dispose());
              else material.dispose();
            }
          });
          renderer.domElement.remove();
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true" role="presentation" />
  );
}
