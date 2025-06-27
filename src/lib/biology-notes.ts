
export const grade11BiologyNotesMap: Record<string, { notes: string; quizQuestions: number }> = {
  // e.g. 'biomolecules-and-cell-biology': { notes: '...', quizQuestions: 10 }
};

const animalTissuesNotes = `
# Animal Tissues

## Definition
Groups of similar cells plus intercellular substances that perform a common function.

## Types

### Epithelial Tissue
Covers body surfaces, lines cavities (e.g. skin, gut lining).
*   **Shapes:** squamous (flat), cuboidal, columnar.
*   **Specializations:** cilia (respiratory tract), microvilli (intestine).

### Connective Tissue
Supports and binds organs.
*   **Components:** cells (fibroblasts, adipocytes), fibers (collagen, elastin), ground substance.
*   **Subtypes:** loose (areolar), dense (tendons), cartilage, bone, blood.

### Muscle Tissue
Contracts to produce movement.
*   **Skeletal:** striated, voluntary, multinucleated.
*   **Cardiac:** striated, involuntary, intercalated discs.
*   **Smooth:** non-striated, involuntary (walls of gut, vessels).

### Nervous Tissue
Conducts impulses.
*   **Neurons:** (cell body, dendrites, axon) + neuroglia (support cells).
*   **Function:** sensation, integration, response.
`;

const developmentalBiologyNotes = `
# Developmental Biology
*   **Fertilization:** Sperm + egg → zygote.
*   **Cleavage:** Rapid mitotic divisions → morula → blastula (hollow ball).
*   **Gastrulation:** Cells migrate → three germ layers:
    *   **Ectoderm** → skin, nervous system
    *   **Mesoderm** → muscle, bone, blood, gonads
    *   **Endoderm** → gut lining, liver, lungs
*   **Organogenesis:** Germ layers differentiate into organs (neural tube, heart tube, limb buds).
*   **Morphogens & Signaling:** Gradients of molecules (e.g. Hedgehog, Wnt) direct patterning.
*   **Metamorphosis (in some animals):** Larva → adult (e.g. tadpole → frog).
`;

const humanBiologyNotes = `
# Human Biology
## Levels of Organization
cell → tissue → organ → system → organism.

## Major Systems
*   **Circulatory:** heart, blood vessels, blood—transports O₂, nutrients, wastes.
*   **Respiratory:** lungs, trachea—gas exchange.
*   **Digestive:** mouth → esophagus → stomach → intestines—nutrient breakdown & absorption.
*   **Nervous:** brain, spinal cord, nerves—control & communication.
*   **Endocrine:** glands (pituitary, thyroid)—hormonal regulation.
*   **Musculoskeletal:** bones, muscles, joints—support & movement.
*   **Urinary:** kidneys, bladder—waste excretion, osmotic balance.
*   **Reproductive:** gonads, ducts—gamete production, fertilization.
*   **Immune/Lymphatic:** lymph nodes, white blood cells—pathogen defense.
*   **Integumentary:** skin, hair, nails—protection, temperature regulation.
`;

const humanPopulationAndHealthDisordersNotes = `
# Human Population & Health Disorders
*   **Population Dynamics:** birth/death rates, age structure, migration → growth models (exponential vs logistic).
*   **Epidemiology:** incidence, prevalence, transmission (direct contact, vectors, airborne).
*   **Nutrition & Diet:** macro- and micronutrients; malnutrition, obesity.
*   **Non-communicable Diseases:** diabetes, cardiovascular disease, cancer—lifestyle & genetic factors.
*   **Communicable Diseases:** bacterial (TB), viral (influenza, HIV), parasitic (malaria)—prevention via vaccines, sanitation.
*   **Genetic Disorders:** single-gene (sickle cell), chromosomal (Down syndrome), multifactorial (some heart diseases).
*   **Public Health Measures:** vaccination, water treatment, health education, screening programs.
`;

const appliedBiologyNotes = `
# Applied Biology
## Biotechnology
*   **Genetic Engineering:** recombinant DNA, transgenic organisms, CRISPR–Cas9 editing.
*   **Fermentation:** yeast/bacteria produce ethanol, cheese, antibiotics.
*   **Tissue Culture:** growing plant or animal cells in vitro for research or crop improvement.
*   **Bioremediation:** use of microbes to degrade pollutants (oil spills, heavy metals).
*   **Pharmaceuticals:** production of insulin, vaccines in cultured cells.

## Agricultural Biology
*   **Selective breeding, marker-assisted selection, GM crops for yield & pest resistance.**

## Environmental Monitoring
*   **bioindicators (e.g. lichen for air quality), biodiversity assessments.**
`;

export const grade12BiologyNotesMap: Record<string, { notes: string; quizQuestions: number }> = {
  'animal-tissues': {
    notes: animalTissuesNotes,
    quizQuestions: 10,
  },
  'development-biology': {
    notes: developmentalBiologyNotes,
    quizQuestions: 10,
  },
  'human-biology': {
    notes: humanBiologyNotes,
    quizQuestions: 10,
  },
  'human-population-and-health-disorders': {
    notes: humanPopulationAndHealthDisordersNotes,
    quizQuestions: 10,
  },
  'applied-biology': {
    notes: appliedBiologyNotes,
    quizQuestions: 10,
  },
};
