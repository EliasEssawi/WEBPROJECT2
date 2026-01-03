interface MenuItem {
    name: string;
    icon: string;
    url?: string;
}

interface SidebarProps {
    menuItems: MenuItem[];
    primaryAction?: MenuItem;
    secondaryAction?: MenuItem;
    bottomAction?: MenuItem;
    title: String;
}

export default function Sidebar({ menuItems, title, primaryAction, secondaryAction, bottomAction}: SidebarProps) {
  return (
    <aside className="w-72 bg-[#1A7822] text-white flex flex-col shrink-0">
      <div className="p-8 pb-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          {title} <span>🚀</span>
        </h2>       
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/20 transition"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </a>
        ))}

        <div className="my-4 border-t border-white/20" />
        
       {primaryAction && (
          <a
            href={primaryAction.url || "#"}
            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white text-[#1A7822] font-bold shadow-lg"
          >
            {primaryAction.icon} {primaryAction.name}
          </a>
        )}

        {secondaryAction && (
          <a
            href={secondaryAction.url || "#"}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/20 transition"
          >
            {secondaryAction.icon} {secondaryAction.name}
          </a>
        )}
      </nav>
       {bottomAction && (
        <div className="p-6 bg-black/10 border-t border-white/10">
          <a
            href={bottomAction.url || "#"}
            className="hover:scale-105 w-full flex justify-center items-center gap-2 bg-yellow-400 text-yellow-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
          >
            {bottomAction.icon} {bottomAction.name}
          </a>
        </div>
      )}
    </aside>
  );
}
