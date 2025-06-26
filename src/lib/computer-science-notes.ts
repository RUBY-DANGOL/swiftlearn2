
const computerSystemNotes = `
# 1. Computer System

## 1.1 Introduction to Computers

### 1.1.1 Definition, Characteristics & Applications
*   **Definition:** An electronic machine that processes data into information via arithmetic/logic.
*   **Characteristics:** Speed, accuracy, automation, storage, versatility.
*   **Applications:** Banking, healthcare, education, engineering, entertainment, mobile apps.

### 1.1.2 Evolution of Computer Technology
*   **Generations:** Vacuum tubes → transistors → integrated circuits → microprocessors → AI-driven/quantum prototypes.
*   **Milestones:** ENIAC ’45, IBM PC ’81, smartphones ~2007, cloud/edge computing today.

### 1.1.3 Measurement Units
*   **Processing speed:** Hertz (Hz)—cycles per second (kHz, MHz, GHz).
*   **Storage:** Byte-based: KB (10³), MB (10⁶), GB (10⁹), TB (10¹²).

### 1.1.4 Super, Mainframe, Mini & Microcomputers
*   **Supercomputer:** Top-end scientific/engineering calculations (petaflops).
*   **Mainframe:** Enterprise transaction processing (banks, airlines).
*   **Minicomputer:** Mid-range multi-user systems.
*   **Microcomputer:** Personal desktops/laptops/single-board computers.

### 1.1.5 Mobile Computing & Applications
*   **Concept:** Portable devices (smartphones, tablets) with wireless connectivity.
*   **Apps:** Navigation, social media, e-commerce, mobile health, IoT controllers.

## 1.2 Computer System & I/O Devices

### 1.2.1 Architecture vs. Organization
*   **Architecture:** Instruction set, addressing modes, CPU features (visible to programmers).
*   **Organization:** Implementation details—cache structure, bus design, control signals.

### 1.2.2 System Components
*   **Input:** Keyboards, mice, scanners capture data.
*   **Output:** Monitors, printers, speakers present results.
*   **Processing:** CPU (ALU + control unit).
*   **Memory:** RAM, ROM hold instructions & data.
*   **Storage:** HDD/SSD for long-term.

### 1.2.3 Microprocessor Basics
*   **Clock speed:** How many cycles/sec.
*   **Word length:** Bits processed in parallel (e.g. 32-bit, 64-bit).
*   **Components:** ALU, registers, control unit, bus interface.

### 1.2.4 Bus System
*   **Data bus:** Transfers actual data.
*   **Address bus:** Carries memory addresses.
*   **Control bus:** Sends control/ timing signals.

### 1.2.5 Primary Memory
*   **RAM:** Volatile read/write (DRAM, SRAM).
*   **ROM:** Non-volatile, firmware storage.
*   **Cache:** Small fast SRAM between CPU & RAM.
*   **Buffer:** Temporary data hold for I/O.

### 1.2.6 Secondary Memory
*   **Magnetic disk:** HDD platters.
*   **Flash:** USB drives, SSD chips.
*   **Optical disk:** CD/DVD/Blu-ray.
*   **External/memo stick:** Portable flash storage.

### 1.2.7 Input Devices
*   **Traditional:** Keyboard, mouse.
*   **Optical:** Scanner, digital camera.
*   **Pen-based:** Light pen, touchscreen.
*   **Recognition:** OCR (text), OMR (marks), MICR (checks), BCR (barcodes), microphone.

### 1.2.8 Output Devices
*   **Displays:** CRT, LCD, LED monitors.
*   **Printers:** Dot-matrix, inkjet, laser.
*   **Audio:** Speakers, headphones.

### 1.2.9 Hardware Interfaces
*   **Ports:** Parallel (legacy printers), serial (COM), USB (universal), HDMI (video).
*   **Slots:** PCIe, PCI for expansion cards (graphics, network).
`;

