const recoveryPassword = require('express').Router();
const {
  ProfessionalResetPassword,
  ProfessionalRequestRecoveryPassword,
} = require('../controllers/PasswordRecovery/ProfessionalPassword');

const {
  ClientResetPassword,
  ClientRequestRecoveryPassword,
} = require('./../controllers/PasswordRecovery/ClientPassword');

recoveryPassword.post(
  '/professional/request-recovery-password',
  ProfessionalRequestRecoveryPassword
);
recoveryPassword.post(
  '/professional/reset-password',
  ProfessionalResetPassword
);
recoveryPassword.post(
  '/client/request-recovery-password',
  ClientRequestRecoveryPassword
);
recoveryPassword.post('/client/reset-password', ClientResetPassword);

module.exports = recoveryPassword;
