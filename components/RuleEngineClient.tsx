'use client';

import React, { useState, useEffect } from 'react';
import RuleCreator from '../components/RuleCreator';
import RuleCombiner from '../components/RuleCombiner';
import RuleEvaluator from '../components/RuleEvaluator';
import { Moon, Sun } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

interface RuleEngineClientProps {
  initialRules: any[];
  initialDarkMode: boolean;
}

export default function RuleEngineClient({ initialRules, initialDarkMode, }: RuleEngineClientProps) {
  const [rules, setRules] = useState(initialRules);
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const handleRuleCreated = async () => {
    const response = await fetch('/api/getRules');
    const data = await response.json();
    if (data.success) {
      setRules(data.rules);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.cookie = `darkMode=${newDarkMode}; path=/; max-age=31536000; SameSite=Strict`;
  };

  useEffect(() => {
    const className = darkMode ? 'dark' : 'light';
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(className);
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Rule Engine</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RuleCreator onRuleCreated={handleRuleCreated} darkMode={darkMode} />
          <RuleCombiner rules={rules} onRulesCombined={handleRuleCreated} darkMode={darkMode} />
          <div className="md:col-span-2">
            <RuleEvaluator rules={rules} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}