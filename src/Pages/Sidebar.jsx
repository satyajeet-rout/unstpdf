import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Menu,
  ChevronRight,
  User,
  FileText,
  PlusCircle,
  Link
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('my-workflow');

  const sidebarItems = [
    { 
      id: 'my-workflow',
      icon: <FileText size={20} />,
      label: 'My Workflow',
    //   path: '/my-workflow'
      
    },
    {
      id: 'new-workflow',
      icon: <PlusCircle size={20} />,
      label: 'New Workflow',
      path: '/new-workflow'
    },
    {
      id: 'integrations',
      icon: <Link size={20} />,
      label: 'External Integrations',
      path: '/'
    //   path: '/external-integrations'
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between shrink-0">
        {/* {isSidebarExpanded && <h2 className="text-xl font-bold">Workflow</h2>} */}
        {isSidebarExpanded && <img src="https://www.infrahive.io/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=75" alt="Workflow-Logo" className="w-36 h-13"/>}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            if (window.innerWidth >= 768) {
              setIsSidebarExpanded(!isSidebarExpanded);
            } else {
              setIsMobileSidebarOpen(false);
            }
          }}
        >
          {isSidebarExpanded ? <ChevronRight /> : <Menu />}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-2 overflow-y-auto">
        {sidebarItems.map((item) => (
            
          <NavLink to={item.path} key={item.id}>
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start mb-2 ${
              isSidebarExpanded ? 'px-4' : 'px-2'
            } ${activeRoute === item.id ? 'bg-gray-100' : ''}`}
            onClick={() => {
              setActiveRoute(item.id);
              if (window.innerWidth < 768) {
                setIsMobileSidebarOpen(false);
              }
            }}
          >
           
                {item.icon}
            {isSidebarExpanded && <span className="ml-3">{item.label}</span>}
            
            </Button>
            </NavLink>
        ))}
      </div>

      {/* User Profile - Fixed at Bottom */}
      <div className="border-t mt-auto p-2 bg-white shrink-0">
        <Button
          variant="ghost"
          className={`w-full justify-start ${isSidebarExpanded ? 'px-4' : 'px-2'} h-12`}
        >
          <User size={20} />
          {isSidebarExpanded && <span className="ml-3">User Profile</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block bg-white shadow-lg transition-all duration-300 ${
          isSidebarExpanded ? 'w-64' : 'w-20'
        }`}
      >
        <div className="h-full flex flex-col">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden p-4 bg-white shadow-sm flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu />
          </Button>
          <h1 className="ml-3 text-xl font-bold">Workflow</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;