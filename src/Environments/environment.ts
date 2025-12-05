/**
 * Development Environment Configuration
 * 
 * This file is used for local development.
 */

import appSettings from './appSettings.json';

export const environment = {
  production: false,
  ...appSettings,
};

