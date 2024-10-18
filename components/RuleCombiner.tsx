

"use client"

import React, { useState, useEffect } from 'react';

interface RuleCombinerProps {
  refreshTrigger: number;
}

export default function RuleCombiner({ refreshTrigger }: RuleCombinerProps) {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);

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

    const handleCombineRules = async () => {
    try {
      const response = await fetch('/api/combineRules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleIds: selectedRules }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Rules combined successfully!');
        setSelectedRules([]);
      } else {
        alert('Error combining rules');
      }
    } catch (error) {
      alert('Error combining rules');
    }
  };

  useEffect(() => {
    fetchRules();
  }, [refreshTrigger,selectedRules]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Combine Rules</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Rules</label>
        {rules.map((rule) => (
          <div key={rule._id} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                value={rule._id}
                checked={selectedRules.includes(rule._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRules([...selectedRules, rule._id]);
                  } else {
                    setSelectedRules(selectedRules.filter((id) => id !== rule._id));
                  }
                }}
              />
              <span className="ml-2">{rule.name}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCombineRules}
          disabled={selectedRules.length < 2}
        >
          Combine Rules
        </button>
      </div>
    </div>
  );
}