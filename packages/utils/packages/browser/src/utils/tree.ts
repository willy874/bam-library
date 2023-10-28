export function eachElementTree(
  treeDatas: Node | Node[] | NodeListOf<ChildNode>,
  callBack: (...args: any[]) => any,
  parentNode = {}
) {
  const recursive = (element: Node) => {
    const newNode = callBack(element, parentNode) || element;
    if (element.childNodes) {
      eachElementTree(Array.from(element.childNodes), callBack, newNode);
    }
  };
  if (treeDatas instanceof Node) {
    recursive(treeDatas);
  } else {
    treeDatas.forEach(recursive);
  }
}
