function ImageEditorModal({ onClose }) {
    const editorRef = useRef(null);
  
    const handleSave = () => {
      if (editorRef.current && editorRef.current.canvas) {
        try {
          const dataURL = editorRef.current.canvas.toDataURL();
          console.log('Edited image:', dataURL);
          onClose();
        } catch (error) {
          console.error('Error saving edited image:', error);
        }
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Image Editor</h2>
          <Pintura
            ref={editorRef}
            config={pinturaConfig}
            onSave={handleSave}
          />
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={handleSave} className="bg-teal-600 text-white px-4 py-2 rounded">Save</button>
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  