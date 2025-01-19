import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function SectionContainer({ children, className, id }: Props) {
  return (
    <section className={`min-h-screen ${className ?? ""}`} id={id}>
      {children}
    </section>
  );
}

export default SectionContainer;
