import { Node } from '../models/Rule';

export function createRule(ruleString: string): Node {
  // Implement parsing logic to convert ruleString to AST
  // This is a simplified implementation
  const tokens = ruleString.split(' ');
  return parseTokens(tokens);
}

function parseTokens(tokens: string[]): Node {
  if (tokens.length === 1) {
    return { type: 'operand', value: tokens[0] };
  }

  const operatorIndex = tokens.findIndex(t => t === 'AND' || t === 'OR');
  if (operatorIndex !== -1) {
    return {
      type: 'operator',
      value: tokens[operatorIndex],
      left: parseTokens(tokens.slice(0, operatorIndex)),
      right: parseTokens(tokens.slice(operatorIndex + 1)),
    };
  }

  return { type: 'operand', value: tokens.join(' ') };
}

export function combineRules(rules: string[]): Node {
  const astRules = rules.map(createRule);
  return {
    type: 'operator',
    value: 'AND',
    left: astRules[0],
    right: astRules.length > 1 ? combineRules(rules.slice(1)) : undefined,
  };
}

export function evaluateRule(rule: Node, data: Record<string, any>): boolean {
  if (rule.type === 'operand') {
    // Implement condition evaluation logic
    const [attribute, operator, value] = rule.value.split(' ');
    const dataValue = data[attribute];
    switch (operator) {
      case '>': return dataValue > parseFloat(value);
      case '<': return dataValue < parseFloat(value);
      case '=': return dataValue === value.replace(/'/g, '');
      default: return false;
    }
  }

  if (rule.type === 'operator') {
    const leftResult = rule.left ? evaluateRule(rule.left, data) : true;
    const rightResult = rule.right ? evaluateRule(rule.right, data) : true;
    return rule.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
  }

  return false;
}