const numberSystemAndBooleanLogicNotes = `
# 2. Number Systems & Boolean Logic

## 2.1 Number Systems & Conversion
*   **Bases:** Decimal (10), binary (2), octal (8), hexadecimal (16).
*   **Convert:** Division/remainder (integer), multiply/collect (fraction).

### 2.1.2 Binary Arithmetic
*   **Addition/Subtraction:** Bitwise with carry/borrow.

### 2.1.3 Complements
*   **1’s complement:** Invert bits.
*   **2’s complement:** 1’s complement + 1 for easier subtraction.

## 2.2 Boolean Algebra & Logic Gates
*   **Boolean algebra:** Variables ∈ {0,1}, operations AND (·), OR (+), NOT (¯).
*   **Truth tables** map input combinations to outputs.
*   **Gates:** AND, OR, NOT, NAND, NOR, XOR, XNOR—each with symbol, function, table.
*   **Laws:** Identity, null, idempotent, inverse, commutative, associative, distributive, De Morgan’s.
*   **Verification:** Use truth tables to prove equivalences.
`;

const softwareAndOsNotes = `
# 3. Computer Software & Operating System

## 3.1 Software Concepts
*   **Definition:** Programs vs. data.
*   **Categories:** System (OS), utility (antivirus), application (office), web-based, mobile apps.

## 3.2 Operating System (OS)
*   **Role:** Bridge hardware/apps, manage resources.
*   **Functions:** Process scheduling, memory management, file system, device drivers, UI.
*   **Terminology:** Multiprogramming (many apps in memory), multitasking (time-slice), multiprocessing (multiple CPUs), distributed OS (networked nodes).

## 3.3 Windows OS
*   **GUI features:** Desktop, Taskbar, Start Menu.
*   **File Explorer:** File/folder management.
*   **Customization:** Wallpapers, themes, start screen.
*   **Device setup:** Install/remove printers, drives.
*   **Security:** User accounts, passwords, privacy settings.
*   **Tools:** Control Panel, System Tools (Disk Cleanup), Accessories (Notepad).

## 3.4 Open Source & Mobile OS
*   **Linux/UNIX:** Kernel, distros (Ubuntu, Fedora).
*   **Mobile OS:** Android, iOS—lightweight kernels, app stores.
`;

const applicationPackagesNotes = `
# 4. Application Packages

## 4.1 Office Suites
*   **Word Processor:** Document creation/formatting.
*   **Spreadsheet:** Data tables, formulas, charts.
*   **Presentation:** Slides, animations.
*   **DBMS:** Tables, queries, reports.

## 4.2 Domain-Specific Tools
*   **Examples:** School MIS, inventory/payroll/accounting, hotel management, weather forecasting systems.
`;

const programmingConceptsNotes = `
# 5. Programming Concepts & Logics

## 5.1 Programming Fundamentals
*   **Languages:** Low-level (Assembly), high-level (C, Python), 4GL (SQL, MATLAB).
*   **Translators:** Compiler (whole program), interpreter (line-by-line), assembler (assembly → machine).
*   **Errors:** Syntax, semantic, runtime.
*   **Control structures:** Sequence, selection (if, switch), iteration (for, while).
*   **Design tools:** Algorithms, flowcharts, pseudocode.
*   **Encodings:** Absolute binary, BCD, ASCII, Unicode.

## 5.2 C Language
*   **Features:** Portable, procedural, pointer support.
*   **Structure:** #include, main(), functions.
*   **Preprocessor:** Macros, header files.
*   **Lexical:** Character set, identifiers, keywords, tokens.
*   **Data types:** int, float, char, etc.
*   **Statements:** Simple (assignment), compound (blocks).
*   **Operators:** Arithmetic, relational, logical, bitwise, conditional.
*   **I/O:** scanf(), printf().
*   **Selection:** if, if–else, nested, switch.
*   **Loops:** while, do–while, for (including nested).
*   **Arrays:** 1D/2D, matrix ops.
*   **Strings:** strlen, strcat, strcmp, strcpy, strrev, strupr, strlwr.
`;

