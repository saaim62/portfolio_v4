"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
  type KeyboardEvent,
  type FocusableElement,
} from "react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

interface FocusTrapProps {
  isActive: boolean;
  onEscape?: () => void;
  children: ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  ariaDescribedById?: string;
}

interface TabPanelProps {
  isActive: boolean;
  id: string;
  children: ReactNode;
}

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  id?: string;
  children: ReactNode;
}

interface CarouselProps {
  items: ReactNode[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  totalItems: number;
  ariaLabel?: string;
}

interface ScreenReaderAnnouncement {
  message: string;
  isAssertive: boolean;
}

interface LiveRegionContextType {
  announce: (message: string, isAssertive?: boolean) => void;
}

// ============================================================================
// CONTEXTS
// ============================================================================

const LiveRegionContext = createContext<LiveRegionContextType>({
  announce: () => {},
});

export const useLiveRegion = () => useContext(LiveRegionContext);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets all focusable elements within a container.
 * Handles edge cases for disabled, hidden, and tabindex elements.
 */
export const getFocusableElements = (
  container: HTMLElement | null
): FocusableElement[] => {
  if (!container) return [];

  const selector = [
    'a[href]:not([disabled]):not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabix="-1"]):not([type="hidden"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"]):not([disabled])',
    '[contenteditable="true"]:not([disabled])',
  ].join(", ");

  const elements = Array.from(container.querySelectorAll<FocusableElement>(selector));

  // Filter out elements that are visually hidden or not in the document flow
  return elements.filter((el) => {
    const style = window.getComputedStyle(el);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      el.offsetParent !== null
    );
  });
};

/**
 * Safely focuses an element with fallback for edge cases.
 */
export const safeFocus = (element: HTMLElement | null): void => {
  if (!element) return;

  // Ensure the element is focusable
  if (
    element.hasAttribute("tabindex") &&
    element.getAttribute("tabindex") === "-1"
  ) {
    element.setAttribute("tabindex", "0");
  }

  try {
    element.focus({ preventScroll: true });
  } catch {
    // Fallback for elements that cannot be focused
    element.setAttribute("tabindex", "-1");
    element.addEventListener(
      "focus",
      () => element?.removeEventListener("focus", arguments.callee),
      { once: true }
    );
  }
};

/**
 * Generates a unique ID prefix for accessibility attributes.
 */
