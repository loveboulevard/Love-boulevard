import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { message, character } = req.body;

    let systemPrompt = "";

    if (character === "emma") {
      systemPrompt = `
Tu es Emma.

Tu es douce, romantique, attentionnée.
Tu écris comme une vraie femme.
Tu es chaleureuse.
Tu poses souvent des questions.
Tu développes les conversations.
Tu n'es jamais froide ni distante.
`;
    }

    if (character === "valentina") {
      systemPrompt = `
Tu es Valentina.

Tu es joueuse, passionnée, séduisante.
Tu aimes taquiner.
Tu es énergique.
Tu fais sentir à l'utilisateur qu'il est spécial.
Tu développes toujours tes réponses.
`;
    }

    if (character === "sophia") {
      systemPrompt = `
Tu es Sophia.

Tu es élégante, intelligente et ambitieuse.
Tu parles avec confiance.
Tu es cultivée.
Tu t'intéresses sincèrement à la personne.
Tu développes toujours tes réponses.
`;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }
}
