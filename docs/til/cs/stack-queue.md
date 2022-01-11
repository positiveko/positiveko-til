# Stack & Queue

## 스택과 큐

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbktDKx%2Fbtqv0WVtpR8%2F3bv4drx1JRxMULKvQkjItK%2Fimg.png' alt='stackAndQueue'>

[출처](https://brightwon.tistory.com/8)

#### 공통점

- 선형 구조 자료구조 (linear data structure)
- 데이터들이 일렬로 정렬되어 있는 형태이고 순서가 있다.

#### 차이점

- 스택은 나중에 넣은 데이터가 먼저 나오는 형태(LIFO), 큐는 먼저 넣은 데이터가 먼저 나오는 형태(FIFO)
- 스택은 삽입과 삭제가 리스트의 top에서 실행되고, 큐의 경우에는 삽입은 리스트의 rear에서 삭제는 front에서 일어난다.

## Stack 스택

<img src='https://www.tutorialspoint.com/data_structures_algorithms/images/stack_representation.jpg' alt='stack'>

[출처](https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm)

### 시간복잡도

- Insertion : O(1)
- Deletion : O(1)
- Search : O(n)

### JavaScript 구현

```js
class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  // Add element to top of stack
  push(element) {
    this.items[this.count] = element;
    this.count += 1;
    return this.count - 1;
  }

  // Return and remove top element in stack
  // Return undefined if stack is empty
  pop() {
    if (this.count == 0) return undefined;
    let deleteItem = this.items[this.count - 1];
    this.count -= 1;
    return deleteItem;
  }

  // Check top element in stack
  peek() {
    return this.items[this.count - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.count == 0;
  }

  // Check size of stack
  size() {
    return this.count;
  }

  // Print elements in stack
  print() {
    let str = '';
    for (let i = 0; i < this.count; i++) {
      str += this.items[i] + ' ';
    }
    return str;
  }

  // Clear stack
  clear() {
    this.items = [];
    this.count = 0;
    return this.items;
  }
}

const stack = new Stack();
```

## Queue 큐

<img src='https://www.tutorialspoint.com/data_structures_algorithms/images/queue_diagram.jpg' alt='queue'>

[출처](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm)

### 시간복잡도

- Insertion : O(1)
- Deletion : O(1)
- Search : O(n)

### JavaScript 구현

```js
class Queue {
  constructor() {
    this.store = [];
  }

  enqueue(item) {
    this.store.push(item);
  }

  dequeue() {
    this.store.shift();
  }

  empty() {
    return this.store.length === 0 ? true : false;
  }

  front() {
    return this.store[0];
  }

  rear() {
    return this.store[this.store.length - 1];
  }
}

const queue = new Queue();
```
