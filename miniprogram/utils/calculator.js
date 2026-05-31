const Calculator = {
  calculate(assessment, answers) {
    const { questions, scoring } = assessment;
    const answerMap = this.buildAnswerMap(answers);

    const dimensions = scoring.dimensions.map(dim => {
      const score = this.calcDimensionScore(dim, answerMap, questions);
      return {
        key: dim.key,
        name: dim.name,
        score,
        desc: this.getDimensionDesc(dim.key, score)
      };
    });

    const overallScore = this.calcOverallScore(dimensions);
    const template = this.matchTemplate(scoring.ranges, overallScore);

    return {
      overallScore,
      dimensions,
      title: template.title,
      summary: template.summary,
      desc: template.desc
    };
  },

  buildAnswerMap(answers) {
    const map = {};
    answers.forEach(a => {
      map[a.questionId] = a.value;
    });
    return map;
  },

  calcDimensionScore(dimension, answerMap, questions) {
    const { questionIds } = dimension;
    let total = 0;
    let count = 0;

    questionIds.forEach(qid => {
      const question = questions.find(q => q.id === qid);
      if (question && answerMap[qid] !== undefined) {
        let value = answerMap[qid];
        if (question.reverse) {
          if (question.options && question.options.length > 0) {
            const maxValue = Math.max(...question.options.map(o => o.value));
            const minValue = Math.min(...question.options.map(o => o.value));
            value = maxValue + minValue - value;
          }
        }
        total += value;
        count++;
      }
    });

    if (count === 0) return 0;

    const maxPossible = count * 5;
    const minPossible = count * 1;
    const normalized = ((total - minPossible) / (maxPossible - minPossible)) * 100;

    return Math.round(Math.max(0, Math.min(100, normalized)));
  },

  calcOverallScore(dimensions) {
    if (dimensions.length === 0) return 0;
    const sum = dimensions.reduce((acc, d) => acc + d.score, 0);
    return Math.round(sum / dimensions.length);
  },

  matchTemplate(ranges, score) {
    for (const range of ranges) {
      if (score >= range.min && score <= range.max) {
        return range.template;
      }
    }
    return ranges[0]?.template || { title: '', summary: '', desc: '' };
  },

  getDimensionDesc(key, score) {
    if (score >= 70) return '较高';
    if (score >= 40) return '中等';
    return '较低';
  }
};

export default Calculator;
