'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FlaskConical, Beaker, ChevronsRight, AlertTriangle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
}

const chemicals: Chemical[] = [
  { id: 'h2o2', name: 'Hydrogen Peroxide', formula: 'H₂O₂', color: 'bg-blue-100' },
  { id: 'ki', name: 'Potassium Iodide', formula: 'KI', color: 'bg-gray-200' },
  { id: 'soap', name: 'Dish Soap', formula: 'Soap', color: 'bg-green-200' },
  { id: 'naocl', name: 'Bleach', formula: 'NaOCl', color: 'bg-yellow-200' },
  { id: 'nh3', name: 'Ammonia', formula: 'NH₃', color: 'bg-purple-200' },
  { id: 'cuso4', name: 'Copper Sulfate', formula: 'CuSO₄', color: 'bg-sky-300' },
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', color: 'bg-indigo-200' },
  { id: 'vinegar', name: 'Vinegar', formula: 'CH₃COOH', color: 'bg-orange-100' },
];

const reactionMap: Record<string, { name: string; description: string; type: 'safe' | 'danger' }> = {
  'h2o2_ki_soap': { name: 'Elephant Toothpaste', description: 'A rapid eruption of thick, warm foam is produced as hydrogen peroxide decomposes.', type: 'safe' },
  'cuso4_naoh': { name: 'Royal Blue Precipitate', description: 'A beautiful, deep blue solid, Copper(II) Hydroxide, forms and settles.', type: 'safe' },
  'naocl_nh3': { name: 'EXPLOSION!', description: 'Mixing bleach and ammonia produces toxic chloramine gas! This is a dangerous combination.', type: 'danger' },
  'naocl_vinegar': { name: 'DANGER!', description: 'Mixing bleach and acid produces toxic chlorine gas!', type: 'danger' },
};

const getReaction = (ids: string[]) => {
  const key = ids.sort().join('_');
  const reverseKey = ids.reverse().join('_');
  return reactionMap[key] || reactionMap[reverseKey];
};


export function ChemistryLab() {
  const [selectedChemicals, setSelectedChemicals] = useState<Chemical[]>([]);
  const [reactionResult, setReactionResult] = useState<{ name: string; description: string } | null>(null);
  const [isExploding, setIsExploding] = useState(false);

  const handleSelectChemical = (chemical: Chemical) => {
    if (selectedChemicals.length < 2 && !selectedChemicals.find(c => c.id === chemical.id)) {
      setSelectedChemicals([...selectedChemicals, chemical]);
      setReactionResult(null);
    }
  };
  
  const handleMix = () => {
    if (selectedChemicals.length < 2) return;
    
    // Add soap for the Elephant Toothpaste reaction automatically if the right chemicals are present
    const ids = selectedChemicals.map(c => c.id);
    if ((ids.includes('h2o2') && ids.includes('ki'))) {
        ids.push('soap');
    }

    const reaction = getReaction(ids);

    if (reaction) {
      if (reaction.type === 'danger') {
        setIsExploding(true);
        setReactionResult({ name: reaction.name, description: reaction.description });
        setTimeout(() => {
          setIsExploding(false);
          setSelectedChemicals([]);
          setReactionResult(null);
        }, 2000);
      } else {
        setReactionResult({ name: reaction.name, description: reaction.description });
      }
    } else {
      setReactionResult({ name: 'No Reaction', description: 'These chemicals do not produce a significant reaction when mixed.' });
    }
  };
  
  const handleClear = () => {
    setSelectedChemicals([]);
    setReactionResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="w-6 h-6" />
            Virtual Chemistry Lab
          </CardTitle>
          <CardDescription>Select up to two chemicals from the shelf, add them to the workbench, and see the reaction!</CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Chemical Shelf</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {chemicals.map((chem) => (
            <Button
              key={chem.id}
              variant="outline"
              className={cn("h-24 flex flex-col justify-center items-center gap-1", selectedChemicals.find(c => c.id === chem.id) && "ring-2 ring-primary")}
              onClick={() => handleSelectChemical(chem)}
              disabled={selectedChemicals.length >= 2 || !!selectedChemicals.find(c => c.id === chem.id)}
            >
              <FlaskConical size={32} className="text-primary"/>
              <span className="font-bold">{chem.formula}</span>
              <span className="text-xs text-muted-foreground">{chem.name}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Workbench</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Slot 1 */}
                <div className={cn("w-48 h-32 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground", selectedChemicals[0] && selectedChemicals[0].color)}>
                    {selectedChemicals[0] ? (
                        <div className="text-center font-semibold text-card-foreground">
                            <p className="text-2xl">{selectedChemicals[0].formula}</p>
                            <p className="text-sm">{selectedChemicals[0].name}</p>
                        </div>
                    ) : "Slot 1"}
                </div>
                
                <ChevronsRight className="text-muted-foreground h-8 w-8 hidden md:block" />

                {/* Slot 2 */}
                <div className={cn("w-48 h-32 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground", selectedChemicals[1] && selectedChemicals[1].color)}>
                    {selectedChemicals[1] ? (
                        <div className="text-center font-semibold text-card-foreground">
                            <p className="text-2xl">{selectedChemicals[1].formula}</p>
                            <p className="text-sm">{selectedChemicals[1].name}</p>
                        </div>
                    ) : "Slot 2"}
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Button onClick={handleMix} disabled={selectedChemicals.length < 2 || isExploding}>
                    Mix Chemicals
                </Button>
                <Button onClick={handleClear} variant="outline" disabled={isExploding}>
                    Clear Workbench
                </Button>
            </CardContent>
        </Card>
      </div>
      
      <Card className="min-h-[200px] flex items-center justify-center relative overflow-hidden">
        <AnimatePresence>
          {isExploding && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 bg-red-500 flex flex-col items-center justify-center z-10"
            >
              <motion.div
                initial={{ y: 20, opacity: 0}}
                animate={{ y: 0, opacity: 1}}
                transition={{ delay: 0.1 }}
              >
                  <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">BOOM!</h2>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <CardContent className="text-center p-6">
            {!reactionResult && <p className="text-muted-foreground">Select two chemicals and click "Mix" to see the result.</p>}
            {reactionResult && (
                <div className="max-w-md mx-auto">
                    {reactionResult.name.includes("!") ? (
                        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    ) : (
                        <Beaker className="h-12 w-12 text-primary mx-auto mb-4" />
                    )}
                    <h3 className="text-xl font-bold">{reactionResult.name}</h3>
                    <p className="text-muted-foreground">{reactionResult.description}</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
