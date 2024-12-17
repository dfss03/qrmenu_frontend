import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ARViewer({ modelUrl }) {
    const [model, setModel] = useState(null);
  
    useEffect(() => {
      if (!modelUrl) return;
  
      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          setModel(gltf.scene);
        },
        undefined,
        (error) => {
          console.error('Error cargando modelo:', error);
        }
      );
    }, [modelUrl]);
  
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <Canvas>
          <ambientLight intensity={2.0} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {model ? (
            <primitive object={model} scale={[6, 6, 6]} position={[0, -1, 0]} />
          ) : (
            <Html center>
              <span>Cargando Modelo...</span>
            </Html>
          )}
          <OrbitControls />
        </Canvas>
      </div>
    );
  }

export default ARViewer;
