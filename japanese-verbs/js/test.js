// irregular (v3)
// ru-verbs (v2)
// u-verbs (v1)
const FromIchidanPlainToPolite = {
    getPrompt() {
        return "Make it [!polite]";
    },
    getPromptVerb(verb) {
        return verb.characters;
    },
    getRulesTitle(verb) {
        return "Ichidan plain form to masu form";
    },
    getRightAnswer(verb) {
        return verb.getMasuForm();
    },
    getCorrectionMessage(verb) {
        return "Adding [ます] to the stem is how you conjugate the masu form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!ます] to form the masu form.";
    },
};
const FromIchidanPlainToPoliteNegative = {
    getPrompt() {
        return "Make it [!negative polite]";
    },
    getPromptVerb(verb) {
        return verb.characters;
    },
    getRulesTitle(verb) {
        return "Ichidan plain form to negative masu form";
    },
    getRightAnswer(verb) {
        return verb.getNegativeMasu();
    },
    getCorrectionMessage(verb) {
        return "Adding [ません] to the stem is how you conjugate the negative masu form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!ません] to form the negative masu form.";
    },
};
const FromIchidanPlainToPlainPast = {
    getPrompt() {
        return "Make it [!past]";
    },
    getPromptVerb(verb) {
        return verb.characters;
    },
    getRulesTitle(verb) {
        return "Ichidan plain form to past affirmative form";
    },
    getRightAnswer(verb) {
        return verb.getPast();
    },
    getCorrectionMessage(verb) {
        return "Adding [た] to the stem is how you conjugate the past form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!た] to form the past form.";
    },
};
const FromIchidanPlainToPlainPastNegative = {
    getPrompt() {
        return "Make it [!plain past negative]";
    },
    getPromptVerb(verb) {
        return verb.characters;
    },
    getRulesTitle(verb) {
        return "Ichidan plain form to past negative form";
    },
    getRightAnswer(verb) {
        return verb.getPast();
    },
    getCorrectionMessage(verb) {
        return "Adding [なかった] to the stem is how you conjugate the past negative form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!なかった] to form the past form.";
    },
};
const FromIchidanPlainToPlainNegative = {
    getPrompt() {
        return "Make it [!negative]";
    },
    getPromptVerb(verb) {
        return verb.characters;
    },
    getRulesTitle(verb) {
        return "Ichidan plain form to negative form";
    },
    getRightAnswer(verb) {
        return verb.getNegative();
    },
    getCorrectionMessage(verb) {
        return "Adding [ない] to the stem is how you conjugate the negative form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!ない] to form the negative masu form.";
    },
};
export const VERB_TASKS = [
    // non-past
    FromIchidanPlainToPlainNegative,
    FromIchidanPlainToPolite,
    FromIchidanPlainToPoliteNegative,
    // past
    FromIchidanPlainToPlainPast,
    FromIchidanPlainToPlainPastNegative,
];
