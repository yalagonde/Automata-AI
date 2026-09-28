// =====================================
// GLOBAL VARIABLE
// =====================================

let selectedAutomata = "";


// =====================================
// SELECT AUTOMATA TYPE
// =====================================

function selectType(type) {

    selectedAutomata = type;

    document.getElementById("selectedType").innerText = type;

    document.getElementById("dfaBtn").classList.remove("active");
    document.getElementById("nfaBtn").classList.remove("active");
    document.getElementById("enfaBtn").classList.remove("active");
    document.getElementById("reBtn").classList.remove("active");

    if (type === "DFA") {

        document.getElementById("dfaBtn").classList.add("active");

        document.getElementById("question").placeholder =
            "Example: Construct DFA for strings ending with 01";
    }

    else if (type === "NFA") {

        document.getElementById("nfaBtn").classList.add("active");

        document.getElementById("question").placeholder =
            "Example: Construct NFA for strings containing ab";
    }

    else if (type === "ENFA") {

        document.getElementById("enfaBtn").classList.add("active");

        document.getElementById("question").placeholder =
            "Example: Construct ε-NFA for a or b";
    }

    else if (type === "RE") {

        document.getElementById("reBtn").classList.add("active");

        document.getElementById("question").placeholder =
            "Example: Convert (a+b)*abb into automata";
    }
}


// =====================================
// GENERATE AUTOMATA
// =====================================

function generateAutomata() {

    if (selectedAutomata === "") {

        alert("Please select Automata Type.");

        return;
    }

    let alphabetInput =
        document.getElementById("alphabet").value.trim();

    let question =
        document.getElementById("question").value.trim();

    let testString =
        document.getElementById("testString").value.trim();


    if (alphabetInput === "") {

        alert("Please enter alphabet.");

        return;
    }


    if (question === "") {

        alert("Please enter question.");

        return;
    }


    // =================================
    // CONVERT ALPHABET INTO ARRAY
    // =================================

    let alphabet = alphabetInput
        .split(",")
        .map(symbol => symbol.trim())
        .filter(symbol => symbol !== "");


    // =================================
    // BASIC INFORMATION
    // =================================

    let explanation = `

        <h3>Automata Information</h3>

        <p>
            <b>Automata Type:</b>
            ${selectedAutomata}
        </p>

        <p>
            <b>Alphabet:</b>
            { ${alphabet.join(", ")} }
        </p>

        <p>
            <b>Question:</b>
            ${question}
        </p>

    `;


    // =================================
    // DFA
    // =================================

    if (selectedAutomata === "DFA") {

        explanation += `

            <hr>

            <h3>🔵 DFA</h3>

            <p>
                DFA means
                <b>Deterministic Finite Automaton</b>.
            </p>

            <p>
                The transition table is generated
                according to the selected language condition.
            </p>

        `;


        let dfa = generateDFA(alphabet, question);


        createDFATableFromData(
            alphabet,
            dfa.transitions,
            dfa.finalStates
        );


        createDFADiagramFromData(
            alphabet,
            dfa.transitions,
            dfa.finalStates
        );
    }


    // =================================
    // NFA
    // =================================

    else if (selectedAutomata === "NFA") {

        explanation += `

            <hr>

            <h3>🟢 NFA</h3>

            <p>
                NFA means
                <b>Non-Deterministic Finite Automaton</b>.
            </p>

            <p>
                One state may have multiple transitions
                for the same input symbol.
            </p>

        `;

        createNFATable(alphabet);

        createNFADiagram(alphabet);
    }


    // =================================
    // ε-NFA
    // =================================

    else if (selectedAutomata === "ENFA") {

        explanation += `

            <hr>

            <h3>🟠 ε-NFA</h3>

            <p>
                ε-NFA allows epsilon transitions.
            </p>

        `;

        createENFATable(alphabet);

        createENFADiagram(alphabet);
    }


    // =================================
    // REGULAR EXPRESSION
    // =================================

    else if (selectedAutomata === "RE") {

        explanation += `

            <hr>

            <h3>🟣 Regular Expression</h3>

            <p>
                Regular Expression describes a regular language.
            </p>

            <p>
                Example:
                <b>(a+b)*abb</b>
            </p>

        `;

        createREOutput();
    }


    document.getElementById("explanation").innerHTML =
        explanation;


    // =================================
    // TEST STRING
    // =================================

    if (testString !== "") {

        document.getElementById("result").innerHTML = `

            <div class="success">

                🧪 Test String:
                <b>${testString}</b>

                <br><br>

                Selected:
                <b>${selectedAutomata}</b>

            </div>

        `;
    }

    else {

        document.getElementById("result").innerHTML = "";
    }
}


// =====================================================
// ACTUAL DFA GENERATOR
// =====================================================

