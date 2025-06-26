
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

export const gravitationNotes = `
# Chapter: Gravitation

## 1. Introduction
Gravitation is the force of attraction that exists between any two masses. It governs the motion of planets, stars, galaxies, and even objects on Earth. Understanding gravitation lays the foundation for classical mechanics, astronomy, and space science.

## 2. Newton’s Law of Universal Gravitation
Every point mass attracts every other point mass with a force that:
- Is directly proportional to the product of their masses.
- Is inversely proportional to the square of the distance between them.

Mathematically:
**F = G * (m1 * m2) / r^2**
Where:
- **F**: Gravitational force (N)
- **m1, m2**: Masses (kg)
- **r**: Distance between centers (m)
- **G**: Universal gravitational constant (6.674 x 10^-11 m^3 kg^-1 s^-2)

## 3. Gravitational Field and Field Strength
- **Gravitational Field (g):** A region of space around a mass where another mass experiences a force.
- **Field Strength (g):** Force per unit mass at a point in the field.

**g = F / m  =>  g = G * M / r^2**
- **Direction:** Toward the mass M.
- **Unit:** N/kg (equivalent to m/s²).

## 4. Gravitational Potential and Potential Energy
- **Potential (ϕ):** Work done per unit mass to bring a test mass from infinity to a point in the field.

**ϕ = -G * M / r**
(Negative because work is done by the field.)
- **Unit:** J/kg.

- **Potential Energy (U):** Work done to assemble a system of masses from infinity. For two masses:

**U = -G * (m1 * m2) / r**
- **Unit:** J.

## 5. Acceleration Due to Gravity on Earth
Near Earth’s surface (r ≈ R_earth):

**g = G * M_earth / R_earth^2 ≈ 9.81 m/s^2**
This value can vary slightly with altitude and latitude.

## 6. Motion under Gravity
### 6.1 Free Fall
An object released from rest accelerates downward at 'g'.
Equations of motion:
- **v = g * t**
- **s = (1/2) * g * t^2**

### 6.2 Projectile Motion
Horizontal and vertical motions are independent.
- Vertical motion under 'g'.
- Horizontal motion at constant velocity.

## 7. Orbits and Kepler’s Laws
Objects bound by gravity move in conic sections (circles, ellipses, parabolas, hyperbolas). For planets around the Sun, elliptical orbits apply.

- **Kepler’s First Law:** Planets move in ellipses with the Sun at one focus.
- **Kepler’s Second Law:** A line connecting a planet to the Sun sweeps out equal areas in equal intervals of time.
- **Kepler’s Third Law:** T^2 is proportional to a^3, where T = orbital period, a = semi-major axis.

Combining with Newton’s gravitation gives:
**T^2 = (4 * π^2 / (G * M)) * a^3**

## 8. Escape Velocity
Minimum speed needed to escape from a planet’s gravitational field without further propulsion:
**v_esc = sqrt(2 * G * M / R)**
For Earth: v_esc ≈ 11.2 km/s.

## 9. Gravitational Effects in Astrophysics
- **Tides:** Differential gravity on near and far sides of Earth causes ocean tides.
- **Black Holes:** Regions where escape velocity exceeds the speed of light.
- **Galactic Rotation:** Evidence for dark matter from rotation curves.

## 10. Summary
- Gravitation is a universal attractive force between masses.
- It follows an inverse-square law with constant G.
- It defines fields (g), potentials (ϕ), and energy (U).
- It governs free-fall, projectile motion, and orbital dynamics.
- Key concepts include Kepler’s laws, escape velocity, and tidal effects.

## 11. Practice Questions
1. Calculate the gravitational force between Earth (6.0 x 10^24 kg) and a 70 kg person standing on its surface.
2. Derive the expression for orbital speed 'v' of a satellite in a circular orbit of radius 'r'.
3. Find the gravitational potential energy of two 1 kg masses 0.5 m apart.
4. Explain why tides occur twice each day on Earth.
`;

