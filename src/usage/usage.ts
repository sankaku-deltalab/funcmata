import {
  DefineFuncmataDefinition,
  FuncmataEvent,
  FuncmataState,
} from '../core/funcmata-definition';
import {EventHandler} from '../core/event-handler';
import {Funcmata} from '../core/funcmata-state';

// 1. Define config
type Def = DefineFuncmataDefinition<{
  state:
    | {type: 'on'}
    | {type: 'off'; offReason: 'initial' | 'standard' | 'emergency'};
  event:
    | {type: 'set'; isOn: boolean}
    | {type: 'toggle'}
    | {type: 'emergencyStop'};
}>;

// 2. Create event handler
class Handler implements EventHandler<Def> {
  handleEvent(
    event: FuncmataEvent<Def>,
    state: FuncmataState<Def>
  ): FuncmataState<Def> {
    switch (event.type) {
      case 'emergencyStop': {
        return {type: 'off', offReason: 'emergency'};
      }
      case 'set': {
        const type = event.isOn ? 'on' : 'off';
        if (type === 'on') return {type};
        return {type: 'off', offReason: 'standard'};
      }
      case 'toggle': {
        const type = state.type === 'on' ? 'off' : 'on';
        if (type === 'on') return {type};
        return {type: 'off', offReason: 'standard'};
      }
    }
  }
}
const handler = new Handler();

// 3. Create state
const state = Funcmata.new<Def>({type: 'off', offReason: 'initial'});

// 4. Emit event and maybe change state
const newState = Funcmata.emitEvent<Def>(
  state,
  {type: 'set', isOn: true},
  handler
);

// 5. (Optional) Check difference and do something
if (state.type === 'off' && newState.type === 'on') {
  console.log('light is turned on');
}
if (state.type === 'on' && newState.type === 'off') {
  console.log('light is turned off');
}
