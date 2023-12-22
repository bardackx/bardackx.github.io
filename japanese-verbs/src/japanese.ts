export type WritingReadingPair = {
  writing: string;
  reading: string;
};

export enum VerbType {
  Ichidan,
  Godan,
  Irregular,
}

export class Verb {
  constructor(
    readonly type: VerbType,
    readonly word: string,
    readonly reading: string,
    readonly characters: ReadonlyArray<WritingReadingPair>,
  ) {
  }
  getStem() {
    switch (this.type) {
      case VerbType.Ichidan:
        return this.reading.substring(0, this.reading.length - 1);
    }
    throw new Error("TODO");
  }
  getPlainPastAffirmative() {
    switch (this.type) {
      case VerbType.Ichidan:
        return this.getStem() + "た";
    }
    throw new Error("TODO");
  }
  getPlainPastNegative() {
    switch (this.type) {
      case VerbType.Ichidan:
        return this.getStem() + "なかった";
    }
    throw new Error("TODO");
  }
  getPoliteNonPastAffirmative() {
    switch (this.type) {
      case VerbType.Ichidan:
        return this.getStem() + "ます";
    }
    throw new Error("TODO");
  }
  getPlainNonPastNegative(): string {
    switch (this.type) {
      case VerbType.Ichidan:
        return this.getStem() + "ない";
    }
    throw new Error("TODO");
  }
  getNegativeMasu(): string {
    switch (this.type) {
      case VerbType.Ichidan:
        return this.getStem() + "ません";
    }
    throw new Error("TODO");
  }
}

function parseWritingAndReading(
  input: string,
): ReadonlyArray<WritingReadingPair> {
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

export const VERBS: ReadonlyArray<Verb> = [
  "1; 食べる; たべる; (食,た)べる",
  "1; 着る; きる; (着,き)る",
  "1; 信じる; しんじる; (信,しん)じる",
  "1; 寝る; ねる; (寝,ね)る",
  "1; 起きる; おきる; (起,お)きる",
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
].map((string) => {
  const [typeCode, verb, reading, writingAndReading] = string.split(";").map(
    (e) => e.trim(),
  );
  const type = typeCode === "5"
    ? VerbType.Godan
    : typeCode === "1"
    ? VerbType.Ichidan
    : VerbType.Irregular;
  return new Verb(
    type,
    verb,
    reading,
    parseWritingAndReading(writingAndReading),
  );
});

export const ICHIDAN_VERBS: ReadonlyArray<Verb> = VERBS.filter((e) =>
  e.type === VerbType.Ichidan
);
