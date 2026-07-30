const fs = require('fs');
const path = './data/translations.js';

let content = fs.readFileSync(path, 'utf8');

// Replace long text with short, engaging text
const replacements = {
    // Foundations
    "f_l1_p1: 'Classical computers use bits (0 or 1). Quantum computers use qubits, which can exist as 0, 1, or any quantum superposition of these states. This fundamental difference enables quantum computers to solve certain complex problems exponentially faster.'": 
    "f_l1_p1: 'Classical bits are just 0 or 1. Qubits? They can be 0, 1, or <strong>both at once</strong>! This quantum superpower lets them crush complex problems.'",
    
    "f_l1_p2: 'Physically, qubits can be realized using superconducting circuits, trapped ions, or photons. They must be kept isolated at near absolute zero to maintain their fragile quantum states.'":
    "f_l1_p2: 'Qubits are built from super-cooled circuits or trapped atoms. They are super fragile and must be kept colder than deep space!'",
    
    "f_sup_p1: 'Superposition allows a qubit to be in a linear combination of |0⟩ and |1⟩. When measured, it collapses to a single state.'":
    "f_sup_p1: 'Superposition means being in multiple states simultaneously. But peek at it (measure), and it instantly snaps to just 0 or 1!'",
    
    "f_ent_p1: 'Entanglement links qubits so that measuring one instantly determines the state of the other, no matter the distance. Einstein famously called this \"spooky action at a distance\".'":
    "f_ent_p1: 'Entanglement magically links qubits. Measure one, and its partner instantly reacts—even if it is across the galaxy! Einstein called it \"spooky\".'",
    
    // Gates
    "g_l1_p1: 'Quantum gates manipulate qubits, changing their states. Unlike classical gates (AND, OR), quantum gates must be reversible and are represented by unitary matrices.'":
    "g_l1_p1: 'Quantum gates flip, spin, and twist qubits. Unlike classical AND/OR gates, every quantum move is totally reversible!'",
    
    "g_pauli_p: 'The Pauli-X gate acts as a quantum NOT gate, flipping |0⟩ to |1⟩ and vice versa. Pauli-Y and Pauli-Z apply phase shifts along their respective axes.'":
    "g_pauli_p: 'The <strong>Pauli-X</strong> is a quantum NOT gate. <strong>Y and Z</strong> apply funky phase shifts to spin the qubit around.'",
    
    "g_hadamard_p: 'The H gate creates superposition. Applying it to |0⟩ produces an equal probability of measuring 0 or 1. It is the gateway to quantum parallel processing.'":
    "g_hadamard_p: 'The <strong>Hadamard (H)</strong> gate is the magic wand. It blasts a basic qubit into a 50/50 superposition!'",
    
    // Algorithms
    "a_l1_p1: 'Quantum algorithms use superposition, entanglement, and interference to solve specific problems faster than any known classical algorithm. The two most famous are Shor\\'s and Grover\\'s.'":
    "a_l1_p1: 'Quantum algorithms use interference to amplify the right answers and cancel out the wrong ones. <strong>Shor\\'s</strong> and <strong>Grover\\'s</strong> are the rockstars here.'",
    
    "a_grover_p1: 'Grover\\'s algorithm searches an unsorted database of N items in √N steps, providing a quadratic speedup over classical linear search (N steps).'":
    "a_grover_p1: 'Looking for a needle in a haystack? <strong>Grover\\'s algorithm</strong> finds it in √N steps instead of N. A massive quadratic speed boost!'",
    
    "a_shor_p1: 'Shor\\'s algorithm factors large numbers in polynomial time, exponentially faster than classical computers. This theoretically breaks RSA encryption.'":
    "a_shor_p1: '<strong>Shor\\'s algorithm</strong> factors huge numbers exponentially fast. It is so powerful it could one day break modern internet security!'",
    
    // Crypto
    "c_l1_p1: 'Quantum cryptography uses the principles of quantum mechanics to guarantee secure communication. It is theoretically unbreakable because any eavesdropping alters the quantum state.'":
    "c_l1_p1: 'Quantum crypto uses physics for perfect security. If a hacker tries to eavesdrop, the quantum state collapses and sounds the alarm!'",
    
    "c_bb84_p: 'The BB84 protocol (1984) uses polarized photons to create a shared secret key. If Eve intercepts the photons, the error rate spikes, alerting Alice and Bob.'":
    "c_bb84_p: '<strong>BB84</strong> uses polarized photons to share a secret key. If Eve snoops, the error rate spikes and she is instantly busted!'",
    
    "c_threat_p: 'While quantum computers can break RSA via Shor\\'s algorithm, QKD provides a quantum-safe defense. The transition to Post-Quantum Cryptography (PQC) is already underway.'":
    "c_threat_p: 'Quantum computers might break RSA, but <strong>QKD</strong> provides an unhackable defense. The race for quantum-safe security is on!'"
};

for (const [oldText, newText] of Object.entries(replacements)) {
    content = content.replace(oldText, newText);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Translations updated successfully.");
