


"use client"

import React, { useState, useEffect } from 'react';

interface RuleEvaluatorProps {
  refreshTrigger: number;
}

export default function RuleEvaluator({ refreshTrigger }: RuleEvaluatorProps) {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [userData, setUserData] = useState('');
  const [result, setResult] = useState(null);

  const fetchRules = async () => {
    try {
      const response = await fetch('/api/getRules');
      const data = await response.json();
      if (data.success) {
        setRules(data.rules);
      }
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, [refreshTrigger]);

  const handleEvaluate = async () => {
    try {
      const userDataObj = JSON.parse(userData);
      const response = await fetch('/api/evaluateRule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleId: selectedRule, data: userDataObj }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      } else {
        alert('Error evaluating rule');
      }
    } catch (error) {
      alert('Error evaluating rule or invalid JSON data');
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Evaluate Rule</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ruleSelect">
          Select Rule
        </label>
        <select
          id="ruleSelect"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={selectedRule}
          onChange={(e) => setSelectedRule(e.target.value)}
        >
          <option value="">Select a rule</option>
          {rules.map((rule) => (
            <option key={rule._id} value={rule._id}>
              {rule.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userData">
          User Data (JSON)
        </label>
        <textarea
          id="userData"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={userData}
          onChange={(e) => setUserData(e.target.value)}
          placeholder='{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleEvaluate}
          disabled={!selectedRule || !userData}
        >
          Evaluate
        </button>
      </div>
      {result !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Result:</h3>
          <p className={`text-xl font-bold ${result ? 'text-green-600' : 'text-red-600'}`}>
            {result ? 'User Eligible' : 'User Not Eligible'}
          </p>
        </div>
      )}
    </div>
  );
}