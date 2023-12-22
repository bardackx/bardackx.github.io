/* SPDX-License-Identifier: CC-BY-4.0 */
const table = {
    "": ["あ", "い", "う", "え", "お"],
    k: ["か", "き", "く", "け", "こ"],
    g: ["が", "ぎ", "ぐ", "げ", "ご"],
    s: ["さ", "し", "す", "せ", "そ"],
    z: ["ざ", "じ", "ず", "ぜ", "ぞ"],
    t: ["た", "ち", "つ", "て", "と"],
    d: ["だ", "ぢ", "づ", "で", "ど"],
    n: ["な", "に", "ぬ", "ね", "の"],
    h: ["は", "ひ", "ふ", "へ", "ほ"],
    b: ["ば", "び", "ぶ", "べ", "ぼ"],
    p: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
    m: ["ま", "み", "む", "め", "も"],
    y: ["や", null, "ゆ", "いぇ", "よ"],
    r: ["ら", "り", "る", "れ", "ろ"],
    w: ["わ", "うぃ", null, "うぇ", "を"],
    c: [null, null, null, null, null],
    q: ["くぁ", "くぃ", "くぅ", "くぇ", "くぉ"],
    j: ["じゃ", "じ", "じゅ", "じぇ", "じょ"],
    f: ["ふぁ", "ふぃ", "ふ", "ふぇ", "ふぉ"],
    v: ["ゔぁ", "ゔぃ", "ゔ", "ゔぇ", "ゔぉ"],
    l: ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ"],
    x: ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ"],
    ky: ["きゃ", "きぃ", "きゅ", "きぇ", "きょ"],
    gy: ["ぎゃ", "ぎぃ", "ぎゅ", "ぎぇ", "ぎょ"],
    kw: ["くぁ", "くぃ", "くぅ", "くぇ", "くぉ"],
    qy: ["くゃ", "くぃ", "くゅ", "くぇ", "くゅ"],
    sw: ["すぁ", "すぃ", "すぅ", "すぇ", "すぉ"],
    sh: ["しゃ", "し", "しゅ", "しぇ", "しょ"],
    sy: ["しゃ", "しぃ", "しゅ", "しぇ", "しょ"],
    zy: ["じゃ", "じぃ", "じゅ", "じぇ", "じょ"],
    jy: ["じゃ", "じぃ", "じゅ", "じぇ", "じょ"],
    ch: ["ちゃ", "ち", "ちゅ", "ちぇ", "ちょ"],
    cy: ["ちゃ", "ちぃ", "ちゅ", "ちぇ", "ちょ"],
    ty: ["ちゃ", "ちぃ", "ちゅ", "ちぇ", "ちょ"],
    dy: ["ぢゃ", "ぢぃ", "ぢゅ", "ぢぇ", "ぢょ"],
    ts: ["つぁ", "つぃ", "つ", "つぇ", "つぉ"],
    th: ["てゃ", "てぃ", "てゅ", "てぇ", "てょ"],
    ny: ["にゃ", "にぃ", "にゅ", "にぇ", "にょ"],
    my: ["みゃ", "みぃ", "みゅ", "みぇ", "みゅ"],
    hy: ["ひゃ", "ひぃ", "ひゅ", "ひぇ", "ひょ"],
    by: ["びゃ", "びぃ", "びゅ", "びぇ", "びょ"],
    py: ["ぴゃ", "ぴぃ", "ぴゅ", "ぴぇ", "ぴょ"],
    hw: ["ふぁ", "ふぃ", null, "ふぇ", "ふぉ"],
    fy: ["ふゃ", "ふぃ", "ふゅ", "ふぇ", "ふょ"],
    ry: ["りゃ", "りぃ", "りゅ", "りぇ", "りょ"],
    ly: ["ゃ", null, "ゅ", "ぇ", "ょ"],
    lw: ["ゎ", null, null, null, null],
    xy: ["ゃ", null, "ゅ", "ぇ", "ょ"],
    vy: ["ゔゃ", null, "ゔゅ", null, "ゔょ"],
    wh: ["うぁ", "うぃ", null, "うぇ", "うぉ"],
};
const irregularTable = {
    zk: "↑",
    zh: "←",
    zj: "↓",
    zl: "→",
    xn: "ん",
    nn: "ん",
};
const vowelIndices = {
    a: 0,
    i: 1,
    u: 2,
    e: 3,
    o: 4,
};
export function romanjiToHiragana(romanji) {
    let hiragana = "";
    let row = "";
    let unhandled = "";
    const pushAndReset = (output) => {
        hiragana += output;
        unhandled = "";
        row = "";
    };
    const pushAndSlide = (output) => {
        hiragana += output;
        unhandled = unhandled.substring(1);
    };
    for (let i = 0; i < romanji.length; i++) {
        const c = romanji[i];
        unhandled += c;
        const vowelIndex = vowelIndices[c] ?? -1;
        if (vowelIndex >= 0) {
            pushAndReset(table[row][vowelIndex] ?? unhandled);
        }
        else if (irregularTable[row + c] != null) {
            pushAndReset(irregularTable[row + c]);
        }
        else if (row === "n" && table[c] != null) {
            pushAndSlide("ん");
            row = c;
        }
        else if (row === c) {
            pushAndSlide("っ");
        }
        else if (table[row + c] != null) {
            row = row + c;
        }
        else {
            pushAndReset(unhandled);
        }
    }
    return hiragana + unhandled;
}
