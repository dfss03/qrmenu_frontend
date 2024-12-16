import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Component to display GLTF or GLB model
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
          console.error('Error loading model:', error);
        }
      );
    }, [modelUrl]);
  
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {model ? (
            <primitive object={model} />
          ) : (
            <Html center>
              <span>Loading Model...</span>
            </Html>
          )}
          <OrbitControls />
        </Canvas>
      </div>
    );
  }

export default ARViewer;
