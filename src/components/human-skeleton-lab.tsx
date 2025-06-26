'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, MousePointerClick, MoveHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const bones = [
  { id: 'femoral-neck', name: 'Femoral neck', top: '47.5%', left: '46.5%' },
  { id: 'anterior-cortex-tibia', name: 'Anterior Cortex of the Tibia', top: '73%', left: '44%' },
  { id: 'navicular', name: 'Navicular', top: '86%', left: '45%' },
  { id: 'metatarsal-5', name: '5th Metatarsal (proximal dyaphisis)', top: '88%', left: '42%' },
  { id: 'sesamoid-bones', name: 'Sesamoid bones 1st toe', top: '92%', left: '44%' },
  { id: 'medial-malleolus', name: 'Medial Malleolus', top: '84%', left: '55.5%' },
  { id: 'talus', name: 'Talus (lateral process)', top: '86%', left: '56.5%' },
  { id: 'metatarsal-2', name: 'Base of 2nd Metatarsal', top: '88%', left: '55.5%' },
];

export function HumanSkeletonLab() {
  const [selectedBone, setSelectedBone] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="w-6 h-6" />
          Interactive Human Skeleton
        </CardTitle>
        <CardDescription>
          Drag the skeleton to rotate it and click on the markers to identify different bones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MoveHorizontal className="w-5 h-5" /><span>Drag to Rotate</span></div>
            <div className="flex items-center gap-2"><MousePointerClick className="w-5 h-5" /><span>Click to Identify</span></div>
          </div>

          <div className="w-full max-w-lg h-[600px] bg-muted/30 rounded-lg overflow-hidden relative border cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{ left: -200, right: 200 }}
              className="w-full h-full relative"
            >
              <Image
                src="https://placehold.co/400x600.png"
                alt="Human Skeleton"
                data-ai-hint="human skeleton"
                layout="fill"
                objectFit="contain"
                className="pointer-events-none"
              />
              {bones.map((bone) => (
                <motion.button
                  key={bone.id}
                  className="absolute w-4 h-4 rounded-full bg-primary/50 border-2 border-primary-foreground shadow-lg"
                  style={{ top: bone.top, left: bone.left }}
                  onHoverStart={() => setSelectedBone(bone.name)}
                  onHoverEnd={() => setSelectedBone(null)}
                  onClick={() => setSelectedBone(bone.name)}
                  whileHover={{ scale: 2.5, zIndex: 10 }}
                  whileTap={{ scale: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              ))}
            </motion.div>
          </div>
          
          <div className="w-full max-w-lg h-16 flex items-center justify-center">
            <AnimatePresence>
              {selectedBone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Badge variant="secondary" className="text-lg font-semibold px-4 py-2">
                    {selectedBone}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
             {!selectedBone && (
                <p className="text-muted-foreground">Hover over or click a marker to see the bone name.</p>
             )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
