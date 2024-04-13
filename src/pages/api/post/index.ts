
import { client } from "@/utils/client";
import { allPostsQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const query = allPostsQuery()

    const data = await client.fetch(query)

    res.status(200).json(data)
  } else if(req.method === 'POST') {
    const document = req.body

    client.create(document)
      .then(() => res.status(201).json('Video Created'))
      .catch((error) => {
        console.error('Document creation failed', error)
        res.status(500).json({message: 'Document creation failed', error: error.message })
      })
  }
}