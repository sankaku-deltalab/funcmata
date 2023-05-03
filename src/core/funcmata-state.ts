import {
  FuncmataDefinition,
  FuncmataEvent,
  FuncmataState,
} from './funcmata-definition';
import {EventHandler} from './event-handler';

export class Funcmata {
  static new<Def extends FuncmataDefinition>(
    initial: FuncmataState<Def>
  ): FuncmataState<Def> {
    return initial;
  }

  static emitEvent<Def extends FuncmataDefinition>(
    state: FuncmataState<Def>,
    event: FuncmataEvent<Def>,
    handler: EventHandler<Def>
  ): FuncmataState<Def> {
    return handler.handleEvent(event, state);
  }
}
