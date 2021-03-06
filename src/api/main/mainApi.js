const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require('../../util/validate');
const { setApiResult } = require('../../model/payload');
const mainService = require('../../service/main/mainService');
const util = require('../../util/util');
const {setValidationError} = require("../../util/util");

router.all('/search', async (req, res) => {
    console.log("@@@@@@@@@@@@")

  await Promise.all([
    Validator.checkExists(req, 'keyword'),
    Validator.checkArrayType(req, 'researchKeywords'), // array param check
  ]);

  let validationErrors = validationResult(req).array();

  const validParams = ['keyword', 'researchKeywords'];
  validationErrors = Validator.checkParamName(req.body, validParams, validationErrors);

  // if there is an error in validation, return status 412
  if (validationErrors.length > 0) return res.status(412).json(setValidationError(req, validationErrors));

  mainService.search(req, res);
});

module.exports = router;
