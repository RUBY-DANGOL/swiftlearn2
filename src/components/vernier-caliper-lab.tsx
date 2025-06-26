'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, RefreshCw, Lightbulb } from 'lucide-react';
import { Label } from '@/components/ui/label';

// Least count of the vernier caliper
const LEAST_COUNT = 0.05;

// Function to generate a random measurement
const generateMeasurement = () => {
    // Generates a value between 10.00 and 80.00 mm
    const wholePart = Math.floor(Math.random() * 71) + 10; // 10 to 80
    const decimalPart = Math.floor(Math.random() * 20) * LEAST_COUNT; // 0.00, 0.05, ..., 0.95
    return parseFloat((wholePart + decimalPart).toFixed(2));
};

const CaliperSVG = ({ measurement }: { measurement: number }) => {
    const scale = 10; // pixels per mm
    const mainScaleHeight = 30;
    const vernierScaleHeight = 25;
    const jawHeight = 40;
    const viewboxWidth = 500;
    const viewboxHeight = mainScaleHeight + vernierScaleHeight + jawHeight;

    const mainScalePosition = measurement * scale;

    const mainTicks = [];
    for (let i = 0; i <= 45; i++) {
        const x = i * scale;
        let tickHeight = 5;
        if (i % 10 === 0) {
            tickHeight = 15;
            mainTicks.push(<text key={`label-${i}`} x={x - (i > 0 ? 3 : 0)} y={20} fontSize="10" fill="currentColor">{i/10}</text>);
        } else if (i % 5 === 0) {
            tickHeight = 10;
        }
        mainTicks.push(<line key={`tick-${i}`} x1={x} y1={mainScaleHeight - tickHeight} x2={x} y2={mainScaleHeight} stroke="currentColor" strokeWidth="1" />);
    }

    const vernierTicks = [];
    for (let i = 0; i <= 20; i++) {
        const x = i * 0.95 * scale; // 20 divisions spanning 19mm on main scale
        let tickHeight = 5;
        if (i % 5 === 0) {
            tickHeight = 10;
            if (i > 0 && i < 20) {
                 vernierTicks.push(<text key={`vlabel-${i}`} x={mainScalePosition + x - 3} y={mainScaleHeight + vernierScaleHeight - 12} fontSize="8" fill="currentColor">{i}</text>);
            }
        }
        vernierTicks.push(<line key={`vtick-${i}`} x1={mainScalePosition + x} y1={mainScaleHeight} x2={mainScalePosition + x} y2={mainScaleHeight + tickHeight} stroke="currentColor" strokeWidth="1" />);
    }

    return (
        <svg viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Main Scale Body */}
            <rect x="0" y="0" width="450" height={mainScaleHeight} fill="hsl(var(--muted))" />
            <path d={`M 0 ${mainScaleHeight} L 0 ${mainScaleHeight+jawHeight} L -10 ${mainScaleHeight+jawHeight} L -10 ${mainScaleHeight-5} Z`} fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            
            {/* Main Scale Ticks */}
            {mainTicks}
            <text x="220" y="12" fontSize="10" fill="currentColor" textAnchor="middle">cm</text>


            {/* Sliding Jaw + Vernier Scale */}
            <g>
                {/* Body */}
                <rect x={mainScalePosition} y={mainScaleHeight} width={19 * scale} height={vernierScaleHeight} fill="hsl(var(--muted))" />
                <path d={`M ${mainScalePosition} ${mainScaleHeight} L ${mainScalePosition} ${mainScaleHeight+jawHeight} L ${mainScalePosition+10} ${mainScaleHeight+jawHeight} L ${mainScalePosition+10} ${mainScaleHeight} Z`} fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
                
                {/* Vernier Ticks */}
                {vernierTicks}
                 <text x={mainScalePosition + (19*scale/2)} y={mainScaleHeight + vernierScaleHeight-2} fontSize="8" fill="currentColor" textAnchor="middle">0.05 mm</text>
            </g>

            {/* Object */}
            <rect x={-10} y={mainScaleHeight} width={10 + mainScalePosition} height={jawHeight/2} fill="hsl(var(--primary))" opacity="0.7" />
            <text x={mainScalePosition / 2 - 5} y={mainScaleHeight + jawHeight / 2 + 5} fontSize="10" fill="white" textAnchor="middle">Object</text>
        </svg>
    );
};


export function VernierCaliperLab() {
    const [objectSize, setObjectSize] = useState(0);
    const [mainScaleInput, setMainScaleInput] = useState('');
    const [vernierDivisionInput, setVernierDivisionInput] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info'; message: string } | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const generateNewChallenge = useCallback(() => {
        setObjectSize(generateMeasurement());
        setMainScaleInput('');
        setVernierDivisionInput('');
        setFeedback(null);
        setIsSubmitted(false);
    }, []);

    useEffect(() => {
        generateNewChallenge();
    }, [generateNewChallenge]);

    const handleCheck = () => {
        const mainInput = parseInt(mainScaleInput, 10);
        const vernierInput = parseInt(vernierDivisionInput, 10);
        
        if (isNaN(mainInput) || isNaN(vernierInput)) {
            setFeedback({type: 'incorrect', message: 'Please enter a valid number for both fields.'});
            return;
        }

        const userInputTotal = mainInput + (vernierInput * LEAST_COUNT);
        if (Math.abs(userInputTotal - objectSize) < 0.01) {
            setFeedback({type: 'correct', message: `Perfect! The reading is indeed ${correctTotal} mm.`});
        } else {
             setFeedback({type: 'incorrect', message: `Not quite. The correct answer is ${correctTotal} mm (Main: ${correctMainScale}mm, Vernier: division ${correctVernierDivision}). Try the next challenge!`});
        }
        setIsSubmitted(true);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Virtual Lab: Reading a Vernier Caliper</CardTitle>
                    <CardDescription>An object is placed in the caliper. Determine its measurement.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full bg-card p-4 rounded-lg border overflow-x-auto">
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
                            <li><b>Find Matching Division:</b> Look for the one line on the vernier scale (0-20) that aligns perfectly with any line on the main scale.</li>
                            <li><b>Calculate Total:</b> The final reading is: <br/>
                            <code className="font-code text-primary p-1 rounded bg-muted">Main Reading + (Division × 0.05)</code></li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Enter Your Reading</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                             <Button onClick={generateNewChallenge} variant="secondary" className="w-full"><RefreshCw className="mr-2 h-4 w-4"/>Next Challenge</Button>
                        </div>
                         {isSubmitted && feedback && (
                            <Alert className={feedback.type === 'correct' ? 'border-green-500' : 'border-destructive'}>
                                {feedback.type === 'correct' ? <CheckCircle className="h-4 w-4 text-green-500"/> : <XCircle className="h-4 w-4 text-destructive"/>}
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
