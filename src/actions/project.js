/**
 * @flow
 */

import type { Project } from '../types';

/**
 * Save project in local storage
 * 
 * @param {Object} project - The project to save 
 */
export const saveProject = (project: Project) => ({
    type: 'PROJECT.SAVE',
    project,
});
