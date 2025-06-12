import React from "react";

interface ArticleTitileProps {
  title: string;
}

function ArticleTitile({ title }: ArticleTitileProps) {
  return (
    <h2 className="h2 article-title">{title}</h2>
  );
}

export default ArticleTitile;
