import {
  FuncmataDefinition,
  FuncmataEvent,
  FuncmataState,
} from './funcmata-definition';
import {EventDispatcher} from './event-dispatcher';

export namespace Funcmata {
  export function init<Def extends FuncmataDefinition>(
    initial: FuncmataState<Def>
  ): FuncmataState<Def> {
    return initial;
  }

  export function dispatch<Def extends FuncmataDefinition>(
    state: FuncmataState<Def>,
    event: FuncmataEvent<Def>,
    dispatcher: EventDispatcher<Def>
  ): FuncmataState<Def> {
    return dispatcher.dispatch(event, state);
  }
}
