'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Least count of the vernier caliper
const LEAST_COUNT = 0.05;

// Preset objects to measure
const PRESET_OBJECTS: Record<string, { name: string; size: number }> = {
  'sphere_small': { name: 'Small Marble', size: 12.35 },
  'sphere_large': { name: 'Large Bearing', size: 25.05 },
  'cylinder': { name: 'Cylinder', size: 30.80 },
  'block': { name: 'Small Block', size: 42.15 },
  'rod': { name: 'Thin Rod', size: 5.55 },
};
const objectKeys = Object.keys(PRESET_OBJECTS);

const CaliperSVG = ({ measurement, objectName }: { measurement: number; objectName: string; }) => {
    const scale = 12; // pixels per mm
    const mainScaleHeight = 40;
    const vernierScaleHeight = 35;
    const jawHeight = 50;
    const viewboxWidth = 1200;
    const viewboxHeight = mainScaleHeight + vernierScaleHeight + jawHeight;

    const mainScalePosition = measurement * scale;

    const mainTicks = [];
    for (let i = 0; i <= 95; i++) {
        const x = i * scale;
        let tickHeight = 6;
        if (i % 10 === 0) {
            tickHeight = 18;
            mainTicks.push(<text key={`label-${i}`} x={x - (i > 9 ? 6 : 3)} y={22} fontSize="12" fontWeight="bold" fill="currentColor">{i / 10}</text>);
        } else if (i % 5 === 0) {
            tickHeight = 12;
        }
        mainTicks.push(<line key={`tick-${i}`} x1={x} y1={mainScaleHeight - tickHeight} x2={x} y2={mainScaleHeight} stroke="currentColor" strokeWidth="1" />);
    }

    const vernierTicks = [];
    for (let i = 0; i <= 20; i++) {
        const x = i * 0.95 * scale;
        let tickHeight = 6;
        if (i % 5 === 0) {
            tickHeight = 12;
            if (i > 0 && i < 20) {
                vernierTicks.push(<text key={`vlabel-${i}`} x={mainScalePosition + x - 4} y={mainScaleHeight + vernierScaleHeight - 15} fontSize="10" fill="currentColor">{i}</text>);
            }
        }
        vernierTicks.push(<line key={`vtick-${i}`} x1={mainScalePosition + x} y1={mainScaleHeight} x2={mainScalePosition + x} y2={mainScaleHeight + tickHeight} stroke="currentColor" strokeWidth="1" />);
    }

    return (
        <svg viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`} className="w-full h-auto min-w-[800px]" preserveAspectRatio="xMidYMid meet">
            {/* Main Scale Body */}
            <rect x="0" y="0" width="1150" height={mainScaleHeight} fill="hsl(var(--muted))" />
            <path d={`M 0 ${mainScaleHeight} L 0 ${mainScaleHeight + jawHeight} L -10 ${mainScaleHeight + jawHeight} L -10 ${mainScaleHeight - 5} Z`} fill="hsl(var(--muted))" stroke="hsl(var(--border))" />

            {/* Main Scale Ticks */}
            {mainTicks}
            <text x="500" y="15" fontSize="12" fill="currentColor" textAnchor="middle">Main Scale (cm)</text>

            {/* Sliding Jaw + Vernier Scale */}
            <g>
                {/* Body */}
                <rect x={mainScalePosition} y={mainScaleHeight} width={19 * scale} height={vernierScaleHeight} fill="hsl(var(--muted))" />
                <path d={`M ${mainScalePosition} ${mainScaleHeight} L ${mainScalePosition} ${mainScaleHeight + jawHeight} L ${mainScalePosition + 10} ${mainScaleHeight + jawHeight} L ${mainScalePosition + 10} ${mainScaleHeight} Z`} fill="hsl(var(--muted))" stroke="hsl(var(--border))" />

                {/* Vernier Ticks */}
                {vernierTicks}
                <text x={mainScalePosition + (19 * scale / 2)} y={mainScaleHeight + vernierScaleHeight - 2} fontSize="10" fill="currentColor" textAnchor="middle">Least Count: 0.05 mm</text>
            </g>

            {/* Object */}
            <circle cx={mainScalePosition / 2} cy={mainScaleHeight + jawHeight / 2} r={mainScalePosition / 2} fill="hsl(var(--primary))" opacity="0.7" />
            <text x={mainScalePosition / 2} y={mainScaleHeight + jawHeight / 2 + 5} fontSize="12" fill="white" textAnchor="middle">{objectName}</text>
        </svg>
    );
};


export function VernierCaliperLab() {
    const [currentObjectKey, setCurrentObjectKey] = useState(objectKeys[0]);
    const [mainScaleInput, setMainScaleInput] = useState('');
    const [vernierDivisionInput, setVernierDivisionInput] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info'; message: string } | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const currentObject = PRESET_OBJECTS[currentObjectKey];
    const objectSize = currentObject.size;

    const { correctMainScale, correctVernierDivision, correctTotal } = useMemo(() => {
        if (objectSize === 0) return { correctMainScale: 0, correctVernierDivision: 0, correctTotal: '0.00' };
        const main = Math.floor(objectSize);
        const vernier = Math.round((objectSize - main) / LEAST_COUNT);
        return {
            correctMainScale: main,
            correctVernierDivision: vernier,
            correctTotal: objectSize.toFixed(2),
        };
    }, [objectSize]);
    
    const resetState = (newKey: string) => {
        setCurrentObjectKey(newKey);
        setMainScaleInput('');
        setVernierDivisionInput('');
        setFeedback(null);
        setIsSubmitted(false);
    }

    const generateNewChallenge = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * objectKeys.length);
        const randomKey = objectKeys[randomIndex];
        resetState(randomKey);
    }, []);
    
    useEffect(() => {
       resetState(objectKeys[0]);
    }, []);

    const handleCheck = () => {
        const mainInput = parseInt(mainScaleInput, 10);
        const vernierInput = parseInt(vernierDivisionInput, 10);

        if (isNaN(mainInput) || isNaN(vernierInput)) {
            setFeedback({ type: 'incorrect', message: 'Please enter a valid number for both fields.' });
            return;
        }

        const userInputTotal = mainInput + (vernierInput * LEAST_COUNT);
        if (Math.abs(userInputTotal - objectSize) < 0.01) {
            setFeedback({ type: 'correct', message: `Perfect! The reading is indeed ${correctTotal} mm.` });
        } else {
            setFeedback({ type: 'incorrect', message: `Not quite. The correct answer is ${correctTotal} mm (Main: ${correctMainScale}mm, Vernier: division ${correctVernierDivision}).` });
        }
        setIsSubmitted(true);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Virtual Lab: Reading a Vernier Caliper</CardTitle>
                    <CardDescription>An object is placed in the caliper. Determine its measurement by reading the main and vernier scales.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full bg-card p-4 rounded-lg border overflow-x-auto">
                        <CaliperSVG measurement={objectSize} objectName={currentObject.name} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Read</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                            <li><b>Read Main Scale:</b> Find the whole millimeter mark on the main scale just to the left of the vernier scale's '0'.</li>
                            <li><b>Find Matching Division:</b> Look for the one line on the vernier scale (0-20) that aligns perfectly with any line on the main scale.</li>
                            <li><b>Calculate Total:</b> The final reading is: <br />
                                <code className="font-code text-primary p-1 rounded bg-muted">Main Reading + (Matching Division × 0.05)</code></li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Enter Your Reading</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                             <Label htmlFor="object-select">Object to Measure</Label>
                             <Select onValueChange={(key) => resetState(key)} value={currentObjectKey}>
                                <SelectTrigger id="object-select">
                                    <SelectValue placeholder="Select an object..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(PRESET_OBJECTS).map(([key, obj]) => (
                                        <SelectItem key={key} value={key}>{obj.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="main-scale-input">Main Scale Reading (mm)</Label>
                            <Input id="main-scale-input" type="number" placeholder="e.g., 12" value={mainScaleInput} onChange={e => setMainScaleInput(e.target.value)} disabled={isSubmitted} />
                        </div>
                        <div>
                            <Label htmlFor="vernier-division-input">Matching Vernier Division (0-20)</Label>
                            <Input id="vernier-division-input" type="number" placeholder="e.g., 7" value={vernierDivisionInput} onChange={e => setVernierDivisionInput(e.target.value)} disabled={isSubmitted} />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button onClick={handleCheck} className="w-full" disabled={isSubmitted}>Check Answer</Button>
                            <Button onClick={generateNewChallenge} variant="secondary" className="w-full"><RefreshCw className="mr-2 h-4 w-4" />Random Object</Button>
                        </div>
                        {isSubmitted && feedback && (
                            <Alert className={feedback.type === 'correct' ? 'border-green-500' : 'border-destructive'}>
                                {feedback.type === 'correct' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-destructive" />}
                                <AlertTitle className={feedback.type === 'correct' ? 'text-green-600' : 'text-destructive'}>
                                    {feedback.type === 'correct' ? 'Correct!' : 'Review Needed'}
                                </AlertTitle>
                                <AlertDescription>
                                    {feedback.message}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
