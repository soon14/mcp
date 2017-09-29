import * as types from './mutation-types';

export const selectedProject = ({ commit }, project) => {
    commit(types.SELECTED_PROJECT,{
      project : project
    });
};

