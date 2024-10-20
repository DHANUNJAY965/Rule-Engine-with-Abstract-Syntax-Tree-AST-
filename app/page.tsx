import React, { useEffect, useState } from 'react';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import RuleEngineClient from '@/components/RuleEngineClient';

async function getRules() {
  const client = await clientPromise;
  const db = client.db('ruleEngine');
  const rules = await db.collection('rules').find({}).project({ name: 1 }).toArray();
  return rules;
}

export default async function Home() {
  const rules = await getRules();
  const cookieStore = cookies();
  
  const darkModeCookie = cookieStore.get('darkMode');
  const initialDarkMode = darkModeCookie ? darkModeCookie.value === 'true' : true;
  

  return (
    <RuleEngineClient initialRules={rules} initialDarkMode={initialDarkMode}  />
  );
}