export const vectorsNotes = `
# Chapter: Vectors

## 1. Introduction
Vectors are quantities that have both magnitude and direction, unlike scalars which have only magnitude. They’re essential for describing physical quantities like displacement, velocity, and force.

## 2. Representation of Vectors
- **Graphical:** As an arrow—length is proportional to magnitude, arrowhead points in the direction.
- **Analytical:** By components in a coordinate system. In two dimensions:
  **A⃗ = Aₓı̂ + Aᵧȷ̂**
  where **Aₓ = Acos(θ)** and **Aᵧ = Asin(θ)**.

## 3. Vector Operations
| Operation | Definition | Result |
|---|---|---|
| Addition | **A⃗ + B⃗** (head–to–tail rule) | Vector sum |
| Subtraction | **A⃗ - B⃗ = A⃗ + (-B⃗)** | Vector difference |
| Scalar (Dot) Product | **A⃗ ⋅ B⃗ = ABcos(ϕ)** | Scalar |
| Vector (Cross) Product | **A⃗ × B⃗ = ABsin(ϕ)n̂** | Vector perpendicular to the plane |

- **Dot product (component form):**
  **A⃗ ⋅ B⃗ = AₓBₓ + AᵧBᵧ + A₂B₂**

- **Cross product (component form in 3D):**
  **A⃗ × B⃗** is the determinant of the matrix:
  | ı̂ | ȷ̂ | k̂ |
  |---|---|---|
  | Aₓ | Aᵧ | A₂ |
  | Bₓ | Bᵧ | B₂ |

## 4. Unit Vectors and Direction Cosines
- A **unit vector (û)** has magnitude 1. For a vector **A⃗**, its unit vector is **Â = A⃗ / A**.
- **Direction cosines** are the cosines of the angles between a vector and the coordinate axes:
  - cos(α) = Aₓ/A
  - cos(β) = Aᵧ/A
  - cos(γ) = A₂/A

## 5. Applications
- Breaking forces into components for equilibrium analysis.
- Adding displacement vectors in navigation.
- Calculating work done by a force: **W = F⃗ ⋅ s⃗**

## 6. Practice Questions
1. If **A⃗ = 3ı̂ + 4ȷ̂** and **B⃗ = 2ı̂ - ȷ̂**, find **A⃗ + B⃗**, **A⃗ ⋅ B⃗**, and **A⃗ × B⃗**.
2. Determine the unit vector along **C⃗ = 5ı̂ - 2ȷ̂ + 2k̂**.
3. A force of magnitude 10 N acts at 30° above the horizontal; find its horizontal and vertical components.
`;

export const kinematicsNotes = `
# Chapter: Kinematics (Rectilinear Motion)

## 1. Introduction
Kinematics is the branch of mechanics that describes motion without considering its causes. For one-dimensional motion under constant acceleration, a set of key equations governs position, velocity, and time.

## 2. Key Quantities
- **Displacement (s or x):** The change in position of an object.
- **Velocity (v):** The rate of change of displacement. **v = ds/dt**
- **Acceleration (a):** The rate of change of velocity. **a = dv/dt**

## 3. Equations of Motion (for constant acceleration 'a')
Given initial velocity **u**, final velocity **v**, constant acceleration **a**, displacement **s**, and time **t**:
1.  **v = u + at**
2.  **s = ut + (1/2)at²**
3.  **v² = u² + 2as**
4.  **s = (1/2)(u + v)t**

## 4. Graphical Analysis of Motion
- **Position–time graph:** The slope (gradient) gives the velocity.
- **Velocity–time graph:** The slope gives the acceleration, and the area under the graph gives the displacement.
- **Acceleration–time graph:** The area under the graph gives the change in velocity.

## 5. Special Cases
- **Free fall:** An object falling under gravity has a constant downward acceleration **a = g ≈ 9.81 m/s²**.
- **Vertical projection:** For an object thrown upwards, we often take the upward direction as positive, so **a = -g**.

## 6. Practice Questions
1. A car starts from rest and accelerates uniformly at 2 m/s². How far does it travel in 5 seconds?
2. A ball is thrown vertically upward with a speed of 15 m/s. How high does it go, and how long does it take to return to the thrower's hand?
3. Sketch the s-t and v-t graphs for an object moving with constant negative acceleration.
`;

export const dynamicsNotes = `
# Chapter: Dynamics (Newton’s Laws)

## 1. Introduction
Dynamics explains *why* objects move as they do. It is based on Newton's three fundamental laws of motion.

## 2. Newton’s Laws of Motion
1.  **First Law (Inertia):** An object remains at rest or in uniform motion in a straight line unless acted upon by a net external force.
2.  **Second Law (F = ma):** The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. **∑F = ma**
3.  **Third Law (Action–Reaction):** For every action, there is an equal and opposite reaction. If object A exerts a force on object B, then object B exerts an equal and opposite force on object A.

## 3. Common Types of Forces
- **Gravitational Force (Weight):** W = mg, acting vertically downward near Earth’s surface.
- **Normal Force (N):** A contact force acting perpendicular to a surface.
- **Frictional Force (f):** A force that opposes motion or attempted motion. **f ≤ μN**.
- **Tension (T):** The force exerted by a string, rope, or cable.
- **Spring Force:** The force exerted by a spring, given by Hooke's Law (F = -kx).

## 4. Free-Body Diagrams
A free-body diagram is a crucial tool for solving dynamics problems:
1.  Isolate the object of interest.
2.  Draw all external forces acting *on* the object as vectors originating from the center.
3.  Choose a coordinate system and resolve forces into components.
4.  Apply Newton's Second Law to each axis: **∑Fₓ = maₓ** and **∑Fᵧ = maᵧ**.

## 5. Applications of Dynamics
- **Inclined Plane:** The weight (mg) is resolved into components: **mg sin(θ)** down the slope and **mg cos(θ)** perpendicular to the slope.
- **Atwood’s Machine:** For two masses (m₁, m₂) over a frictionless pulley, the acceleration is **a = (m₂ - m₁)g / (m₁ + m₂)**.
- **Uniform Circular Motion:** An object moving in a circle at constant speed has a net force, the centripetal force, directed towards the center: **F_c = mv²/r**.

## 6. Practice Questions
1. A block of mass 5 kg rests on a 30° incline. If the coefficient of kinetic friction is 0.2, find its acceleration down the plane.
2. Two masses, 3 kg and 5 kg, are connected by a light string over a frictionless pulley. Find the acceleration of the system and the tension in the string.
3. A 1 kg mass is attached to a spring with a spring constant of 200 N/m. If it is pulled 0.1 m from equilibrium and released, what is its maximum acceleration?
`;

