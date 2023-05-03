export type FuncmataDefinition = {
  states: {[Type in string]: StateBase<Type>};
  events: {[Type in string]: EventBase<Type>};
};

export type StateBase<Type extends string> = {type: Type};
export type EventBase<Type extends string> = {type: Type};

export type StateType<Def extends FuncmataDefinition> = keyof Def['states'] &
  string;
export type State<
  Def extends FuncmataDefinition,
  Type extends StateType<Def>
> = Def['states'][Type];
export type AnyState<Def extends FuncmataDefinition> = State<
  Def,
  StateType<Def>
>;

export type EventType<Def extends FuncmataDefinition> = keyof Def['events'] &
  string;
export type FuncmataEvent<
  Def extends FuncmataDefinition,
  Type extends EventType<Def>
> = Def['events'][Type];

export type DefineFuncmataDefinition<T extends FuncmataDefinition> = T;
