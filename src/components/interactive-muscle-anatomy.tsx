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

// NOTE: This now points to a local file in the `public` directory.
// Make sure you have placed your .glb file at `public/muscle-anatomy.glb`.
const MODEL_URL = '/muscle-anatomy.glb';

export function InteractiveMuscleAnatomy() {
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
            <model-viewer
              src={MODEL_URL}
              alt="A 3D model of human muscle anatomy"
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
          <AlertTitle>Note for Developers</AlertTitle>
          <AlertDescription>
            This component loads a 3D model from the `/public` folder. Please place your `.glb` file at <code className="font-semibold text-foreground bg-muted p-1 rounded-sm">public/muscle-anatomy.glb</code> for it to display correctly.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