export const workEnergyPowerNotes = `
# Chapter: Work, Energy & Power

## 1. Introduction
This chapter connects the concepts of force and motion to energy and the rate at which energy is transferred.

## 2. Work
Work is done when a force causes a displacement.
- For a constant force **F** causing a displacement **s**, the work done is:
  **W = Fs cos(θ)**
  where θ is the angle between the force and displacement vectors.
- The general definition of work is **W = ∫ F⃗ ⋅ ds⃗**.
- **Unit:** joule (J). 1 J = 1 N·m.

## 3. Energy
Energy is the capacity to do work.
- **Kinetic Energy (K):** The energy of motion.
  **K = (1/2)mv²**
- **Potential Energy (U):** Stored energy due to position or configuration.
  - **Gravitational Potential Energy:** U = mgh
  - **Elastic Potential Energy (in a spring):** U = (1/2)kx²

## 4. Work–Energy Theorem
The net work done on an object equals the change in its kinetic energy.
**W_net = ΔK = K_final - K_initial = (1/2)mv² - (1/2)mu²**

## 5. Conservation of Mechanical Energy
If only conservative forces (like gravity and spring forces) do work, the total mechanical energy (K + U) of a system is conserved.
**K_initial + U_initial = K_final + U_final**
Non-conservative forces, like friction, dissipate mechanical energy.

## 6. Power
Power is the rate at which work is done or energy is transferred.
- **Average Power:** P_avg = W / Δt
- **Instantaneous Power:** **P = dW/dt = F⃗ ⋅ v⃗**
- **Unit:** watt (W). 1 W = 1 J/s.

## 7. Efficiency
Efficiency (η) is the ratio of useful energy output to the total energy input.
**η = (Useful Energy Output / Total Energy Input) × 100%**

## 8. Practice Questions
1. A 2 kg block is accelerated from 3 m/s to 7 m/s. Calculate the net work done on the block.
2. A 5 kg mass is lifted 2 meters vertically at a constant speed. How much work is done against gravity? If it is lifted in 4 seconds, what is the power developed?
3. A spring with a spring constant of 50 N/m is compressed by 0.2 m. How much potential energy is stored in the spring?
`;

export const circularMotionNotes = `
# Chapter: Circular Motion

## 1. Introduction
Circular motion describes the movement of an object along a circular path. Even if the speed is constant, there is always an acceleration because the direction of velocity is changing.

## 2. Angular Quantities
Motion in a circle is often described using angular variables:
- **Angular Displacement (θ):** The angle swept by the radius vector. Unit: radians (rad).
- **Angular Velocity (ω):** The rate of change of angular displacement. **ω = dθ/dt**. Unit: rad/s.
- **Angular Acceleration (α):** The rate of change of angular velocity. **α = dω/dt**. Unit: rad/s².

## 3. Relationship between Linear and Angular Quantities
For a circle of radius **r**:
- Arc length **s = rθ**
- Tangential speed **v = rω**
- Tangential acceleration **a_t = rα**

## 4. Centripetal Acceleration and Force
- **Centripetal Acceleration (a_c):** The acceleration directed towards the center of the circle, responsible for changing the direction of the velocity vector.
  **a_c = v²/r = rω²**
- **Centripetal Force (F_c):** The net force required to cause centripetal acceleration. It always points towards the center of the circle.
  **F_c = ma_c = mv²/r = mrω²**
  This is not a new type of force; it is the *net result* of other forces (e.g., tension, gravity, friction).

## 5. Dynamics of Circular Motion
- Apply Newton's Second Law to the radial (centripetal) and tangential directions separately.
  - **∑F_radial = ma_c = mv²/r**
  - **∑F_tangential = ma_t**
- The tangential force component changes the object's speed. The centripetal force component changes its direction.

## 6. Applications
- **Banking of Curves:** Roads are banked at an angle θ so that the normal force provides the necessary centripetal force. For no friction, the ideal angle is given by **tan(θ) = v² / (rg)**.
- **Vertical Circles (e.g., roller coaster loop):** The required centripetal force is provided by the combination of gravity and the normal force (or tension). The minimum speed at the top to complete the loop is **v_top = √(rg)**.

## 7. Practice Questions
1. A 1000 kg car takes a flat turn of radius 50 m at a speed of 20 m/s. What is the minimum coefficient of static friction required between the tires and the road?
2. A 0.2 kg stone is whirled on a string in a horizontal circle of radius 0.5 m at a rate of 3 revolutions per second. Compute its angular velocity (ω), linear speed (v), and the tension in the string.
3. Calculate the ideal banking angle for a highway curve of radius 100 m if the designated speed is 25 m/s.
`;

