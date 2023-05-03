import {
  AnyState,
  FuncmataDefinition,
  EventArgs,
  EventType,
} from './funcmata-definition';

export interface EventHandler<Def extends FuncmataDefinition> {
  handleEvent<Type extends EventType<Def>>(
    event: Type,
    state: AnyState<Def>,
    args: EventArgs<Def, Type>
  ): AnyState<Def>;

  // I think onChange is not needed at here.
  // onChange(oldState: AnyState<Def>, newState: AnyState<Def>): void;
}
