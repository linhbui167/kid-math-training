export class LimitedSet<T> {
  private set: Set<T> = new Set();
  private order: T[] = [];
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  add(item: T): void {
    if (this.set.has(item)) {
      // Remove existing item from order to re-add it at the end
      this.order = this.order.filter((x) => x !== item);
    }

    this.set.add(item);
    this.order.push(item);

    if (this.set.size > this.limit) {
      const oldest = this.order.shift(); // Remove the oldest item
      if (oldest !== undefined) {
        this.set.delete(oldest);
      }
    }
  }

  delete(item: T): void {
    if (this.set.has(item)) {
      this.set.delete(item);
      this.order = this.order.filter((x) => x !== item);
    }
  }

  has(item: T): boolean {
    return this.set.has(item);
  }

  size(): number {
    return this.set.size;
  }

  values(): T[] {
    return [...this.order]; // Return ordered items
  }
}

export default LimitedSet;
