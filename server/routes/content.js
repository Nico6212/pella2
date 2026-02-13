const express = require('express');
const auth = require('../middleware/auth');

function createContentRouter(Model) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const data = await Model.findOne();
      if (!data) return res.status(404).json({ message: 'Données non trouvées' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/', auth, async (req, res) => {
    try {
      const data = await Model.findOneAndUpdate({}, req.body, {
        new: true,
        upsert: true,
        runValidators: true,
      });
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
}

module.exports = createContentRouter;
