import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface MenuItem {
  label: string;
  key: string;
  children?: MenuItem[];
  url?: string;
  command?: () => void;
}

interface PanelMenuProps {
  model: MenuItem[];
  multiple?: boolean;
  expandedKeys?: Map<string, boolean>;
  itemsTemplate?: (item: MenuItem) => React.ReactNode;
  command?: (item: MenuItem) => void;
  routerEnabled?: boolean;
}

const PanelMenu: React.FC<PanelMenuProps> = ({
  model,
  multiple = false,
  expandedKeys = new Map(),
  itemsTemplate,
  command,
  routerEnabled = false,
}) => {
  const [localExpandedKeys, setLocalExpandedKeys] = useState<Map<string, boolean>>(expandedKeys);

  const toggleExpansion = (key: string) => {
    const newKeys = new Map(localExpandedKeys);
    const isExpanded = newKeys.get(key);

    if (!multiple && !isExpanded) {
      newKeys.forEach((_, k) => newKeys.set(k, false));
    }

    newKeys.set(key, !isExpanded);
    setLocalExpandedKeys(newKeys);
  };

  const handleItemClick = (item: MenuItem) => {
    item.command?.();
    command?.(item);
    if (item.url) {
      if (routerEnabled) {
        window.location.href = item.url;
      } else {
        console.log(`Navigating to ${item.url}`);
      }
    }
  };

  const renderMenuItems = (items: MenuItem[], parentKey: string = ""): React.ReactNode => {
    return items.map((item) => {
      const expanded = localExpandedKeys.get(item.key);
      const hasChildren = item.children && item.children.length > 0;
      const itemKey = `${parentKey}-${item.key}`;

      return (
        <div key={itemKey} className="flex items-center mb-1 px-1">
          <div className="w-full border border-border dark:border-coal rounded-md">
            <div
              className={`flex  rounded-md justify-between items-center p-2 font-semibold text-soft dark:text-pale hover:text-highlight dark:hover:text-ocean cursor-pointer hover:bg-secondary/50 dark:hover:bg-dim/50 transition-all ease-linear duration-200`}
              onClick={() => {
                toggleExpansion(item.key);
                handleItemClick(item);
              }}
            >
              {itemsTemplate ? itemsTemplate(item) : (
                <span className="text-soft dark:text-pale">{item.label}</span>
              )}
              {hasChildren ? (
                expanded ? (
                  <FaChevronDown className="text-muted dark:text-faint" />
                ) : (
                  <FaChevronRight className="text-muted dark:text-faint" />
                )
              ) : null}
            </div>
            {expanded && hasChildren && item.children && (
              <div className="ml-4 bg-secondary/50 dark:bg-dim/50">
                {renderMenuItems(item.children, itemKey)}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return <div>{renderMenuItems(model)}</div>;
};

export default PanelMenu;
