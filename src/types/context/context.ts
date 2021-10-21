interface IContext<State, Actions> {
    state: Partial<State>;
    actions: Partial<Actions>;
}

export type { IContext };
