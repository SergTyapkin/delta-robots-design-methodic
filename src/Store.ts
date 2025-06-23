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

    isInCalculating: false,
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
      state.state.step = robotState.step ?? state.state.step;

      console.log("State updated:", state.state);

      localStorage.setItem('state', JSON.stringify(state.state));
    },
    CLEAR_STATE(state: State) {
      state.state.modification = undefined;
      state.state.connectionsType = undefined;
      state.state.minWorkingAreaDiameter = undefined;
      state.state.minWorkingAreaHeight = undefined;
      state.state.maxRobotDiameter = undefined;
      state.state.isWaterProof = undefined;
      state.state.isFoodWork = undefined;
      state.state.materialType = undefined;
      state.state.sizes.F = undefined;
      state.state.sizes.E = undefined;
      state.state.sizes.Lf = undefined;
      state.state.sizes.Le = undefined;
      state.state.maxLoadMass = undefined;
      state.state.optimizedZAngle = undefined;
      state.state.crossSectionsType = undefined;
      state.state.crossSectionsSquare = undefined;
      state.state.maxJerk = undefined;
      state.state.maxAngleSpeed = undefined;
      state.state.maxAngleAcceleration = undefined;
      state.state.elasticDeformationsExprs.x = undefined;
      state.state.elasticDeformationsExprs.y = undefined;
      state.state.elasticDeformationsExprs.z = undefined;
      state.state.step = undefined;

      localStorage.removeItem('state');
    }
  },
  actions: {
    async LOAD_STATE(this: Store, state: Store) {
      const loaded = localStorage.getItem('state');
      if (!loaded) {
        state.commit('CLEAR_STATE');
        this.$app?.update?.();
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(loaded);
        state.commit('SET_STATE', parsed);
      } catch (err) {
        console.error("Cannot load state from localStorage", err);
        state.commit('CLEAR_STATE');
      }
      this.$app?.update?.();
    },
    async SET_STATE(this: Store, state: Store, data: RobotState) {
      state.commit('SET_STATE', data);
      this.$app?.update?.();
    },
    async CLEAR_STATE(this: Store, state: Store) {
      state.commit('CLEAR_STATE');
      this.$app?.update?.();
    },
  },
});
