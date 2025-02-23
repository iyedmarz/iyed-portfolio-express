
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { User, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/utils/translations";

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language].about;
  const mountRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<THREE.Mesh>();
  const cloudRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    const earthTexture = new THREE.TextureLoader().load('/earth-texture.jpg');
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthTexture,
      bumpScale: 0.1,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    // Clouds
    const cloudGeometry = new THREE.SphereGeometry(2.05, 32, 32);
    const cloudTexture = new THREE.TextureLoader().load('/clouds.png');
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.4,
    });
    
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    cloudRef.current = clouds;

    // Camera position
    camera.position.z = 6;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (earthRef.current) {
        earthRef.current.rotation.y += 0.001;
      }

      if (cloudRef.current) {
        cloudRef.current.rotation.y += 0.0015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(earth);
      scene.remove(clouds);
    };
  }, []);

  return (
    <section id="about" className="min-h-screen bg-[#0B0B1E] py-20 px-4 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-white">
          <User className="text-purple-400" size={24} />
          <h2 className="text-3xl font-bold">{t.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Earth Container */}
          <div 
            ref={mountRef} 
            className="w-full aspect-square rounded-full relative"
          />

          {/* About Content */}
          <div className="space-y-6 text-white z-10">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="text-purple-400" />
                {t.mission}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
                <h4 className="font-medium mb-2">{t.origin}</h4>
                <p className="text-gray-400">{t.originValue}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
                <h4 className="font-medium mb-2">{t.currentBase}</h4>
                <p className="text-gray-400">{t.currentBaseValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
