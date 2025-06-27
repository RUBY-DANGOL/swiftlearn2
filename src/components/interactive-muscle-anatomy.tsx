'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Orbit, Loader2 } from 'lucide-react';
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

const ECHO3D_API_KEY = 'polished-violet-9331';
const ECHO3D_ENTRY_ID = 'a2179836-e81e-42b7-a859-0a61250280b2';

// We use the 'get' endpoint to retrieve metadata including the direct storage link
const echo3dApiUrl = `https://api.echo3d.com/get?key=${ECHO3D_API_KEY}&entry=${ECHO3D_ENTRY_ID}`;

export function InteractiveMuscleAnatomy() {
  const [modelSrc, setModelSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModel = async () => {
      setIsLoading(true);
      try {
        // Fetch metadata from Echo3D API
        const response = await fetch(echo3dApiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch model metadata: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Extract the storage ID for the GLB model
        const storageID = data?.hologram?.storageID;
        if (!storageID) {
          throw new Error("Could not find storageID in the API response.");
        }

        // Construct the direct URL to the model file
        const directModelUrl = `https://storage.echo3d.com/${ECHO3D_API_KEY}/${storageID}`;
        setModelSrc(directModelUrl);

      } catch (error) {
        console.error("Error loading 3D model:", error);
        setModelSrc(null); // Set to null on error to show the failure message
      } finally {
        setIsLoading(false);
      }
    };

    fetchModel();
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Orbit className="w-6 h-6" />
          Interactive Muscle Anatomy
        </CardTitle>
        <CardDescription>
          Explore the major muscle groups of the human body. Drag to rotate, scroll to zoom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>Loading 3D Model...</span>
          </div>
        ) : modelSrc ? (
          <model-viewer
            src={modelSrc}
            alt="A 3D model of human muscle anatomy"
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '100%' }}
          >
          </model-viewer>
        ) : (
          <div className="text-destructive">Failed to load model. Please check the API key and entry ID.</div>
        )}
        </div>
      </CardContent>
    </Card>
  );
}
