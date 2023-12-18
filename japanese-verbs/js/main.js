import { getRandomElementFromArray } from "./array-utils.js";
import { ICHIDAN_VERBS, romanjiToHiragana, } from "./japanese.js";
class VerbLearningTool {
    instructionsElement;
    verbElement;
    formElement;
    inputElement;
    feedbackElement;
    ruleElement;
    verb;
    input = "";
    constructor() {
        this.instructionsElement = document.querySelector("#instructions");
        this.verbElement = document.querySelector("#verb");
        this.formElement = document.querySelector("form");
        this.formElement.onsubmit = (event) => {
            event.preventDefault();
            this.submit();
        };
        this.inputElement = document.querySelector("input");
        this.inputElement.oninput = (e) => this.input = this.inputElement.value;
        this.feedbackElement = document.querySelector("#feedback");
        this.ruleElement = document.querySelector("#rule");
    }
    submit() {
        this.fromPlainToNegativeForm();
    }
    // private fromMasuTo
    fromPlainToNegativeForm() {
        // THIS SHOULD CALL A METHOD WITH
        // - EXPECTED INPUT STRING
        // - GUIDANCE ON FAIL
        // 
        // SO THAT CONFUSIONS ARE REUSED FOR EVERY CASE
        const userInput = romanjiToHiragana(this.input);
        const plainPastForm = this.verb.getPlainPastForm();
        // RETURN IF EXPECTED EQUALS USER INPUT
        if (userInput === plainPastForm) {
            this.reset();
            return;
        }
        const katta = "かった";
        const stemKatta = this.verb.getStem() + katta;
        // CREATE A LIST OF CONFUSIONS LIKE THIS AND SHOW THEM ON MATCH
        if (userInput === stemKatta) {
            this.feedbackElement.classList.remove("hidden");
            this.feedbackElement.innerHTML = `<p>
      Not quite, adding <span class='tag'>${katta}</span> to the stem is how
      you express the past tense of an <b>い-adjective</b>, not a verb
      </p>`;
        }
        // CREATE A LIST OF RULES LIKE THIS AND SHOW THEM ALWAYS
        this.ruleElement.classList.remove("hidden");
        this.ruleElement.innerHTML = `
      <p class="black solid oversize p8 mb4">Ichidan plain form → past plain form</p>
      
      <p>
        Remove the trailing <span class="tag">る</span> to get the stem:
        <span class="dark tag">食べ<span class="slash">る</span></span> →
        <span class="tag">食べ</span>, 
        then attach <span class="black tag">た</span> to the stem
      </p>
      
      <hr class="oversize" />
      
      <p style="text-align: right">
        <span class="dark tag">食べ<span class="slash">る</span></span> +
        <span class="black tag">た</span> →
        <span class="black tag">食べた</span>
      </p>
      `;
        console.log({
            userInput,
            plainPastForm,
            stemKatta,
        });
    }
    reset() {
        this.verb = getRandomElementFromArray(ICHIDAN_VERBS);
        this.instructionsElement.innerHTML = `Change to 
      <span class='black tag'>plain past form</span>
    `;
        this.feedbackElement.classList.add("hidden");
        this.ruleElement.classList.add("hidden");
        this.renderVerb();
    }
    renderVerb() {
        this.verbElement.innerHTML = this.verb.characters.map((c) => `<my-chip main='${c.writing}' alt='${c.reading}'></my-chip>`).join("");
    }
}
let tool;
export function init() {
    tool = new VerbLearningTool();
    tool.reset();
    tool.submit();
}
