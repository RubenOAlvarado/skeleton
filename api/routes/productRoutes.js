const express = require('express'),
      router = express.Router(),
      controller = require('../controllers/controllers');

router.get('/', controller.list);
router.get('/show/:id', controller.show);
router.get('/create',controller.create);
router.post('/save', controller.save);
router.get('/edit/:id', controller.edit);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;