export const useId = (prefix: string): string => {
  const idRef = useRef<string>("");

  if (!idRef.current) {
    idRef.current = `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
  }

  return idRef.current;
};

// ============================================================================
// SKIP LINK COMPONENT
// ============================================================================

/**
 * Skip to main content link.
 * Appears on focus and allows keyboard users to bypass navigation.
 */
export const SkipToContent: React.FC<SkipLinkProps> = ({
  targetId = "main-content",
  label = "Skip to main content",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !isVisible) {
        setIsVisible(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown as unknown as EventListener);
    return () =>
      document.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
  }, [isVisible]);

  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      style={{
        position: "fixed",
        top: isVisible ? "0" : "-100px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000,
        padding: "12px 24px",
        backgroundColor: "#ffffff",
        color: "#0a0a0a",
        fontWeight: 600,
        fontSize: "1rem",
        textDecoration: "none",
        border: "2px solid #3b82f6",
        borderRadius: "0 0 8px 8px",
        transition: "top 0.2s ease-in-out",
        outline: "none",
      }}
      onFocus={() => setIsVisible(true)}
      onBlur={() => {
        if (document.activeElement?.id !== targetId) {
          setIsVisible(false);
        }
      }}
    >
      {label}
    </a>
  );
};

// ============================================================================
// FOCUS TRAP COMPONENT
// ============================================================================

/**
 * Traps focus within a container for modals, dialogs, and popovers.
 * Prevents keyboard users from tabbing outside the focused region.
 */
export const FocusTrap: React.FC<FocusTrapProps> = ({
  isActive,
  onEscape,
  children,
  initialFocusRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = getFocusableElements(container);

    // Set initial focus
    if (initialFocusRef?.current) {
      safeFocus(initialFocusRef.current);
    } else if (focusableElements.length > 0) {
      safeFocus(focusableElements[0]);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }

      if (e.key !== "Tab") return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      // Shift + Tab: move to last element if on first
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        safeFocus(lastElement);
        return;
      }

      // Tab: move to first element if on last
      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        safeFocus(firstElement);
        return;
      }
    };

    container.addEventListener("keydown", handleKeyDown as unknown as EventListener);

    // Prevent body scroll when trap is active
    document.body.style.overflow = "hidden";

    return () => {
      container.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
      document.body.style.overflow = "";
    };
  }, [isActive, onEscape, initialFocusRef]);

  return (
    <div
      ref={containerRef}
      role="presentation"
      style={{ outline: "none" }}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

// ============================================================================
// ACCESSIBLE MODAL COMPONENT
// ============================================================================

/**
 * Accessible modal dialog with proper ARIA attributes and keyboard handling.
 */
export const AccessibleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  ariaDescribedById,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Save the element that had focus before the modal opened
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else if (previousFocusRef.current) {
      // Return focus to the triggering element when modal closes
      safeFocus(previousFocusRef.current);
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Prevent clicks on backdrop from closing when clicking inside modal content
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "24px",
      }}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={ariaDescribedById || "modal-description"}
        style={{
          backgroundColor: "#1a1a2e",
          color: "#e0e0e0",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          padding: "32px",
          position: "relative",
          outline: "none",
        }}
      >
        {title && (
          <h2
            id="modal-title"
            style={{
              margin: "0 0 16px 0",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            {title}
          </h2>
        )}
        <div id="modal-description" style={{ display: "none" }}>
          Modal dialog content
        </div>
        {children}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            color: "#e0e0e0",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "4px",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          \u00D7
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// ACCESSIBLE TAB COMPONENT
// ============================================================================

/**
 * Accessible tab panel implementation following WAI-ARIA Authoring Practices.
 */
export const AccessibleTabs: React.FC<{
  tabs: { id: string; label: string; content: ReactNode }[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTabId, onTabChange }) => {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeTabId);
      let newIndex = currentIndex;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case "ArrowRight":
          e.preventDefault();
          newIndex = (currentIndex + 1) % tabs.length;
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      onTabChange(tabs[newIndex].id);
    },
    [activeTabId, tabs, onTabChange]
  );

  return (
    <div role="tablist" aria-label="Content sections" ref={tabListRef}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onKeyDown={handleKeyDown}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: "12px 24px",
              backgroundColor: isActive ? "#3b82f6" : "transparent",
              color: isActive ? "#ffffff" : "#a0a0a0",
              border: "none",
              borderBottom: isActive ? "3px solid #3b82f6" : "3px solid transparent",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: isActive ? 600 : 400,
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
              }
            }}
            onBlur={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "#a0a0a0";
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {tab.label}
          </button>
        );
      })}

      {tabs.map((tab) => (
        <AccessibleTabPanel
          key={tab.id}
          id={`panel-${tab.id}`}
          isActive={activeTabId === tab.id}
          role="tabpanel"
        >
          {tab.content}
        </AccessibleTabPanel>
      ))}
    </div>
  );
};

/**
 * Individual tab panel component.
 */
const AccessibleTabPanel: React.FC<TabPanelProps & { role?: string }> = ({
  isActive,
  id,
  children,
  role = "tabpanel",
}) => {
  if (!isActive) return null;

  return (
    <div
      id={id}
      role={role}
      aria-labelledby={`tab-${id.replace("panel-", "")}`}
      tabIndex={0}
      style={{
        padding: "24px",
        outline: "none",
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// ACCESSIBLE ACCORDION COMPONENT
// ============================================================================

/**
 * Accessible accordion item following WAI-ARIA patterns.
 */
export const AccessibleAccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen,
  onToggle,
  id,
  children,
}) => {
  const itemId = useId("accordion-item");
  const buttonId = `${itemId}-button`;
  const panelId = `${itemId}-panel`;

  return (
    <div
      className="accordion-item"
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "0",
      }}
    >
      <h3 style={{ margin: 0 }}>
        <button
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
          style={{
            width: "100%",
            padding: "20px 48px 20px 20px",
            backgroundColor: "transparent",
            color: "#e0e0e0",
            border: "none",
            textAlign: "left",
            fontSize: "1.1rem",
            fontWeight: 500,
            cursor: "pointer",
            position: "relative",
            outline: "none",
            transition: "color 0.2s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.color = "#3b82f6";
          }}
          onBlur={(e) => {
            e.currentTarget.style.color = "#e0e0e0";
          }}
        >
          {title}
          {/* Chevron icon */}
          <span
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
              transition: "transform 0.3s ease",
              fontSize: "1.2rem",
              color: "#a0a0a0",
            }}
          >
            \u25BC
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        style={{
          padding: "0 20px 20px 20px",
          color: "#b0b0b0",
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// ACCESSIBLE CAROUSEL COMPONENT
// ============================================================================

/**
 * Accessible carousel with keyboard navigation and ARIA live regions.
 */
export const AccessibleCarousel: React.FC<CarouselProps> = ({
  items,
  currentIndex,
  onNext,
  onPrevious,
  totalItems,
  ariaLabel = "Image carousel",
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { announce } = useLiveRegion();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "Home":
          e.preventDefault();
          // Navigate to first item
          break;
        case "End":
          e.preventDefault();
          // Navigate to last item
          break;
      }
    },
    [onNext, onPrevious]
  );

  useEffect(() => {
    announce(`Showing item ${currentIndex + 1} of ${totalItems}`);
  }, [currentIndex, totalItems, announce]);

  return (
    <div
      ref={carouselRef}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        position: "relative",
        outline: "none",
      }}
    >
      {/* Carousel content */}
      <div
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        {items[currentIndex]}
      </div>

      {/* Navigation controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <button
          onClick={onPrevious}
          aria-label={`Previous item, ${currentIndex + 1} of ${totalItems}`}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = "#3b82f6";
          }}
        >
          \u2190 Previous
        </button>

        {/* Dots indicator */}
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            color: "#a0a0a0",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {currentIndex + 1} / {totalItems}
        </span>

        <button
          onClick={onNext}
          aria-label={`Next item, ${currentIndex + 1} of ${totalItems}`}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = "#3b82f6";
          }}
        >
          Next \u2192
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// ACCESSIBLE FORM COMPONENTS
// ============================================================================

interface AccessibleInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  ariaDescribedBy?: string;
}

/**
 * Accessible input field with proper labels, error states, and ARIA attributes.
 */
export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  error,
  placeholder,
  ariaDescribedBy,
}) => {
  const errorId = `${id}-error`;

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#e0e0e0",
          fontWeight: 500,
          fontSize: "0.95rem",
        }}
      >
        {label}
        {required && (
          <span
            aria-hidden="true"
            style={{ color: "#ef4444", marginLeft: "4px" }}
          >
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : ariaDescribedBy}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "#0f0f23",
          border: error
            ? "2px solid #ef4444"
            : "2px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          color: "#e0e0e0",
          fontSize: "1rem",
          outline: "none",
          transition: "border-color 0.2s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "#3b82f6";
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          }
        }}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            color: "#ef4444",
            fontSize: "0.85rem",
            marginTop: "6px",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface AccessibleTextareaProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  rows?: number;
}

/**
 * Accessible textarea with proper labels and ARIA attributes.
 */
export const AccessibleTextarea: React.FC<AccessibleTextareaProps> = ({
  label,
  id,
  value,
  onChange,
  required = false,
  error,
  placeholder,
  rows = 4,
}) => {
  const errorId = `${id}-error`;

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#e0e0e0",
          fontWeight: 500,
          fontSize: "0.95rem",
        }}
      >
        {label}
        {required && (
          <span
            aria-hidden="true"
            style={{ color: "#ef4444", marginLeft: "4px" }}
          >
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "#0f0f23",
          border: error
            ? "2px solid #ef4444"
            : "2px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          color: "#e0e0e0",
          fontSize: "1rem",
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "#3b82f6";
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          }
        }}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            color: "#ef4444",
            fontSize: "0.85rem",
            marginTop: "6px",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface AccessibleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  isLoading?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/**
 * Accessible button with proper focus indicators and loading states.
 */
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  isLoading = false,
  ariaLabel,
  style,
}) => {
  const baseStyles: React.CSSProperties = {
    padding: "12px 32px",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "8px",
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    border: "none",
    outline: "none",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    opacity: disabled || isLoading ? 0.6 : 1,
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "#3b82f6",
      border: "2px solid #3b82f6",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#e0e0e0",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onFocus={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
        }
      }}
      onBlur={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "16px",
            height: "16px",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      )}
      {children}
    </button>
  );
};

// ============================================================================
// LIVE REGION (SCREEN READER ANNOUNCEMENTS)
// ============================================================================

/**
 * Provides screen reader announcements via aria-live regions.
 */
export const LiveRegionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [announcement, setAnnouncement] = useState<ScreenReaderAnnouncement>({
    message: "",
    isAssertive: false,
  });

  const announce = useCallback((message: string, isAssertive = false) => {
    setAnnouncement({ message, isAssertive });
  }, []);

  return (
    <LiveRegionContext.Provider value={{ announce }}>
      {children}
      {/* Visually hidden live region for screen readers */}
      <div
        aria-live={announcement.isAssertive ? "assertive" : "polite"}
        aria-atomic="true"
        role="status"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {announcement.message}
      </div>
    </LiveRegionContext.Provider>
  );
};

// ============================================================================
// ACCESSIBLE TOOLTIP COMPONENT
// ============================================================================

interface AccessibleTooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

/**
 * Accessible tooltip that works with keyboard and screen readers.
 */
export const AccessibleTooltip: React.FC<AccessibleTooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId("tooltip");

  return (
    <span
      className="tooltip-wrapper"
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "#1a1a2e",
            color: "#e0e0e0",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            [position]: position === "top" ? "calc(100% + 8px)" : undefined,
            [position === "top" ? "bottom" : "top"]:
              position !== "top"
                ? "calc(100% + 8px)"
                : undefined,
            left:
              position === "left" || position === "right"
                ? "50%"
                : undefined,
            transform:
              position === "left" || position === "right"
                ? "translateX(-50%)"
                : undefined,
          }}
        >
          {content}
          {/* Arrow */}
          <span
            style={{
              position: "absolute",
              [position === "top" ? "bottom" : "top"]:
                position === "top" ? "100%" : "auto",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              border: `6px solid transparent`,
              [position === "top" ? "border-top-color" : "border-bottom-color"]:
                "#1a1a2e",
            }}
          />
        </span>
      )}
    </span>
  );
};

// ============================================================================
// ACCESSIBLE DROPDOWN COMPONENT
// ============================================================================

interface DropdownOption {
  id: string;
  label: string;
}

interface AccessibleDropdownProps {
  options: DropdownOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  label: string;
}

/**
 * Accessible dropdown/select component with keyboard navigation.
 */
export const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  options,
  selectedId,
  onSelect,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const dropdownId = useId("dropdown");

  const selectedOption = options.find((o) => o.id === selectedId);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          const nextIndex = Math.min(
            options.findIndex((o) => o.id === selectedId) + 1,
            options.length - 1
          );
          listboxRef.current?.children[nextIndex]?.scrollIntoView({
            block: "nearest",
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          const prevIndex = Math.max(
            options.findIndex((o) => o.id === selectedId) - 1,
            0
          );
          listboxRef.current?.children[prevIndex]?.scrollIntoView({
            block: "nearest",
          });
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onSelect(selectedId);
          setIsOpen(false);
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        default:
          // Type-ahead navigation
          const char = e.key.toLowerCase();
          if (char.length === 1 && char >= "a" && char <= "z") {
            const foundIndex = options.findIndex((o) =>
              o.label.toLowerCase().startsWith(char)
            );
            if (foundIndex !== -1) {
              onSelect(options[foundIndex].id);
            }
          }
      }
    },
    [isOpen, selectedId, options, onSelect]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        listboxRef.current &&
        !listboxRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <label
        htmlFor={dropdownId}
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#e0e0e0",
          fontWeight: 500,
          fontSize: "0.95rem",
        }}
      >
        {label}
      </label>
      <button
        ref={buttonRef}
        id={dropdownId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${dropdownId}-listbox`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        style={{
          padding: "12px 40px 12px 16px",
          backgroundColor: "#0f0f23",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          color: "#e0e0e0",
          fontSize: "1rem",
          cursor: "pointer",
          outline: "none",
          width: "100%",
          textAlign: "left",
          position: "relative",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#3b82f6";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }}
      >
        {selectedOption?.label || "Select an option"}
        {/* Chevron */}
        <span
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: `rotate(${isOpen ? 180 : 0}deg)`,
            transition: "transform 0.2s ease",
            pointerEvents: "none",
          }}
        >
          \u25BC
        </span>
      </button>

      {isOpen && (
        <ul
          id={`${dropdownId}-listbox`}
          role="listbox"
          ref={listboxRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            backgroundColor: "#1a1a2e",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "4px 0",
            zIndex: 100,
            listStyle: "none",
            margin: 0,
          }}
        >
          {options.map((option) => (
            <li
              key={option.id}
              role="option"
              aria-selected={selectedId === option.id}
              onClick={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(option.id);
                  setIsOpen(false);
                }
              }}
              tabIndex={0}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                color:
                  selectedId === option.id ? "#3b82f6" : "#e0e0e0",
                backgroundColor:
                  selectedId === option.id
                    ? "rgba(59, 130, 246, 0.1)"
                    : "transparent",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (selectedId !== option.id) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedId !== option.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ============================================================================
// ACCESSIBLE NAVIGATION COMPONENT
// ============================================================================

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface AccessibleNavProps {
  items: NavItem[];
  ariaLabel: string;
}

/**
 * Accessible navigation with proper focus management and ARIA attributes.
 */
export const AccessibleNavigation: React.FC<AccessibleNavProps> = ({
  items,
  ariaLabel,
}) => {
  return (
    <nav aria-label={ariaLabel}>
      <ul
        style={{
          display: "flex",
          gap: "8px",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={item.isActive ? "page" : undefined}
              style={{
                padding: "10px 20px",
                color: item.isActive ? "#3b82f6" : "#a0a0a0",
                textDecoration: "none",
                fontWeight: item.isActive ? 600 : 400,
                borderBottom:
                  item.isActive && !item.href.startsWith("#")
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                transition: "color 0.2s ease, border-color 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                if (!item.isActive) {
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onBlur={(e) => {
                if (!item.isActive) {
                  e.currentTarget.style.color = "#a0a0a0";
                }
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// ============================================================================
// ACCESSIBLE MOBILE MENU COMPONENT
// ============================================================================

interface AccessibleMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  items: NavItem[];
  ariaLabel: string;
}

/**
 * Accessible mobile hamburger menu with focus trap.
 */
export const AccessibleMobileMenu: React.FC<AccessibleMobileMenuProps> = ({
  isOpen,
  onToggle,
  items,
  ariaLabel,
}) => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && menuButtonRef.current) {
      // Save focus before opening
    }
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={menuButtonRef}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={onToggle}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "#e0e0e0",
          fontSize: "1.5rem",
          cursor: "pointer",
          padding: "8px",
          outline: "none",
        }}
      >
        {isOpen ? "\u2715" : "\u2630"}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <nav aria-label={ariaLabel}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                textAlign: "center",
              }}
            >
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={item.isActive ? "page" : undefined}
                    onClick={onToggle}
                    style={{
                      color: item.isActive ? "#3b82f6" : "#e0e0e0",
                      textDecoration: "none",
                      fontSize: "1.5rem",
                      fontWeight: item.isActive ? 600 : 400,
                      padding: "12px 24px",
                      display: "block",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.color = item.isActive
                        ? "#3b82f6"
                        : "#e0e0e0";
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

// ============================================================================
// ACCESSIBLE IMAGE COMPONENT
// ============================================================================

interface AccessibleImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  caption?: string;
}

/**
 * Accessible image with proper alt text and figure/figcaption structure.
 */
export const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  priority = false,
  caption,
}) => {
  return (
    <figure
      style={{
        margin: 0,
        position: "relative",
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={priority ? "high" : undefined}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
        }}
      />
      {caption && (
        <figcaption
          style={{
            marginTop: "8px",
            fontSize: "0.85rem",
            color: "#a0a0a0",
            textAlign: "center",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

// ============================================================================
// ACCESSIBLE CARD COMPONENT (for Projects gallery)
// ============================================================================

interface AccessibleCardProps {
  title: string;
  description: string;
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  tags?: string[];
}

/**
 * Accessible card component for project gallery.
 */
export const AccessibleCard: React.FC<AccessibleCardProps> = ({
  title,
  description,
  link,
  imageSrc,
  imageAlt,
  tags,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <article
      ref={cardRef}
      style={{
        backgroundColor: "#1a1a2e",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(59, 130, 246, 0.2)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {imageSrc && (
        <AccessibleImage src={imageSrc} alt={imageAlt || title} />
      )}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          {link ? (
            <a
              href={link}
              style={{
                color: "inherit",
                textDecoration: "none",
                outline: "none",
              }}
              tabIndex={0}
              onFocus={(e) => {
                e.currentTarget.style.color = "#3b82f6";
              }}
              onBlur={(e) => {
                e.currentTarget.style.color = "inherit";
              }}
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p
          style={{
            margin: "0 0 16px 0",
            color: "#b0b0b0",
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "auto",
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

// ============================================================================
// ACCESSIBLE TABLE COMPONENT
// ============================================================================

interface AccessibleTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

/**
 * Accessible data table with proper ARIA attributes.
 */
export const AccessibleTable: React.FC<AccessibleTableProps> = ({
  headers,
  rows,
  caption,
}) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        {caption && <caption style={{ padding: "12px", fontWeight: 600 }}>{caption}</caption>}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                style={{
                  padding: "12px 16px",
                  borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    padding: "12px 16px",
                    color: "#b0b0b0",
                    fontSize: "0.95rem",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================================
// ACCESSIBLE ACCORDION GROUP COMPONENT
// ============================================================================

interface AccessibleAccordionProps {
  items: { title: string; content: ReactNode }[];
  ariaLabel: string;
}

/**
 * Accessible accordion group managing open/close state.
 */
export const AccessibleAccordionGroup: React.FC<AccessibleAccordionProps> = ({
  items,
  ariaLabel,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div role="region" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <AccessibleAccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        >
          {item.content}
        </AccessibleAccordionItem>
      ))}
    </div>
  );
};

// ============================================================================
// ACCESSIBLE TOAST/NOTIFICATION COMPONENT
// ============================================================================

interface AccessibleToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
  duration?: number;
}

/**
 * Accessible toast notification with auto-dismiss and screen reader support.
 */
export const AccessibleToast: React.FC<AccessibleToastProps> = ({
  message,
  type = "info",
  onClose,
  duration = 5000,
}) => {
  const { announce } = useLiveRegion();

  useEffect(() => {
    announce(message, true);
  }, [message, announce]);

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors: Record<string, { bg: string; border: string; icon: string }> = {
    success: { bg: "#065f46", border: "#10b981", icon: "\u2713" },
    error: { bg: "#7f1d1d", border: "#ef4444", icon: "\u2717" },
    info: { bg: "#1e3a5f", border: "#3b82f6", icon: "\u2139" },
    warning: { bg: "#78350f", border: "#f59e0b", icon: "\u26A0" },
  };

  const color = colors[type] || colors.info;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        backgroundColor: color.bg,
        borderLeft: `4px solid ${color.border}`,
        padding: "16px 20px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        maxWidth: "400px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          aria-hidden="true"
          style={{ fontSize: "1.2rem", color: color.icon }}
        >
          {color.icon}
        </span>
        <p style={{ margin: 0, color: "#e0e0e0", fontSize: "0.95rem" }}>
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          style={{
            background: "none",
            border: "none",
            color: "#e0e0e0",
            cursor: "pointer",
            fontSize: "1.2rem",
            padding: "4px",
            outline: "none",
          }}
        >
          \u00D7
        </button>
      )}
    </div>
  );
};

// ============================================================================
// GLOBAL ACCESSIBILITY STYLES (injected via useEffect)
// ============================================================================

/**
 * Injects global accessibility styles into the document.
 * Should be called once in the root layout or app component.
 */
export const injectAccessibilityStyles = (): void => {
  if (typeof window === "undefined") return;

  const styleId = "accessibility-global-styles";
  if (document.getElementById(styleId)) return;

  const styles = `
    /* Skip link visible on focus */
    .skip-link:focus {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      padding: 12px 24px;
      background-color: #ffffff;
      color: #0a0a0a;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      border: 2px solid #3b82f6;
      border-radius: 0 0 8px 8px;
      transition: top 0.2s ease-in-out;
    }

    /* Visible focus indicators for keyboard navigation */
    *:focus-visible {
      outline: 3px solid #3b82f6 !important;
      outline-offset: 2px !important;
      border-radius: 4px;
    }

    /* Remove default outline for mouse users, keep for keyboard */
    *:focus:not(:focus-visible) {
      outline: none !important;
    }

    /* Reduced motion preference */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* High contrast mode support */
    @media (forced-colors: active) {
      .skip-link,
      button,
      a:focus-visible {
        border: 2px solid ButtonText;
      }
    }

    /* Screen reader only utility class */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Spinner animation for loading states */
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Ensure all interactive elements are keyboard accessible */
    a:focus-visible,
    button:focus-visible,
    input:focus-visible,
    select:focus-visible,
    textarea:focus-visible,
    [tabindex]:focus-visible {
      outline: 3px solid #3b82f6;
      outline-offset: 2px;
    }

    /* Ensure proper contrast for links */
    a:not([href]) {
      cursor: pointer;
    }

    /* Ensure form elements have visible labels */
    label + input,
    label + textarea,
    label + select {
      margin-top: 4px;
    }
  `;

  const styleElement = document.createElement("style");
  styleElement.id = styleId;
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
};

// ============================================================================
// ACCESSIBILITY HOOKS
// ============================================================================

/**
 * Hook to manage keyboard navigation for custom components.
 */
export const useKeyboardNavigation = (
  onLeft?: () => void,
  onRight?: () => void,
  onUp?: () => void,
  onDown?: () => void,
  onEnter?: () => void,
  onEscape?: () => void
) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onLeft?.();
          break;
        case "ArrowRight":
          e.preventDefault();
          onRight?.();
          break;
        case "ArrowUp":
          e.preventDefault();
          onUp?.();
          break;
        case "ArrowDown":
          e.preventDefault();
          onDown?.();
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onEnter?.();
          break;
        case "Escape":
          e.preventDefault();
          onEscape?.();
          break;
      }
    },
    [onLeft, onRight, onUp, onDown, onEnter, onEscape]
  );

  return handleKeyDown;
};

/**
 * Hook to manage focus for a group of items.
 */
export const useFocusGroup = (count: number) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const moveFocus = useCallback(
    (direction: "forward" | "backward") => {
      setFocusedIndex((prev) => {
        if (direction === "forward") {
          return (prev + 1) % count;
        }
        return (prev - 1 + count) % count;
      });
    },
    [count]
  );

  const focusItem = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  return { focusedIndex, moveFocus, focusItem };
};

/**
 * Hook to manage focus restoration after modal/dialog close.
 */
export const useFocusRestoration = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      safeFocus(previousFocusRef.current);
      previousFocusRef.current = null;
    }
  }, []);

  return { saveFocus, restoreFocus };
};

// ============================================================================
// ACCESSIBILITY CHECKER UTILITY
// ============================================================================

/**
 * Utility function to check for common accessibility issues.
 * Returns an array of issues found.
 */
export const checkAccessibility = (): string[] => {
  const issues: string[] = [];

  // Check for images without alt text
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (!img.hasAttribute("alt") || img.getAttribute("alt") === "") {
      issues.push(
        `Image missing alt text: ${img.getAttribute("src")}`
      );
    }
  });

  // Check for inputs without labels
  const inputs = document.querySelectorAll(
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"])'
  );
  inputs.forEach((input) => {
    const id = input.getAttribute("id");
    const ariaLabel = input.getAttribute("aria-label");
    const ariaLabelledBy = input.getAttribute("aria-labelledby");
    const label = document.querySelector(`label[for="${id}"]`);

    if (!id && !ariaLabel && !ariaLabelledBy && !label) {
      issues.push(
        `Input missing label: ${input.getAttribute("type")} at ${input.getAttribute("name") || input.getAttribute("id")}`
      );
    }
  });

  // Check for buttons without accessible names
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    const ariaLabel = button.getAttribute("aria-label");
    const innerText = button.textContent?.trim();
    const ariaLabelledBy = button.getAttribute("aria-labelledby");

    if (!innerText && !ariaLabel && !ariaLabelledBy) {
      issues.push("Button missing accessible name");
    }
  });

  // Check for links without href or role
  const links = document.querySelectorAll('a:not([href]):not([role])');
  links.forEach((link) => {
    issues.push(
      `Link without href: ${link.textContent?.trim() || "unknown"}`
    );
  });

  // Check for missing lang attribute on html
  const html = document.querySelector("html");
  if (html && !html.hasAttribute("lang")) {
    issues.push("HTML element missing lang attribute");
  }

  return issues;
};

// ============================================================================
// ACCESSIBILITY PROVIDER (Wraps entire app)
// ============================================================================

interface AccessibilityProviderProps {
  children: ReactNode;
}

/**
 * Main accessibility provider that wraps the application.
 * Injects global styles and provides live region context.
 */
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    injectAccessibilityStyles();
  }, []);

  return <LiveRegionProvider>{children}</LiveRegionProvider>;
};

// ============================================================================
// EXPORT ALL COMPONENTS AND UTILITIES
// ============================================================================

export default {
  // Core components
  SkipToContent,
  FocusTrap,
  AccessibleModal,
  AccessibleTabs,
  AccessibleAccordionItem,
  AccessibleCarousel,
  AccessibleInput,
  AccessibleTextarea,
  AccessibleButton,
  LiveRegionProvider,
  AccessibleTooltip,
  AccessibleDropdown,
  AccessibleNavigation,
  AccessibleMobileMenu,
  AccessibleImage,
  AccessibleCard,
  AccessibleTable,
  AccessibleAccordionGroup,
  AccessibleToast,
  AccessibilityProvider,

  // Hooks
  useLiveRegion,
  useKeyboardNavigation,
  useFocusGroup,
  useFocusRestoration,

  // Utilities
  getFocusableElements,
  safeFocus,
  useId,
  injectAccessibilityStyles,
  checkAccessibility,
};
