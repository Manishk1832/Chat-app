
const router = require('express').Router();
const {addmessages,getAllmessages} = require('../Controllers/messagesController');


router.post('/addmsg',addmessages);
router.post('/getmsg',getAllmessages);


module.exports = router;    