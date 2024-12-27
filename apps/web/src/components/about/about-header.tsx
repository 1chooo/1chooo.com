interface Props {
  id: string;
  text: string;
}

function AboutHeader({ id, text }: Props) {
  return (
    <h2 id={id} className="text-light-gray text-lg font-bold mt-[30px] mb-[30px]">
      <code>{text}</code>
    </h2>
  );
};

export default AboutHeader;