export const heatAndTemperatureNotes = `
# Chapter: Heat and Temperature
## 1. Introduction
Heat and temperature are fundamental to understanding how energy moves and how we quantify the “hotness” of a body. While related, they are distinct concepts:

- **Heat** is energy in transit due to a temperature difference.
- **Temperature** measures the average kinetic energy of particles in a substance.

## 2. Temperature Scales
- **Celsius (°C):** Water freezes at 0 °C, boils at 100 °C.
- **Kelvin (K):** Absolute scale; 0 K (absolute zero) is –273.15 °C.
- **Fahrenheit (°F):** Used chiefly in the United States (32 °F freeze, 212 °F boil).

### Conversion:
- T(K) = T(°C) + 273.15
- T(°F) = (9/5) * T(°C) + 32

## 3. Heat vs. Temperature
- **Heat (Q):** Measured in joules (J); flows from hot to cold.
- **Temperature (T):** Measured in kelvins or degrees; tells us direction of heat flow.

## 4. Thermal Equilibrium & Zeroth Law
If A is in thermal equilibrium with B, and B with C, then A is with C. This underpins the concept of temperature.

## 5. Practice Questions
1. Convert 25 °C to K and °F.
2. Two objects at 80 °C and 30 °C come into contact. In which direction does heat flow?
3. If a temperature reads 300 K, what is it in °C and °F?
`;

export const thermalExpansionNotes = `
# Chapter: Thermal Expansion
## 1. Introduction
When a material is heated, its dimensions change. This is thermal expansion, crucial in engineering (bridges, rails, thermometers).

## 2. Linear Expansion
ΔL = α * L₀ * ΔT
Where:
- **L₀**: original length
- **ΔL**: change in length
- **ΔT**: temperature change
- **α**: coefficient of linear expansion (1/K)

## 3. Area and Volume Expansion
- **Area expansion:** ΔA = 2α * A₀ * ΔT
- **Volume expansion:** ΔV = β * V₀ * ΔT, where β ≈ 3α (β is the volume-expansion coefficient).

## 4. Applications & Problems
- Gaps in railway tracks
- Bimetallic strips in thermostats

## 5. Practice Questions
1. A 2 m steel rod (α = 1.2 × 10⁻⁵ K⁻¹) is heated from 20 °C to 120 °C. Find its new length.
2. Explain why cracks form in sidewalks in summer.
`;

export const quantityOfHeatNotes = `
# Chapter: Quantity of Heat
## 1. Introduction
The quantity of heat Q absorbed or released by a substance when its temperature changes is given by:

Q = m * c * ΔT
Where:
- **m**: mass (kg)
- **c**: specific heat capacity (J/kg·K)
- **ΔT**: temperature change (K)

## 2. Specific Heat Capacity
The energy required to raise 1 kg of a substance by 1 K. Values vary (water: 4186 J/kg·K, aluminum: 900 J/kg·K).

## 3. Phase Changes (Latent Heat)
When changing phase at constant temperature:

Q = m * L
Where:
- **L**: latent heat (J/kg)
- **L_f**: Latent heat of Fusion (melting)
- **L_v**: Latent heat of Vaporization

## 4. Practice Questions
1. How much heat to raise 0.5 kg of water from 20 °C to 80 °C?
2. Calculate energy to melt 0.2 kg of ice at 0 °C (L_f = 3.34 × 10⁵ J/kg).
`;

