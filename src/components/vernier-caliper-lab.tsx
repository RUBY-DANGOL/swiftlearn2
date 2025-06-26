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
const LEAST_COUNT = 0.02;

// Preset objects to measure
const PRESET_OBJECTS: Record<string, { name: string; size: number }> = {
  'sphere_small': { name: 'Small Marble', size: 12.36 },
  'sphere_large': { name: 'Large Bearing', size: 25.04 },
  'cylinder': { name: 'Cylinder', size: 30.88 },
  'block': { name: 'Small Block', size: 42.16 },
  'rod': { name: 'Thin Rod', size: 5.54 },
};
const objectKeys = Object.keys(PRESET_OBJECTS);

const CaliperSVG = ({ measurement }: { measurement: number }) => {
    const scale = 10; // pixels per mm
    const mainScaleHeight = 50;
    const vernierScaleHeight = 35;
    const viewboxWidth = 1200;
    const viewboxHeight = mainScaleHeight + vernierScaleHeight + 50;
    const sliderOffset = measurement * scale;

    const mainTicks = [];
    for (let i = 0; i <= 100; i++) {
        const x = i * scale;
        let tickHeight = 7;
        if (i % 10 === 0) {
            tickHeight = 15;
            mainTicks.push(<text key={`label-${i}`} x={x} y={mainScaleHeight - tickHeight - 4} fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">{i}</text>);
        } else if (i % 5 === 0) {
            tickHeight = 11;
        }
        mainTicks.push(<line key={`tick-${i}`} x1={x} y1={mainScaleHeight - tickHeight} x2={x} y2={mainScaleHeight} stroke="currentColor" strokeWidth="1" />);
    }

    const vernierTicks = [];
    // 50 divisions on vernier scale, spanning 49mm on main scale. 1 VSD = 0.98mm.
    for (let i = 0; i <= 50; i++) {
        const x = i * 0.98 * scale;
        let tickHeight = 7;
        if (i % 5 === 0) {
            tickHeight = 12;
            vernierTicks.push(<text key={`vlabel-${i}`} x={x} y={mainScaleHeight + tickHeight + 14} fontSize="12" fontWeight="bold" fill="currentColor" textAnchor="middle">{i / 5}</text>);
        }
        vernierTicks.push(<line key={`vtick-${i}`} x1={x} y1={mainScaleHeight} x2={x} y2={mainScaleHeight + tickHeight} stroke="currentColor" strokeWidth="1" />);
    }

    return (
        <svg viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`} className="w-full h-auto min-w-[800px]" preserveAspectRatio="xMidYMid meet">
            {/* Main Scale */}
            <g>
                <path d={`M-30 ${mainScaleHeight+40} L -30 0 L 1050 0 L 1050 ${mainScaleHeight} L 0 ${mainScaleHeight} L 0 ${mainScaleHeight+40} Z`} fill="none" stroke="currentColor" strokeWidth="1.5" />
                {mainTicks}
            </g>

            {/* Sliding Jaw + Vernier Scale */}
            <g transform={`translate(${sliderOffset}, 0)`}>
                <path d={`M-20 ${mainScaleHeight+40} L-20 ${mainScaleHeight-10} L0 ${mainScaleHeight-10} L0 0 L500 0 L500 ${vernierScaleHeight} L30 ${vernierScaleHeight} L30 ${mainScaleHeight+80} L-20 ${mainScaleHeight+80} Z`} fill="none" stroke="currentColor" strokeWidth="1.5" />
                {vernierTicks}
                <text x={49 * scale / 2} y={mainScaleHeight + vernierScaleHeight + 5} fontSize="10" fill="currentColor" textAnchor="middle">.02 mm</text>
                 {/* Arrow */}
                <path d="M 0 -15 L -5 -25 L 5 -25 Z" fill="currentColor" />
                <line x1="0" y1="-15" x2="0" y2="-5" stroke="currentColor" strokeWidth="2" />
            </g>
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
        const otherKeys = objectKeys.filter(k => k !== currentObjectKey);
        const randomKey = otherKeys[Math.floor(Math.random() * otherKeys.length)];
        resetState(randomKey);
    }, [currentObjectKey]);
    
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
                    <CardDescription>An object's measurement is shown on the caliper. Determine the reading by inspecting the main and vernier scales.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full bg-blue-900 text-white p-4 rounded-lg border overflow-x-auto">
                        <CaliperSVG measurement={objectSize} />
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
                            <li><b>Find Matching Division:</b> Look for the one line on the vernier scale (0-50) that aligns perfectly with any line on the main scale.</li>
                            <li><b>Calculate Total:</b> The final reading is: <br />
                                <code className="font-code text-primary p-1 rounded bg-muted">Main Reading + (Matching Division × 0.02)</code></li>
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
                            <Label htmlFor="vernier-division-input">Matching Vernier Division (0-50)</Label>
                            <Input id="vernier-division-input" type="number" placeholder="e.g., 18" value={vernierDivisionInput} onChange={e => setVernierDivisionInput(e.target.value)} disabled={isSubmitted} />
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
