'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bone } from 'lucide-react';
import '@google/model-viewer';

// TypeScript support for @google/model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          alt: string;
          'camera-controls': boolean;
          'auto-rotate': boolean;
          style?: React.CSSProperties;
          children?: React.ReactNode;
        },
        HTMLElement
      >;
    }
  }
}

// IMPORTANT: Replace with your actual Echo3D credentials
const ECHO3D_API_KEY = 'YOUR_ECHO3D_API_KEY';
const ECHO3D_ENTRY_ID = 'YOUR_SKELETON_ENTRY_ID';
const modelUrl = `https://api.echo3d.com/query?key=${ECHO3D_API_KEY}&entry=${ECHO3D_ENTRY_ID}`;

export function InteractiveSkeletonLab() {
  const [selectedBone, setSelectedBone] = useState<string>('None');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component only renders on the client, avoiding SSR issues with the web component.
    setIsClient(true);
  }, []);

  const handleHotspotClick = (boneName: string) => {
    setSelectedBone(boneName);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bone className="w-6 h-6" />
          Interactive Skeleton Lab
        </CardTitle>
        <CardDescription>
          Click on the hotspots to identify different bones of the human skeleton. Drag to rotate.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full text-center p-2 bg-muted rounded-md">
            <span className="font-semibold">Selected Bone:</span> {selectedBone}
        </div>
        <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-muted/30">
        {isClient ? (
          <model-viewer
            src={modelUrl}
            alt="A 3D model of a human skeleton"
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '100%' }}
          >
            {/* Hotspots are positioned using 'data-position' which are 3D coordinates (x y z) */}
            <div
              className="w-4 h-4 rounded-full border-2 bg-red-500/70 border-white cursor-pointer"
              slot="hotspot-skull"
              data-position="0 1.6 0"
              onClick={() => handleHotspotClick('Skull')}
            ></div>
            <div
              className="w-4 h-4 rounded-full border-2 bg-blue-500/70 border-white cursor-pointer"
              slot="hotspot-clavicle"
              data-position="0.2 1.4 0.1"
              onClick={() => handleHotspotClick('Clavicle')}
            ></div>
            <div
              className="w-4 h-4 rounded-full border-2 bg-green-500/70 border-white cursor-pointer"
              slot="hotspot-femur"
              data-position="0.2 0.7 0"
              onClick={() => handleHotspotClick('Femur')}
            ></div>
          </model-viewer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">Loading 3D Model...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
