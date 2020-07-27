const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

// @route    GET api/profile/myProfile
// @desc     Get current user profile (logged in user profile)
// @access   Private
router.get('/myProfile', auth, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!userProfile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @route    POST api/profile
// @desc     Create or Update User Profile
// @access   Private

router.post('/', [
  auth,
  [
    check('company', 'Please enter Company Name').not().isEmpty(),
    check('location', 'Please enter Location').not().isEmpty(),
    check('email', 'Please enter your Email Adress').not().isEmpty(),
    check('phone', 'Please enter your Phone No').isNumeric(),
    check('role', 'Please enter your Current Role').not().isEmpty(),
    check('skillset', 'Please enter your Skillsets').not().isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      email,
      phone,
      role,
      skillset,
      bio,
      githubusername,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram
    } = req.body;

    // Build a User Profile object
    const userProfileFields = {};
    userProfileFields.user = req.user.id;

    if (company) userProfileFields.company = company;
    if (website) userProfileFields.website = website;
    if (location) userProfileFields.location = location;
    if (email) userProfileFields.email = email;
    if (phone) userProfileFields.phone = phone;
    if (role) userProfileFields.role = role;
    if (bio) userProfileFields.bio = bio;
    if (githubusername) userProfileFields.githubusername = githubusername;
    if (skillset) {
      userProfileFields.skillset = skillset.split(',').map((skill) => skill.trim());
    }

    // Build a User Social object

    userProfileFields.social = {};
    if (youtube) userProfileFields.social.youtube = youtube;
    if (twitter) userProfileFields.social.twitter = twitter;
    if (facebook) userProfileFields.social.facebook = facebook;
    if (linkedin) userProfileFields.social.linkedin = linkedin;
    if (instagram) userProfileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Profile is already there, we need to update this profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: userProfileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Creating a new Profile
      profile = new Profile(userProfileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {

    }
  })

// @route    GET api/profile
// @desc     Get all available Profiles
// @access   Public

router.get('/', async (req, res) => {
  try {
    // We are populating all the profiles. With this we are populating the
    // "userName & avatar" from user model
    const profilesList = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profilesList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:userId
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile is not Available' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile is not Available' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User & Profile got deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Why PUT - because we are updating the user profile (we are adding an experience to a 
// perticular profile)
// @route    PUT api/profile/experience
// @desc     Add Experience to perticular Profile
// @access   Private

router.put('/experience',
  [
    auth,
    [
      check('jobtitle', 'Job title is required'),
      check('company', 'company is required'),
      check('joblocation', 'Job location is required'),
      check('fromdate', 'From date is required')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      jobtitle,
      company,
      joblocation,
      fromdate,
      todate,
      current,
      description
    } = req.body;

    const newExperience = {
      jobtitle,
      joblocation,
      company,
      fromdate,
      todate,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/profile/experience/:expId
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:expId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the index which needs to remove
    const removeIndex = profile.experience.map((item) => item.id).indexOf(req.params.expId);
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Why PUT - because we are updating the user profile (we are adding an education to a 
// perticular profile)
// @route    PUT api/profile/education
// @desc     Add Education to perticular Profile
// @access   Private

router.put('/Education',
  [
    auth,
    [
      check('institutetype', 'Institution type is required'),
      check('institutename', 'Institution name is required'),
      check('university', 'University name is required'),
      check('degree', 'Degree is required'),
      check('fieldofstudy', 'Field of Study is required'),
      check('fromdate', 'From date is required')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      institutetype,
      institutename,
      university,
      degree,
      fieldofstudy,
      fromdate,
      todate,
      current,
      description
    } = req.body;

    const newEducation = {
      institutetype,
      institutename,
      university,
      degree,
      fieldofstudy,
      fromdate,
      todate,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/profile/education/:eduId
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:eduId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the index which needs to remove
    const removeIndex = profile.education.map((item) => item.id).indexOf(req.params.eduId);
    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: encodeURI(`https://api.github.com/users/${
        req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          'githubClientId'
        )}&client_secret=${config.get('githubClientSecret')}`),
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;