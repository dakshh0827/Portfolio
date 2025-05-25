import { ModelProps } from '@/types/hobbies/models';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

export default function BasketballOBJ({
    visible = true
}: ModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const obj = useLoader(OBJLoader, '/static/models/basketball/Basketball_ball.obj');

    useEffect(() => {
        obj.traverse((child) => {
            if ((child as any).isMesh) {
                const mesh = child as Mesh;

                // Replace material with new MeshStandardMaterial with desired color
                mesh.material = new MeshStandardMaterial({
                    color: '#733A00', // brownish-orange color
                    roughness: 0.7,
                    metalness: 0.1,
                    transparent: false,
                });
            }
        });
    }, [obj]);

    useFrame(() => {
        const group = groupRef.current;
        if (group && visible) {
            const maxScale = 0.06;
            const currentScale = group.scale.x;
            if (currentScale < maxScale) {
                const newScale = currentScale + (maxScale - currentScale) * 0.1;
                group.scale.set(newScale, newScale, newScale);
            }
        }
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 5, 2]} intensity={1.5} color="#ffffff" />
            <pointLight position={[0, 2, 2]} intensity={1} color="#ffaa88" />

            <group
                ref={groupRef}
                dispose={null}
                scale={0}
                position={[0, -0.072, 0]}
                rotation={[0, Math.PI * 1.85, 0]}
                visible={visible}
                renderOrder={visible ? 1 : 0}
            >
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial opacity={0} transparent />
                </mesh>
                <primitive object={obj} />
            </group>
        </>
    );
}