function generateDFA(alphabet, question) {

    let text = question.toLowerCase();


    // =================================================
    // CASE 1:
    // STRINGS ENDING WITH 01
    // =================================================

    if (
        text.includes("ending with 01") ||
        text.includes("ends with 01")
    ) {

        if (
            alphabet.includes("0") &&
            alphabet.includes("1")
        ) {

            return {

                transitions: {

                    "q0": {
                        "0": "q1",
                        "1": "q0"
                    },

                    "q1": {
                        "0": "q1",
                        "1": "q2"
                    },

                    "q2": {
                        "0": "q1",
                        "1": "q0"
                    }
                },

                finalStates: ["q2"]
            };
        }
    }


    // =================================================
    // CASE 2:
    // STRINGS ENDING WITH 10
    // =================================================

    if (
        text.includes("ending with 10") ||
        text.includes("ends with 10")
    ) {

        if (
            alphabet.includes("0") &&
            alphabet.includes("1")
        ) {

            return {

                transitions: {

                    "q0": {
                        "0": "q0",
                        "1": "q1"
                    },

                    "q1": {
                        "0": "q2",
                        "1": "q1"
                    },

                    "q2": {
                        "0": "q0",
                        "1": "q1"
                    }
                },

                finalStates: ["q2"]
            };
        }
    }


    // =================================================
    // CASE 3:
    // STRINGS ENDING WITH A SYMBOL
    // =================================================

    if (text.includes("ending with a")) {

        if (alphabet.includes("a")) {

            return {

                transitions: {

                    "q0": {},
                    "q1": {}
                },

                finalStates: ["q1"]
            };
        }
    }


    // =================================================
    // CASE 4:
    // STRINGS STARTING WITH 0
    // =================================================

    if (
        text.includes("starting with 0") ||
        text.includes("starts with 0")
    ) {

        if (
            alphabet.includes("0") &&
            alphabet.includes("1")
        ) {

            return {

                transitions: {

                    "q0": {
                        "0": "q1",
                        "1": "q2"
                    },

                    "q1": {
                        "0": "q1",
                        "1": "q1"
                    },

                    "q2": {
                        "0": "q2",
                        "1": "q2"
                    }
                },

                finalStates: ["q1"]
            };
        }
    }


    // =================================================
    // CASE 5:
    // CONTAINS 11
    // =================================================

    if (
        text.includes("contains 11") ||
        text.includes("contain 11")
    ) {

        if (
            alphabet.includes("0") &&
            alphabet.includes("1")
        ) {

            return {

                transitions: {

                    "q0": {
                        "0": "q0",
                        "1": "q1"
                    },

                    "q1": {
                        "0": "q0",
                        "1": "q2"
                    },

                    "q2": {
                        "0": "q2",
                        "1": "q2"
                    }
                },

                finalStates: ["q2"]
            };
        }
    }


    // =================================================
    // CASE 6:
    // CONTAINS 00
    // =================================================

    if (
        text.includes("contains 00") ||
        text.includes("contain 00")
    ) {

        if (
            alphabet.includes("0") &&
            alphabet.includes("1")
        ) {

            return {

                transitions: {

                    "q0": {
                        "0": "q1",
                        "1": "q0"
                    },

                    "q1": {
                        "0": "q2",
                        "1": "q0"
                    },

                    "q2": {
                        "0": "q2",
                        "1": "q2"
                    }
                },

                finalStates: ["q2"]
            };
        }
    }


    // =================================================
    // DEFAULT DFA
    // =================================================

    return generateDefaultDFA(alphabet);
}


// =====================================================
// DEFAULT DFA
// =====================================================

function generateDefaultDFA(alphabet) {

    let transitions = {

        "q0": {},
        "q1": {},
        "q2": {}
    };


    alphabet.forEach((symbol, index) => {

        if (index === 0) {

            transitions["q0"][symbol] = "q1";

            transitions["q1"][symbol] = "q1";

            transitions["q2"][symbol] = "q2";
        }

        else {

            transitions["q0"][symbol] = "q0";

            transitions["q1"][symbol] = "q2";

            transitions["q2"][symbol] = "q2";
        }

    });


    return {

        transitions: transitions,

        finalStates: ["q2"]

    };
}


// =====================================================
// DFA TABLE
// =====================================================