const webTechnology1Notes = `
# 6. Web Technology I

## 6.1–6.3 Basics
*   **Web:** Client-server model over HTTP.
*   **Browsers/Engines:** Chrome, Firefox; search engines index content.
*   **CMS:** WordPress, Drupal for site creation.

## 6.4 HTML
*   **Structure:** \`<!DOCTYPE html>\`, \`<html><head><title>\`, \`<body>\`.
*   **Tags vs. attributes:** E.g. \`<p align="center">\`.
*   **Formatting:** Headings (\`<h1>\`–\`<h6>\`), text styles (\`<b>\`, \`<i>\`, \`<u>\`), lists (\`<ol>\`, \`<ul>\`, \`<dl>\`), tables (\`<table>\`, \`<tr>\`, \`<td>\`).
*   **Links:** \`<a href="...">\`.
*   **Images/Media:** \`<img>\`, \`<audio>\`, \`<video>\`, \`<canvas>\`.
*   **Forms:** \`<form>\`, inputs, radio, checkbox, textarea, buttons.

## 6.5 CSS
*   **Inline:** \`style="..."\`.
*   **Embedded:** \`<style>\` in head.
*   **External:** .css files linked via \`<link>\`—controls layout, fonts, colors.
`;

const multimediaNotes = `
# 7. Multimedia

## 7.1–7.3 Core Concepts
*   **Components:** Text, graphics, audio, video, animation.
*   **Formats:** JPEG/PNG, MP3/WAV, MP4/AVI, GIF/SVG.
*   **Compression:** Lossy (MP3, JPEG) vs. lossless (PNG, FLAC).
*   **Applications:** E-learning, advertising, virtual tours, video calls.
`;

const infoSecurityNotes = `
# 8. Information Security & Cyber Law

## 8.1 Ethics & Society
*   Responsible computing, digital etiquette.

## 8.2 Info Security
*   **CIA triad:** Confidentiality, Integrity, Availability.

## 8.3 Cybercrime
*   Hacking, identity theft, phishing.

## 8.4 Malware & Spam
*   Viruses, worms, Trojans, junk mail.

## 8.5 Protection
*   Firewalls, antivirus, encryption, strong passwords.

## 8.6 IP Rights
*   Copyright, trademarks, software licensing.

## 8.7 Digital Signatures
*   Public-key cryptography for authentication.

## 8.8 Nepal Cyber Law
*   Local statutes on data privacy, cyber offenses.

## 8.9 ICT Policy
*   Government framework for telecom, internet governance.
`;

export const grade11ComputerNotesMap: Record<string, { notes: string; quizQuestions: number }> = {
  'computer-system': {
    notes: computerSystemNotes,
    quizQuestions: 50,
  },
  'number-system-and-conversion-boolean-logic': {
    notes: numberSystemAndBooleanLogicNotes,
    quizQuestions: 50,
  },
  'computer-software-and-operating-system': {
    notes: softwareAndOsNotes,
    quizQuestions: 50,
  },
  'application-package': {
    notes: applicationPackagesNotes,
    quizQuestions: 50,
  },
  'programming-concepts-and-logics': {
    notes: programmingConceptsNotes,
    quizQuestions: 50,
  },
  'web-technology-1': {
    notes: webTechnology1Notes,
    quizQuestions: 50,
  },
  'multimedia': {
    notes: multimediaNotes,
    quizQuestions: 50,
  },
  'information-security-and-cyber-law': {
    notes: infoSecurityNotes,
    quizQuestions: 50,
  },
};

export const grade12ComputerNotesMap: Record<string, { notes: string; quizQuestions: number }> = {
  // e.g. 'dbms-concept': { notes: '...', quizQuestions: 10 }
};
