const Validator = {
  checkAssessment(assessment) {
    if (!assessment) return { valid: false, error: '数据为空' };
    if (!assessment.id) return { valid: false, error: '缺少id' };
    if (!assessment.name) return { valid: false, error: '缺少名称' };
    if (!Array.isArray(assessment.questions) || assessment.questions.length === 0) {
      return { valid: false, error: '缺少题目' };
    }
    return { valid: true };
  },

  checkAnswers(answers, total) {
    if (!Array.isArray(answers)) return { valid: false, error: '答案格式错误' };
    if (answers.length < total) return { valid: false, error: '还有题目未完成' };
    return { valid: true };
  }
};

export default Validator;
