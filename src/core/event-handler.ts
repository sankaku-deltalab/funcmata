import {
  AnyState,
  FuncmataDefinition,
  EventType,
  FuncmataEvent,
} from './funcmata-definition';

export interface EventHandler<Def extends FuncmataDefinition> {
  handleEvent<Type extends EventType<Def>>(
    event: FuncmataEvent<Def, Type>,
    state: AnyState<Def>
  ): AnyState<Def>;

  // I think onChange is not needed at here.
  // onChange(oldState: AnyState<Def>, newState: AnyState<Def>): void;
}
