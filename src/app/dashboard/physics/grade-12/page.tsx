import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Atom, ListTree } from 'lucide-react';

const grade12Syllabus = [
  { unit: "Unit I: Electrostatics", topics: ["Electric charges and their conservation.", "Coulomb's law-force between two point charges, forces between multiple charges", "superposition principle and continuous charge distribution.", "Electric field, electric field due to a point charge, electric field lines", "electric dipole, electric field due to a dipole", "torque on a dipole in a uniform electric field.", "Electric flux, statement of Gauss's theorem and its applications to find field due to infinitely long straight wire, uniformly charged infinite plane sheet and uniformly charged thin spherical shell (field inside and outside).", "Electric potential, potential difference, electric potential due to a point charge, a dipole and system of charges", "equipotential surfaces, electrical potential energy of a system of two point charges and of electric dipoles in an electrostatic field.", "Conductors and insulators, free charges and bound charges inside a conductor.", "Dielectrics and electric polarization, capacitors and capacitance, combination of capacitors in series and in parallel, capacitance of a parallel plate capacitor with and without dielectric medium between the plates, energy stored in a capacitor, Van de Graaff generator."] },
  { unit: "Unit II: Current Electricity", topics: ["Electric current, flow of electric charges in a metallic conductor, drift velocity and mobility, and their relation with electric current", "Ohm's law, electrical resistance, V-I characteristics (linear and non-linear), electrical energy and power, electrical resistivity and conductivity.", "Carbon resistors, colour code for carbon resistors", "series and parallel combinations of resistors", "temperature dependence of resistance.", "Internal resistance of a cell, potential difference and emf of a cell, combination of cells in series and in parallel.", "Kirchhoff's laws and simple applications.", "Wheatstone bridge, metre bridge.", "Potentiometer-principle and applications to measure potential difference, and for comparing emf of two cells", "measurement of internal resistance of a cell."] },
  { unit: "Unit III: Magnetic Effects of Current and Magnetism", topics: ["Concept of magnetic field, Oersted's experiment.", "Biot-Savart law and its application to current carrying circular loop.", "Ampere's law and its applications to infinitely long straight wire, straight and toroidal solenoids.", "Force on a moving charge in uniform magnetic and electric fields.", "Cyclotron.", "Force on a current-carrying conductor in a uniform magnetic field.", "Force between two parallel current-carrying conductors-definition of ampere.", "Torque experienced by a current loop in a magnetic field", "moving coil galvanometer-its current sensitivity and conversion to ammeter and voltmeter.", "Current loop as a magnetic dipole and its magnetic dipole moment.", "Magnetic dipole moment of a revolving electron.", "Magnetic field intensity due to a magnetic dipole (bar magnet) along its axis and perpendicular to its axis.", "Torque on a magnetic dipole (bar magnet) in a uniform magnetic field", "bar magnet as an equivalent solenoid, magnetic field lines", "Earth's magnetic field and magnetic elements.", "Para-, dia- and ferro-magnetic substances, with examples.", "Electromagnets and factors affecting their strengths.", "Permanent magnets."] },
  { unit: "Unit IV: Electromagnetic Induction and Alternating Currents", topics: ["Electromagnetic induction", "Faraday's law, induced emf and current", "Lenz's Law, Eddy currents.", "Self and mutual inductance.", "Alternating currents, peak and rms value of alternating current/voltage", "reactance and impedance", "LC oscillations (qualitative treatment only), LCR series circuit, resonance", "power in AC circuits, wattles current.", "AC generator and transformer."] },
  { unit: "Unit V: Electromagnetic Waves", topics: ["Need for displacement current.", "Electromagnetic waves and their characteristics (qualitative ideas only).", "Transverse nature of electromagnetic waves.", "Electromagnetic spectrum (radio waves, microwaves, infrared, visible, ultraviolet, x-rays, gamma rays) including elementary facts about their uses."] },
  { unit: "Unit VI: Optics", topics: ["Reflection of light, spherical mirrors, mirror formula.", "Refraction of light, total internal reflection and its applications, optical fibres, refraction at spherical surfaces, lenses, thin lens formula, lens-maker's formula.", "Magnification, power of a lens, combination of thin lenses in contact, combination of a lens and a mirror.", "Refraction and dispersion of light through a prism.", "Scattering of light - blue colour of the sky and reddish appearance of the sun at sunrise and sunset.", "Optical instruments: Human eye, image formation and accommodation, correction of eye defects (myopia and hypermetropia) using lenses.", "Microscopes and astronomical telescopes (reflecting and refracting) and their magnifying powers.", "Wave optics: Wavefront and Huygens' principle, reflection and refraction of plane wave at a plane surface using wavefronts.", "Proof of laws of reflection and refraction using Huygens' principle.", "Interference, Young's double hole experiment and expression for fringe width, coherent sources and sustained interference of light.", "Diffraction due to a single slit, width of central maximum.", "Resolving power of microscopes and astronomical telescopes.", "Polarisation, plane polarised light", "Brewster's law, uses of plane polarised light and Polaroids."] },
  { unit: "Unit VII: Dual Nature of Radiation and Matter", topics: ["Photoelectric effect, Hertz and Lenard's observations", "Einstein's photoelectric equation- particle nature of light.", "Matter waves- wave nature of particles, de Broglie relation.", "Davisson-Germer experiment (experimental details should be omitted", "only conclusion should be explained)."] },
  { unit: "Unit VIII: Atoms and Nuclei", topics: ["Alpha-particle scattering experiments", "Rutherford's model of atom", "Bohr model, energy levels, hydrogen spectrum.", "Composition and size of nucleus, atomic masses, isotopes, isobars", "isotones.", "Radioactivity- alpha, beta and gamma particles/rays and their properties", "radioactive decay law.", "Mass-energy relation, mass defect", "binding energy per nucleon and its variation with mass number", "nuclear fission and fusion."] },
  { unit: "Unit IX: Electronic Devices", topics: ["Energy bands in solids (qualitative ideas only), conductors, insulators and semiconductors", "semiconductor diode- I-V characteristics in forward and reverse bias, diode as a rectifier", "I-V characteristics of LED, photodiode, solar cell, and Zener diode", "Zener diode as a voltage regulator.", "Junction transistor, transistor action, characteristics of a transistor", "transistor as an amplifier (common emitter configuration) and oscillator.", "Logic gates (OR, AND, NOT, NAND and NOR).", "Transistor as a switch."] },
];

export default function Grade12PhysicsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Atom className="w-8 h-8 text-primary" />
          Grade 12 Physics Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 12 Physics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit to see the detailed topics.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade12Syllabus.map((item, index) => (
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
