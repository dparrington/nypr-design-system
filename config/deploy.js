/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {},
    'git-ci': {
      userName: 'nypr-deloy',
      userEmail: 'nypr-deploy@circleci',
      deployKeyPath: '/home/circleci/.ssh/id_rsa_f9f263782dc4f145afb6aaf334f59fc2'
    },
    git: {
      commitMessage: '[skip ci] Deployed %@'
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (['demo', 'prod'].includes(deployTarget)) {
    ENV.build.environment = 'production';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
