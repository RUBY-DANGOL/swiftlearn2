'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Pause, RotateCcw, Plus, Trash2, Ruler } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Input } from './ui/input';
import { Label } from './ui/label';

const GRAVITY = 9.80665; // m/s^2, using a fixed standard value for the simulation's physics

const PendulumSVG = ({ length, isSwinging }: { length: number; isSwinging: boolean }) => {
    const period = 2 * Math.PI * Math.sqrt(length / GRAVITY);
    const pivotY = 50;
    const stringLength = length * 300; // scale factor for display
    const bobRadius = 15;

    const animationStyle: React.CSSProperties = isSwinging ? {
        animationName: 'swing',
        animationDuration: `${period}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        transformOrigin: '50% 0',
    } : {};
    
    const keyframes = `
        @keyframes swing {
            0% { transform: rotate(-7deg); }
            50% { transform: rotate(7deg); }
            100% { transform: rotate(-7deg); }
        }
    `;

    return (
        <div className="relative w-full h-[450px] flex justify-center items-start bg-muted/30 rounded-lg overflow-hidden border">
            <style>{keyframes}</style>
            <svg viewBox="0 0 400 450" className="absolute w-full h-full">
                {/* Base */}
                <rect x="100" y="430" width="200" height="20" fill="#a0a0a0" />
                {/* Vertical Rod */}
                <rect x="195" y="50" width="10" height="380" fill="#c0c0c0" />
                {/* Horizontal Rod */}
                <rect x="205" y="50" width="120" height="10" fill="#c0c0c0" />
                {/* Wooden Blocks */}
                <rect x="250" y="30" width="40" height="40" fill="#D2B48C" stroke="black" strokeWidth="1" />
                 {/* Pivot Point */}
                <circle cx="270" cy={pivotY} r="3" fill="black" />
            </svg>
            
            {/* Pendulum */}
            <div style={{...animationStyle, position: 'absolute', top: `${pivotY}px`, left: 'calc(50% + 20px)'}}>
                <svg viewBox="0 -10 20 420" width="20" height={stringLength + bobRadius * 2} className="overflow-visible">
                    <line x1="10" y1="0" x2="10" y2={stringLength} stroke="black" strokeWidth="1" />
                    <circle cx="10" cy={stringLength + bobRadius} r={bobRadius} fill="royalblue" />
                </svg>
            </div>
        </div>
    );
};

interface Measurement {
    id: number;
    length: number;
    time: number;
    period: number;
    periodSq: number;
    g: number;
}

export function SimplePendulumLab() {
    const [length, setLength] = useState(1.0); // meters
    const [isSwinging, setIsSwinging] = useState(false);
    
    // Stopwatch state
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Data state
    const [data, setData] = useState<Measurement[]>([]);
    const [oscillations, setOscillations] = useState(20);

    // Stopwatch controls
    const handleStartStop = () => {
        if (isRunning) {
            clearInterval(timerRef.current!);
        } else {
            const startTime = Date.now() - time;
            timerRef.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        }
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        clearInterval(timerRef.current!);
        setIsRunning(false);
        setTime(0);
    };

    const recordData = useCallback(() => {
        if (time === 0 || oscillations <= 0) return;
        const period = time / 1000 / oscillations;
        const g = (4 * Math.PI ** 2 * length) / period ** 2;

        const newMeasurement: Measurement = {
            id: Date.now(),
            length,
            time: time / 1000,
            period: Number(period.toFixed(3)),
            periodSq: Number((period ** 2).toFixed(3)),
            g: Number(g.toFixed(2)),
        };
        setData(prev => [...prev, newMeasurement].sort((a,b) => a.length - b.length));
        handleReset();
    }, [time, oscillations, length]);
    
    const removeMeasurement = (id: number) => {
        setData(prevData => prevData.filter(d => d.id !== id));
    };

    const calculatedSlope = useMemo(() => {
        if (data.length < 2) return null;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        data.forEach(p => {
            sumX += p.length;
            sumY += p.periodSq;
            sumXY += p.length * p.periodSq;
            sumX2 += p.length * p.length;
        });
        const n = data.length;
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        return isNaN(slope) ? null : slope;
    }, [data]);
    
    const gFromGraph = calculatedSlope ? (4 * Math.PI ** 2) / calculatedSlope : null;

    useEffect(() => {
        return () => clearInterval(timerRef.current!); // Cleanup on unmount
    }, []);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Virtual Lab: The Simple Pendulum</CardTitle>
                    <CardDescription>Measure the period of a simple pendulum to determine the acceleration due to gravity, g.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Controls */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader className="pb-2"><CardTitle className="text-base">Pendulum Controls</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label htmlFor="length-slider" className="block text-sm font-medium">Length (L): {length.toFixed(2)} m</label>
                                        <Slider id="length-slider" value={[length]} onValueChange={([val]) => setLength(val)} min={0.3} max={1.0} step={0.05} disabled={isSwinging} />
                                    </div>
                                    <Button onClick={() => setIsSwinging(s => !s)} className="w-full">
                                        {isSwinging ? <><Pause className="mr-2 h-4 w-4" /> Stop Swing</> : <><Play className="mr-2 h-4 w-4" /> Start Swing</>}
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                 <CardHeader className="pb-2"><CardTitle className="text-base">Stopwatch</CardTitle></CardHeader>
                                 <CardContent className="space-y-4">
                                    <div className="text-center font-mono text-4xl bg-background border p-2 rounded-lg">
                                        {`${Math.floor(time / 1000 / 60).toString().padStart(2, '0')}:${Math.floor(time / 1000 % 60).toString().padStart(2, '0')}:${(time % 1000 / 10).toFixed(0).padStart(2, '0')}`}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button onClick={handleStartStop} disabled={!isSwinging}>{isRunning ? 'Pause' : 'Start'}</Button>
                                        <Button onClick={handleReset} variant="outline">Reset</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Simulation */}
                        <div className="lg:col-span-2">
                            <PendulumSVG length={length} isSwinging={isSwinging} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Data Recording</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                             <Label htmlFor="oscillations-input">Time for how many oscillations?</Label>
                             <Input id="oscillations-input" type="number" value={oscillations} onChange={(e) => setOscillations(Math.max(1, parseInt(e.target.value) || 1))} />
                        </div>
                        <Button onClick={recordData} disabled={time === 0}><Plus className="mr-2 h-4 w-4"/> Record Measurement</Button>
                        <div className="max-h-60 overflow-y-auto mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>L (m)</TableHead>
                                        <TableHead>T (s)</TableHead>
                                        <TableHead>T² (s²)</TableHead>
                                        <TableHead>g (m/s²)</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.length > 0 ? data.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.length.toFixed(2)}</TableCell>
                                            <TableCell>{row.period.toFixed(3)}</TableCell>
                                            <TableCell>{row.periodSq.toFixed(3)}</TableCell>
                                            <TableCell>{row.g.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => removeMeasurement(row.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No data recorded.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Analysis: T² vs. L Graph</CardTitle>
                        <CardDescription>According to theory, g = 4π²/slope. </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="length" name="Length (m)" label={{ value: 'L (m)', position: 'insideBottom' }} domain={[0, 'dataMax']} />
                                    <YAxis type="number" dataKey="periodSq" name="Period Squared (s²)" label={{ value: 'T² (s²)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip formatter={(value: number) => value.toFixed(3)} />
                                    <Legend />
                                    <Line type="monotone" dataKey="periodSq" stroke="#8884d8" name="Data" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        {gFromGraph !== null && (
                             <Alert className="mt-4">
                                <Ruler className="h-4 w-4" />
                                <AlertTitle>Graphical Result</AlertTitle>
                                <AlertDescription>
                                   <p>The slope of your graph is {calculatedSlope?.toFixed(3)} s²/m.</p>
                                   <p>This gives a value for g of <span className="font-semibold">{gFromGraph.toFixed(2)} m/s²</span>.</p>
                                   <p className="text-xs text-muted-foreground mt-1">Accepted value is ≈9.81 m/s².</p>
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
