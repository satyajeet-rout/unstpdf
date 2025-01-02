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
    // {
    //   id: 'integrations',
    //   icon: <Link size={20} />,
    //   label: 'External Integrations',
    //   path: '/'
    // //   path: '/external-integrations'
    // }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between shrink-0">
        {/* {isSidebarExpanded && <h2 className="text-xl font-bold">Workflow</h2>} */}
        {isSidebarExpanded && <img src="https://www.infrahive.ai/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=75" alt="Workflow-Logo" className="w-36 h-13"/>}
        {/* {isSidebarExpanded && <img src="data:image/png;base64,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" alt="Workflow-Logo" className="w-36 h-13 mr-[50px]"/>} */}
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