import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Atom, ListTree } from 'lucide-react';

const grade11Syllabus = [
  { unit: "Unit I: Physical World and Measurement", topics: ["Physics-scope and excitement", "nature of physical laws", "physics, technology and society.", "Need for measurement: Units of measurement", "systems of units", "S.I. units, fundamental and derived units.", "Length, mass and time measurements", "accuracy and precision of measuring instruments", "errors in measurement", "significant figures.", "Dimensions of physical quantities", "dimensional analysis and its applications."] },
  { unit: "Unit II: Kinematics", topics: ["Frame of reference.", "Motion in a straight line: Position-time graph, speed and velocity.", "Uniform and non-uniform motion, average speed and instantaneous velocity.", "Uniformly accelerated motion, velocity-time and position-time graphs.", "Relations for uniformly accelerated motion (graphical treatment).", "Scalar and vector quantities", "Position and displacement vectors, general vectors and notation, equality of vectors, multiplication of vectors by a real number", "addition and subtraction of vectors.", "Relative velocity.", "Unit vector", "Resolution of a vector in a plane-rectangular components.", "Scalar and Vector product of Vectors.", "Motion in a plane.", "Cases of uniform velocity and uniform acceleration-projectile motion.", "Uniform circular motion."] },
  { unit: "Unit III: Laws of Motion", topics: ["Intuitive concept of force.", "Inertia, Newton's first law of motion", "momentum and Newton's second law of motion", "impulse", "Newton's third law of motion.", "Law of conservation of linear momentum and its applications.", "Equilibrium of concurrent forces.", "Static and kinetic friction, laws of friction, rolling friction, lubrication.", "Dynamics of uniform circular motion: Centripetal force, examples of circular motion (vehicle on level circular road, vehicle on banked road)."] },
  { unit: "Unit IV: Work, Energy and Power", topics: ["Work done by a constant force and a variable force", "kinetic energy, work-energy theorem, power.", "Notion of potential energy, potential energy of a spring, conservative forces", "conservation of mechanical energy (kinetic and potential energies)", "non-conservative forces", "motion in a vertical circle", "elastic and inelastic collisions in one and two dimensions."] },
  { unit: "Unit V: Motion of System of Particles and Rigid Body", topics: ["Centre of mass of a two-particle system, momentum conservation and centre of mass motion.", "Centre of mass of a rigid body", "centre of mass of uniform rod.", "Moment of a force, torque, angular momentum, conservation of angular momentum with some examples.", "Equilibrium of rigid bodies, rigid body rotation and equations of rotational motion, comparison of linear and rotational motions", "moment of inertia, radius of gyration.", "Values of M.I. for simple geometrical objects (no derivation).", "Statement of parallel and perpendicular axes theorems and their applications."] },
  { unit: "Unit VI: Gravitation", topics: ["Kepler's laws of planetary motion.", "The universal law of gravitation.", "Acceleration due to gravity and its variation with altitude and depth.", "Gravitational potential energy", "gravitational potential.", "Escape velocity, orbital velocity of a satellite.", "Geostationary satellites."] },
  { unit: "Unit VII: Properties of Bulk Matter", topics: ["Elastic behaviour, Stress-strain relationship, Hooke's law, Young's modulus, bulk modulus, shear, modulus of rigidity, poisson's ratio", "elastic energy.", "Pressure due to a fluid column", "Pascal's law and its applications (hydraulic lift and hydraulic brakes).", "Effect of gravity on fluid pressure.", "Viscosity, Stokes' law, terminal velocity, Reynold's number, streamline and turbulent flow.", "Critical velocity, Bernoulli's theorem and its applications.", "Surface energy and surface tension, angle of contact, excess of pressure, application of surface tension ideas to drops, bubbles and capillary rise.", "Heat, temperature, thermal expansion", "thermal expansion of solids, liquids, and gases.", "Anomalous expansion.", "Specific heat capacity: Cp, Cv - calorimetry", "change of state - latent heat.", "Heat transfer- conduction and thermal conductivity, convection and radiation.", "Qualitative ideas of Black Body Radiation, Wein's displacement law, and Green House effect.", "Newton's law of cooling and Stefan's law."] },
  { unit: "Unit VIII: Thermodynamics", topics: ["Thermal equilibrium and definition of temperature (zeroth law of Thermodynamics).", "Heat, work and internal energy.", "First law of thermodynamics.", "Isothermal and adiabatic processes.", "Second law of thermodynamics: reversible and irreversible processes.", "Heat engines and refrigerators."] },
  { unit: "Unit IX: Behaviour of Perfect Gas and Kinetic Theory", topics: ["Equation of state of a perfect gas, work done on compressing a gas.", "Kinetic theory of gases: Assumptions, concept of pressure.", "Kinetic energy and temperature", "rms speed of gas molecules", "degrees of freedom, law of equipartition of energy (statement only) and application to specific heat capacities of gases", "concept of mean free path."] },
  { unit: "Unit X: Oscillations and Waves", topics: ["Periodic motion - period, frequency, displacement as a function of time.", "Periodic functions.", "Simple harmonic motion (S.H.M) and its equation", "phase", "oscillations of a spring-restoring force and force constant", "energy in S.H.M.-kinetic and potential energies", "simple pendulum-derivation of expression for its time period", "free, forced and damped oscillations (qualitative ideas only), resonance.", "Wave motion.", "Longitudinal and transverse waves, speed of wave motion.", "Displacement relation for a progressive wave.", "Principle of superposition of waves, reflection of waves, standing waves in strings and organ pipes, fundamental mode and harmonics.", "Beats.", "Doppler effect."] },
];

export default function Grade11PhysicsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Atom className="w-8 h-8 text-primary" />
          Grade 11 Physics Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 11 Physics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit to see the detailed topics.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade11Syllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {item.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>{topic}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
