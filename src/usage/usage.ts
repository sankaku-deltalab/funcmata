import {
  AnyState,
  DefineFuncmataDefinition,
  EventArgs,
  EventType,
} from '../core/funcmata-definition';
import {EventHandler} from '../core/event-handler';
import {TFuncmataState} from '../core/funcmata-state';

// 1. Define config
type Def = DefineFuncmataDefinition<{
  states: {
    on: {type: 'on'};
    off: {type: 'off'; offReason: 'initial' | 'standard' | 'emergency'};
  };
  events: {
    set: {args: {isOn: boolean}};
    toggle: {args: {}};
    emergencyStop: {args: {}};
  };
}>;

// 2. Create event handler
class Handler implements EventHandler<Def> {
  handleEvent<Type extends EventType<Def>>(
    event: Type,
    state: AnyState<Def>,
    args: EventArgs<Def, Type>
  ): AnyState<Def> {
    switch (event) {
      case 'emergencyStop': {
        return {type: 'off', offReason: 'emergency'};
      }
      case 'set': {
        const type = (args as EventArgs<Def, 'set'>).isOn ? 'on' : 'off';
        if (type === 'on') return {type};
        return {type: 'off', offReason: 'standard'};
      }
      case 'toggle': {
        const type = state.type === 'on' ? 'off' : 'on';
        if (type === 'on') return {type};
        return {type: 'off', offReason: 'standard'};
      }
    }
    return state;
  }
}
const handler = new Handler();

// 3. Create state
const state = TFuncmataState.new<Def>({type: 'off', offReason: 'initial'});

// 4. Emit event and maybe change state
const newState = TFuncmataState.emitEvent(state, 'set', {isOn: true}, handler);

// 5. (Optional) Check difference and do something
if (state.current.type === 'off' && newState.current.type === 'on') {
  console.log('light is turned on');
}
if (state.current.type === 'on' && newState.current.type === 'off') {
  console.log('light is turned off');
}
