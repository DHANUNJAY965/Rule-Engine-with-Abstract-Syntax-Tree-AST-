// import { NextApiRequest, NextApiResponse } from 'next';

// import clientPromise from '@/lib/mongodb';

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const client = await clientPromise;
//       const db = client.db('ruleEngine');
//       const rules = await db.collection('rules').find({}).project({ name: 1 }).toArray();

//       res.status(200).json({ success: true, rules });
//     } catch (error) {
//       res.status(500).json({ success: false, error: 'Error fetching rules' });
//     }
//   } else {
//     res.status(405).json({ success: false, error: 'Method not allowed' });
//   }
// }
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('ruleEngine');
    const rules = await db.collection('rules').find({}).project({ name: 1 }).toArray();

    return new Response(JSON.stringify({ success: true, rules }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error fetching rules' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