export const rateOfHeatFlowNotes = `
# Chapter: Rate of Heat Flow (Conduction)
## 1. Introduction
Heat flows from hot to cold by conduction, convection, or radiation. Here we focus on conduction through solids.

## 2. Fourier’s Law of Conduction
Q̇ = -k * A * (dT/dx)
Where:
- **Q̇**: heat current (W)
- **k**: thermal conductivity (W/m·K)
- **A**: cross-sectional area
- **dT/dx**: temperature gradient

For a slab of thickness L between temperatures T₁ and T₂:
Q̇ = k * A * (T₁ - T₂) / L

## 3. Series and Parallel Layers
- **Series:** Add thermal resistances: R_th = Σ(L_i / (k_i * A)), then Q̇ = ΔT / R_th
- **Parallel:** Conductances add.

## 4. Practice Questions
1. Calculate heat flow through a 0.02 m thick glass pane (k = 0.8 W/m·K), area 1 m², T_in = 20°C, T_out = –5°C.
2. Two layers (brick + insulation) in series—calculate net heat loss.
`;

export const idealGasNotes = `
# Chapter: Ideal Gas
## 1. Ideal Gas Law
An ideal gas obeys:
PV = nRT
Where:
- **P**: pressure (Pa)
- **V**: volume (m³)
- **n**: amount (mol)
- **R**: gas constant (8.314 J/mol·K)
- **T**: absolute temperature (K)

## 2. Other Forms
- **PV = NkT** where N = number of molecules, k = Boltzmann’s constant.
- Using Molar mass M: m = nM, so **PV = (m/M)RT**.

## 3. Kinetic Theory Relation
P = (1/3) * ρ * v²‾
Where:
- **ρ**: density (kg/m³)
- **v²‾**: mean square speed of molecules

## 4. Thermodynamic Processes
- **Isothermal:** T = constant, so PV = constant
- **Isobaric:** P = constant, so V/T = constant
- **Isochoric:** V = constant, so P/T = constant
- **Adiabatic:** no heat exchange, PV^γ = constant (where γ = C_p/C_v)

Work done by gas in a quasi-static process:
W = ∫ from V_i to V_f of P dV

## 5. Practice Questions
1. A 2.0 mol gas at 300 K occupies 0.05 m³. Find its pressure.
2. Sketch PV diagrams for isothermal and adiabatic expansions.
3. For a monoatomic ideal gas, γ = 5/3; show that TV^(2/3) = constant in an adiabatic process.
`;

export const reflectionAtCurvedMirrorsNotes = `
# Chapter: Reflection at Curved Mirrors
## 1. Introduction
Curved mirrors—concave and convex—reflect light to form images. They’re used in headlights, telescopes, shaving mirrors, etc.

## 2. Sign Conventions
- **Object distance (u):** positive if in front of mirror (real object)
- **Image distance (v):** positive if in front of mirror (real image)
- **Radius of curvature (R):** positive if center of curvature is in front
- **Focal length (f):** f = R/2, positive for concave, negative for convex

## 3. Mirror Equation
1/u + 1/v = 1/f

## 4. Magnification
m = h_image / h_object = -v / u
- m > 0: image upright
- m < 0: image inverted.

## 5. Ray Diagrams (Concave)
- Parallel ray → passes through focal point after reflection.
- Focal ray → reflects parallel to principal axis.
- Center-ray → reflects back on itself.
- For convex mirrors, rays appear to diverge from the focal point behind the mirror.

## 6. Applications & Significance
- **Concave:** magnifying, focusing
- **Convex:** wide-angle viewing, safety mirrors

## 7. Practice Questions
1. An object 10 cm from a concave mirror of focal length 15 cm—locate the image and its magnification.
2. A convex mirror forms a virtual image half as tall as the object. What is v/u?
`;

export const refractionAtPlaneSurfacesNotes = `
# Chapter: Refraction at Plane Surfaces
## 1. Introduction
Refraction is the bending of light as it passes between media of different refractive index (n).

## 2. Snell’s Law
n₁sin(θ₁) = n₂sin(θ₂)
θ: angle from the normal.

## 3. Apparent Depth
An object underwater (n = 1.33) at real depth d appears at depth
d_apparent = d / n

## 4. Refraction at a Single Plane
For a surface separating media n₁ and n₂, the object distance u and image distance v (measured from the surface) are related by:
n₁/u + n₂/v = 0
(Real images in the second medium have v > 0.)

## 5. Total Internal Reflection
Occurs when light travels from denser to rarer medium (n₁ > n₂).
Critical angle θ_c:
sin(θ_c) = n₂ / n₁

## 6. Practice Questions
1. A fish 2 m below water surface—how deep does it appear to an observer above?
2. Find the critical angle for the water–air interface.
`;

