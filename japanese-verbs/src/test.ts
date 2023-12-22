// irregular (v3)
// ru-verbs (v2)
// u-verbs (v1)

import { Verb, WritingReadingPair } from "./japanese";

export interface VerbTask {
  prompt: string;
  rule: string;
  getPromptVerb(verb: Verb): readonly WritingReadingPair[];
  getRightAnswer(verb: Verb): string;
  getCorrectionMessage(verb: Verb): string;
  getRulesMessage(verb: Verb): string;
}

const IchidanNonPastPoliteAffirmative: VerbTask = {
  prompt: "Make it [non-past] [!polite] [affirmative]",
  getPromptVerb(verb) {
    return verb.characters;
  },
  rule: "Ichidan plain form to masu form",
  getRightAnswer(verb: Verb) {
    return verb.getPoliteNonPastAffirmative();
  },
  getCorrectionMessage(verb: Verb) {
    return "Adding [ます] to the stem is how you conjugate the masu form.";
  },
  getRulesMessage(ver: Verb) {
    return "Remove the trailing [る] to get the stem, " +
      "then append [!ます] to form the masu form.";
  },
};

const IchidanNonPastPoliteNegative: VerbTask = {
  prompt: "Make it [non-past] [!polite] [!negative]",
  getPromptVerb(verb) {
    return verb.characters;
  },
  rule: "Ichidan plain form to negative masu form",
  getRightAnswer(verb: Verb) {
    return verb.getNegativeMasu();
  },
  getCorrectionMessage(verb: Verb) {
    return "Adding [ません] to the stem is how you conjugate the negative masu form.";
  },
  getRulesMessage(ver: Verb) {
    return "Remove the trailing [る] to get the stem, " +
      "then append [!ません] to form the negative masu form.";
  },
};

const IchidanPastPlainAaffirmative: VerbTask = {
  prompt: "Make it [!past] [plain] [affirmative]",
  getPromptVerb(verb) {
    return verb.characters;
  },
  rule: "Ichidan plain form to past affirmative form",
  getRightAnswer(verb: Verb) {
    return verb.getPlainPastAffirmative();
  },
  getCorrectionMessage(verb: Verb) {
    return "Adding [た] to the stem is how you conjugate the past form.";
  },
  getRulesMessage(ver: Verb) {
    return "Remove the trailing [る] to get the stem, " +
      "then append [!た] to form the past form.";
  },
};

const IchidanPastPlainNegative: VerbTask = {
  prompt: "Make it [!past] [plain] [!negative]",
  getPromptVerb(verb) {
    return verb.characters;
  },
  rule: "Ichidan plain form to past negative form",
  getRightAnswer(verb: Verb) {
    return verb.getPlainPastNegative();
  },
  getCorrectionMessage(verb: Verb) {
    return "Adding [なかった] to the stem is how you conjugate the past negative form.";
  },
  getRulesMessage(ver: Verb) {
    return "Remove the trailing [る] to get the stem, " +
      "then append [!なかった] to form the past form.";
  },
};

const IchidanNonPastPlainNegative: VerbTask = {
  prompt: "Make it [non-past] [plain] [!negative]",
  getPromptVerb(verb) {
    return verb.characters;
  },
  rule: "Ichidan plain form to negative form",
  getRightAnswer(verb: Verb) {
    return verb.getPlainNonPastNegative();
  },
  getCorrectionMessage(verb: Verb) {
    return "Adding [ない] to the stem is how you conjugate the negative form.";
  },
  getRulesMessage(ver: Verb) {
    return "Remove the trailing [る] to get the stem, " +
      "then append [!ない] to form the negative masu form.";
  },
};

const IchidanPastPoliteAffirmative: VerbTask = {
  prompt: "Make it [!past] [!polite] [affirmative]",
  getPromptVerb(verb) {
    return verb.characters;
  },
  rule: "Ichidan past polite affirmative",
  getRightAnswer(verb: Verb) {
    return verb.getPastPoliteAffirmative();
  },
  getCorrectionMessage(verb) {
    return "Adding [ました] to the stem is how you conjugate the past polite affirmative.";
  },
  getRulesMessage(verb) {
    return "Remove the trailing [る] to get the stem, " +
      "then append [ました] to from the past polite affirmative form.";
  },
};

const IchidanPastPoliteNegative: VerbTask = {
  prompt: "Make it [!past] [!polite] [!negative]",
  getPromptVerb(verb) {
    return verb.characters;
  },
  rule: "Ichidan past polite negative",
  getRightAnswer(verb: Verb) {
    return verb.getPastPoliteNegative();
  },
  getCorrectionMessage(verb) {
    return "Adding [ませんでした] to the stem is how you conjugate the past polite negative.";
  },
  getRulesMessage(verb) {
    return "Remove the trailing [る] to get the stem, " +
      "then append [ませんでした] to from the past polite negative form.";
  },
};

export const VERB_TASKS: ReadonlyArray<VerbTask> = [
//  IchidanNonPastPlainNegative,
//  IchidanNonPastPoliteAffirmative,
//  IchidanNonPastPoliteNegative,
  IchidanPastPlainAaffirmative,
//  IchidanPastPlainNegative,
//  IchidanPastPoliteAffirmative,
//  IchidanPastPoliteNegative,
];
