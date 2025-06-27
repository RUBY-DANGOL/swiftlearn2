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
          src?: string;
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
const ECHO3D_ENTRY_ID = '657ed481-ba41-49f8-aabb-1bf96f298907';

const metadataUrl = `https://api.echo3d.com/get?key=${ECHO3D_API_KEY}&entry=${ECHO3D_ENTRY_ID}`;

export function InteractiveMuscleAnatomy() {
  const [modelSrc, setModelSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | undefined;

    const fetchModel = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Step 1: Fetch metadata to find the storage ID
        const metaResponse = await fetch(metadataUrl);
        if (!metaResponse.ok) {
          throw new Error(`Failed to fetch model metadata: ${metaResponse.statusText}`);
        }
        const metaData = await metaResponse.json();
        const storageID = metaData?.hologram?.storageID;
        if (!storageID) {
          throw new Error("Could not find storageID in the API response.");
        }

        // Step 2: Fetch the actual model file using the storage ID
        const modelDownloadUrl = `https://api.echo3d.com/query?key=${ECHO3D_API_KEY}&file=${storageID}`;
        const modelResponse = await fetch(modelDownloadUrl);
        if (!modelResponse.ok) {
            throw new Error(`Failed to download model file: ${modelResponse.statusText}`);
        }
        const blob = await modelResponse.blob();
        
        // Step 3: Create a temporary local URL for the model data
        objectUrl = URL.createObjectURL(blob);
        setModelSrc(objectUrl);
      } catch (e: any) {
        console.error("Error loading 3D model:", e);
        setError("Failed to load model. There might be an issue with the Echo3D service or network policies.");
        setModelSrc(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModel();

    // Clean up the created object URL when the component unmounts.
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
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
          {isLoading && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span>Loading 3D Model...</span>
            </div>
          )}
          {error && !isLoading && (
            <div className="text-destructive p-4 text-center">{error}</div>
          )}
          {!isLoading && !error && modelSrc && (
            <model-viewer
              src={modelSrc}
              alt="A 3D model of human muscle anatomy"
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '100%' }}
            >
            </model-viewer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
