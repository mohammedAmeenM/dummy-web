import React, { useState } from 'react';
import ImageGeneratorModal from './ImageGeneratorModal';
// import ImageEditorModal from './ImageEditorModal';

function Storyboard() {
  const [showModal, setShowModal] = useState(false);
  const [draggedInd, setDraggedInd] = useState(null);
//   const [editMode, setEditMode] = useState(false);
  

  const [items, setItems] = useState([
    { title: 'Card 1' },
    { title: 'Card 2' },
    { title: 'Card 3' },
    { title: 'Card 4' },
  ]);

  const handleOpenModal = () => {
    setShowModal(true);
    // setEditMode(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    // setEditMode(false);
  };

//   const handleEditClick = () => {
//     setShowModal(true);
//     setEditMode(true);
//   };


  const handleDragStart = (index) => {
    setDraggedInd(index);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (index) => {
    const newItems = [...items];
    const draggedItem = newItems[draggedInd];
    newItems.splice(draggedInd,1);
    newItems.splice(index,0,draggedItem);
    
    setDraggedInd(null);
    setItems(newItems);
  };

  return (
    <>
      <div className='flex flex-row space-x-6'>
        {items.map((item, index) => (
          <a
            href="#"
            key={index}
            className="group relative block w-64 h-48 max-w-sm p-6 bg-gradient-to-r from-teal-100 to-blue-50 border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <div className="absolute inset-0 flex flex-wrap items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleOpenModal} className="w-full px-2 py-1 bg-sky-500 text-white rounded">Generate</button>
                <button className="w-full px-2 py-1 bg-sky-500 text-white rounded">Replace</button>
                <button className="w-full px-2 py-1 bg-sky-500 text-white rounded">Editor</button>
                <button className="w-full px-2 py-1 bg-sky-500 text-white rounded">Comment</button>
              </div>
            </div>
            <div  className="absolute   flex items-center justify-center text-md font-normal text-teal-800">
              {item.title}
            </div>
          </a>
        ))}
      </div>

      {/* {showModal && (
        editMode ? (
          <ImageEditorModal onClose={handleCloseModal} />
        ) : (
          <ImageGeneratorModal 
            onClose={handleCloseModal} 
          />
        )
      )} */}

{showModal && (
        <ImageGeneratorModal onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Storyboard;
