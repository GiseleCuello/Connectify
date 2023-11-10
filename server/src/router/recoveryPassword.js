const recoveryPassword = require('express').Router();
const {
  ResetPassword,
} = require('../controllers/PasswordRecovery/PasswordRecovery');
const {
  RequestRecoveryPassword,
} = require('../controllers/PasswordRecovery/PasswordRecovery');

recoveryPassword.post('/request-recovery-password', RequestRecoveryPassword);
recoveryPassword.post('/reset-password', ResetPassword);

module.exports = recoveryPassword;
