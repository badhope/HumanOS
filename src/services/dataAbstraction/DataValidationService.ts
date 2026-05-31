import { 
  UnifiedAssessmentResult, 
  DataValidation,
  ValidationError,
  ValidationWarning 
} from '../../types/dataAbstraction';

class DataValidationService {
  validateResult(result: UnifiedAssessmentResult): DataValidation {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    this.validateId(result, errors);
    this.validateAssessmentId(result, errors, warnings);
    this.validateTimestamp(result, errors, warnings);
    this.validateTotalScore(result, errors, warnings);
    this.validateTraits(result, errors, warnings);
    this.validateRawAnswers(result, errors, warnings);
    this.validateMetadata(result, warnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      metadata: {
        checkedAt: Date.now(),
        checkedFields: [
          'id', 'assessmentId', 'timestamp', 'totalScore',
          'traits', 'rawAnswers', 'metadata'
        ]
      }
    };
  }

  private validateId(result: UnifiedAssessmentResult, errors: ValidationError[]): void {
    if (!result.id) {
      errors.push({
        field: 'id',
        message: '结果ID不能为空',
        code: 'MISSING_ID',
        severity: 'error'
      });
    } else if (typeof result.id !== 'string') {
      errors.push({
        field: 'id',
        message: '结果ID必须是字符串类型',
        code: 'INVALID_ID_TYPE',
        severity: 'error'
      });
    }
  }

  private validateAssessmentId(result: UnifiedAssessmentResult, errors: ValidationError[], warnings: ValidationWarning[]): void {
    if (!result.assessmentId) {
      errors.push({
        field: 'assessmentId',
        message: '测评ID不能为空',
        code: 'MISSING_ASSESSMENT_ID',
        severity: 'error'
      });
    }

    const validAssessmentIds = ['big-five', 'stress-test', 'anxiety-gad7'];
    if (result.assessmentId && !validAssessmentIds.includes(result.assessmentId)) {
      warnings.push({
        field: 'assessmentId',
        message: '测评ID不在已知列表中',
        suggestion: '请确保这是正确的测评ID'
      });
    }
  }

  private validateTimestamp(result: UnifiedAssessmentResult, errors: ValidationError[], warnings: ValidationWarning[]): void {
    if (!result.timestamp) {
      errors.push({
        field: 'timestamp',
        message: '时间戳不能为空',
        code: 'MISSING_TIMESTAMP',
        severity: 'error'
      });
    } else {
      const timestamp = result.timestamp;
      const now = Date.now();
      
      if (timestamp > now) {
        errors.push({
          field: 'timestamp',
          message: '时间戳不能是未来时间',
          code: 'FUTURE_TIMESTAMP',
          severity: 'error'
        });
      } else if (timestamp < 0) {
        errors.push({
          field: 'timestamp',
          message: '时间戳不能为负数',
          code: 'NEGATIVE_TIMESTAMP',
          severity: 'error'
        });
      }

      const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
      if (timestamp < oneYearAgo) {
        warnings.push({
          field: 'timestamp',
          message: '测评时间已超过一年',
          suggestion: '建议重新进行测评以获得更准确的结果'
        });
      }
    }
  }

  private validateTotalScore(result: UnifiedAssessmentResult, errors: ValidationError[], warnings: ValidationWarning[]): void {
    if (typeof result.totalScore !== 'number') {
      errors.push({
        field: 'totalScore',
        message: '总分必须是数字类型',
        code: 'INVALID_SCORE_TYPE',
        severity: 'error'
      });
    } else {
      if (result.totalScore < 0) {
        errors.push({
          field: 'totalScore',
          message: '总分不能为负数',
          code: 'NEGATIVE_SCORE',
          severity: 'error'
        });
      }

      const maxScore = this.getMaxScoreByAssessmentId(result.assessmentId);
      if (maxScore && result.totalScore > maxScore) {
        errors.push({
          field: 'totalScore',
          message: `总分超过最大允许值 ${maxScore}`,
          code: 'SCORE_EXCEEDS_MAX',
          severity: 'error'
        });
      }

      if (result.totalScore === 0) {
        warnings.push({
          field: 'totalScore',
          message: '总分为0，可能表示测评未完成',
          suggestion: '请检查测评是否已完成'
        });
      }
    }
  }

