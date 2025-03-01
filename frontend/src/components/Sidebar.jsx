

import PropTypes from 'prop-types';

const Sidebar = ({ onAddNote }) => {
  return (
    <aside className="w-64 bg-white p-4 flex flex-col gap-2">
      <div className="space-y-4">
        <button 
          onClick={onAddNote}
          className="w-full px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2 font-medium"
        >
          + New Note
        </button>
        
        <div className="space-y-2">
          <div className="px-2 py-1 text-sm text-gray-500">Quick Access</div>
          <button className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-left transition-colors">
            All Notes
          </button>
          <button className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-left transition-colors">
            Recordings
          </button>
          <button className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-left transition-colors">
            Favorites
          </button>
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default Sidebar;

