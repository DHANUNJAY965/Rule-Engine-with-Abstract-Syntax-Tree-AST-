import { createRule, combineRules, evaluateRule } from '../lib/ruleEngine';
import { Node } from '../models/Rule';

describe('Rule Engine', () => {
  // Test Case 1: Create individual rules
  it('should create individual rules and verify their AST representation', () => {
    const ruleString1 = "age >= 30 AND salary < 60000";
    const rule1: Node = createRule(ruleString1);
    
    expect(rule1).toEqual({
      type: 'operator',
      value: 'AND',
      left: { type: 'operand', value: 'age >= 30' },
      right: { type: 'operand', value: 'salary < 60000' }
    });

    const ruleString2 = "experience > 2";
    const rule2: Node = createRule(ruleString2);
    
    expect(rule2).toEqual({
      type: 'operand',
      value: 'experience > 2'
    });
  });

  // Test Case 2: Combine rules
  it('should combine the example rules and ensure the resulting AST reflects the combined logic', () => {
    const rules = [
      "age >= 30 AND salary < 60000",
      "experience > 2"
    ];
    const combinedRule: Node = combineRules(rules);
    
    expect(combinedRule).toEqual({
      type: 'operator',
      value: 'AND',
      left: {
        type: 'operator',
        value: 'AND',
        left: { type: 'operand', value: 'age >= 30' },
        right: { type: 'operand', value: 'salary < 60000' }
      },
      right: { type: 'operand', value: 'experience > 2' }
    });
  });

  // Test Case 3: Evaluate rules with sample JSON data
  it('should evaluate the rule correctly for given data scenarios', () => {
    const rule: Node = combineRules([
      "age >= 30 AND salary < 60000",
      "experience > 2"
    ]);

    const data1 = { age: 35, salary: 50000, experience: 3 };
    const result1 = evaluateRule(rule, data1);
    expect(result1).toBe(true); // Should evaluate to true

    const data2 = { age: 25, salary: 55000, experience: 3 };
    const result2 = evaluateRule(rule, data2);
    expect(result2).toBe(false); // Should evaluate to false
  });

  // Test Case 4: Explore combining additional rules and test functionality
  it('should combine additional rules and test the functionality', () => {
    const additionalRules = [
      "salary >= 40000",
      "department = 'Sales'"
    ];
    const combinedRule: Node = combineRules(additionalRules);
  
    expect(combinedRule).toEqual({
      type: 'operator',
      value: 'AND',
      left: { type: 'operand', value: 'salary >= 40000' },
      right: { type: 'operand', value: "department = 'Sales'" }
    });
  });
});