  private validateTraits(result: UnifiedAssessmentResult, errors: ValidationError[], warnings: ValidationWarning[]): void {
    if (!result.traits || !Array.isArray(result.traits)) {
      errors.push({
        field: 'traits',
        message: '特质数据必须是数组类型',
        code: 'INVALID_TRAITS_TYPE',
        severity: 'error'
      });
      return;
    }

    if (result.traits.length === 0) {
      warnings.push({
        field: 'traits',
        message: '特质数据为空',
        suggestion: '测评结果可能不完整'
      });
    }

    result.traits.forEach((trait, index) => {
      if (!trait.name) {
        errors.push({
          field: `traits[${index}].name`,
          message: `第${index + 1}个特质名称不能为空`,
          code: 'MISSING_TRAIT_NAME',
          severity: 'error'
        });
      }

      if (typeof trait.score !== 'number') {
        errors.push({
          field: `traits[${index}].score`,
          message: `第${index + 1}个特质的分数必须是数字`,
          code: 'INVALID_TRAIT_SCORE',
          severity: 'error'
        });
      } else if (trait.score < 0 || trait.score > 100) {
        warnings.push({
          field: `traits[${index}].score`,
          message: `第${index + 1}个特质的分数超出正常范围(0-100)`,
          suggestion: '请检查分数计算是否正确'
        });
      }
    });
  }

  private validateRawAnswers(result: UnifiedAssessmentResult, errors: ValidationError[], warnings: ValidationWarning[]): void {
    if (!result.rawAnswers || typeof result.rawAnswers !== 'object') {
      errors.push({
        field: 'rawAnswers',
        message: '原始答案必须是对象类型',
        code: 'INVALID_ANSWERS_TYPE',
        severity: 'error'
      });
      return;
    }

    const answerCount = Object.keys(result.rawAnswers).length;
    const expectedCount = this.getExpectedQuestionCount(result.assessmentId);
    
    if (expectedCount && answerCount < expectedCount) {
      warnings.push({
        field: 'rawAnswers',
        message: `答案数量(${answerCount})少于预期(${expectedCount})`,
        suggestion: '部分题目可能未作答'
      });
    }
  }

  private validateMetadata(result: UnifiedAssessmentResult, warnings: ValidationWarning[]): void {
    if (!result.metadata) {
      warnings.push({
        field: 'metadata',
        message: '元数据缺失',
        suggestion: '建议补充完整的元数据信息'
      });
      return;
    }

    if (result.metadata.duration && result.metadata.duration < 0) {
      warnings.push({
        field: 'metadata.duration',
        message: '测评时长不能为负数',
        suggestion: '请检查时长记录'
      });
    }

    if (result.metadata.completed === false) {
      warnings.push({
        field: 'metadata.completed',
        message: '测评标记为未完成',
        suggestion: '建议完成测评或删除此结果'
      });
    }
  }

  private getMaxScoreByAssessmentId(assessmentId: string): number {
    const maxScores: Record<string, number> = {
      'big-five': 300,
      'stress-test': 120,
      'anxiety-gad7': 84
    };
    return maxScores[assessmentId] || 0;
  }

  private getExpectedQuestionCount(assessmentId: string): number {
    const questionCounts: Record<string, number> = {
      'big-five': 60,
      'stress-test': 30,
      'anxiety-gad7': 28
    };
    return questionCounts[assessmentId] || 0;
  }

  validateBatchResults(results: UnifiedAssessmentResult[]): DataValidation[] {
    return results.map(result => this.validateResult(result));
  }

  getValidationSummary(validations: DataValidation[]): {
    total: number;
    valid: number;
    invalid: number;
    warnings: number;
  } {
    return {
      total: validations.length,
      valid: validations.filter(v => v.valid).length,
      invalid: validations.filter(v => !v.valid).length,
      warnings: validations.reduce((sum, v) => sum + v.warnings.length, 0)
    };
  }

  filterInvalidResults(results: UnifiedAssessmentResult[]): {
    valid: UnifiedAssessmentResult[];
    invalid: { result: UnifiedAssessmentResult; validation: DataValidation }[];
  } {
    const valid: UnifiedAssessmentResult[] = [];
    const invalid: { result: UnifiedAssessmentResult; validation: DataValidation }[] = [];

    results.forEach(result => {
      const validation = this.validateResult(result);
      if (validation.valid) {
        valid.push(result);
      } else {
        invalid.push({ result, validation });
      }
    });

    return { valid, invalid };
  }
}

export const dataValidationService = new DataValidationService();
