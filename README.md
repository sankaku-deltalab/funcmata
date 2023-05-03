# Funcmata

Functional and simple finite state machine.

## Usage

```typescript
import {
  AnyState,
  DefineFuncmataDefinition,
  EventType,
  FuncmataEvent,
  EventHandler,
  TFuncmataState
} from 'funcmata';

// 1. Define config
type Def = DefineFuncmataDefinition<{
  states: {
    on: {type: 'on'};
    off: {type: 'off'; offReason: 'initial' | 'standard' | 'emergency'};
  };
  events: {
    set: {type: 'set'; isOn: boolean};
    toggle: {type: 'toggle'; isOn: boolean};
    emergencyStop: {type: 'emergencyStop'; isOn: boolean};
  };
}>;

// 2. Create event handler
class Handler implements EventHandler<Def> {
  handleEvent<Type extends EventType<Def>>(
    event: FuncmataEvent<Def, Type>,
    state: AnyState<Def>
  ): AnyState<Def> {
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
const state = TFuncmataState.new<Def>({type: 'off', offReason: 'initial'});

// 4. Emit event and maybe change state
const newState = TFuncmataState.emitEvent(
  state,
  {type: 'set', isOn: true},
  handler
);

// 5. (Optional) Check difference and do something
if (state.current.type === 'off' && newState.current.type === 'on') {
  console.log('light is turned on');
}
if (state.current.type === 'on' && newState.current.type === 'off') {
  console.log('light is turned off');
}
```