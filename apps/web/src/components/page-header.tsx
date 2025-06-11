import React from "react";

interface PageHeaderProps {
  header: string;
}

function PageHeader({ header }: PageHeaderProps) {
  return (
    <h2 className="h2 article-title">{header}</h2>
  );
}

export default PageHeader;
