'use client';

import React from 'react';
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

// IMPORTANT: Replace this placeholder with the direct URL to your .glb file from your Vercel deployment.
// It will look something like: "https://your-project-name.vercel.app/your-model-file.glb"
const VERCEL_HOSTED_MODEL_URL = 'https://your-project.vercel.app/muscle-anatomy.glb';

export function InteractiveMuscleAnatomy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Orbit className="w-6 h-6" />
          Interactive Muscle Anatomy
        </CardTitle>
        <CardDescription>
          Explore the 3D model of human muscle anatomy. Drag to rotate, scroll to zoom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
            <model-viewer
              src={VERCEL_HOSTED_MODEL_URL}
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
      </CardContent>
    </Card>
  );
}
