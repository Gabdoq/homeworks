import { Product } from './Trie';

export class MinHeap {
  private heap: Product[];

  constructor() {
    this.heap = [];
  }

  push(product: Product): void {
    this.heap.push(product);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): Product | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);

    return min;
  }

  peek(): Product | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[index].popularity < this.heap[parentIndex].popularity) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(index: number): void {
    const size = this.heap.length;

    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < size &&
        this.heap[leftChild].popularity < this.heap[smallest].popularity
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < size &&
        this.heap[rightChild].popularity < this.heap[smallest].popularity
      ) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else {
        break;
      }
    }
  }

  toArray(): Product[] {
    return [...this.heap];
  }
}
