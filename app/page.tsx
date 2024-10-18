"use client"

import React, { useState } from 'react';
import RuleCreator from '../components/RuleCreator';
import RuleCombiner from '../components/RuleCombiner';
import RuleEvaluator from '../components/RuleEvaluator';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRuleCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Rule Engine</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RuleCreator onRuleCreated={handleRuleCreated} />
        <RuleCombiner refreshTrigger={refreshTrigger} />
        <RuleEvaluator refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}