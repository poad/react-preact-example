import { createModel, signal, useModel } from "@preact/signals-react";

const CounterModel = createModel(() => ({
  count: signal(0),
  increment() {
    this.count.value++;
  },
}));

export function Counter() {
  const model = useModel(CounterModel);

  return <button onClick={() => model.increment()} className="counter">Count is {model.count.value}</button>;
}
