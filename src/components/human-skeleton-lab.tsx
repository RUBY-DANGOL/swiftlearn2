'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bone, Loader2 } from 'lucide-react';
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

const ECHO3D_API_KEY = 'rough-surf-3701';
const ECHO3D_ENTRY_ID = 'a62a6b2c-6338-4e08-958a-a621743f338d';
const echo3dApiUrl = `https://api.echo3d.com/query?key=${ECHO3D_API_KEY}&entry=${ECHO3D_ENTRY_ID}`;

export function InteractiveSkeletonLab() {
  const [selectedBone, setSelectedBone] = useState<string>('None');
  const [modelSrc, setModelSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let objectUrl: string | null = null;

    const fetchModel = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(echo3dApiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch model: ${response.statusText}`);
        }
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        setModelSrc(objectUrl);
      } catch (error) {
        console.error("Error loading 3D model:", error);
        setModelSrc(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModel();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [isClient]);

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
          Click on the hotspots to identify different bones of the human skeleton. Drag to rotate, scroll to zoom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full text-center p-2 bg-muted rounded-md">
            <span className="font-semibold">Selected Bone:</span> {selectedBone}
        </div>
        <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
        {isClient ? (
          isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span>Loading 3D Model...</span>
            </div>
          ) : modelSrc ? (
            <model-viewer
              src={modelSrc}
              alt="A 3D model of a human skeleton"
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '100%' }}
            >
              <button
                className="w-4 h-4 rounded-full border-2 bg-red-500/70 border-white cursor-pointer"
                slot="hotspot-skull"
                data-position="0 1.62 0"
                onClick={() => handleHotspotClick('Skull')}
              ></button>
              <button
                className="w-4 h-4 rounded-full border-2 bg-blue-500/70 border-white cursor-pointer"
                slot="hotspot-clavicle"
                data-position="0.2 1.4 0.1"
                onClick={() => handleHotspotClick('Clavicle')}
              ></button>
              <button
                className="w-4 h-4 rounded-full border-2 bg-yellow-500/70 border-white cursor-pointer"
                slot="hotspot-ribs"
                data-position="0 1.25 0"
                onClick={() => handleHotspotClick('Rib Cage')}
              ></button>
              <button
                className="w-4 h-4 rounded-full border-2 bg-purple-500/70 border-white cursor-pointer"
                slot="hotspot-humerus"
                data-position="-0.3 1.2 0"
                onClick={() => handleHotspotClick('Humerus')}
              ></button>
              <button
                className="w-4 h-4 rounded-full border-2 bg-orange-500/70 border-white cursor-pointer"
                slot="hotspot-pelvis"
                data-position="0 0.9 0"
                onClick={() => handleHotspotClick('Pelvis')}
              ></button>
              <button
                className="w-4 h-4 rounded-full border-2 bg-green-500/70 border-white cursor-pointer"
                slot="hotspot-femur"
                data-position="0.15 0.7 0"
                onClick={() => handleHotspotClick('Femur')}
              ></button>
              <button
                className="w-4 h-4 rounded-full border-2 bg-pink-500/70 border-white cursor-pointer"
                slot="hotspot-tibia"
                data-position="0.15 0.2 0"
                onClick={() => handleHotspotClick('Tibia')}
              ></button>
            </model-viewer>
          ) : (
            <div className="text-destructive">Failed to load model. Please check the API key and entry ID.</div>
          )
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>Initializing Viewer...</span>
          </div>
        )}
        </div>
      </CardContent>
    </Card>
  );
}
