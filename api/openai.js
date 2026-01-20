export default async function handler(req, res) {
  return res.status(200).json({
    answer: "SANITY CHECK PASSED: API → UI pipeline is working.",
  })
}
