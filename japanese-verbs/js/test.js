// irregular (v3)
// ru-verbs (v2)
// u-verbs (v1)
const IchidanNonPastPoliteAffirmative = {
    prompt: "Make it [non-past] [!polite] [affirmative]",
    getPromptVerb(verb) {
        return verb.characters;
    },
    rule: "Ichidan plain form to masu form",
    getRightAnswer(verb) {
        return verb.getPoliteNonPastAffirmative();
    },
    getCorrectionMessage(verb) {
        return "Adding [ます] to the stem is how you conjugate the masu form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!ます] to form the masu form.";
    },
};
const IchidanNonPastPoliteNegative = {
    prompt: "Make it [non-past] [!polite] [!negative]",
    getPromptVerb(verb) {
        return verb.characters;
    },
    rule: "Ichidan plain form to negative masu form",
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
const IchidanPastPlainAaffirmative = {
    prompt: "Make it [!past] [plain] [affirmative]",
    getPromptVerb(verb) {
        return verb.characters;
    },
    rule: "Ichidan plain form to past affirmative form",
    getRightAnswer(verb) {
        return verb.getPlainPastAffirmative();
    },
    getCorrectionMessage(verb) {
        return "Adding [た] to the stem is how you conjugate the past form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!た] to form the past form.";
    },
};
const IchidanPastPlainNegative = {
    prompt: "Make it [!past] [plain] [!negative]",
    getPromptVerb(verb) {
        return verb.characters;
    },
    rule: "Ichidan plain form to past negative form",
    getRightAnswer(verb) {
        return verb.getPlainPastNegative();
    },
    getCorrectionMessage(verb) {
        return "Adding [なかった] to the stem is how you conjugate the past negative form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!なかった] to form the past form.";
    },
};
const IchidanNonPastPlainNegative = {
    prompt: "Make it [non-past] [plain] [!negative]",
    getPromptVerb(verb) {
        return verb.characters;
    },
    rule: "Ichidan plain form to negative form",
    getRightAnswer(verb) {
        return verb.getPlainNonPastNegative();
    },
    getCorrectionMessage(verb) {
        return "Adding [ない] to the stem is how you conjugate the negative form.";
    },
    getRulesMessage(ver) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!ない] to form the negative masu form.";
    },
};
const IchidanPastPoliteAffirmative = {
    prompt: "Make it [!past] [!polite] [affirmative]",
    getPromptVerb(verb) {
        return verb.characters;
    },
    rule: "Ichidan past polite affirmative",
    getRightAnswer(verb) {
        return verb.getPastPoliteAffirmative();
    },
    getCorrectionMessage(verb) {
        return "Adding [ました] to the stem is how you conjugate the past polite affirmative.";
    },
    getRulesMessage(verb) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!ました] to from the past polite affirmative form.";
    },
};
const IchidanPastPoliteNegative = {
    prompt: "Make it [!past] [!polite] [!negative]",
    getPromptVerb(verb) {
        return verb.characters;
    },
    rule: "Ichidan past polite negative",
    getRightAnswer(verb) {
        return verb.getPastPoliteNegative();
    },
    getCorrectionMessage(verb) {
        return "Adding [ませんでした] to the stem is how you conjugate the past polite negative.";
    },
    getRulesMessage(verb) {
        return "Remove the trailing [る] to get the stem, " +
            "then append [!ませんでした] to from the past polite negative form.";
    },
};
export const VERB_TASKS = [
    IchidanNonPastPlainNegative,
    IchidanNonPastPoliteAffirmative,
    IchidanNonPastPoliteNegative,
    IchidanPastPlainAaffirmative,
    IchidanPastPlainNegative,
    IchidanPastPoliteAffirmative,
    IchidanPastPoliteNegative,
];
