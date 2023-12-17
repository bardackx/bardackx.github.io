type WritingReadingPair = {
  writing: string;
  reading: string;
};

enum VerbType {
  Ichidan,
  Godan,
  Irregular,
}

class Verb {
  constructor(
    readonly type: VerbType,
    readonly word: string,
    readonly reading: string,
    readonly characters: ReadonlyArray<WritingReadingPair>,
  ) {
  }
}

function parseThing(input: string): ReadonlyArray<WritingReadingPair> {
  const output: Array<WritingReadingPair> = [];
  let mode: "writing" | "reading" | "both" = "both";
  let reading = "";
  let writing = "";
  for (const c of Array.from(input)) {
    if (mode === "both") {
      if (c === "(") {
        mode = "writing";
      } else if (c === ")" || c === ",") {
        throw new Error(`Bad input '${input}'`);
      } else {
        output.push({
          reading: c,
          writing: c,
        });
      }
    } else if (mode === "writing") {
      if (c === ")" || (c === "," && writing === "")) {
        throw new Error(`Bad input '${input}'`);
      } else if (c === ",") {
        mode = "reading";
      } else {
        writing += c;
      }
    } else if (mode === "reading") {
      if (c === "(" || c === ",") {
        throw new Error(`Bad input '${input}'`);
      } else if (c === ")") {
        mode = "both";
        output.push({
          reading,
          writing,
        });
        reading = "";
        writing = "";
      } else {
        reading += c;
      }
    }
  }
  return output;
}

const VERBS: ReadonlyArray<Verb> = [
  "1; 食べる; たべる; (食,た)べる",
  "1; 着る; きる; (着,き)る",
  "1; 信じる; しんじる; (信,しん)じる",
  "1; 寝る; ねる; (寝,ね)る",
  "1; 起きる; おきる; (起,あ)きる",
  "1; 出る; でる; (出,で)る",
  "1; 掛ける; かける; (掛,か)ける",
  "1; 捨てる; すてる; (捨,す)てる",
  "1; 調べる; しらべる; (調,しら)べる",
  //
  "5; 話す; はなす; (話,はな)す",
  "5; 聞く; きく; (聞,き)く",
  "5; 泳ぐ; およぐ; (泳,およ)ぐ",
  "5; 遊ぶ; あそぶ; (遊,あそぶ)ぶ",
  "5; 待つ; まつ; (待,ま)つ",
  "5; 飲む; のむ; (飲,の)む",
  "5; 直る; なおる; (直,なお)る",
  "5; 死ぬ; しぬ; (死,し)ぬ",
  "5; 買う; かう; (買,か)う",
  //
  "?; する; する; する",
  "?; くる; かる; くる",
  /*
  */
].map((string) => {
  const [typeCode, verb, reading, writingAndReading] = string.split(";").map(
    (e) => e.trim(),
  );
  const type = typeCode === "5"
    ? VerbType.Godan
    : typeCode === "1"
    ? VerbType.Ichidan
    : VerbType.Irregular;
  return new Verb(type, verb, reading, parseThing(writingAndReading));
});

const ICHIDAN_VERBS = VERBS.filter((e) => e.type === VerbType.Ichidan);

function getRandomElementFromArray<E>(array: ReadonlyArray<E>): E {
  const index = Math.floor(array.length * Math.random());
  return array[index];
}

function getVerb(): string {
  return document.querySelector(".verb")?.innerHTML ?? "";
}

function setVerbData(verb: Verb) {
  document.querySelector(".verb")!.innerHTML = verb.word;
  document.querySelector(".verb-reading")!.innerHTML = verb.reading;
}

function getInputText(): string {
  return document.querySelector(".input")?.innerHTML ?? "";
}

function test() {
  const inputText = getInputText();
}

function getEnumValuesAsArray<T>(obj: any): ReadonlyArray<T> {
  return Object.keys(obj).filter((k) => !Number.isNaN(k)) as T[];
}

class Task {
  constructor(
    readonly setup: () => void,
  ) {
  }
}

function setInstructions(html: string) {
  document.querySelector("#instructions")!.innerHTML = html;
}
let currentVerb: Verb | null = null;
function setVerb(verb: Verb) {
  const html = verb.characters.map((c) => `
    <my-chip main="${c.writing}" alt="${c.reading}"></my-chip>
  `).join("")
  document.querySelector("#verb")!.innerHTML = html;
}

const ICHIDAN_SHORT_NON_PAST_TO_NEGATIVE = new Task(
  () => {
    setInstructions(`
      Change to 
        <span class='black tag'>short</span>
        <span class='black tag'>nonpast</span>
        <span class='black tag'>negative</span>
    `);
    const verb = getRandomElementFromArray(ICHIDAN_VERBS);
    setVerb(verb);
  },
);

function reset() {
  // const verb = getRandomElementFromArray(VERBS);
  // setVerbData(verb);

  ICHIDAN_SHORT_NON_PAST_TO_NEGATIVE.setup();
}

// INK
// NOTE
// PAPER

// class='hc' = HIGH_CONTRAST = INK
// class='lc' = LOW_CONTRAST = NOTE
// class='nc' = NO_CONTRAST = PAPER
