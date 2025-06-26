export const physicalQuantitiesNotes = `
# Chapter: Physical Quantities and Measurement

## 1. Introduction
In physics, we describe the world using physical quantities—properties of objects or phenomena that can be measured and expressed numerically. From the length of a pencil to the electric current in a wire, every measurable attribute is a physical quantity. A clear understanding of what physical quantities are, how they’re classified, and how we measure them is fundamental to all of physics.

## 2. Definition of a Physical Quantity
A physical quantity is a property of a physical system that can be quantified by measurement and expressed as a number multiplied by a unit. It has two parts:

- **Numerical value** (how many?)
- **Unit** (of what?)

**Example:** The mass of a book might be 0.5 kg, where 0.5 is the numerical value and kilogram (kg) is the unit.

## 3. Classification of Physical Quantities
### 3.1 Fundamental (Base) Quantities
These are quantities chosen by convention, independent of other quantities. In the International System of Units (SI), there are seven:

| Quantity | Symbol | SI Unit | Unit Symbol |
|---|---|---|---|
| Length | l | meter | m |
| Mass | m | kilogram | kg |
| Time | t | second | s |
| Electric current | I | ampere | A |
| Thermodynamic temperature | T | kelvin | K |
| Amount of substance | n | mole | mol |
| Luminous intensity | Iᵥ | candela | cd |

### 3.2 Derived Quantities
Derived quantities are defined in terms of base quantities through mathematical relations. For example:

- **Velocity** (v = length/time = l/t) has units m/s
- **Force** (F = ma, mass × acceleration) has units kg·m/s² = newton (N)

## 4. Units of Measurement
### 4.1 SI Units
The SI system ensures consistency worldwide. Every base unit has a precise definition (e.g., the metre is defined by the distance light travels in 1/299,792,458 of a second).

### 4.2 Other Systems
- **CGS System** (centimetre–gram–second): uses cm, g, s
- **Imperial System**: uses feet, pounds, seconds, etc.
Today, science and most engineering use SI exclusively.

## 5. Standards and Calibration
Accurate measurement requires standard references:

- Prototype meter bar (historical) → now light-based definition
- International Prototype Kilogram (IPK) → redefined in terms of Planck’s constant
- Atomic clocks for precise time

Laboratories use calibration to ensure instruments measure correctly against these standards.

## 6. Measurement: Precision, Accuracy, and Errors
### 6.1 Accuracy vs. Precision
- **Accuracy:** How close a measurement is to the true value.
- **Precision:** How repeatable measurements are (closeness of repeated readings).

### 6.2 Types of Errors
- **Systematic Error:** Causes measurements to be consistently off (e.g., a mis-calibrated scale).
- **Random Error:** Scatter in measurements due to unpredictable fluctuations (e.g., reading a stopwatch).

### 6.3 Reducing Errors
- Calibrate instruments
- Take multiple readings and average
- Use proper technique (e.g., parallax correction when reading scales)

## 7. Significant Figures
When recording measurements, only digits known reliably plus one estimated digit are written. This reflects the instrument’s precision.

Rules:
- Non-zero digits are always significant.
- Leading zeros are not significant.
- Trailing zeros in a decimal number are significant.

**Example:** 0.00420 m has three significant figures (4, 2, and the trailing 0).

## 8. Scalar and Vector Quantities
| Type | Definition | Examples |
|---|---|---|
| Scalar | Magnitude only | temperature (30 °C), mass (2 kg) |
| Vector | Magnitude and direction | displacement (5 m east), force (10 N downward) |

Vector addition via the parallelogram rule or component-wise (e.g., A⃗ + B⃗ = (Aₓ + Bₓ)ı̂ + (Aᵧ + Bᵧ)ȷ̂).

## 9. Dimensional Analysis
Every physical equation must be dimensionally consistent—both sides must have the same dimensions. Dimensions use symbols like [L] for length, [M] for mass, and [T] for time.

Example Check: s = ut + ½at²
- s has dimensions [L]
- ut has [L/T] × [T] = [L]
- at² has [L/T²] × [T²] = [L]

Since each term is [L], the equation is dimensionally valid.

## 10. Summary
- Physical quantities combine a numerical value with a unit.
- Base quantities form the foundation; derived quantities build on them.
- All measurements use standardized SI units, defined precisely.
- Accuracy, precision, and errors are key to reliable data.
- Significant figures reflect instrument precision.
- Quantities can be scalars or vectors, and equations must pass dimensional analysis.

## 11. Practice Questions
1. Classify the following as scalar or vector: volume, velocity, energy, acceleration.
2. A car travels 120 km in 2 h. Calculate its average speed and express with correct significant figures.
3. Verify dimensional consistency of the formula for kinetic energy: K = ½mv².
4. Explain one method to reduce random errors in timing experiments using a stopwatch.
`;

