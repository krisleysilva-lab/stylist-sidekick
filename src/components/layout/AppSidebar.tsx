import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  DollarSign, 
  Store, 
  Gift, 
  BookOpen, 
  Settings,
  Sparkles
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  {
    title: 'nav.dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    feature: 'dashboard'
  },
  {
    title: 'nav.scheduling',
    url: '/agenda',
    icon: Calendar,
    feature: 'agenda-basica'
  },
  {
    title: 'nav.clients',
    url: '/clientes',
    icon: Users,
    feature: 'clientes'
  },
  {
    title: 'nav.financial',
    url: '/financeiro',
    icon: DollarSign,
    feature: 'financeiro'
  },
  {
    title: 'nav.store',
    url: '/loja',
    icon: Store,
    feature: 'loja-online'
  },
  {
    title: 'nav.loyalty',
    url: '/fidelidade',
    icon: Gift,
    feature: 'fidelidade'
  },
  {
    title: 'nav.content',
    url: '/conteudo',
    icon: BookOpen,
    feature: 'conteudo'
  },
  {
    title: 'nav.admin',
    url: '/admin',
    icon: Settings,
    feature: 'admin'
  }
];

export const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const { t } = useLanguage();
  const { currentPlan, hasFeature } = useSubscription();
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const getNavClass = (isActive: boolean, hasAccess: boolean) => {
    let baseClass = "group w-full justify-start transition-smooth";
    
    if (!hasAccess) {
      baseClass += " opacity-50 cursor-not-allowed";
    } else if (isActive) {
      baseClass += " bg-primary text-primary-foreground font-medium shadow-glow";
    } else {
      baseClass += " hover:bg-muted/50 hover:text-foreground";
    }
    
    return baseClass;
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">Cabelleira.IA</h2>
              {currentPlan && (
                <Badge 
                  variant={currentPlan.id === 'free' ? 'secondary' : 'default'} 
                  className="text-xs mt-1"
                >
                  {currentPlan.name}
                </Badge>
              )}
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
            Menu Principal
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const hasAccess = hasFeature(item.feature);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={hasAccess ? item.url : '#'}
                        className={getNavClass(isActive(item.url), hasAccess)}
                        onClick={(e) => {
                          if (!hasAccess) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="truncate">
                            {t(item.title)}
                            {!hasAccess && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                PRO
                              </Badge>
                            )}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && currentPlan?.id === 'free' && (
          <SidebarGroup className="mt-auto">
            <div className="p-4 mx-2 bg-gradient-primary rounded-lg text-white text-center">
              <Sparkles className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium mb-2">Desbloqueie o PRO</p>
              <NavLink 
                to="/assinatura"
                className="text-xs underline hover:no-underline"
              >
                Ver Planos
              </NavLink>
            </div>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};