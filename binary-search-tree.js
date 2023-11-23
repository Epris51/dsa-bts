class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  // Iterative insert
  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = new Node(val);
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = new Node(val);
          return this;
        }
        current = current.right;
      } else {
        // Value already exists in the tree
        return this;
      }
    }
  }

  // Recursive insert helper function
  _insertRecursively(node, val) {
    if (!node) return new Node(val);

    if (val < node.val) {
      node.left = this._insertRecursively(node.left, val);
    } else if (val > node.val) {
      node.right = this._insertRecursively(node.right, val);
    }
    // Value is equal to node.val, do nothing

    return node;
  }

  // Recursive insert
  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    this._insertRecursively(this.root, val);
    return this;
  }

  // Iterative find
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  // Recursive find helper function
  _findRecursively(node, val) {
    if (!node) return undefined;
    if (val === node.val) return node;

    return val < node.val
      ? this._findRecursively(node.left, val)
      : this._findRecursively(node.right, val);
  }

  // Recursive find
  findRecursively(val) {
    return this._findRecursively(this.root, val);
  }

  // DFS Pre-Order
  dfsPreOrder() {
    const visited = [];
    const traverse = (node) => {
      if (!node) return;
      visited.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }

  // DFS In-Order
  dfsInOrder() {
    const visited = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      visited.push(node.val);
      traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }

  // DFS Post-Order
  dfsPostOrder() {
    const visited = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      visited.push(node.val);
    };
    traverse(this.root);
    return visited;
  }

  // BFS
  bfs() {
    const queue = [this.root];
    const visited = [];
    while (queue.length) {
      let current = queue.shift();
      if (current) {
        visited.push(current.val);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return visited;
  }

  // Remove method with necessary adjustments
  remove(val) {
    this.root = this._removeNode(this.root, val);
    return this;
  }

  _removeNode(node, val) {
    if (!node) return null;

    if (val < node.val) {
      node.left = this._removeNode(node.left, val);
    } else if (val > node.val) {
      node.right = this._removeNode(node.right, val);
    } else {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      node.val = this._minValue(node.right);
      node.right = this._removeNode(node.right, node.val);
    }

    return node;
  }

  _minValue(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.val;
  }

  // Check if the tree is balanced
  isBalanced() {
    const checkHeight = (node) => {
      if (!node) return -1;
      let leftHeight = checkHeight(node.left);
      let rightHeight = checkHeight(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) return Infinity;
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(this.root) !== Infinity;
  }

  // Find the second highest value
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined; // No second highest element
    }

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    if (current.left) {
      return this._maxValue(current.left);
    }

    return parent ? parent.val : undefined;
  }

  _maxValue(node) {
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current.val;
  }
}

module.exports = BinarySearchTree;
