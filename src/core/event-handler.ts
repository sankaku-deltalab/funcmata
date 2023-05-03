import {
  FuncmataDefinition,
  FuncmataState,
  FuncmataEvent,
} from './funcmata-definition';

export interface EventHandler<Def extends FuncmataDefinition> {
  handleEvent(
    event: FuncmataEvent<Def>,
    state: FuncmataState<Def>
  ): FuncmataState<Def>;

  // I think onChange is not needed at here.
  // onChange(oldState: AnyState<Def>, newState: AnyState<Def>): void;
}
