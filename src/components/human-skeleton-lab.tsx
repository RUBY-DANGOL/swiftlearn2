'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, MousePointerClick, MoveHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const muscles = [
  { id: 'deltoid', name: 'Deltoid', top: '25%', left: '36%' },
  { id: 'pectoralis', name: 'Pectoralis Major', top: '30%', left: '45%' },
  { id: 'biceps', name: 'Biceps Brachii', top: '35%', left: '55%' },
  { id: 'abs', name: 'Rectus Abdominis', top: '45%', left: '50%' },
  { id: 'quadriceps', name: 'Quadriceps Femoris', top: '60%', left: '44%' },
  { id: 'tibialis', name: 'Tibialis Anterior', top: '80%', left: '42%' },
];

export function InteractiveMuscleAnatomy() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="w-6 h-6" />
          Interactive Muscle Anatomy
        </CardTitle>
        <CardDescription>
          Drag the model to rotate it and click on the markers to identify different muscles.
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
                alt="Human Muscle Anatomy"
                data-ai-hint="muscle anatomy"
                layout="fill"
                objectFit="contain"
                className="pointer-events-none"
              />
              {muscles.map((muscle) => (
                <motion.button
                  key={muscle.id}
                  className="absolute w-4 h-4 rounded-full bg-primary/50 border-2 border-primary-foreground shadow-lg"
                  style={{ top: muscle.top, left: muscle.left }}
                  onHoverStart={() => setSelectedMuscle(muscle.name)}
                  onHoverEnd={() => setSelectedMuscle(null)}
                  onClick={() => setSelectedMuscle(muscle.name)}
                  whileHover={{ scale: 2.5, zIndex: 10 }}
                  whileTap={{ scale: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              ))}
            </motion.div>
          </div>
          
          <div className="w-full max-w-lg h-16 flex items-center justify-center">
            <AnimatePresence>
              {selectedMuscle && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Badge variant="secondary" className="text-lg font-semibold px-4 py-2">
                    {selectedMuscle}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
             {!selectedMuscle && (
                <p className="text-muted-foreground">Hover over or click a marker to see the muscle name.</p>
             )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
