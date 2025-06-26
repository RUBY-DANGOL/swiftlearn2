'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

// Constants
const GRAVITY = 9.81; // m/s^2

const SpringSVG = ({ extension, kValue }: { extension: number; kValue: number }) => {
    // Visual properties
    const top = 20;
    const initialCoilHeight = 10;
    const numCoils = 12;
    const coilWidth = 50;

    // The spring gets visually 'stiffer' (thicker wire) as k increases
    const strokeWidth = 1.5 + (kValue - 10) / 90 * 2; // from 1.5 to 3.5

    // Total stretched height of the coiled section
    const stretchedHeight = initialCoilHeight + extension * 1000; // scale extension for visual effect (pixels per meter)

    let path = `M 50 ${top}`;
    for (let i = 0; i < numCoils; i++) {
        const y = top + (i + 0.5) * (stretchedHeight / numCoils);
        const x = 50 + (i % 2 === 0 ? -1 : 1) * (coilWidth / 2);
        path += ` L ${x} ${y}`;
    }
    path += ` L 50 ${top + stretchedHeight}`;

    return (
        <svg viewBox="0 0 100 400" className="w-24 h-96 mx-auto">
            {/* Top attachment */}
            <rect x="30" y="0" width="40" height="20" fill="#a0a0a0" />
            <path d={path} stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
        </svg>
    );
};

const RulerSVG = () => {
    const ticks = [];
    for (let i = 0; i <= 30; i++) {
        const y = 50 + i * 10;
        let tickWidth = 10;
        let label;
        if (i % 5 === 0) {
            tickWidth = 20;
            label = <text x="25" y={y + 4} fontSize="10" textAnchor="end">{i * 10}</text>;
        }
        ticks.push(<line key={`tick-${i}`} x1="0" y1={y} x2={tickWidth} y2={y} stroke="currentColor" strokeWidth="1" />);
        if (label) {
            ticks.push(label);
        }
    }
    return (
        <svg viewBox="0 0 50 400" className="h-96">
            <text x="35" y="30" fontSize="12" transform="rotate(90, 35, 30)">mm</text>
            {ticks}
        </svg>
    );
};

interface Measurement {
    id: number;
    mass: number;
    force: number;
    extension: number;
}

export function HookesLawLab() {
    const [mass, setMass] = useState(100); // in grams
    const [springConstant, setSpringConstant] = useState(50); // in N/m
    const [data, setData] = useState<Measurement[]>([]);

    const extension = useMemo(() => {
        if (springConstant === 0) return 0;
        const force = (mass / 1000) * GRAVITY; // mass in kg
        return force / springConstant; // extension in meters
    }, [mass, springConstant]);

    const addMeasurement = useCallback(() => {
        const force = (mass / 1000) * GRAVITY;
        const newMeasurement: Measurement = {
            id: Date.now(),
            mass: mass / 1000, // kg
            force: Number(force.toFixed(3)),
            extension: Number(extension.toFixed(4)), // meters
        };
        setData(prevData => [...prevData, newMeasurement].sort((a, b) => a.mass - b.mass));
    }, [mass, extension]);

    const removeMeasurement = (id: number) => {
        setData(prevData => prevData.filter(d => d.id !== id));
    };
    
    const clearData = () => {
        setData([]);
    };
    
    const calculatedSlope = useMemo(() => {
        if (data.length < 2) return null;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        data.forEach(p => {
            sumX += p.extension;
            sumY += p.force;
            sumXY += p.extension * p.force;
            sumX2 += p.extension * p.extension;
        });
        const n = data.length;
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        return isNaN(slope) ? null : slope;
    }, [data]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Virtual Lab: Hooke's Law</CardTitle>
                    <CardDescription>Investigate the relationship between force and extension for a spring. Adjust the mass and spring constant, record your data, and analyze the results.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Controls */}
                        <div className="space-y-6">
                             <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Controls</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label htmlFor="mass-slider" className="block text-sm font-medium">Mass ({mass} g)</label>
                                        <Slider id="mass-slider" value={[mass]} onValueChange={(val) => setMass(val[0])} min={0} max={300} step={10} />
                                    </div>
                                    <div>
                                        <label htmlFor="k-slider" className="block text-sm font-medium">Spring Constant ({springConstant.toFixed(0)} N/m)</label>
                                        <Slider id="k-slider" value={[springConstant]} onValueChange={(val) => setSpringConstant(val[0])} min={10} max={100} step={1} />
                                    </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Readings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">Applied Force: <span className="font-mono text-primary">{((mass / 1000) * GRAVITY).toFixed(2)} N</span></p>
                                    <p className="text-sm">Spring Extension: <span className="font-mono text-primary">{(extension * 100).toFixed(2)} cm</span></p>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Simulation */}
                        <div className="lg:col-span-2 bg-muted/50 rounded-lg p-4 flex justify-center items-start">
                            <div className="relative w-48 h-[500px]">
                                 <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                    <SpringSVG extension={extension} kValue={springConstant} />
                                    <div style={{ transform: `translateY(${20 + (10 + extension * 1000)}px)` }} className="transition-transform duration-300 ease-out">
                                        <div className="w-16 h-10 bg-destructive rounded-md mx-auto flex items-center justify-center text-destructive-foreground font-bold text-sm">
                                            {mass}g
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 left-0">
                                    <RulerSVG />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Data Table</CardTitle>
                            <Button onClick={addMeasurement} size="sm"><Plus className="mr-2 h-4 w-4" /> Record Data</Button>
                        </div>
                        <CardDescription>Record measurements to plot on the graph.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="max-h-60 overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mass (kg)</TableHead>
                                        <TableHead>Force (N)</TableHead>
                                        <TableHead>Extension (m)</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.length > 0 ? data.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.mass.toFixed(3)}</TableCell>
                                            <TableCell>{row.force.toFixed(3)}</TableCell>
                                            <TableCell>{row.extension.toFixed(4)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => removeMeasurement(row.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground">No data recorded yet.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                         </div>
                         {data.length > 0 && <Button variant="outline" size="sm" className="mt-4" onClick={clearData}>Clear All Data</Button>}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Analysis: Force vs. Extension</CardTitle>
                        <CardDescription>The slope of this graph represents the spring constant, k.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="extension" name="Extension (m)" label={{ value: 'Extension (m)', position: 'insideBottom', offset: -5 }} domain={['dataMin', 'dataMax']} />
                                    <YAxis type="number" dataKey="force" name="Force (N)" label={{ value: 'Force (N)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip formatter={(value: number) => value.toFixed(3)} />
                                    <Legend />
                                    <Line type="monotone" dataKey="force" stroke="#8884d8" name="Experimental Data" dot={true} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        {calculatedSlope !== null && (
                             <Alert className="mt-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Analysis Results</AlertTitle>
                                <AlertDescription>
                                   <p>Actual Spring Constant (k): <span className="font-semibold">{springConstant.toFixed(1)} N/m</span></p>
                                   <p>Your Calculated Slope: <span className="font-semibold">{calculatedSlope.toFixed(1)} N/m</span></p>
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
