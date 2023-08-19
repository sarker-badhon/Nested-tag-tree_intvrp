import React, { useState } from 'react';

const TagView = ({ tag, onUpdateData, onAddChild }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleDataChange = (event) => {
    onUpdateData(tag.name, event.target.value);
  };

  const handleAddChild = () => {
    onAddChild(tag.name);
  };

  return (
    <div className="border ml-4 my-3">
      <div className="flex justify-between items-center bg-blue-500 py-2 px-2">
        <div className="flex items-center">
          <button onClick={handleCollapse} className="mr-2 bg-slate-400 px-6 rounded text-white">
            {collapsed ? '>' : 'v'}
          </button>
          <h3>{tag.name}</h3>
        </div>
        <div>

          <button onClick={handleAddChild} className="bg-slate-200 px-2 py-1 hover:bg-green-500 hover:text-white rounded mt-1">
            Add Child
          </button>

        </div>
      </div>
      <div>
        {!collapsed && (
          <>
            <div className="bg-slate-400">
              {tag.data !== undefined && (
                <input
                  type="text"
                  value={tag.data}
                  onChange={handleDataChange}
                  className="border p-1 m-1"
                />
              )}
            </div>
            {tag.children &&
              tag.children.map((child) => (
                <TagView
                  key={child.name}
                  tag={child}
                  onUpdateData={onUpdateData}
                  onAddChild={onAddChild}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const initialTree = {
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' },
        ],
      },
      { name: 'child2', data: 'c2 World' },
    ],
  };

  const [tree, setTree] = useState(initialTree);

  const updateData = (tagName, newData) => {
    const updatedTree = { ...tree };
    findAndUpdateData(updatedTree, tagName, newData);
    setTree(updatedTree);
  };

  const findAndUpdateData = (node, tagName, newData) => {
    if (node.name === tagName) {
      node.data = newData;
      return;
    }
    if (node.children) {
      node.children.forEach((child) => findAndUpdateData(child, tagName, newData));
    }
  };

  const addChild = (parentTagName) => {
    const updatedTree = { ...tree };
    findAndAddChild(updatedTree, parentTagName);
    setTree(updatedTree);
  };

  const findAndAddChild = (node, parentTagName) => {
    if (node.name === parentTagName) {
      if (!node.children) {
        node.children = [];
      }
      node.children.push({ name: 'New Child', data: 'Data' });
      return;
    }
    if (node.children) {
      node.children.forEach((child) => findAndAddChild(child, parentTagName));
    }
  };

  const [data, setData] = useState("")
  const exportTree = () => {
    const exportedData = JSON.stringify(tree, ['name', 'children', 'data'], 2);
    setData(exportedData);
  };

  return (
    <div className="container mx-auto p-4 py-20 border bg-gray-600">
      <div >
        <div>


          <h1 className="text-2xl text-white text-center font-bold mb-10 ">Nested Tags Tree</h1>
          <TagView tag={tree} onUpdateData={updateData} onAddChild={addChild} />
          <button onClick={exportTree} className="bg-green-500 hover:bg-slate-400 text-white p-2 px-4 mt-4">
            Export

          </button>
        </div>
        <div className='p-4 mt-10 py-16 border border-gray-500 bg-white shadow-lg'>

          <p className=' '>{data}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
