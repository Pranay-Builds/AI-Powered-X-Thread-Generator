const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
    const prompt = req.body.prompt;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }


    const result = await aiService(prompt);
    return res.json(result)
}