import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Rule {
  _id: string;
  name: string;
  ast: any; // You might want to define a more specific type for ast
}

export function useRules(refreshTrigger: number) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://rule-engine-dhanu.vercel.app/api/getRules');
        const data = await response.json();
        if (data.success) {
          setRules(data.rules);
        } else {
          toast.error('Failed to fetch rules. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching rules:', error);
        toast.error('An error occurred while fetching rules. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, [refreshTrigger]);

  return { rules, loading };
}