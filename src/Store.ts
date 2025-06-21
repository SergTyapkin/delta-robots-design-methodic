import Vuex from 'vuex';
import {type RobotState, State, type Store} from '~/types/store';

export default new Vuex.Store({
  state: {
    state: {
      modification: undefined,
      connectionsType: undefined,
      minWorkingAreaDiameter: undefined,
      minWorkingAreaHeight: undefined,
      maxRobotDiameter: undefined,
      isWaterProof: undefined,
      isFoodWork: undefined,
      sizes: {
        F: undefined,
        E: undefined,
        Lf: undefined,
        Le: undefined,
      },
      maxLoadMass: undefined,
      optimizedZAngle: undefined,
      materialType: undefined,
      crossSectionsType: undefined,
      crossSectionsSquare: undefined,
      maxJerk: undefined,
      maxAngleSpeed: undefined,
      maxAngleAcceleration: undefined,
      elasticDeformationsExprs: {
        x: undefined,
        y: undefined,
        z: undefined,
      },
    } as RobotState,
  },
  mutations: {
    SET_STATE(state: State, robotState: RobotState) {
      state.state.modification =  robotState.modification ?? state.state.modification;
      state.state.connectionsType =  robotState.connectionsType ?? state.state.connectionsType;
      state.state.minWorkingAreaDiameter =  robotState.minWorkingAreaDiameter ?? state.state.minWorkingAreaDiameter;
      state.state.minWorkingAreaHeight =  robotState.minWorkingAreaHeight ?? state.state.minWorkingAreaHeight;
      state.state.maxRobotDiameter =  robotState.maxRobotDiameter ?? state.state.maxRobotDiameter;
      state.state.isWaterProof =  robotState.isWaterProof ?? state.state.isWaterProof;
      state.state.isFoodWork =  robotState.isFoodWork ?? state.state.isFoodWork;
      state.state.materialType =  robotState.materialType ?? state.state.materialType;
      state.state.sizes.F =  robotState.sizes?.F ?? state.state.sizes.F;
      state.state.sizes.E =  robotState.sizes?.E ?? state.state.sizes.E;
      state.state.sizes.Lf =  robotState.sizes?.Lf ?? state.state.sizes.Lf;
      state.state.sizes.Le =  robotState.sizes?.Le ?? state.state.sizes.Le;
      state.state.maxLoadMass =  robotState.maxLoadMass ?? state.state.maxLoadMass;
      state.state.optimizedZAngle =  robotState.optimizedZAngle ?? state.state.optimizedZAngle;
      state.state.crossSectionsType =  robotState.crossSectionsType ?? state.state.crossSectionsType;
      state.state.crossSectionsSquare =  robotState.crossSectionsSquare ?? state.state.crossSectionsSquare;
      state.state.maxJerk =  robotState.maxJerk ?? state.state.maxJerk;
      state.state.maxAngleSpeed =  robotState.maxAngleSpeed ?? state.state.maxAngleSpeed;
      state.state.maxAngleAcceleration =  robotState.maxAngleAcceleration ?? state.state.maxAngleAcceleration;
      state.state.elasticDeformationsExprs.x =  robotState.elasticDeformationsExprs?.x ?? state.state.elasticDeformationsExprs.x;
      state.state.elasticDeformationsExprs.y =  robotState.elasticDeformationsExprs?.y ?? state.state.elasticDeformationsExprs.y;
      state.state.elasticDeformationsExprs.z =  robotState.elasticDeformationsExprs?.z ?? state.state.elasticDeformationsExprs.z;
      console.log("State updated:", state.state);
    },
  },
  actions: {
    async SET_STATE(this: Store, state: Store, data: RobotState) {
      state.commit('SET_STATE', data);
      this.$app.update();
    },
  },
});
