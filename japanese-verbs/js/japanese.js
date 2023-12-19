export var VerbType;
(function (VerbType) {
    VerbType[VerbType["Ichidan"] = 0] = "Ichidan";
    VerbType[VerbType["Godan"] = 1] = "Godan";
    VerbType[VerbType["Irregular"] = 2] = "Irregular";
})(VerbType || (VerbType = {}));
export class Verb {
    type;
    word;
    reading;
    characters;
    constructor(type, word, reading, characters) {
        this.type = type;
        this.word = word;
        this.reading = reading;
        this.characters = characters;
    }
    getPast() {
        switch (this.type) {
            case VerbType.Ichidan:
                return this.getStem() + "た";
        }
        throw new Error("TODO");
    }
    getStem() {
        switch (this.type) {
            case VerbType.Ichidan:
                return this.reading.substring(0, this.reading.length - 1);
        }
        throw new Error("TODO");
    }
    getMasuForm() {
        switch (this.type) {
            case VerbType.Ichidan:
                return this.getStem() + "ます";
        }
        throw new Error("TODO");
    }
    getNegative() {
        switch (this.type) {
            case VerbType.Ichidan:
                return this.getStem() + "ない";
        }
        throw new Error("TODO");
    }
    getNegativeMasu() {
        switch (this.type) {
            case VerbType.Ichidan:
                return this.getStem() + "ません";
        }
        throw new Error("TODO");
    }
}
function parseWritingAndReading(input) {
    const output = [];
    let mode = "both";
    let reading = "";
    let writing = "";
    for (const c of Array.from(input)) {
        if (mode === "both") {
            if (c === "(") {
                mode = "writing";
            }
            else if (c === ")" || c === ",") {
                throw new Error(`Bad input '${input}'`);
            }
            else {
                output.push({
                    reading: c,
                    writing: c,
                });
            }
        }
        else if (mode === "writing") {
            if (c === ")" || (c === "," && writing === "")) {
                throw new Error(`Bad input '${input}'`);
            }
            else if (c === ",") {
                mode = "reading";
            }
            else {
                writing += c;
            }
        }
        else if (mode === "reading") {
            if (c === "(" || c === ",") {
                throw new Error(`Bad input '${input}'`);
            }
            else if (c === ")") {
                mode = "both";
                output.push({
                    reading,
                    writing,
                });
                reading = "";
                writing = "";
            }
            else {
                reading += c;
            }
        }
    }
    return output;
}
export const VERBS = [
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
    const [typeCode, verb, reading, writingAndReading] = string.split(";").map((e) => e.trim());
    const type = typeCode === "5"
        ? VerbType.Godan
        : typeCode === "1"
            ? VerbType.Ichidan
            : VerbType.Irregular;
    return new Verb(type, verb, reading, parseWritingAndReading(writingAndReading));
});
export const ICHIDAN_VERBS = VERBS.filter((e) => e.type === VerbType.Ichidan);
export function romanjiToHiragana(romanji) {
    romanji = romanji.toLowerCase();
    const hiraganaMap = {
        a: "あ",
        i: "い",
        u: "う",
        e: "え",
        o: "お",
        ka: "か",
        ki: "き",
        ku: "く",
        ke: "け",
        ko: "こ",
        sa: "さ",
        si: "し",
        shi: "し",
        su: "す",
        se: "せ",
        so: "そ",
        ta: "た",
        chi: "ち",
        tsu: "つ",
        te: "て",
        to: "と",
        na: "な",
        ni: "に",
        nu: "ぬ",
        ne: "ね",
        no: "の",
        ha: "は",
        hi: "ひ",
        fu: "ふ",
        he: "へ",
        ho: "ほ",
        ma: "ま",
        mi: "み",
        mu: "む",
        me: "め",
        mo: "も",
        ya: "や",
        yu: "ゆ",
        yo: "よ",
        ra: "ら",
        ri: "り",
        ru: "る",
        re: "れ",
        ro: "ろ",
        wa: "わ",
        wo: "を",
        nn: "ん",
        ga: "が",
        gi: "ぎ",
        gu: "ぐ",
        ge: "げ",
        go: "ご",
        za: "ざ",
        nji: "んじ",
        ji: "じ",
        zu: "ず",
        ze: "ぜ",
        zo: "ぞ",
        da: "だ",
        dji: "ぢ",
        dzu: "づ",
        de: "で",
        do: "ど",
        ba: "ば",
        bi: "び",
        bu: "ぶ",
        be: "べ",
        bo: "ぼ",
        pa: "ぱ",
        pi: "ぴ",
        pu: "ぷ",
        pe: "ぺ",
        po: "ぽ",
    };
    let hiraganaResult = "";
    let i = 0;
    while (i < romanji.length) {
        let found = false;
        // Check for the small tsu (っ) for doubled consonants
        if (romanji[i] === romanji[i + 1] && romanji[i] !== "n") {
            hiraganaResult += "っ";
            i++;
            found = true;
        }
        else {
            for (let j = 3; j > 0; j--) {
                const substr = romanji.substr(i, j);
                if (hiraganaMap[substr]) {
                    hiraganaResult += hiraganaMap[substr];
                    i += j;
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            hiraganaResult += romanji[i];
            i++;
        }
    }
    return hiraganaResult;
}
// Example usage
const romanjiInput = "tsuyokatta";
const hiraganaOutput = romanjiToHiragana(romanjiInput);
console.log(hiraganaOutput); // Output: つよかった
