
import { client } from "@/utils/client";
import { postDetailQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {

    const postId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id as string

    const query = postDetailQuery(postId)

    const data = await client.fetch(query)

    res.status(200).json(data[0])

  } else if(req.method === 'PUT') {
    const { comment, userId } = req.body
    const { id }: any = req.query

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuidv4(),
          postedBy: { _type: 'postedBy', _ref: userId}
        }
      ])
      .commit()

      res.status(200).json(data)
  }
}