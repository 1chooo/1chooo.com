interface CodeHeaderProps {
  id?: string;
  text: string;
}

function CodeHeader({ id, text }: CodeHeaderProps) {
  return (
    <h2
      id={id}
      className="text-light-gray text-lg font-bold"
    >
      <code>{text}</code>
    </h2>
  );
}

export default CodeHeader;