function createDFATableFromData(alphabet, transitions, finalStates) {

    let html = `
        <h3>🔵 DFA Transition Table</h3>

        <div style="overflow-x:auto;">

        <table class="dfa-table">

            <thead>
                <tr>
                    <th>State</th>
    `;

    // प्रत्येक symbol साठी स्वतंत्र column
    for (let i = 0; i < alphabet.length; i++) {
        html += `<th>${alphabet[i]}</th>`;
    }

    html += `
                </tr>
            </thead>

            <tbody>
    `;

    let states = Object.keys(transitions);

    states.forEach(state => {

        let arrow = state === "q0" ? "→ " : "";
        let star = finalStates.includes(state) ? "* " : "";

        html += `
            <tr>
                <td><b>${arrow}${star}${state}</b></td>
        `;

        // प्रत्येक alphabet symbol साठी वेगळा <td>
        for (let i = 0; i < alphabet.length; i++) {

            let symbol = alphabet[i];

            let nextState =
                transitions[state][symbol] || "∅";

            html += `
                <td>${nextState}</td>
            `;
        }

        html += `
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>

        </div>
    `;

    document.getElementById("transitionTable").innerHTML = html;
}

   
                
        

      


// =====================================================
// DFA DIAGRAM
// =====================================================

function createDFADiagramFromData(
    alphabet,
    transitions,
    finalStates
) {

    let html = `

        <h3>🔵 DFA State Diagram</h3>

        <div class="diagramText">

    `;


    html += `<b>Start → q0</b><br><br>`;


    Object.keys(transitions).forEach(state => {

        alphabet.forEach(symbol => {

            let next =
                transitions[state][symbol];

            if (next) {

                html += `
                    ${state}
                    ── ${symbol} ──→
                    ${next}
                    <br>
                `;
            }

        });

    });


    html += `<br>`;


    finalStates.forEach(state => {

        html += `
            ⭐ ${state} = Final State
            <br>
        `;

    });


    html += `

        </div>

    `;


    document.getElementById("diagram").innerHTML =
        html;
}


// =====================================================
// NFA TABLE
// =====================================================

function createNFATable(alphabet) {

    let html = `

        <h3>🟢 NFA Transition Table</h3>

        <table>

            <tr>

                <th>State</th>

    `;


    alphabet.forEach(symbol => {

        html += `<th>${symbol}</th>`;

    });


    html += `</tr>`;


    html += `

        <tr>

            <td>→ q0</td>
    `;


    alphabet.forEach(() => {

        html += `<td>{q1,q2}</td>`;

    });


    html += `

        </tr>

        <tr>

            <td>q1</td>
    `;


    alphabet.forEach(() => {

        html += `<td>q2</td>`;

    });


    html += `

        </tr>

        <tr>

            <td>* q2</td>
    `;


    alphabet.forEach(() => {

        html += `<td>∅</td>`;

    });


    html += `

        </tr>

        </table>

    `;


    document.getElementById("transitionTable").innerHTML =
        html;
}


// =====================================================
// NFA DIAGRAM
// =====================================================

function createNFADiagram(alphabet) {

    let first = alphabet[0] || "a";


    document.getElementById("diagram").innerHTML = `

        <h3>🟢 NFA State Diagram</h3>

        <div class="diagramText">

            Start → q0

            <br><br>

            q0 ── ${first} ──→ q1

            <br>

            q0 ── ${first} ──→ q2

            <br><br>

            ⭐ q2 = Final State

        </div>

    `;
}


// =====================================================
// ε-NFA TABLE
// =====================================================

function createENFATable(alphabet) {

    let html = `

        <h3>🟠 ε-NFA Transition Table</h3>

        <table>

            <tr>

                <th>State</th>

    `;


    alphabet.forEach(symbol => {

        html += `<th>${symbol}</th>`;

    });


    html += `<th>ε</th></tr>`;


    html += `<tr><td>→ q0</td>`;


    alphabet.forEach(() => {

        html += `<td>∅</td>`;

    });


    html += `<td>q1</td></tr>`;


    html += `<tr><td>q1</td>`;


    alphabet.forEach((symbol, index) => {

        if (index === 0) {

            html += `<td>q2</td>`;

        }

        else {

            html += `<td>∅</td>`;

        }

    });


    html += `<td>∅</td></tr>`;


    html += `<tr><td>* q2</td>`;


    alphabet.forEach(() => {

        html += `<td>∅</td>`;

    });


    html += `<td>∅</td></tr>`;


    html += `</table>`;


    document.getElementById("transitionTable").innerHTML =
        html;
}


// =====================================================
// ε-NFA DIAGRAM
// =====================================================

function createENFADiagram(alphabet) {

    let first = alphabet[0] || "a";


    document.getElementById("diagram").innerHTML = `

        <h3>🟠 ε-NFA State Diagram</h3>

        <div class="diagramText">

            Start → q0

            <br><br>

            q0 ── ε ──→ q1

            <br><br>

            q1 ── ${first} ──→ q2

            <br><br>

            ⭐ q2 = Final State

        </div>

    `;
}


// =====================================================
// REGULAR EXPRESSION
// =====================================================

function createREOutput() {

    document.getElementById("transitionTable").innerHTML = `

        <h3>🟣 Regular Expression Conversion</h3>

        <table>

            <tr>

                <th>Step</th>

                <th>Conversion</th>

            </tr>

            <tr>

                <td>1</td>

                <td>Regular Expression</td>

            </tr>

            <tr>

                <td>2</td>

                <td>RE → ε-NFA</td>

            </tr>

            <tr>

                <td>3</td>

                <td>ε-NFA → NFA</td>

            </tr>

            <tr>

                <td>4</td>

                <td>NFA → DFA</td>

            </tr>

        </table>

    `;


    document.getElementById("diagram").innerHTML = `

        <h3>🟣 Conversion</h3>

        <div class="diagramText">

            Regular Expression

            <br>

            ↓

            <br>

            ε-NFA

            <br>

            ↓

            <br>

            NFA

            <br>

            ↓

            <br>

            DFA

        </div>

    `;
}