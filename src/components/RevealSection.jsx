import { useReveal } from "../hooks/useReveal";

function RevealSection({ as: Tag = "section", className = "", id, children }) {
  const { ref, visible } = useReveal();

  return (
    <Tag ref={ref} id={id} className={`${className} reveal-section${visible ? " is-visible" : ""}`}>
      {children}
    </Tag>
  );
}

export default RevealSection;
