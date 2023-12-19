import { getRandomElementFromArray } from "./array-utils.js";
import {
  ICHIDAN_VERBS,
  romanjiToHiragana,
  Verb,
  VerbType,
} from "./japanese.js";
import { VERB_TASKS, VerbTask } from "./test.js";

class VerbLearningTool {
  private instructionsElement: HTMLParagraphElement;
  private verbElement: HTMLElement;
  private formElement: HTMLFormElement;
  private inputElement: HTMLInputElement;
  private feedbackElement: HTMLDivElement;
  private ruleElement: HTMLDivElement;
  private successElement: HTMLDivElement;
  private primaryActionElement: HTMLButtonElement;

  private success = false;
  private verb: Verb;
  private input: string = "";
  private task: VerbTask;

  constructor() {
    this.instructionsElement = document.querySelector("#instructions");
    this.verbElement = document.querySelector("#verb");
    this.formElement = document.querySelector("form") as HTMLFormElement;
    this.formElement.onsubmit = (event) => {
      event.preventDefault();
      this.submit();
    };
    this.inputElement = document.querySelector("input") as HTMLInputElement;
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

  private changeToSuccessState(html: string) {
    this.success = true;
    this.clearFeedback();
    this.clearRule();
    this.primaryActionElement.innerHTML = "Next";
    this.successElement.classList.remove("hidden");
    this.successElement.innerHTML = html;
    this.inputElement.disabled = true;
    this.primaryActionElement.focus();
  }

  private fromPlainToNegativeForm() {
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

    const confusionTask = VERB_TASKS.find((e) =>
      e.getRightAnswer(this.verb) === userInput
    );
    if (confusionTask != null) {
      this.feedbackElement.classList.remove("hidden");
      this.feedbackElement.innerHTML = `<p>
        Not quite. ${confusionTask.getCorrectionMessage(this.verb)}
      </p>`;
    }

    /*
    const katta = "かった";
    // CREATE A LIST OF CONFUSIONS LIKE THIS AND SHOW THEM ON MATCH
    if (userInput === stemKatta) {
      this.feedbackElement.classList.remove("hidden");
      this.feedbackElement.innerHTML = `<p>
      Not quite, adding <span class='tag'>${katta}</span> to the stem is how
      you express the past tense of an <b>い-adjective</b>, not a verb
      </p>`;
    }
    */

    // CONFUSIONS

    // RULES FROM THE TASK
    this.ruleElement.classList.remove("hidden");
    this.ruleElement.innerHTML = "<p class='black solid oversize p8 mb4'>" +
      this.task.getRulesTitle(this.verb) + "</p><p>" +
      this.task.getRulesMessage(this.verb) + "</p>";

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
    let nextVerb: Verb = undefined;
    for (let i = 0; i < 10; i++) {
      nextVerb = getRandomElementFromArray(ICHIDAN_VERBS);
      if (nextVerb !== this.verb) {
        break;
      }
    }
    let nextTask: VerbTask = undefined;
    for (let i = 0; i < 10; i++) {
      nextTask = getRandomElementFromArray(VERB_TASKS);
      if (nextTask !== this.task) {
        break;
      }
    }
    this.setTaskAndVerb(
      nextTask,
      nextVerb,
    );
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

  setTaskAndVerb(task: VerbTask, verb: Verb) {
    this.task = task;
    this.verb = verb;
    this.instructionsElement.innerHTML = task.getPrompt(this.verb);
    this.renderVerb();
  }

  private renderVerb() {
    this.verbElement.innerHTML = this.verb.characters.map((c) =>
      `<my-chip main='${c.writing}' alt='${c.reading}'></my-chip>`
    ).join("");
  }
}

let tool: VerbLearningTool;

export function init() {
  tool = new VerbLearningTool();
  tool.reset();
  // tool.submit();
}
