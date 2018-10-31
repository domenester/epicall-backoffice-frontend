import { TreeviewItem, TreeItem } from 'ngx-treeview';

export const treeViewFormat = (messages: any) => {
  const treeItem: TreeItem = {
    text: 'Usuários',
    value: 0,
    children: [],
    checked: false,
    collapsed: false
  };

  Object.keys(messages).map( k1 => {
    const treeItemTemp: TreeItem = {
      text: k1,
      value: k1,
      children: [],
      checked: false,
      collapsed: true
    };

    Object.keys(messages[k1]).map( k2 => {
      treeItemTemp.children.push({
        text: k2,
        value: `${k1}_${k2}`,
        checked: false,
        collapsed: true
      });
    });

    treeItem.children.push(treeItemTemp);
  });

  console.log('treeItem', treeItem);
  const usersTreeItems = new TreeviewItem(treeItem);
  usersTreeItems.correctChecked();
  return usersTreeItems;
};
