export const GAME_OPTIONS = {
  classic: {
    beHonest: ['askFront', 'askSide'],
    riddle: ['guessAnswer', 'addIncorrect'],
    trueFalse: ['answerFourOptions'],
    dailyTest: true,
  },
  'hide-and-reveal': {
    beHonest: ['dynamicFlip'],
    riddle: ['dragDrop'],
    trueFalse: ['randomOrder'],
    dailyTest: true,
  },
  'true-or-false': {
    beHonest: ['showVeracity'],
    trueFalse: ['answerTrueFalse'],
    dailyTest: true,
  },
}; 