export const refractionThroughPrismsNotes = `
# Chapter: Refraction Through Prisms
## 1. Introduction
Prisms deviate and disperse light. A triangular prism is defined by its refracting angle A.

## 2. Deviation Angle
Light entering and exiting a prism is deviated by total angle δ. For small angles:
δ ≈ (n - 1)A

## 3. Exact Relation
Using geometry and Snell’s law at both faces:
δ = i₁ + i₂' - A
where i₁ = angle of incidence, i₂' = angle of emergence.

## 4. Angle of Minimum Deviation (δ_min)
When the path is symmetric (i₁ = i₂'):
n = sin((A + δ_min) / 2) / sin(A / 2)

## 5. Dispersion in Prisms
Different wavelengths refract by different amounts (n(λ)), causing spread of colors.

## 6. Practice Questions
1. A 60° prism gives δ_min = 40°. Find its refractive index.
2. Explain why a rainbow appears when sunlight passes through raindrops (treat each drop as a tiny prism).
`;

export const lensesNotes = `
# Chapter: Lenses
## 1. Introduction
Thin lenses—convex (converging) and concave (diverging)—focus or diverge light.

## 2. Lens Maker’s Formula
1/f = (n_lens - 1) * (1/R₁ - 1/R₂)
Radii R₁, R₂ positive if centers on the outgoing side.

## 3. Thin-Lens Equation
1/u + 1/v = 1/f
Same sign conventions as mirrors (but f > 0 for convex, f < 0 for concave).

## 4. Magnification
m = h' / h = -v / u

## 5. Ray Diagrams (Convex Lens)
- Parallel ray → through focal point on other side.
- Focal ray → emerges parallel.
- Central ray → straight through optical center.
- For concave lenses, rays diverge as if from a virtual focal point.

## 6. Combinations of Lenses
The effective focal length F for two thin lenses in contact:
1/F = 1/f₁ + 1/f₂

## 7. Practice Questions
1. An object 30 cm from a convex lens of focal length 20 cm—determine image position and size.
2. Two lenses f₁ = 10 cm, f₂ = -15 cm in contact—find combined F.
`;

export const dispersionNotes = `
# Chapter: Dispersion
## 1. Introduction
Dispersion is the wavelength-dependence of refractive index, causing white light to split into colors.

## 2. Refractive Index vs. Wavelength
Qualitatively, n decreases as λ increases (normal dispersion).

## 3. Cauchy’s Formula (Approximate)
n(λ) = A + B/λ² + C/λ⁴
Constants A, B, C are specific to the material.

## 4. Angular Dispersion
For a prism, the angular spread between two wavelengths λ₁ and λ₂:
Δδ = (n(λ₁) - n(λ₂)) * A

## 5. Chromatic Aberration
Lenses focus different colors at different points, requiring achromatic doublets in cameras and telescopes.

## 6. Practice Questions
1. Calculate the angular dispersion of a 60° flint-glass prism for red (n = 1.616) and violet (n = 1.643).
2. Explain how an achromatic lens pair reduces color fringing.
`;

export const electricChargesNotes = `
# Chapter: Electric Charges
## 1. Introduction
Electric charge is a fundamental property of matter that gives rise to electric forces. There are two types of charge: positive and negative. Like charges repel; opposite charges attract.

## 2. Quantization and Conservation
- **Quantization:** Charge comes in integer multiples of the elementary charge e = 1.602 × 10⁻¹⁹ C.
- **Conservation:** The total electric charge in an isolated system remains constant.

## 3. Coulomb’s Law
The electrostatic force between two point charges q₁ and q₂, separated by distance r, is:
**F = k * |q₁q₂| / r²**
where k = 1 / (4πε₀) ≈ 8.99 × 10⁹ N·m²/C².
Direction is along the line joining the charges; it is repulsive if they have the same sign.

## 4. Superposition Principle
If multiple charges act on a test charge, the net force is the vector sum of the individual forces:
**F_net = Σ F_i**

## 5. Conduction, Induction, and Charging Methods
- **Conduction:** Direct contact transfers charge.
- **Induction:** Bringing a charged object near a conductor causes separation of charges without contact.
- **Friction:** Rubbing two materials (e.g., amber and wool) can transfer electrons.

## 6. Applications & Phenomena
- Electrostatic precipitators for pollution control.
- Lightning: Massive charge separation in clouds leading to discharge.

## 7. Practice Questions
1. Calculate the force between two +3 μC charges 5 cm apart.
2. Two charges, +Q and -Q, are 10 cm apart. Where along the line joining them is the net force on a third test charge zero?
`;

