'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Orbit, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
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

// This URL must point to the raw .glb file, not the GitHub repository page.
// I've used a sample model here. Replace it with your raw GitHub link.
const MODEL_URL = 'https://raw.githubusercontent.com/google/model-viewer/master/packages/shared-assets/models/Astronaut.glb';

export function InteractiveMuscleAnatomy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Orbit className="w-6 h-6" />
          Interactive 3D Viewer
        </CardTitle>
        <CardDescription>
          Explore the 3D model. Drag to rotate, scroll to zoom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
            <model-viewer
              src={MODEL_URL}
              alt="A 3D model"
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '100%' }}
            >
             <div className="flex flex-col items-center justify-center h-full" slot="poster">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="mt-2 text-muted-foreground">Loading 3D model...</span>
              </div>
            </model-viewer>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Using your GitHub Model</AlertTitle>
          <AlertDescription>
            This component now loads a model from a URL. To use your own file from GitHub, find the file in your repository, click the "Raw" or "Download" button, and use that URL. It should start with <code className="font-semibold text-foreground bg-muted p-1 rounded-sm">raw.githubusercontent.com</code>.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
