'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Orbit, Loader2, AlertTriangle } from 'lucide-react';
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
          'auto-rotate'?: boolean;
          style?: React.CSSProperties;
          children?: React.ReactNode;
        },
        HTMLElement
      >;
    }
  }
}

// ===================================================================================
// IMPORTANT: PLEASE UPDATE THIS URL
// ===================================================================================
// To get your model's URL:
// 1. Place your .glb file (e.g., "muscle-anatomy.glb") inside the `/public` folder of your project.
// 2. Deploy your project to Vercel. You'll get a URL like "https://your-project-name.vercel.app".
// 3. The URL for your model will be: "https://your-project-name.vercel.app/muscle-anatomy.glb".
//
// Replace the placeholder below with your actual URL.
// ===================================================================================
const VERCEL_HOSTED_MODEL_URL = 'https://your-project.vercel.app/muscle-anatomy.glb';

export function InteractiveMuscleAnatomy() {

  const isPlaceholderUrl = VERCEL_HOSTED_MODEL_URL.includes('your-project.vercel.app');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Orbit className="w-6 h-6" />
          Interactive Muscle Anatomy
        </CardTitle>
        <CardDescription>
          Explore a 3D model of human muscle anatomy. Drag to rotate, scroll to zoom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {isPlaceholderUrl && (
            <Card className="w-full bg-destructive/10 border-destructive text-destructive-foreground">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-5 h-5"/>
                        Action Required: Update Model URL
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <p>Please update the <code className="bg-destructive/20 px-1 py-0.5 rounded">VERCEL_HOSTED_MODEL_URL</code> variable in the file <code className="bg-destructive/20 px-1 py-0.5 rounded">src/components/interactive-muscle-anatomy.tsx</code> with the direct URL to your own hosted .glb file.</p>
                </CardContent>
            </Card>
        )}
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