export const elasticityNotes = `
# Chapter: Elasticity

## 1. Introduction
Elasticity is the property of a material that enables it to regain its original shape and size after the removal of deforming forces. It is a fundamental concept in mechanics, crucial for understanding how solids respond to stretching, compressing, and shearing.

## 2. Stress and Strain
**Stress (σ):** Internal force per unit area resisting deformation.
σ = F/A
where F = applied force, A = cross-sectional area.
Unit: pascal (Pa) = N/m².

**Strain (ε):** Measure of deformation, defined as the change in dimension divided by original dimension.
ε = ΔL / L₀
where ΔL = change in length, L₀ = original length.
Strain is dimensionless.

## 3. Hooke’s Law
For many materials under small deformations, stress is proportional to strain:
σ = Eε
E = Young’s modulus (modulus of elasticity in tension/compression).

Valid up to the elastic limit—beyond which permanent (plastic) deformation occurs.

## 4. Types of Elastic Moduli
| Modulus | Definition | Formula | Units |
|---|---|---|---|
| Young’s modulus E | Tensile (or compressive) elasticity | E = σ/ε | Pa |
| Bulk modulus K | Volumetric elasticity (resistance to uniform compression) | K = -V(dP/dV) ≈ ΔP / (ΔV/V) | Pa |
| Shear modulus G | Elasticity under shear forces | G = τ/γ | Pa |

*τ = shear stress; γ = shear strain (angular deformation).*

## 5. Stress–Strain Curve
A typical curve for a ductile material under tension:
- **Proportional Limit:** End of purely linear (Hookean) behavior.
- **Elastic Limit:** Maximum stress for which material returns fully on unloading.
- **Yield Point:** Onset of plastic (permanent) deformation.
- **Ultimate Tensile Strength:** Maximum stress sustained.
- **Fracture Point:** Material breaks.

**Key regions:**
- **OA:** Linear (σ ∝ ε).
- **AB:** Yielding with little increase in stress.
- **BC:** Strain hardening.
- **CD:** Necking leading to failure.

## 6. Energy Stored (Strain Energy)
Area under the stress–strain curve up to ε:
U = ∫₀^ε σ dε

For linear region:
U = (1/2) * σ * ε = (1/2) * E * ε²
Unit: J/m³.

## 7. Factors Affecting Elasticity
- **Material Type:** Metals, polymers, ceramics differ widely in E, G, K.
- **Temperature:** Generally, E decreases with increasing temperature.
- **Impurities/Alloying:** Alloy composition can strengthen (increase E) or embrittle.

## 8. Applications
- **Springs:** Designed using Hooke’s law (F = kx, where spring constant k = EA/L).
- **Structural Engineering:** Beams and columns rely on known moduli for deflection calculations.
- **Acoustics:** Bulk modulus governs speed of sound in materials (v = √(K/ρ)).

## 9. Summary
- Elastic behavior: Reversible deformation under load.
- Stress & strain: Quantify internal force and deformation.
- Hooke’s law: Linear relation up to elastic limit.
- Elastic moduli: E, G, and K describe resistance to tension, shear, and compression.
- Energy storage: Area under stress–strain curve.

## 10. Practice Questions
1. A wire of length 2 m and cross-section 1 mm² stretches by 0.5 mm under a load of 100 N. Calculate its Young’s modulus.
2. Explain the difference between elastic limit and yield point.
3. Derive the expression for strain energy per unit volume in a material obeying Hooke’s law.
4. How does temperature affect the elasticity of a metal rod?
`;

export const grade11NotesMap: Record<string, { notes: string; quizQuestions: number }> = {
  'physical-quantities': {
    notes: physicalQuantitiesNotes,
    quizQuestions: 50,
  },
  'elasticity': {
    notes: elasticityNotes,
    quizQuestions: 50,
  }
};
