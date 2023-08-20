import {
  FuncmataDefinition,
  FuncmataState,
  FuncmataEvent,
} from './funcmata-definition';

export interface EventDispatcher<Def extends FuncmataDefinition> {
  dispatch(
    event: FuncmataEvent<Def>,
    state: FuncmataState<Def>
  ): FuncmataState<Def>;

  // I think onChange is not needed at here.
  // onChange(oldState: FuncmataState<Def>, newState: FuncmataState<Def>): void;
}
