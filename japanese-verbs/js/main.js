import { getRandomElementFromArray } from "./array-utils.js";
import { ICHIDAN_VERBS, } from "./japanese.js";
import { romanjiToHiragana } from "./romanjiToHiragana.js";
import { VERB_TASKS } from "./test.js";
class VerbLearningTool {
    instructionsElement;
    verbElement;
    formElement;
    inputElement;
    feedbackElement;
    ruleElement;
    successElement;
    primaryActionElement;
    success = false;
    verb;
    input = "";
    task;
    constructor() {
        this.instructionsElement = document.querySelector("#instructions");
        this.verbElement = document.querySelector("#verb");
        this.formElement = document.querySelector("form");
        this.formElement.onsubmit = (event) => {
            event.preventDefault();
            this.submit();
        };
        this.inputElement = document.querySelector("input");
        this.inputElement.oninput = (e) => {
            this.input = this.inputElement.value;
            this.input = romanjiToHiragana(this.input);
            this.inputElement.value = this.input;
        };
        this.feedbackElement = document.querySelector("#feedback");
        this.ruleElement = document.querySelector("#rule");
        this.successElement = document.querySelector("#success");
        this.primaryActionElement = document.querySelector("#primary-action");
    }
    submit() {
        if (this.success) {
            this.reset();
            return;
        }
        this.fromPlainToNegativeForm();
    }
    // private fromMasuTo
    changeToSuccessState(html) {
        this.success = true;
        this.clearFeedback();
        this.clearRule();
        this.primaryActionElement.innerHTML = "Next";
        this.successElement.classList.remove("hidden");
        this.successElement.innerHTML = html;
        this.inputElement.disabled = true;
        this.primaryActionElement.focus();
    }
    fromPlainToNegativeForm() {
        // THIS SHOULD CALL A METHOD WITH
        // - EXPECTED INPUT STRING
        // - GUIDANCE ON FAIL
        //
        // SO THAT CONFUSIONS ARE REUSED FOR EVERY CASE
        const userInput = romanjiToHiragana(this.input.trim());
        const rightAnswer = this.task.getRightAnswer(this.verb);
        // RETURN IF EXPECTED EQUALS USER INPUT
        if (userInput === rightAnswer) {
            this.changeToSuccessState("Correct");
            return;
        }
        this.clearSuccess();
        // CONFUSIONS
        const confusionTask = VERB_TASKS.find((e) => e.getRightAnswer(this.verb) === userInput);
        if (confusionTask != null) {
            this.feedbackElement.classList.remove("hidden");
            this.feedbackElement.innerHTML = `<p>
        Not quite. ${confusionTask.getCorrectionMessage(this.verb)}
      </p>`;
        }
        // RULES FROM THE TASK
        this.ruleElement.classList.remove("hidden");
        this.ruleElement.innerHTML = "<p class='black solid oversize p8 mb4'>" +
            myMarkdownToHtml(this.task.rule) + "</p><p>" +
            myMarkdownToHtml(this.task.getRulesMessage(this.verb)) + "</p>";
        // ERROR STAMP
        const stamp = document.createElement("span");
        stamp.className = "mistake-stamp";
        stamp.innerText = "誤";
        stamp.style.transform = `rotate(${(1 - Math.random() * 2) * 30}deg) translate(${(1 - Math.random() * 2) * 24}px, ${(1 - Math.random() * 2) * 24}px)`;
        stamp.addEventListener("animationend", () => document.body.removeChild(stamp));
        document.body.appendChild(stamp);
        console.log({
            userInput,
            rightAnswer,
        });
    }
    clearRule() {
        this.ruleElement.classList.add("hidden");
        this.ruleElement.innerHTML = "";
    }
    clearSuccess() {
        this.successElement.classList.add("hidden");
        this.successElement.innerHTML = "";
    }
    clearInput() {
        this.inputElement.value = "";
    }
    clearFeedback() {
        this.feedbackElement.classList.add("hidden");
        this.feedbackElement.innerHTML = "";
    }
    reset() {
        let nextVerb = undefined;
        for (let i = 0; i < 10; i++) {
            nextVerb = getRandomElementFromArray(ICHIDAN_VERBS);
            if (nextVerb !== this.verb) {
                break;
            }
        }
        let nextTask = undefined;
        for (let i = 0; i < 10; i++) {
            nextTask = getRandomElementFromArray(VERB_TASKS);
            if (nextTask !== this.task) {
                break;
            }
        }
        this.setTaskAndVerb(nextTask, nextVerb);
        this.inputElement.disabled = false;
        this.inputElement.focus();
        this.primaryActionElement.innerHTML = "Ok";
        this.success = false;
        this.clearFeedback();
        this.clearSuccess();
        this.clearInput();
        this.feedbackElement.classList.add("hidden");
        this.ruleElement.classList.add("hidden");
    }
    setTaskAndVerb(task, verb) {
        this.task = task;
        this.verb = verb;
        this.instructionsElement.innerHTML = myMarkdownToHtml(task.prompt);
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
    // tool.submit();
}
function myMarkdownToHtml(md) {
    let html = "";
    for (let i = 0; i < md.length; i++) {
        if (md[i] === "[") {
            html += "<span class='tag";
            if (md[i + 1] === "!") {
                html += " black";
                i++;
            }
            if (md[i + 1] === "-") {
                html += " red";
                i++;
            }
            html += "'>";
        }
        else if (md[i] === "]") {
            html += "</span>";
        }
        else {
            html += md[i];
        }
    }
    return html;
}