export const electricFieldNotes = `
# Chapter: Electric Field
## 1. Introduction
An electric field E describes the influence a charge exerts on the space around it. A test charge q placed in an electric field E experiences a force F = qE.

## 2. Definition
The electric field E at a point is the force F per unit charge q on a positive test charge:
**E = F / q**
Unit: newton per coulomb (N/C) or volt per meter (V/m).

## 3. Field of a Point Charge
The electric field from a single point charge q at a distance r is:
**E = k * q / r²**
The field is radial, pointing away from a positive charge and toward a negative charge.

## 4. Superposition
Electric fields from multiple sources add vectorially:
**E_net = Σ E_i**

## 5. Field Lines
- Lines originate on positive charges and terminate on negative charges.
- The density of lines is proportional to the field strength.
- Field lines never cross.

## 6. Uniform Electric Field
Between two large, parallel conducting plates with potential difference V separated by distance d, the field is approximately uniform:
**E ≈ V / d**

## 7. Gauss’s Law (Qualitative)
The net electric flux through any closed surface is equal to the total charge enclosed by that surface divided by ε₀:
**Φ_E = ∮ E ⋅ dA = Q_enclosed / ε₀**
This law is very useful for calculating the electric field for charge distributions with high symmetry.

## 8. Practice Questions
1. Sketch the electric field lines for (a) an isolated positive point charge, and (b) a pair of equal but opposite charges (an electric dipole).
2. Find the electric field at a point midway between two equal positive charges +Q separated by a distance 2a.
`;

export const potentialDifferenceAndEnergyNotes = `
# Chapter: Electric Potential and Potential Energy

## 1. Electric Potential (V)
Electric potential is the work done per unit charge in bringing a positive test charge from infinity to a specific point in an electric field.
**V = W / q**
Unit: volt (V), where 1 V = 1 J/C.

For a point charge q, the potential at a distance r is:
**V = k * q / r**

## 2. Potential Difference (ΔV)
The potential difference between two points A and B is the work done per unit charge to move a charge from A to B.
**ΔV = V_B - V_A = W_AB / q**
A positive charge naturally moves from a region of higher potential to lower potential, losing electric potential energy.

## 3. Relation to Electric Field
The electric field is the negative gradient of the potential.
**E = -∇V**
In one dimension, this simplifies to **E_x = -dV/dx**. The field points in the direction of the steepest decrease in potential.

## 4. Equipotential Surfaces
These are surfaces where the electric potential is constant.
- No work is done when moving a charge along an equipotential surface.
- Electric field lines are always perpendicular to equipotential surfaces.

## 5. Electric Potential Energy (U)
The potential energy of a pair of point charges q₁ and q₂ separated by distance r is:
**U = k * (q₁q₂) / r**
The total potential energy of a system of charges is the sum of the energies of all unique pairs.

## 6. Applications
- **Capacitors:** Store energy in the electric field, given by **U = (1/2)CV²**.
- **Electron Volt (eV):** A unit of energy equal to the energy gained by an electron moving through a potential difference of 1 V. (1 eV = 1.602 × 10⁻¹⁹ J).

## 7. Practice Questions
1. Calculate the electric potential at a distance of 0.2 m from a +5 μC point charge.
2. Two +2 μC charges are held 10 cm apart. Find the electric potential energy of the pair.
`;

export const capacitorNotes = `
# Chapter: Capacitors
## 1. Introduction
A capacitor is a device used to store electric charge and energy. It consists of two conductors (plates) separated by an insulator (dielectric).

## 2. Capacitance (C)
Capacitance is the ratio of the charge Q on one conductor to the potential difference V between the conductors.
**C = Q / V**
Unit: farad (F), where 1 F = 1 C/V.

## 3. Parallel-Plate Capacitor
For a capacitor with two parallel plates of area A separated by a distance d in a vacuum:
**C = ε₀ * A / d**
If a dielectric material with dielectric constant κ is inserted between the plates:
**C = κ * ε₀ * A / d = κ * C_vacuum**

## 4. Energy Stored in a Capacitor
The energy U stored in a charged capacitor is given by:
**U = (1/2) * Q² / C = (1/2) * CV² = (1/2) * QV**

## 5. Combination of Capacitors
- **In Series:** The total capacitance is the reciprocal of the sum of the reciprocals.
  **1/C_eq = 1/C₁ + 1/C₂ + ...**
  The charge on each capacitor is the same.

- **In Parallel:** The total capacitance is the sum of the individual capacitances.
  **C_eq = C₁ + C₂ + ...**
  The voltage across each capacitor is the same.

## 6. Dielectrics
A dielectric is an insulating material that, when placed in an electric field, becomes polarized. This reduces the net electric field inside the capacitor, allowing it to store more charge at the same voltage, thus increasing its capacitance.

## 7. Applications
- **Tuning circuits** in radios and TVs.
- **Energy storage** for flashes in cameras and defibrillators.
- **Filtering** in power supplies to smooth out voltage.

## 8. Practice Questions
1. A 10 μF capacitor is charged to a potential difference of 5 V. Calculate the charge on the capacitor and the energy stored in it.
2. Three capacitors (5 μF, 10 μF, and 20 μF) are connected in series to a 12 V source. Find the equivalent capacitance and the charge on each capacitor.
`;

