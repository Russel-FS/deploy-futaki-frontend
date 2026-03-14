import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = "", 
  as: Component = "div" 
}) => {
  return (
    <Component className={`max-w-7xl mx-auto px-6 sm:px-8 ${className}`}>
      {children}
    </Component>
  );
};
