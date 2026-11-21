// 구구단 문제 자동 생성 함수
function makeGugudan(startDan, endDan, choiceCount = 0) {
    const list = [];
    for (let dan = startDan; dan <= endDan; dan++) {
        for (let i = 1; i <= 9; i++) {
            const ans = dan * i;
            const item = { q: `${dan} × ${i} = ?`, a: String(ans) };

            if (choiceCount > 0) {
                const choices = new Set([ans]);
                while (choices.size < choiceCount) {
                    const wrong = ans + (Math.floor(Math.random() * 11) - 5);
                    if (wrong > 0 && wrong !== ans) choices.add(wrong);
                }
                const shuffled = [...choices].sort(() => Math.random() - 0.5);
                shuffled.forEach((val, idx) => item[`c${idx + 1}`] = String(val));
                item.a = String(shuffled.indexOf(ans) + 1);
            }
            list.push(item);
        }
    }
    return list;
}

const dan2to4 = makeGugudan(2, 4);

var quizData = {
    // 필수 문제: 2~4단 중 랜덤 10문제
    required: [...dan2to4]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(item => ({ q: `[필수] ${item.q}`, a: item.a })),

    // 난이도 하: 2~4단 (주관식)
    easy: dan2to4,

    // 난이도 중: 5~7단 (3지선다)
    medium: makeGugudan(5, 7, 3),

    // 난이도 상: 8~9단 (5지선다)
    hard: makeGugudan(8, 9, 5)
};