export const dcCircuitsNotes = `
# Chapter: DC Circuits
## 1. Introduction
Direct-current (DC) circuits involve the flow of charge in one constant direction. They are fundamental to battery-powered devices and electronics.

## 2. Ohm’s Law
For many materials (ohmic conductors), the voltage V across them is directly proportional to the current I flowing through them.
**V = I * R**
where R is the resistance. Unit: ohm (Ω).

## 3. Resistivity and Resistance
Resistance R depends on the material's properties and geometry:
**R = ρ * L / A**
where:
- **ρ (rho)** is the resistivity of the material (Ω·m).
- **L** is the length of the conductor.
- **A** is the cross-sectional area.

## 4. Electric Power
Power P is the rate at which energy is dissipated in a circuit component.
**P = V * I = I² * R = V² / R**
Unit: watt (W), where 1 W = 1 J/s.

## 5. Resistors in Series and Parallel
- **Series:** Resistors are connected end-to-end. The current is the same through each. The equivalent resistance is the sum:
  **R_eq = R₁ + R₂ + ...**

- **Parallel:** Resistors are connected across the same two points. The voltage is the same across each. The equivalent resistance is given by:
  **1/R_eq = 1/R₁ + 1/R₂ + ...**

## 6. Kirchhoff’s Laws
For complex circuits, these laws are essential:
1.  **Junction Rule (Conservation of Charge):** The sum of currents entering any junction must equal the sum of currents leaving that junction.
    **ΣI_in = ΣI_out**
2.  **Loop Rule (Conservation of Energy):** The sum of the potential differences (voltages) around any closed loop in a circuit must be zero.
    **ΣΔV_loop = 0**

## 7. EMF and Internal Resistance
A real battery has an electromotive force (EMF or ε) and an internal resistance (r). The terminal voltage V_T (the actual voltage supplied) is:
**V_T = ε - I * r**

## 8. Applications
- **Voltage Dividers:** Using series resistors to produce a specific output voltage.
- **Wheatstone Bridge:** A circuit used to accurately measure an unknown resistance.

## 9. Practice Questions
1. A circuit has a 12 V battery connected to three resistors in series: 2 Ω, 4 Ω, and 6 Ω. Find the total current and the voltage drop across the 4 Ω resistor.
2. If the same three resistors were connected in parallel to the 12 V battery, what would be the total current drawn from the battery?
`;


export const grade11NotesMap: Record<string, { notes: string; quizQuestions: number }> = {
  'physical-quantities': {
    notes: physicalQuantitiesNotes,
    quizQuestions: 50,
  },
  'elasticity': {
    notes: elasticityNotes,
    quizQuestions: 50,
  },
  'gravitation': {
    notes: gravitationNotes,
    quizQuestions: 50,
  },
  'vectors': {
    notes: vectorsNotes,
    quizQuestions: 50,
  },
  'kinematics': {
    notes: kinematicsNotes,
    quizQuestions: 50,
  },
  'dynamics': {
    notes: dynamicsNotes,
    quizQuestions: 50,
  },
  'work-energy-and-power': {
    notes: workEnergyPowerNotes,
    quizQuestions: 50,
  },
  'circular-motion': {
    notes: circularMotionNotes,
    quizQuestions: 50,
  },
  'heat-and-temperature': {
    notes: heatAndTemperatureNotes,
    quizQuestions: 50,
  },
  'thermal-expansion': {
    notes: thermalExpansionNotes,
    quizQuestions: 50,
  },
  'quantity-of-heat': {
    notes: quantityOfHeatNotes,
    quizQuestions: 50,
  },
  'rate-of-heat-flow': {
    notes: rateOfHeatFlowNotes,
    quizQuestions: 50,
  },
  'ideal-gas': {
    notes: idealGasNotes,
    quizQuestions: 50,
  },
  'reflection-at-curved-mirror': {
    notes: reflectionAtCurvedMirrorsNotes,
    quizQuestions: 50,
  },
  'refraction-at-plane-surfaces': {
    notes: refractionAtPlaneSurfacesNotes,
    quizQuestions: 50,
  },
  'refraction-through-prisms': {
    notes: refractionThroughPrismsNotes,
    quizQuestions: 50,
  },
  'lenses': {
    notes: lensesNotes,
    quizQuestions: 50,
  },
  'dispersion': {
    notes: dispersionNotes,
    quizQuestions: 50,
  },
  'electric-charges': {
    notes: electricChargesNotes,
    quizQuestions: 50,
  },
  'electric-field': {
    notes: electricFieldNotes,
    quizQuestions: 50,
  },
  'potential-potential-difference-and-potential-energy': {
    notes: potentialDifferenceAndEnergyNotes,
    quizQuestions: 50,
  },
  'capacitor': {
    notes: capacitorNotes,
    quizQuestions: 50,
  },
  'dc-circuits': {
    notes: dcCircuitsNotes,
    quizQuestions: 50,
  },
};
