# Assessment Content System

## Overview

HumanOS uses a JSON-based question bank system that allows adding new assessments without code changes. Each assessment belongs to a **family** and has multiple **versions** (Lite, Standard, Expert).

## Directory Structure

```
public/assessments/
├── family-registry.json     # Registry of all assessment families
├── personality/
│   └── mbti/
│       ├── lite.json
│       ├── standard.json
│       └── expert.json
├── psychology/
│   ├── stress/
│   │   ├── lite.json
│   │   ├── standard.json
│   │   └── expert.json
│   └── resilience/
│       ├── lite.json
│       ├── standard.json
│       └── expert.json
├── cognition/
│   ├── logic/
│   │   ├── lite.json
│   │   ├── standard.json
│   │   └── expert.json
│   └── focus/
│       ├── lite.json
│       ├── standard.json
│       └── expert.json
├── ideology/
│   └── values/
│       ├── lite.json
│       ├── standard.json
│       └── expert.json
└── career/
    ├── holland/
    │   ├── lite.json
    │   ├── standard.json
    │   └── expert.json
    └── work-style/
        ├── lite.json
        ├── standard.json
        └── expert.json
```

## Assessment JSON Schema

### Top-Level Fields

```json
{
  "id": "mbti-standard",
  "slug": "mbti-standard",
  "familyId": "mbti",
  "familyName": "MBTI 职业性格测试",
  "category": "personality",
  "description": "MBTI 标准版...",
  "shortDescription": "32题标准版MBTI测试",
  "versionLevel": "standard",
  "version": "1.0.0",
  "estimatedMinutes": 15,
  "questionCount": 32,
  "difficulty": "medium",
  "tags": ["人格", "性格", "MBTI"],
  "disclaimer": "本测评结果仅供参考...",
  "dimensions": [...],
  "scoring": {...},
  "questions": [...],
  "resultProfiles": [...]
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique assessment ID |
| `slug` | string | URL-friendly identifier |
| `familyId` | string | Family identifier |
| `familyName` | string | Display name |
| `category` | string | Category: personality/psychology/cognition/ideology/career |
| `versionLevel` | string | lite/standard/expert |
| `dimensions` | array | Result dimensions |
| `questions` | array | Questions array |

### Dimensions

```json
"dimensions": [
  {
    "id": "EI",
    "name": "外向-内向",
    "description": "您获取能量的方式"
  }
]
```

### Questions

```json
"questions": [
  {
    "id": "mbti-std-1",
    "text": "您更倾向于：",
    "type": "single-choice",
    "dimension": "EI",
    "options": [
      { "id": "A", "text": "与他人相处获得能量", "value": 3 },
      { "id": "B", "text": "独自思考获得能量", "value": -3 }
    ]
  }
]
```

### Question Types

| Type | Description | Options Format |
|------|-------------|----------------|
| `single-choice` | Pick one option | Array of options with `id`, `text`, `value` |
| `multiple-choice` | Pick multiple options | Array of options with `id`, `text`, `value` |
| `likert-5` | 5-point scale | 5 options with values 1-5 |
| `likert-7` | 7-point scale | 7 options with values 1-7 |
| `ranking` | Order options | Array with `id`, `text`, `value` |

### Scoring

```json
"scoring": {
  "type": "dichotomous",
  "dimensionScores": {
    "EI": { "positive": "E", "negative": "I" },
    "SN": { "positive": "S", "negative": "N" }
  }
}
```

Or for weighted scoring:

```json
"scoring": {
  "type": "weighted",
  "dimensionScores": {
    "stressLoad": { "weights": { "high": 3, "medium": 2, "low": 1 } }
  },
  "normalize": true,
  "minScore": 20,
  "maxScore": 80
}
```

### Result Profiles

```json
"resultProfiles": [
  {
    "id": "intj",
    "name": "建筑师型",
    "description": "您是理性而有洞察力的人...",
    "conditions": [
      { "dimension": "EI", "operator": "lte", "value": -1 },
      { "dimension": "SN", "operator": "gte", "value": 1 }
    ],
    "tags": ["理性", "独立", "战略"],
    "summary": "您是 INTJ 建筑师型人格...",
    "highlights": [...],
    "recommendations": [...]
  }
]
```

### Condition Operators

| Operator | Description |
|----------|-------------|
| `eq` | Equal to |
| `neq` | Not equal to |
| `gt` | Greater than |
| `gte` | Greater than or equal |
| `lt` | Less than |
| `lte` | Less than or equal |
| `between` | Between two values (array) |

## Family Registry

The `family-registry.json` registers all assessment families:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-21",
  "families": [
    {
      "familyId": "mbti",
      "familyName": "MBTI 职业性格测试",
      "category": "personality",
      "description": "...",
      "icon": "Users",
      "color": "purple",
      "versions": [
        {
          "level": "lite",
          "name": "MBTI 简单版",
          "description": "...",
          "estimatedMinutes": 5,
          "questionCount": 12,
          "recommended": false,
          "status": "active"
        }
      ]
    }
  ]
}
```

### Version Status

| Status | Meaning |
|--------|---------|
| `active` | Fully available for users |
| `preparing` | Content being developed |
| `maintenance` | Temporarily unavailable |

## Version Guidelines

### Lite Version

- **Purpose**: Quick experience, first contact
- **Questions**: 8-15
- **Time**: 3-5 minutes
- **Dimensions**: Core dimensions only
- **Result**: Basic profile

### Standard Version

- **Purpose**: Main recommended version
- **Questions**: 15-30
- **Time**: 8-12 minutes
- **Dimensions**: All core dimensions
- **Result**: Full analysis with recommendations
- **Recommended**: true

### Expert Version

- **Purpose**: Deep, comprehensive assessment
- **Questions**: 30-60
- **Time**: 15-25 minutes
- **Dimensions**: Core + sub-dimensions
- **Result**: Detailed analysis with stability checks
- **Features**: More boundary questions, cross-validation

## Adding a New Assessment

### Step 1: Create Directory

```
public/assessments/:category/:family-name/
```

### Step 2: Create Version Files

Create at least `standard.json`. Add `lite.json` and `expert.json` for full version support.

### Step 3: Update Registry

Add the family entry to `family-registry.json`.

### Step 4: Test

Run the app and verify the assessment appears in the correct category.

## Question Bank Quality Standards

1. **No biased questions**: Questions should not lead to a specific answer
2. **Clear wording**: Each question has only one interpretation
3. **Appropriate difficulty**: Not too easy or too hard
4. **Balanced options**: For single-choice, options should be roughly equal in appeal
5. **Consistent scale**: Likert scales should have balanced positive/negative options
6. **No duplicate questions**: Each question should be unique
7. **Result coverage**: Every profile should have recommendations

## Localization

All user-facing text in JSON files should be in Chinese (Simplified). Future support for English can be added with separate locale files.
