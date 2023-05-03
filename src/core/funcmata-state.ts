import {
  AnyState,
  FuncmataDefinition,
  EventType,
  FuncmataEvent,
} from './funcmata-definition';
import {EventHandler} from './event-handler';

export type FuncmataState<Def extends FuncmataDefinition> = {
  current: AnyState<Def>;
};

export class TFuncmataState {
  static new<Def extends FuncmataDefinition>(
    initial: AnyState<Def>
  ): FuncmataState<Def> {
    return {
      current: initial,
    };
  }

  static emitEvent<Def extends FuncmataDefinition, Type extends EventType<Def>>(
    state: FuncmataState<Def>,
    event: FuncmataEvent<Def, Type>,
    handler: EventHandler<Def>
  ): FuncmataState<Def> {
    const newState = handler.handleEvent(event, state.current);
    return {
      current: newState,
    };
  }
}
