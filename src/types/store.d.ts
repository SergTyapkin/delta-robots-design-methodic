import { type Store as VuexStore } from 'vuex';
import App from '~/App.vue';
import type {Commit, Dispatch } from 'vuex';
import type {Modification, ConnectionType, CrossSectionType} from "~/constants";

interface Store extends VuexStore<any> {
  $app: App;
  readonly state: any;
  dispatch: Dispatch;
  commit: Commit;
}

// declare my own store state
interface State {
  state: RobotState;
}

// declare my own store state
interface RobotState {
  modification?: Modification,
  connectionsType?: ConnectionType,
  minWorkingAreaDiameter?: number,
  minWorkingAreaHeight?: number,
  maxRobotDiameter?: number,
  isFoodWork?: boolean,
  isWaterProof?: boolean,
  sizes: {
    F?: number,
    E?: number,
    Lf?: number,
    Le?: number,
  },
  maxLoadMass?: number,
  optimizedZAngle?: number,
  materialType?: string,
  crossSectionsType?: CrossSectionType,
  crossSectionsSquare?: number,
  maxJerk?: number,
  maxAngleSpeed?: number,
  maxAngleAcceleration?: number,
  elasticDeformationsExprs: {
    x?: (t1: number, t2: number, t3: number, mass: number) => number,
    y?: (t1: number, t2: number, t3: number, mass: number) => number,
    z?: (t1: number, t2: number, t3: number, mass: number) => number,
  },
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store;
    $state: RobotState
  }
}
