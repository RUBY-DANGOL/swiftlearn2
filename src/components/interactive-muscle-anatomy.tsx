
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Orbit, Loader2, AlertCircle } from 'lucide-react';
import '@google/model-viewer';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

// TypeScript support for @google/model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          alt: string;
          'camera-controls': boolean;
          'auto-rotate'?: boolean;
          style?: React.CSSProperties;
          children?: React.ReactNode;
        },
        HTMLElement
      >;
    }
  }
}

const MODEL_URL = '/namedskeleton.glb';

export function InteractiveMuscleAnatomy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Orbit className="w-6 h-6" />
          Interactive Skeleton Anatomy
        </CardTitle>
        <CardDescription>
          Explore a 3D model of a human skeleton. Drag to rotate, scroll to zoom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
                To load the 3D model, please add your <code className="font-semibold text-foreground">namedskeleton.glb</code> file to the <code className="font-semibold text-foreground">public</code> folder in your project's file explorer.
            </AlertDescription>
        </Alert>
        <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
            <model-viewer
              src={MODEL_URL}
              alt="A 3D model of a human skeleton"
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
