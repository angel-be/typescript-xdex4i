console.clear();

interface Observer<T> {
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}

type Dispose = () => void;

class Subscriber<T> implements Observer<T> {
  closed = false;
  constructor(private sub: Observer<T>) {}
  next(value: T): void {
    if (!this.closed) {
      this.sub.next(value);
    }
  }
  error(err: any) {
    this.sub.error(err);
  }
  complete() {
    if (!this.closed) {
      this.sub.complete();
      this.closed = true;
    }
  }
}

class Observable<T> {
  constructor(private observerFunction: (Observer: Observer<T>) => Dispose) {}

  subscribe(observer: Observer<T>) {
    const subscriber = new Subscriber(observer);
    return this.observerFunction(subscriber); // solving complete
  }
}
