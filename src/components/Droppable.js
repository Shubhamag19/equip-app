import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "yellow" : undefined,
  };

  return (
    <div ref={setNodeRef}>
      {props.children}
    </div>
  );
}
