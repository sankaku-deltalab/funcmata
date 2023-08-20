export type FuncmataDefinition = {
  state: StateBase;
  event: EventBase;
};

export type StateBase = {type: string};
export type EventBase = {type: string};

export type StateType<Def extends FuncmataDefinition> = Def['state']['type'];
export type FuncmataState<Def extends FuncmataDefinition> = Def['state'];

export type EventType<Def extends FuncmataDefinition> = Def['event']['type'];
export type FuncmataEvent<Def extends FuncmataDefinition> = Def['event'];

export type DefineFuncmata<T extends FuncmataDefinition> = T;
