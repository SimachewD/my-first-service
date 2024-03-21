

const multer = require('multer');

const express = require('express')
const requireAuth = require('../middleware/requireAuth');

const {
        changePassword,
        patchProfile,
        patchAbout, 
        login} = require('../controllers/userController');
const {
        postSkill,
        postProject,
        deleteProject,
        deleteSkill,
        deleteMessage } = require('../controllers/mainController');



// Define storage for uploaded files
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/') // Directory where uploaded files will be stored
        },
        filename: function (req, file, cb) {
          // Generate a unique filename for the uploaded file
          cb(null, Date.now() + '-' + file.originalname)
        }
      })
      
      const upload = multer({ storage: storage });




const router = express.Router();

router.post( '/login', login);

router.use(requireAuth);

router.patch( '/admin/changepassword', changePassword);

router.patch( '/admin/updateprofile', patchProfile);
 
router.patch( '/admin/updateabout', patchAbout);

router.post( '/addskill', postSkill)

router.post( '/addproject', upload.single('image'), postProject)

router.delete( '/deleteproject/:id', deleteProject)

router.delete( '/deleteskill/:id', deleteSkill)

router.delete( '/deletemessage/:id', deleteMessage)



module.exports = router;
 