'use client';

import React, { useRef, useEffect } from 'react';
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
          'auto-rotate'?: boolean;
          style?: React.CSSProperties;
          children?: React.ReactNode;
        },
        HTMLElement
      >;
    }
  }
}

const MODEL_URL = '/rnadna(1).glb';

export function InteractiveDnaModel() {
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) {
      return;
    }

    const handleClick = (event: any) => {
      const { node } = event.detail;

      // Remove any existing hotspots
      const existingHotspot = modelViewer.querySelector('.hotspot');
      if (existingHotspot) {
        modelViewer.removeChild(existingHotspot);
      }
      
      // Do nothing if the click is not on a named node
      if (!node) {
        return;
      }

      const hotspot = document.createElement('button');
      hotspot.slot = `hotspot-${node.name}`;
      hotspot.className = 'hotspot';
      hotspot.dataset.position = event.detail.position.toString();
      hotspot.dataset.normal = event.detail.normal.toString();
      
      // Clean up the name for display
      let nodeName = node.name.replace(/_corr/g, '').replace(/_/g, ' ');
      nodeName = nodeName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

      hotspot.textContent = nodeName;
      modelViewer.appendChild(hotspot);
    };

    modelViewer.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      modelViewer.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Orbit className="w-6 h-6" />
          Interactive DNA/RNA Model
        </CardTitle>
        <CardDescription>
          Explore a 3D model of a DNA/RNA helix. **Click on a component to see its name.** Drag to rotate, scroll to zoom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <style>
          {`
            .hotspot {
              background: rgba(255, 255, 255, 0.9);
              border: 1px solid #ddd;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.25);
              color: #000;
              display: block;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 600;
              padding: 8px 12px;
              pointer-events: none;
              transform: translate(-50%, -50%);
              white-space: nowrap;
            }
          `}
        </style>
        <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
            <model-viewer
              // @ts-ignore
              ref={modelViewerRef}
              src={MODEL_URL}
              alt="A 3D model of a DNA/RNA helix"
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '100%' }}
            >
             <div className="flex flex-col items-center justify-center h-full" slot="poster">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-muted-foreground">Loading 3D model...</span>
              </div>
            </model-viewer>
        </div>
      </CardContent>
    </Card>
  );
}
