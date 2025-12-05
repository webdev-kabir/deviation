/**
 * Production Environment Configuration
 * 
 * This file is used for production builds.
 */

import appSettings from './appSettings.prod.json';

export const environment = {
  production: true,
  ...appSettings,
};

